<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpsertPositionRequest;
use App\Models\Position;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Str;

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
        return $this->ok($positions);
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
        return $position->save() ? $this->created(data: $position) : $this->serverError();
    }

    /**
     * Display the specified resource.
     *
     * @param Position $position
     * @return JsonResponse
     */
    public function show(Position $position): JsonResponse
    {
        return $this->ok($position);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param UpsertPositionRequest $request
     * @param int $id
     * @return JsonResponse
     */
    public function update(UpsertPositionRequest $request, int $id): JsonResponse
    {
        $position = Position::findOrFail($id);
        $request->validated();
        $position->title = Str::lower($request->input('title'));
        return $position->save() ? $this->noContent() : $this->serverError();

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
        return $this->ok();
    }
}
