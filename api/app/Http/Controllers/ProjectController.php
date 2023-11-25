<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpsertProjectRequest;
use App\Http\Resources\Projects\ProjectResource;
use App\Models\Image;
use App\Models\Project;
use App\Utils\Assets\Asset;
use App\Utils\Enums\ProjectStatus;
use Exception;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Throwable;

class ProjectController extends Controller
{

    public function __construct()
    {
        $this->authorizeResource(Project::class, 'project');

    }

    /**
     * Display a listing of the resource.
     *
     * @return JsonResponse
     */
    public function index(): JsonResponse
    {
        $projects = Project::with('images')->get();
        return $this->ok(data: ProjectResource::collection($projects));
    }

    /**
     * Display a listing of the resource.
     *
     * @return JsonResponse
     * @throws AuthorizationException
     */
    public function getProjectsThatRequireDonations(): JsonResponse
    {
        $this->authorize('viewAny', Project::class);
        $projects = Project::with('images')
            ->where('donation_required', true)
            ->where('status', ProjectStatus::OnGoing->value)
            ->get();
        return $this->ok(data: ProjectResource::collection($projects));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param UpsertProjectRequest $request
     * @return JsonResponse
     */
    public function store(UpsertProjectRequest $request): JsonResponse
    {
        try {
            DB::beginTransaction();
            $data = $request->validated();
            $project = Project::create($data);
            if ($request->hasFile(Asset::$PHOTO)) {
                $paths = $this->processAssetsStorage($request, Asset::$PHOTO);
                foreach ($paths as $path) {
                    $project->images()->updateOrCreate([
                        'url' => $path
                    ]);
                }
            }
            DB::commit();
            return $this->created(data: new ProjectResource($project));
        } catch (Exception $e) {
            DB::rollBack();
            Log::error($e->getMessage());
            return $this->serverError($e->getMessage());
        }
    }

    /**
     * Display the specified resource with implicit model binding.
     *
     * @param Project $project
     * @return JsonResponse
     */
    public function show(Project $project): JsonResponse
    {
        $data = $project->with('images')->first();
        return $this->ok(data: new ProjectResource($data));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param UpsertProjectRequest $request
     * @param Project $project
     * @return JsonResponse
     * @throws Throwable
     */
    public function update(UpsertProjectRequest $request, Project $project): JsonResponse
    {
        try {
            DB::beginTransaction();
            $data = $request->validated();
            $project->updateOrFail($data);
            if ($request->hasFile(Asset::$PHOTO)) {
                $paths = $this->processAssetsStorage($request, Asset::$PHOTO);
                foreach ($paths as $path) {
                    $project->images()->updateOrCreate([
                        'url' => $path
                    ]);
                }
            }
            DB::commit();
            return $this->ok(data: new ProjectResource($project));
        } catch (Exception $e) {
            DB::rollBack();
            Log::error($e->getMessage());
            return $this->serverError($e->getMessage());
        }

    }

    /**
     * Update project image.
     *
     * @param Request $request
     * @param Project $project
     * @return JsonResponse
     * @throws AuthorizationException
     */
    public function updateProjectImage(Request $request, Project $project): JsonResponse
    {

        $this->authorize('updateProjectImage', auth()->user());
        if ($request->hasFile(Asset::$PHOTO)) {
            $paths = $this->processAssetsStorage($request, Asset::$PHOTO);
            foreach ($paths as $path) {
                $project->images()->updateOrCreate([
                    'url' => $path
                ]);
            }
        }

        return $this->serverError();
    }

    /**
     * Remove a specific image from a project and storage.
     *
     * @param Project $project
     * @param Image $image
     * @return JsonResponse
     * @throws AuthorizationException
     */
    public function deleteProjectImage(Project $project, Image $image): JsonResponse
    {

        $this->authorize('deleteProjectImage', auth()->user());

        $projectImage = $project->images()->findOrFail($image->id);

        if ($projectImage) {
            if (Storage::disk(Asset::$PHOTO)->exists($projectImage->url)) {
                Storage::disk(Asset::$PHOTO)->delete($projectImage->url);
            }

            $projectImage->delete();

            return $this->noContent();
        }

        return $this->serverError();
    }

    /**
     * Update the specified resource in storage.
     *
     * @param Request $request
     * @param Project $project
     * @return JsonResponse
     * @throws AuthorizationException
     */
    public function assignImagesToProject(Request $request, Project $project): JsonResponse
    {

        $this->authorize('assignImagesToProject', auth()->user());

        if ($request->hasFile(Asset::$PHOTO)) {
            $paths = $this->processAssetsStorage($request, Asset::$PHOTO);
            foreach ($paths as $path) {
                $project->images()->updateOrCreate([
                    'url' => $path
                ]);
            }
        }

        return $project->save() ? $this->ok() : $this->serverError();

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param Project $project
     * @return JsonResponse
     */
    public function destroy(Project $project): JsonResponse
    {

        return ! $this->deleteAsset($project, 'images') ? $this->serverError() : $this->noContent();

    }

}
