<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreSermonRequest;
use App\Models\Sermon;
use App\Utils\Assets\Asset;
use App\Utils\Enums\PostStatus;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rules\Enum;
use Illuminate\Validation\ValidationException;
use Throwable;

class SermonController extends Controller
{
    /**
     * Display a listing of the resource.
     * @return JsonResponse
     */
    public function index(): JsonResponse
    {
        $sermons = Sermon::with('images')->get();
        return $this->ok(data: $sermons);

    }

    /**
     * Store a newly created resource in storage.
     * @param StoreSermonRequest $request
     * @return JsonResponse
     * @throws ValidationException
     */
    public function store(StoreSermonRequest $request): JsonResponse
    {
        $data = $request->validated();
        $sermon = Sermon::create($data);
        if($request->hasFile(Asset::$SERMON)) {
            $paths = $this->handleAssetsStorage($request, Asset::$SERMON, Asset::$SERMON_DIR, Asset::$IMAGE_EXTENSIONS);

            foreach ($paths as $path) {
                $sermon->images()->updateOrCreate(
                    [
                        'url' => $path
                    ],
                );
            }
        }

        return $this->created(data: $sermon);

    }

    /**
     * Display the specified resource.
     * @param Sermon $sermon
     * @return JsonResponse
     */
    public function show(Sermon $sermon): JsonResponse
    {
        $data = $sermon->with('images')->first();
        return $this->ok(data: $data);
    }

    /**
     * Update the specified resource in storage.
     * @throws Throwable
     */
    public function update(Request $request, Sermon $sermon): JsonResponse
    {
        if($request->filled('title')) {
            $request->validate(
                ['title' => ['string', 'min:4', 'max:100']],
            );
            $sermon->title = $request->input('title');
        }

        if($request->filled('excerpt')) {
            $request->validate(
                ['except' => ['string', 'min:4', 'max:100']],
            );
            $sermon->excerpt = $request->input('excerpt');
        }

        if($request->filled('body')) {
            $request->validate(
                ['body' => 'string'],
            );
            $sermon->body = $request->input('body');
        }

        if($request->filled('status')) {
            $request->validate(
                ['status' => new Enum(PostStatus::class)],
            );
            $sermon->status = $request->input('status');
        }

        $sermon->updateOrFail($request->all());

        if($request->hasFile(Asset::$SERMON)) {
            $paths = $this->handleAssetsStorage($request, Asset::$SERMON, Asset::$SERMON_DIR, Asset::$IMAGE_EXTENSIONS);

            foreach ($paths as $path) {
                $sermon->images()->updateOrCreate(
                    [
                        'url' => $path
                    ],
                );
            }
        }

        return $this->ok();

    }

    /**
     * Remove the specified resource from storage.
     * @param Sermon $sermon
     * @return JsonResponse
     */
    public function destroy(Sermon $sermon): JsonResponse
    {
        $images = $sermon->images;
        if(count($images) > 0) {
            foreach ($images as $image) {
                if(Storage::disk('sermon')->exists($image->url)) {
                    Storage::disk('sermon')->delete($image->url);
                    $image->delete();
                }
            }
        }
        $sermon->delete();
        return $this->ok();

    }


}
