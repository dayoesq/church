<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpsertProjectRequest;
use App\Models\Project;
use App\Utils\Assets\Asset;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;

class ProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     * @return JsonResponse
     */
    public function index(): JsonResponse
    {
        $projects = Project::with('images')->get();
        return $this->ok(data: $projects);
    }

    /**
     * Store a newly created resource in storage.
     * @param UpsertProjectRequest $request
     * @return JsonResponse
     */
    public function store(UpsertProjectRequest $request): JsonResponse
    {
        $data = $request->validated();
        $project = Project::create($data);
        return $project->save() ? $this->created(data: $project) : $this->serverError();
    }

    /**
     * Display the specified resource with implicit model binding.
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
     * @param UpsertProjectRequest $request
     * @param Project $project
     * @return JsonResponse
     */
    public function update(UpsertProjectRequest $request, Project $project): JsonResponse
    {
        try {
            DB::beginTransaction();

            $data = $request->validated();
            $project->fill($data);
            if($project->save()) {
                if ($request->hasFile(Asset::$PROJECT)) {
                    $paths = $this->handleAssetsStorage($request, Asset::$PROJECT);
                    foreach ($paths as $path) {
                        $project->images()->updateOrCreate(
                            [
                                'url' => $path
                            ],
                        );
                    }
                }
            }
            DB::commit();
            return $this->noContent();
        } catch (Exception $e) {
            DB::rollBack();
            return $this->serverError($e->getMessage());
        }

    }

    /**
     * Remove the specified resource from storage.
     * @param Project $project
     * @return JsonResponse
     */
    public function destroy(Project $project): JsonResponse
    {
        $project->delete();
        return $this->ok();
    }
}
