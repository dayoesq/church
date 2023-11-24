<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpsertEventRequest;
use App\Http\Resources\Events\EventResource;
use App\Models\Event;
use App\Utils\Assets\Asset;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\ValidationException;
use Throwable;

class EventController extends Controller
{

    public function __construct()
    {
        $this->authorizeResource(Event::class, 'event');
    }

    /**
     * Display a listing of the resource.
     *
     * @return JsonResponse
     */
    public function index(): JsonResponse
    {
        $events = Event::with('anchors')->get();
        return $this->ok(data: EventResource::collection($events));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param UpsertEventRequest $request
     * @return JsonResponse
     */
    public function store(UpsertEventRequest $request): JsonResponse
    {
        try {
            DB::beginTransaction();

            $validated = $request->validated();
            $event = Event::create($validated);

            if ($request->filled('anchor')) $event->anchor = $request->input('anchor');
            $event->save();

            if ($request->hasFile(Asset::$PHOTO)) {
                $paths = $this->processAssetsStorage($request, Asset::$PHOTO);

                foreach ($paths as $path) {
                    $event->images()->updateOrCreate(
                        [
                            'url' => $path
                        ],
                    );
                }
            }

            DB::commit();
            return $this->created(data: new EventResource($event));

        } catch (Exception $e) {
            DB::rollBack();
            Log::error($e->getMessage());
            return $this->badRequest($e->getMessage());
        }
    }

    /**
     * Display the specified resource. Implicit model binding in use.
     *
     * @param Event $event
     * @return JsonResponse
     */
    public function show(Event $event): JsonResponse
    {
        return $this->ok(data: new EventResource($event));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param UpsertEventRequest $request
     * @param Event $event
     * @return JsonResponse
     * @throws ValidationException
     * @throws Throwable
     */
    public function update(UpsertEventRequest $request, Event $event): JsonResponse
    {

        try {
            DB::beginTransaction();

            $validated = $request->validated();
            $event->updateOrFail($validated);

            if ($request->hasFile(Asset::$PHOTO)) {
                $paths = $this->processAssetsStorage($request, Asset::$PHOTO);

                foreach ($paths as $path) {
                    $event->images()->updateOrCreate(
                        [
                            'url' => $path
                        ],
                    );
                }
            }

            DB::commit();
            return $this->ok(data: new EventResource($event));

        } catch (Exception $e) {
            DB::rollBack();
            Log::error($e->getMessage());
            return $this->badRequest($e->getMessage());
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param Event $event
     * @return JsonResponse
     */
    public function destroy(Event $event): JsonResponse
    {
        return ! $this->deleteAsset($event, 'images') ? $this->serverError() : $this->noContent();

    }
}
