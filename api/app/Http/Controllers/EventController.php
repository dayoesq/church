<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreEventRequest;
use App\Models\Event;
use App\Utils\Assets\Asset;
use App\Utils\Enums\Events;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Illuminate\Validation\Rules\Enum;
use Illuminate\Validation\ValidationException;

class EventController extends Controller
{

    public function __construct()
    {
        $this->authorizeResource(Event::class, 'event');
    }

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
            $event->organized_by = $request->input('organized_by');
            $event->starts_at = $request->input('starts_at');
            $event->ends_at = $request->input('ends_at');
            $event->created_by = auth()->user->id;

            if ($event->save()) {
                if ($request->hasFile(Asset::$EVENT)) {
                    $paths = $this->handleAssetsStorage($request, Asset::$EVENT, Asset::$EVENT_DIR, Asset::$IMAGE_EXTENSIONS);

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
        return $this->ok(data: $event);
    }

    /**
     * Update the specified resource in storage.
     * @param Request $request
     * @param Event $event
     * @return JsonResponse
     * @throws ValidationException
     */
    public function update(Request $request, Event $event): JsonResponse
    {
        if($request->filled('title')) {
            $request->validate(['title' => ['string', 'min:2', 'max:150']]);
            $event->title = Str::lower($request->input('title'));
        }

        if($request->filled('type')) {
            $request->validate(['type' => new Enum(Events::class)]);
            $event->type = $request->input('type');
        }

        if($request->filled('organised_by')) {
            $request->validate(['organised_by' => 'string', 'min:2', 'max:150']);
            $event->organised_by = Str::lower($request->input('organised_by'));
        }

        if($request->filled('starts_at')) {
            $request->validate(['starts_at' => ['date']]);
            $event->starts_at = $request->input('starts_at');
        }

        if($request->filled('ends_at')) {
            $request->validate(['ends_at' => ['date']]);
            $event->starts_at = $request->input('ends_at');
        }

        if ($event->save()) {
            if ($request->hasFile(Asset::$EVENT)) {
                $paths = $this->handleAssetsStorage($request, Asset::$EVENT, Asset::$EVENT_DIR, Asset::$IMAGE_EXTENSIONS);

                foreach ($paths as $path) {
                    $event->images()->updateOrCreate(
                        [
                            'url' => $path
                        ],
                    );
                }
            }
        }

        return $event->save() ? $this->ok() : $this->serverError();

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
