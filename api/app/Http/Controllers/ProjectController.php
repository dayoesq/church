<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpsertProjectRequest;
use App\Models\Image;
use App\Models\Project;
use App\Utils\Assets\Asset;
use Exception;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\ValidationException;

class ProjectController extends Controller
{

    private mixed $user;
    public function __construct()
    {
        $this->authorizeResource(Project::class, 'project');
        $this->user = auth()->user();
    }

    /**
     * Display a listing of the resource.
     *
     * @return JsonResponse
     */
    public function index(): JsonResponse
    {
        $projects = Project::with('images')->get();
        return $this->ok(data: $projects);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param UpsertProjectRequest $request
     * @return JsonResponse
     */
    public function store(UpsertProjectRequest $request): JsonResponse
    {
        $data = $request->validated();
        $project = Project::create($data);
        return $project ? $this->created(data: $project) : $this->serverError();
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
        return $this->ok(data: $data);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param UpsertProjectRequest $request
     * @param Project $project
     * @return JsonResponse
     */
    public function update(UpsertProjectRequest $request, Project $project): JsonResponse
    {
        $data = $request->validated();
        $project->update($data);
        return $project->save() ? $this->noContent() : $this->serverError();

    }

    /**
     * Update project image.
     *
     * @param Request $request
     * @param Project $project
     * @return JsonResponse
     * @throws ValidationException
     * @throws AuthorizationException
     */
    public function updateProjectImage(Request $request, Project $project): JsonResponse
    {

        if($this->user) $this->authorize('updateProjectImage');
        if ($request->hasFile('project')) {
            $paths = $this->handleAssetsStorage($request, Asset::$PROJECT, Asset::$PROJECT_DIR, Asset::$IMAGE_EXTENSIONS);
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
     * @param int $imageId
     * @return JsonResponse
     * @throws AuthorizationException
     */
    public function deleteProjectImage(Project $project, int $imageId): JsonResponse
    {

        if($this->user) $this->authorize('deleteProjectImage');

        $image = $project->images()->findOrFail($imageId);

        if ($image) {
            if (Storage::disk('project')->exists($image->url)) {
                Storage::disk('project')->delete($image->url);
            }

            $image->delete();

            return $this->ok();
        }

        return $this->serverError();
    }


    /**
     * Update the specified resource in storage.
     *
     * @param Request $request
     * @param Project $project
     * @param int $imageId
     * @return JsonResponse
     * @throws AuthorizationException
     */
    public function upsertCaptionOnProjectImage(Request $request, Project $project, int $imageId): JsonResponse
    {

        if($this->user) $this->authorize('upsertCaptionOnProjectImage');

        $projectImage = $project->images()->findOrNew($imageId);

        if($request->filled('caption')) {
            $request->validate(
                [
                    'caption' => ['string', 'min:2', 'max:100'],
                ]
            );
        }

        $projectImage->caption = $request->input('caption');

        return $projectImage->save() ? $this->ok() : $this->serverError();

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param Project $project
     * @return JsonResponse
     */
    public function destroy(Project $project): JsonResponse
    {

        try {
            DB::beginTransaction();
            $images = $project->images;
            foreach ($images as $image) {
                if (Storage::disk('project')->exists($image->url)) {
                    Storage::disk('project')->delete($image->url);
                    $image->delete();
                }
            }

            $project->delete();
            DB::commit();
            return $this->ok();
        } catch (Exception $e) {
            DB::rollBack();
            Log::error($e->getMessage());
            return $this->serverError();
        }

    }

}
