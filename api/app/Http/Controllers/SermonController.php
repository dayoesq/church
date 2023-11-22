<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreSermonRequest;
use App\Models\Event;
use App\Models\Sermon;
use App\Utils\Assets\Asset;
use App\Utils\Enums\PostStatus;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rules\Enum;
use Illuminate\Validation\ValidationException;
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
        $sermons = Sermon::with('audios')->get();
        return $this->ok(data: $sermons);

    }

    /**
     * Store a newly created resource in storage.
     * @param StoreSermonRequest $request
     * @return JsonResponse
     */
    public function store(StoreSermonRequest $request): JsonResponse
    {
        try {
            DB::beginTransaction();

            $validated = $request->validated();
            $validated = $request->safe()->except($validated[Asset::$AUDIO]);
            $sermon = Sermon::create($validated);

            if ($request->hasFile(Asset::$AUDIO)) {

                $attachment = $request->file($validated[Asset::$AUDIO]);

                $storedPath = $attachment->store(Asset::$AUDIO);
                $paths[] = basename($storedPath);

                foreach ($paths as $path) {
                    $sermon->audios()->updateOrCreate(
                        [
                            'url' => $path,
                            'caption' => $validated['title'],
                            'genre' => 'sermon'
                        ],
                    );
                }
            }

            DB::commit();
            return $this->created(data: $sermon);

        } catch (Exception $e) {
            DB::rollBack();
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
        return $this->ok(data: $sermon);
    }

    /**
     * Update the specified resource in storage.
     * @throws Throwable
     */
    public function update(StoreSermonRequest $request, Sermon $sermon): JsonResponse
    {
        try {
            DB::beginTransaction();

            $validated = $request->validated();
            $validated = $request->safe()->except($validated[Asset::$AUDIO]);
            $sermon->updateOrFail($validated);

            $this->extracted($request, $validated[Asset::$AUDIO], $sermon);

            DB::commit();
            return $this->created(data: $sermon);

        } catch (Exception $e) {
            DB::rollBack();
            return $this->badRequest($e->getMessage());
        }


    }

    /**
     * Remove the specified resource from storage.
     * @param Sermon $sermon
     * @return JsonResponse
     */
    public function destroy(Sermon $sermon): JsonResponse
    {
        return ! $this->deleteAsset($sermon) ? $this->serverError() : $this->noContent();

    }

    /**
     * Remove the specified resource from storage.
     * @param StoreSermonRequest $request
     * @param string $fileName
     * @param Sermon $sermon
     * @return void
     */
    public function extracted(StoreSermonRequest $request,  string $fileName, Sermon $sermon): void
    {
        if ($request->hasFile($fileName)) {

            $attachment = $request->file($fileName);

            $storedPath = $attachment->store(Asset::$AUDIO);
            $paths[] = basename($storedPath);

            foreach ($paths as $path) {
                $sermon->audios()->updateOrCreate(
                    [
                        'url' => $path,
                        'caption' => $request->input('title'),
                        'genre' => 'sermon'
                    ],
                );
            }
        }

    }


}
