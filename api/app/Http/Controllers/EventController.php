<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreEventRequest;
use App\Http\Requests\UpdateEventRequest;
use App\Models\Event;
use App\Utils\Assets\Asset;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;

class EventController extends Controller
{
    /**
     * Display a listing of the resource.
     * @return JsonResponse
     */
    public function index(): JsonResponse
    {
        $events = Event::all();
        return $this->ok(data: $events);
    }

    /**
     * Store a newly created resource in storage.
     * @param StoreEventRequest $request
     * @return JsonResponse
     */
    public function store(StoreEventRequest $request): JsonResponse
    {
        try {
            DB::beginTransaction();

            $request->validated();

            $event = new Event();
            $event->title = $request->input('title');
            $event->type = $request->input('type');
            $event->organised_by = $request->input('organised_by');
            $event->starts_at = $request->input('starts_at');
            $event->ends_at = $request->input('ends_at');
            $event->created_by = auth()->user->id;

            if ($event->save()) {
                if ($request->hasFile(Asset::$EVENT)) {
                    $paths = $this->handleAssetsStorage($request, Asset::$EVENT);

                    foreach ($paths as $path) {
                        $event->images()->updateOrCreate(
                            [
                                'url' => $path
                            ],
                        );
                    }
                }

                DB::commit();

                return $this->created(data: $event);
            }
            DB::rollBack();
            return $this->serverError();
        } catch (Exception $e) {
            DB::rollBack();
            return $this->badRequest($e->getMessage());
        }
    }


    /**
     * Display the specified resource. Implicit model binding in use.
     * @param Event $event
     * @return JsonResponse
     */
    public function show(Event $event): JsonResponse
    {
        return $this->Ok(data: $event);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateEventRequest $request, Event $event)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     * @param Event $event
     * @return JsonResponse
     */
    public function destroy(Event $event): JsonResponse
    {
        $event->delete();
        return $this->ok();
    }
}
