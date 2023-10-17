<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpsertProjectRequest;
use App\Models\Image;
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
        $projects = Project::with('images')->paginate(2);
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
                if ($request->hasFile('project')) {
                    $paths = $this->handleAssetsStorage($request, Asset::$PROJECT, Asset::$PROJECT_DIR, Asset::$IMAGE_EXTENSIONS);
                    foreach ($paths as $path) {
                        $project->images()->updateOrCreate([
                            'url' => $path
                        ]);
                    }
                }
            } else {
                return $this->badRequest('An error occurred.');
            }

            DB::commit();
            return $this->noContent();
        } catch (Exception $e) {
            DB::rollBack();
            return $this->serverError($e->getMessage());
        }

    }

    /**
     * Update the specified resource in storage.
     * @param Request $request
     * @param int $projectId
     * @param int $imageId
     * @return JsonResponse
     */
    public function addCaptionToProjectImage(Request $request, int $projectId, int $imageId): JsonResponse
    {
        Project::findOrFail($projectId);

        $request->validate(
            [
                'caption' => ['required', 'string', 'min:2', 'max:100'],
            ]
        );

        $image = Image::findOrFail($imageId);
        if($image->imageable_id === $projectId) {
            $image->caption = $request->input('caption');
            $image->save();
            return $this->ok();
        }

        return $this->serverError();
    }

    /**
     * Remove the specified resource from storage.
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
            return $this->serverError();
        }

    }

}
