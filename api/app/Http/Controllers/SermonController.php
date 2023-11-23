<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpsertSermonRequest;
use App\Http\Resources\Sermons\SermonResource;
use App\Models\Sermon;
use App\Utils\Assets\Asset;
use App\Utils\Enums\PostStatus;
use Exception;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Throwable;

class SermonController extends Controller
{
    public function __construct()
    {
        $this->authorizeResource(Sermon::class, 'sermon');
    }


    /**
     * Display a listing of the resource.
     * @return JsonResponse
     */
    public function index(): JsonResponse
    {
        $sermons = Sermon::with('audios')->cursorPaginate(20);
        return $this->ok(data: SermonResource::collection($sermons));

    }

    /**
     * Display a listing of the resource.
     * @return JsonResponse
     * @throws AuthorizationException
     */
    public function getPublishedSermons(): JsonResponse
    {
        $this->authorize('viewAny', Sermon::class);
        $sermons = Sermon::with('audios')
            ->where('status', PostStatus::Published->value)
            ->cursorPaginate(20);
        return $this->ok(data: SermonResource::collection($sermons));

    }

    /**
     * Store a newly created resource in storage.
     * @param UpsertSermonRequest $request
     * @return JsonResponse
     */
    public function store(UpsertSermonRequest $request): JsonResponse
    {
        try {
            DB::beginTransaction();

            $validated = $request->validated();
            $sermon = Sermon::create($validated);
            if ($request->hasFile(Asset::$AUDIO)) {
                $paths = $this->processAssetsStorage($request, Asset::$AUDIO);
                foreach ($paths as $path) {
                    $sermon->audios()->updateOrCreate(
                        [
                            'title' => $validated['title'],
                            'url' => $path,
                            'summary' => $validated['summary'],
                            'slug' => $validated['title'],
                            'genre' => 'sermon'
                        ],
                    );
                }
            }

            DB::commit();
            return $this->created(data: new SermonResource($sermon));

        } catch (Exception $e) {
            DB::rollBack();
            Log::error($e->getMessage());
            return $this->badRequest($e->getMessage());
        }

    }

    /**
     * Display the specified resource.
     * @param Sermon $sermon
     * @return JsonResponse
     */
    public function show(Sermon $sermon): JsonResponse
    {
        return $this->ok(data: new SermonResource($sermon));
    }

    /**
     * Update the specified resource in storage.
     * @throws Throwable
     */
    public function update(UpsertSermonRequest $request, Sermon $sermon): JsonResponse
    {

        $validated = $request->validated();
        $isSuccessful = $sermon->update($validated);
        return $isSuccessful ? $this->ok() : $this->serverError();

    }

    /**
     * Remove the specified resource from storage.
     * @param Sermon $sermon
     * @return JsonResponse
     */
    public function destroy(Sermon $sermon): JsonResponse
    {
        return ! $this->deleteAsset($sermon, 'audio') ? $this->serverError() : $this->noContent();

    }

}
