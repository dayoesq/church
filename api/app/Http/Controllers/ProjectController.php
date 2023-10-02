<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreProjectRequest;
use App\Http\Requests\UpdateProjectRequest;
use App\Models\Project;
use Illuminate\Http\JsonResponse;

class ProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     * @return JsonResponse
     */
    public function index(): JsonResponse
    {
        $projects = Project::with('images')->get();
        return $this->ok($projects);
    }

    /**
     * Store a newly created resource in storage.
     * @param StoreProjectRequest $request
     * @return JsonResponse
     */
    public function store(StoreProjectRequest $request): JsonResponse
    {
        $data = $request->validated();
        $project = Project::create($data);
        return $project->save() ? $this->created($project) : $this->serverError();
    }

    /**
     * Display the specified resource.
     * @param Project $project
     * @return JsonResponse
     */
    public function show(Project $project): JsonResponse
    {
        return $this->ok($project);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProjectRequest $request, Project $project)
    {
        //$data = $request->validated();

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
