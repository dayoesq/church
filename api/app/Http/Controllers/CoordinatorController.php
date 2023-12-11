<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpsertCoordinatorRequest;
use App\Http\Resources\Coordinators\CoordinatorResource;
use App\Models\Coordinator;
use Illuminate\Http\JsonResponse;

class CoordinatorController extends Controller
{

    public function __construct()
    {
        $this->authorizeResource(Coordinator::class, 'coordinator');
    }

    /**
     * Display a listing of the resource.
     */
    public function index(): JsonResponse
    {
        $coordinators = Coordinator::all();
        return $this->ok(data: CoordinatorResource::collection($coordinators));
    }

    /**
     * Store a newly created resource in storage.
     * @param UpsertCoordinatorRequest $request
     * @return JsonResponse
     */
    public function store(UpsertCoordinatorRequest $request): JsonResponse
    {
        $validated = $request->validated();
        $coordinator = Coordinator::create($validated);
        return $coordinator ? $this->created(data: new OrganizerResource($coordinator)) : $this->serverError();
    }

    /**
     * Display the specified resource.
     *
     * @param Coordinator $coordinator
     * @return JsonResponse
     */
    public function show(Coordinator $coordinator): JsonResponse
    {
        return $this->ok(data: new OrganizerResource($coordinator));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param UpsertCoordinatorRequest $request
     * @param Coordinator $organizer
     * @return JsonResponse
     */
    public function update(UpsertCoordinatorRequest $request, Coordinator $coordinator): JsonResponse
    {
        $validated = $request->validated();
        return $coordinator->update($validated) ? $this->ok() : $this->serverError();

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param Coordinator $coordinator
     * @return JsonResponse
     */
    public function destroy(Coordinator $coordinator): JsonResponse
    {
        $coordinator->delete();
        return $this->noContent();
    }
}
