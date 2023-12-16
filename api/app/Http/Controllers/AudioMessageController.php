<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpsertAudioMessageRequest;
use App\Http\Resources\AudioMessages\AudioMessageResource;
use App\Models\AudioMessage;
use App\Utils\Enums\AudioGenre;
use App\Utils\Assets\Asset;
use App\Utils\Enums\PostStatus;
use Exception;
use Illuminate\Support\Str;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Throwable;

class AudioMessageController extends Controller
{
    public function __construct()
    {
        $this->authorizeResource(AudioMessage::class, 'audio_message');
    }


    /**
     * Display a listing of the resource.
     * @return JsonResponse
     */
    public function index(): JsonResponse
    {
        $audioMessages = AudioMessage::get(['id', 'title', 'summary', 'status', 'genre', 'author']);
        return $this->ok(data: AudioMessageResource::collection($audioMessages));

    }

    /**
     * Display a listing of the resource.
     * @return JsonResponse
     * @throws AuthorizationException
     */
    public function getPublishedSermons(): JsonResponse
    {
        $this->authorize('viewAny', AudioMessage::class);
        $audioMessages = AudioMessage::with('audio')
            ->where('status', PostStatus::Published->value)
            ->where('genre', AudioGenre::Sermon->value)
            ->cursorPaginate(20);
        return $this->ok(data: AudioMessageResource::collection($audioMessages));

    }

    /**
     * Store a newly created resource in storage.
     * @param UpsertAudioMessageRequest $request
     * @return JsonResponse
     */
    public function store(UpsertAudioMessageRequest $request): JsonResponse
    {
        try {
            DB::beginTransaction();

            $validated = $request->validated();
            $audioMessage = AudioMessage::create($validated);
            if ($request->hasFile('audio')) {
                $path = $request->file('audio')->store(Asset::$AUDIOS);
                $audioMessage->audio()->create(
                        [
                            'url' => $path,
                            'caption' => $validated['title'],
                            'author' => $validated['author']
                        ],
                    );

            }

            DB::commit();
            return $this->created(data: new AudioMessageResource($audioMessage));

        } catch (Exception $e) {
            DB::rollBack();
            Log::error($e->getMessage());
            return $this->badRequest($e->getMessage());
        }

    }

    /**
     * Display the specified resource.
     * @param AudioMessage $audioMessage
     * @return JsonResponse
     */
    public function show(AudioMessage $audioMessage): JsonResponse
    {
        // return $this->ok(data: $audioMessage);
        return $this->ok(data: new AudioMessageResource($audioMessage));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param AudioMessage $audioMessage
     * @return JsonResponse
     * @throws Throwable
     */
    public function update(UpsertAudioMessageRequest $request, AudioMessage $audioMessage): JsonResponse
    {

        $validated = $request->validated();
        $isSuccessful = $audioMessage->update($validated);
        return $isSuccessful ? $this->ok() : $this->serverError();

    }

    /**
     * Remove the specified resource from storage.
     * @param AudioMessage $audioMessage
     * @return JsonResponse
     */
    public function destroy(AudioMessage $audioMessage): JsonResponse
    {
        return ! $this->deleteAsset($audioMessage, 'audios') ? $this->serverError() : $this->noContent();

    }

}
