<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpsertGalleryRequest;
use App\Models\Gallery;
use App\Utils\Assets\Asset;
use Illuminate\Http\JsonResponse;
use Illuminate\Validation\ValidationException;

class GalleryController extends Controller
{
    /**
     * Display a listing of the resource.
     * @return JsonResponse
     */
    public function index(): JsonResponse
    {
        $galleries = Gallery::with('images')->get();
        return $this->ok(data: $galleries);
    }

    /**
     * Store a newly created resource in storage.
     * @param UpsertGalleryRequest $request
     * @return JsonResponse
     * @throws ValidationException
     */
    public function store(UpsertGalleryRequest $request): JsonResponse
    {
        $data = $request->validated();
        $gallery = Gallery::create($data);
        if($gallery->save()) {
            if ($request->hasFile(Asset::$GALLERY)) {
                $paths = $this->handleAssetsStorage($request, Asset::$GALLERY, Asset::$GALLERY_DIR, Asset::$IMAGE_EXTENSIONS);
                foreach ($paths as $path) {
                    $gallery->images()->updateOrCreate([
                        'url' => $path
                    ]);
                }
            }
            return $this->created(data: $gallery);
        }

        return $this->serverError();

    }

    /**
     * Display the specified resource.
     * @param Gallery $gallery
     * @return JsonResponse
     */
    public function show(Gallery $gallery): JsonResponse
    {
        $data = $gallery->with('images')->first();
        return $this->ok(data: $data);
    }

    /**
     * Update the specified resource in storage.
     * @param UpsertGalleryRequest $request
     * @param Gallery $gallery
     * @return JsonResponse|void
     * @throws ValidationException
     */
    public function update(UpsertGalleryRequest $request, Gallery $gallery)
    {
        $data = $request->validated();
        $gallery->update($data);
        if($gallery->save()) {
            if ($request->hasFile(Asset::$GALLERY)) {
                $paths = $this->handleAssetsStorage($request, Asset::$GALLERY, Asset::$GALLERY_DIR, Asset::$IMAGE_EXTENSIONS);
                foreach ($paths as $path) {
                    $gallery->images()->updateOrCreate([
                        'url' => $path
                    ]);
                }
            }
            return $this->noContent();
        }

    }

    /**
     * Remove the specified resource from storage.
     * @param Gallery $gallery
     * @return JsonResponse
     */
    public function destroy(Gallery $gallery): JsonResponse
    {
        $gallery->delete();
        return $this->ok();
    }
}
