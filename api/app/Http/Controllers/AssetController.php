<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpsertAssetRequest;
use App\Http\Resources\Assets\AssetResource;
use App\Http\Resources\Galleries\GalleryResource;
use App\Models\Asset;
use App\Models\Image;
use Exception;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class AssetController extends Controller
{
    public function __construct()
    {
        $this->authorizeResource(Asset::class, 'asset');
    }

    /**
     * Display a listing of the resource.
     */
    public function index(): JsonResponse
    {
        $assets = Asset::with('images')->get();
        return $this->ok(data: AssetResource::collection($assets));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param UpsertAssetRequest $request
     * @return JsonResponse
     */
    public function store(UpsertAssetRequest $request): JsonResponse
    {
        try {
            DB::beginTransaction();
            $validated = $request->validated();
            $asset = Asset::create($validated);
            if ($request->hasFile('images')) {
                $this->createOrUpdateAssets($asset, $request, 'images');
            }
            DB::commit();
            $asset->load('images');
            return $this->created(data: new AssetResource($asset));
        } catch (Exception $e) {
            DB::rollBack();
            Log::error($e->getMessage());
            return $this->serverError($e->getMessage());
        }
    }

    /**
     * Display the specified resource.
     *
     * @param Asset $asset
     * @return JsonResponse
     */
    public function show(Asset $asset): JsonResponse
    {
        $asset->load('images');
        return $this->ok(data: new AssetResource($asset));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param UpsertAssetRequest $request
     * @param Asset $asset
     * @return JsonResponse
     */
    public function update(UpsertAssetRequest $request, Asset $asset): JsonResponse
    {
        try {
            DB::beginTransaction();
            $validated = $request->validated();
            $asset->update($validated);
            if ($request->hasFile('images')) {
                $this->createOrUpdateAssets($asset, $request, 'images');
            }
            DB::commit();
            $asset->load('images');
            return $this->ok(data: new GalleryResource($asset));
        } catch (Exception $e) {
            DB::rollBack();
            Log::error($e->getMessage());
            return $this->serverError($e->getMessage());
        }
    }

    /**
     * Remove a specific image from the asset and storage.
     *
     * @param Asset $asset
     * @param Image $image
     * @return JsonResponse
     * @throws AuthorizationException
     */
    public function deleteAssetImage(Asset $asset, Image $image): JsonResponse
    {

        $this->authorize('deleteAssetImage', $asset);
        $this->deleteAsset($asset, 'images', $image);
        return $this->ok(data: new AssetResource($asset));
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param Asset $asset
     * @return JsonResponse
     */
    public function destroy(Asset $asset): JsonResponse
    {
        return ! $this->deleteAssetsAndModel($asset, 'images') ? $this->serverError() : $this->noContent();
    }
}
