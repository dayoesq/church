<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreSermonRequest;
use App\Models\Sermon;
use App\Utils\Enums\PostStatus;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rules\Enum;
use Throwable;

class SermonController extends Controller
{
    /**
     * Display a listing of the resource.
     * @return JsonResponse
     */
    public function index(): JsonResponse
    {
        $sermons = Sermon::all();
        return $this->ok(data: $sermons);

    }

    /**
     * Store a newly created resource in storage.
     * @param StoreSermonRequest $request
     * @return JsonResponse
     */
    public function store(StoreSermonRequest $request): JsonResponse
    {
        $request->validated();
        $sermon = new Sermon();
        $sermon->title = $request->input('title');
        $sermon->content = $request->input('content');
        $sermon->status = $request->input('status');
        $sermon->delivered_by = $request->input('delivered_by');

        return $sermon->save() ? $this->created(data: $sermon) : $this->serverError();

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
    public function update(Request $request, Sermon $sermon): JsonResponse
    {
        if($request->filled('title')) {
            $request->validate(
                ['title' => ['string', 'min:4', 'max:100']],
            );
            $sermon->title = $request->input('title');
        }

        if($request->filled('content')) {
            $sermon->content = $request->input('content');
        }

        if($request->filled('status')) {
            $request->validate(
                ['status' => new Enum(PostStatus::class)],
            );
            $sermon->status = $request->input('status');
        }

        return $sermon->save() ? $this->ok() : $this->serverError();

    }

    /**
     * Remove the specified resource from storage.
     * @param Sermon $sermon
     * @return JsonResponse
     */
    public function destroy(Sermon $sermon): JsonResponse
    {
        $sermon->delete();
        return $this->ok();

    }


}
