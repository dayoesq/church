<?php

namespace App\Http\Controllers;

use App\DTOs\AnchorDto;
use App\Http\Requests\UpsertAnchorRequest;
use Illuminate\Http\JsonResponse;
use App\Models\Anchor;

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
        return $this->ok(data: $anchors);
    }

    /**
     * Store a newly created resource in storage.
     * @param UpsertAnchorRequest $request
     * @return JsonResponse
     */
    public function store(UpsertAnchorRequest $request): JsonResponse
    {
        $data = $request->validated();
        $transformedData = new AnchorDto($data['first_name'], $data['last_name'], $data['email'], $data['title']);
        return Anchor::create($transformedData) ? $this->created() : $this->serverError();
    }

    /**
     * Display the specified resource.
     *
     * @param Anchor $anchor
     * @return JsonResponse
     */
    public function show(Anchor $anchor): JsonResponse
    {
        return $this->ok(data: $anchor);
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
        $data = $request->validated();
        $transformedData = new AnchorDto($data['first_name'], $data['last_name'], $data['email'], $data['title']);
        return $anchor->fill([$transformedData]) ? $this->ok() : $this->serverError();

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
