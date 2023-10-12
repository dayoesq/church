<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpsertProjectRequest;
use App\Models\Project;
use App\Utils\Assets\Asset;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

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
     * @param Request $request
     * @param Project $project
     * @return JsonResponse
     */
    public function update(Request $request, Project $project): JsonResponse
    {
        try {
            DB::beginTransaction();

            $data = $request->validate(
                [
                    'title' => ['string', 'min:2', 'max:150'],
                    'description' => ['string', 'min:20', 'max:500'],
                    'target_amount' => ['required']
                ]
            );

            $project->fill($data);

            if($project->save()) {
                if ($request->hasFile(Asset::$PROJECT)) {
                    $paths = $this->handleAssetsStorage($request, Asset::$PROJECT, Asset::$IMAGE_EXTENSIONS);
                    foreach ($paths as $path) {
                        $project->images()->updateOrCreate([
                            'url' => $path
                        ]);
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

        $images = $project->images;

        foreach ($images as $image) {
            $imagePath = $image->url;
            if (Storage::disk('project')->exists($imagePath)) {
                Storage::disk('project')->delete($imagePath);
            }

            $image->delete();
        }

        $project->delete();

        return $this->ok();
    }

}
