<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpsertPodcastRequest;
use App\Http\Resources\Podcasts\PodcastResource;
use App\Http\Resources\Positions\PositionResource;
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
        $podcasts = Podcast::with('audios')->get(['id', 'title', 'summary', 'status', 'genre', 'author']);
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
                $paths = $this->processAssetsStorage($request, 'audios');

                foreach($paths as $path) {
                    $podcast->audios()->create(
                        [
                            'url' => $path
                        ],
                    );
                }

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

        $validated = $request->validated();
        $isSuccessful = $podcast->update($validated);
        return $isSuccessful ? $this->ok() : $this->serverError();

    }

    /**
     * Remove the specified resource from storage.
     * @param Podcast $podcast
     * @return JsonResponse
     */
    public function destroy(Podcast $podcast): JsonResponse
    {
        return $this->deleteAssets($podcast, 'audios') ? $this->noContent() : $this->serverError();

    }
}
