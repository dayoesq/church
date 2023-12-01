<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpsertPositionRequest;
use App\Http\Resources\Positions\PositionResource;
use App\Models\Position;
use Illuminate\Http\JsonResponse;
use Throwable;

class PositionController extends Controller
{

    public function __construct()
    {
        $this->authorizeResource(Position::class, 'position');
    }

    /**
     * Display a listing of the resource.
     *
     * @return JsonResponse
     */
    public function index(): JsonResponse
    {
        $positions = Position::all();
        return $this->ok(data: PositionResource::collection($positions));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param UpsertPositionRequest $request
     * @return JsonResponse
     */
    public function store(UpsertPositionRequest $request): JsonResponse
    {
        $data = $request->validated();
        $position = Position::create($data);
        return $position ? $this->created(data: new PositionResource($position)) : $this->serverError();
    }

    /**
     * Display the specified resource.
     *
     * @param Position $position
     * @return JsonResponse
     */
    public function show(Position $position): JsonResponse
    {
        return $this->ok(data: new PositionResource($position));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param UpsertPositionRequest $request
     * @param Position $position
     * @return JsonResponse
     * @throws Throwable
     */
    public function update(UpsertPositionRequest $request, Position $position): JsonResponse
    {
        $validated = $request->validated();
        $updatedPosition = $position->updateOrFail($validated);
        return $updatedPosition ? $this->ok(data: new PositionResource($updatedPosition)) : $this->serverError();

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param Position $position
     * @return JsonResponse
     */
    public function destroy(Position $position): JsonResponse
    {
        $position->delete();
        return $this->noContent();
    }
}
