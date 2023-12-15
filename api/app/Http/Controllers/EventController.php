<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
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
        $events = Event::get(['id', 'title', 'organizer', 'description', 'status', 'fee', 'starts_at', 'ends_at']);
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
        $validated = $request->validated();
        $event = Event::create($validated);
        return $event ? $this->created(data: new EventResource($event)) : $this->serverError();
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
            $event->update($validated);

            $startDate = Carbon::create($request->input('starts_at'));
            $endDate = Carbon::create($request->input('ends_at'));

            if($endDate->lessThan($startDate)) {
                return $this->badRequest('The end date must be creater than the start date.');
            }

            if ($request->hasFile(Asset::$IMAGES)) {
                $paths = $this->processAssetsStorage($request, Asset::$IMAGES);

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
