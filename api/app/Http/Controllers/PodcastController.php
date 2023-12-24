<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpsertPodcastRequest;
use App\Http\Resources\Podcasts\PodcastResource;
use App\Models\Podcast;
use App\Utils\Assets\Asset;
use App\Utils\Enums\AudioGenre;
use App\Utils\Enums\PostStatus;
use Exception;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;


class PodcastController extends Controller
{
    public function __construct()
    {
        $this->authorizeResource(Podcast::class, 'podcast');
    }


    /**
     * Display a listing of the resource.
     * @return JsonResponse
     */
    public function index(): JsonResponse
    {
        $podcasts = Podcast::get(['id', 'title', 'summary', 'status', 'genre', 'author']);
        return $this->ok(data: PodcastResource::collection($podcasts));

    }

    /**
     * Display a listing of the resource.
     * @return JsonResponse
     * @throws AuthorizationException
     */
    public function getPublishedSermons(): JsonResponse
    {
        $this->authorize('viewAny', Podcast::class);
        $podcasts = Podcast::with('audios')
            ->where('status', PostStatus::Published->value)
            ->where('genre', AudioGenre::Sermon->value)
            ->cursorPaginate(20);
        return $this->ok(data: PodcastResource::collection($podcasts));

    }

    /**
     * Store a newly created resource in storage.
     * @param UpsertPodcastRequest $request
     * @return JsonResponse
     */
    public function store(UpsertPodcastRequest $request): JsonResponse
    {
        try {
            DB::beginTransaction();

            $validated = $request->validated();
            $podcast = Podcast::create($validated);
            if ($request->hasFile('audios')) {
                $this->createOrUpdateAssets($podcast, $request, Asset::$AUDIOS);

            }

            DB::commit();
            return $this->created(data: new PodcastResource($podcast));

        } catch (Exception $e) {
            DB::rollBack();
            Log::error($e->getMessage());
            return $this->badRequest($e->getMessage());
        }

    }

    /**
     * Display the specified resource.
     * @param Podcast $podcast
     * @return JsonResponse
     */
    public function show(Podcast $podcast): JsonResponse
    {
        $podcast->load('audios');
        return $this->ok(data: new PodcastResource($podcast));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param UpsertPodcastRequest $request
     * @param Podcast $podcast
     * @return JsonResponse
     */
    public function update(UpsertPodcastRequest $request, Podcast $podcast): JsonResponse
    {

        try {
            DB::beginTransaction();
            $validated = $request->validated();
            $podcast->update($validated);
            if ($request->hasFile('audios')) {
                $this->createOrUpdateAssets($podcast, $request, Asset::$AUDIOS, true);

            }
            DB::commit();
            return $this->ok(data: new PodcastResource($podcast));
        } catch (Exception $e) {
            DB::rollBack();
            Log::error($e->getMessage());
            return $this->serverError($e->getMessage());
        }

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param Podcast $podcast
     * @return JsonResponse
     * @throws AuthorizationException
     */
    public function deletePodcastAudio(Podcast $podcast): JsonResponse
    {
        $this->authorize('deletePodcastAudio', $podcast);
        $this->deleteDuplicateAssets($podcast, Asset::$AUDIOS);
        return $this->noContent();

    }

    /**
     * Remove the specified resource from storage.
     * @param Podcast $podcast
     * @return JsonResponse
     */
    public function destroy(Podcast $podcast): JsonResponse
    {
        return $this->deleteAssetsAndModel($podcast, Asset::$AUDIOS) ? $this->noContent() : $this->serverError();

    }
}
