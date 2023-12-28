<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpsertProjectRequest;
use App\Http\Resources\Projects\ProjectResource;
use App\Utils\Enums\YesOrNo;
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
            ->where('requires_donation', YesOrNo::Yes->value)
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
            if ($request->hasFile('images')) {
                $this->createOrUpdateAssets($project, $request, Asset::$IMAGES);
            }
            DB::commit();
            $project->load('images');
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
        $project->load('images');
        return $this->ok(data: new ProjectResource($project));
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
            if ($request->hasFile('images')) {
                $this->createOrUpdateAssets($project, $request, Asset::$IMAGES);
            }
            DB::commit();
            $project->load('images');
            return $this->ok(data: new ProjectResource($project));
        } catch (Exception $e) {
            DB::rollBack();
            Log::error($e->getMessage());
            return $this->serverError($e->getMessage());
        }

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

        $this->authorize('deleteProjectImage', $project);
        $this->deleteAsset($project, Asset::$IMAGES, $image);
        return $this->ok(data: new ProjectResource($project));
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param Project $project
     * @return JsonResponse
     */
    public function destroy(Project $project): JsonResponse
    {

        return ! $this->deleteAssetsAndModel($project, Asset::$IMAGES) ? $this->serverError() : $this->noContent();

    }

}
