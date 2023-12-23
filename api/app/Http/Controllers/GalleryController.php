<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpsertGalleryRequest;
use App\Http\Resources\Galleries\GalleryResource;
use App\Models\Gallery;
use App\Utils\Assets\Asset;
use Exception;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\ValidationException;
use Throwable;

class GalleryController extends Controller
{
    public function __construct()
    {
        $this->authorizeResource(Gallery::class, 'gallery');
    }

    /**
     * Display a listing of the resource.
     *
     * @return JsonResponse
     */
    public function index(): JsonResponse
    {
        $galleries = Gallery::with('images')->get();
        return $this->ok(data: GalleryResource::collection($galleries));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param UpsertGalleryRequest $request
     * @return JsonResponse
     * @throws ValidationException
     */
    public function store(UpsertGalleryRequest $request): JsonResponse
    {
        try {
            DB::beginTransaction();
            $validated = $request->validated();
            $gallery = Gallery::create($validated);
            if ($request->hasFile('images')) {
                $this->createOrUpdateAssets($gallery, $request, Asset::$IMAGES);
            }
            DB::commit();
            return $this->created(data: new GalleryResource($gallery));
        } catch (Exception $e) {
            DB::rollBack();
            Log::error($e->getMessage());
            return $this->serverError($e->getMessage());
        }

    }

    /**
     * Display the specified resource.
     *
     * @param Gallery $gallery
     * @return JsonResponse
     */
    public function show(Gallery $gallery): JsonResponse
    {
        $gallery->load('images');
        return $this->ok(data: new GalleryResource($data));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param UpsertGalleryRequest $request
     * @param Gallery $gallery
     * @return JsonResponse
     * @throws Throwable
     */
    public function update(UpsertGalleryRequest $request, Gallery $gallery): JsonResponse
    {

        try {
            DB::beginTransaction();
            $validated = $request->validated();
            $gallery->update($validated);
            if ($request->hasFile(Asset::$PHOTO)) {
                $this->createOrUpdateAssets($gallery, $request, Asset::$IMAGES, false);
            }
            DB::commit();
            return $this->ok(data: new GalleryResource($gallery));
        } catch (Exception $e) {
            DB::rollBack();
            Log::error($e->getMessage());
            return $this->serverError($e->getMessage());
        }

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param Gallery $gallery
     * @return JsonResponse
     * @throws AuthorizationException
     */
    public function deleteGalleryImage(Gallery $gallery): JsonResponse
    {
        $this->authorize('deleteGalleryImage', $gallery);
        $this->deleteDuplicateAssets($gallery, Asset::$IMAGES);
        return $this->noContent();

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param Gallery $gallery
     * @return JsonResponse
     */
    public function destroy(Gallery $gallery): JsonResponse
    {
        return ! $this->deleteAssetsAndModel($gallery, Asset::$IMAGES) ? $this->serverError() : $this->noContent();
    }
}
