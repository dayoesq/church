<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpsertGalleryRequest;
use App\Models\Gallery;
use App\Utils\Assets\Asset;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\ValidationException;

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
        return $this->ok(data: $galleries);
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
        $validated = $request->validated();
        $validated = $request->safe()->except($validated[Asset::$PHOTO]);
        $gallery = Gallery::create($validated);
        if ($request->hasFile(Asset::$PHOTO)) {
            $paths = $this->processAssetsStorage($request, Asset::$PHOTO);
            foreach ($paths as $path) {
                $gallery->images()->updateOrCreate([
                    'url' => $path
                ]);
            }
        }

        return $this->created(data: $gallery);

    }

    /**
     * Display the specified resource.
     *
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
     *
     * @param UpsertGalleryRequest $request
     * @param Gallery $gallery
     * @return JsonResponse
     */
    public function update(UpsertGalleryRequest $request, Gallery $gallery): JsonResponse
    {
        $validated = $request->validated();
        $validated = $request->safe()->except($validated[Asset::$PHOTO]);
        $gallery->update($validated);
        if ($request->hasFile(Asset::$PHOTO)) {
            $paths = $this->processAssetsStorage($request, Asset::$PHOTO);
            foreach ($paths as $path) {
                $gallery->images()->updateOrCreate([
                    'url' => $path
                ]);
            }
        }
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
        try {
            DB::beginTransaction();
            $photos = $gallery->images;
            foreach ($photos as $photo) {
                if (Storage::disk('audios')->exists($photo->url)) {
                    Storage::disk('audios')->delete($photo->url);
                    $photo->delete();
                }
            }

            $gallery->delete();
            DB::commit();
            return $this->noContent();
        } catch (Exception $e) {
            DB::rollBack();
            Log::error($e->getMessage());
            return $this->serverError();
        }
    }
}
