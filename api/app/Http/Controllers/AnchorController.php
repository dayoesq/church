<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpsertAnchorRequest;
use App\Http\Resources\Anchors\AnchorResource;
use App\Models\Anchor;
use Illuminate\Http\JsonResponse;

class AnchorController extends Controller
{

    public function __construct()
    {
        $this->authorizeResource(Anchor::class, 'anchor');
    }

    /**
     * Display a listing of the resource.
     */
    public function index(): JsonResponse
    {
        $anchors = Anchor::all();
        return $this->ok(data: AnchorResource::collection($anchors));
    }

    /**
     * Store a newly created resource in storage.
     * @param UpsertAnchorRequest $request
     * @return JsonResponse
     */
    public function store(UpsertAnchorRequest $request): JsonResponse
    {
        $validated = $request->validated();
        $anchor = Anchor::create($validated);
        return $anchor ? $this->created(data: new AnchorResource($anchor)) : $this->serverError();
    }

    /**
     * Display the specified resource.
     *
     * @param Anchor $anchor
     * @return JsonResponse
     */
    public function show(Anchor $anchor): JsonResponse
    {
        return $this->ok(data: new AnchorResource($anchor));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param UpsertAnchorRequest $request
     * @param Anchor $anchor
     * @return JsonResponse
     */
    public function update(UpsertAnchorRequest $request, Anchor $anchor): JsonResponse
    {
        $validated = $request->validated();
        return $anchor->update($validated) ? $this->ok() : $this->serverError();

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param Anchor $anchor
     * @return JsonResponse
     */
    public function destroy(Anchor $anchor): JsonResponse
    {
        $anchor->delete();
        return $this->noContent();
    }
}
