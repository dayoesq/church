<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePositionRequest;
use App\Http\Requests\UpdatePositionRequest;
use App\Models\Position;
use Illuminate\Http\JsonResponse;

class PositionController extends Controller
{
    /**
     * Display a listing of the resource.
     * @return JsonResponse
     */
    public function index(): JsonResponse
    {
        $positions = Position::all();
        return $this->ok($positions);
    }

    /**
     * Store a newly created resource in storage.
     * @param StorePositionRequest $request
     * @return JsonResponse
     */
    public function store(StorePositionRequest $request): JsonResponse
    {
        $data = $request->validated();
        $position = Position::create($data);
        return $position->save() ? $this->created(data: $position) : $this->serverError();
    }

    /**
     * Display the specified resource.
     * @param Position $position
     * @return JsonResponse
     */
    public function show(Position $position): JsonResponse
    {
        return $this->ok($position);
    }

    /**
     * Update the specified resource in storage.
     * @param UpdatePositionRequest $request
     * @param int $id
     * @return JsonResponse
     */
    public function update(UpdatePositionRequest $request, int $id): JsonResponse
    {
        $position = Position::findOrFail($id);
        $request->validated();
        $position->title = $request->input('title');
        return $position->save() ? $this->noContent() : $this->serverError();

    }

    /**
     * Remove the specified resource from storage.
     * @param Position $position
     * @return JsonResponse
     */
    public function destroy(Position $position): JsonResponse
    {
        $position->delete();
        return $this->ok();
    }
}
