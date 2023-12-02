<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpsertTestimonialRequest;
use App\Http\Resources\Testimonials\TestimonialResource;
use App\Models\Testimonial;
use App\Utils\Assets\Asset;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class TestimonialController extends Controller
{

    public function __construct()
    {
        $this->authorizeResource(Testimonial::class, 'testimonial');
    }


    /**
     * Display a listing of the resource.
     */
    public function index(): JsonResponse
    {
        $testimonials = Testimonial::all();
        return $this->ok(data: new TestimonialResource($testimonials));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param UpsertTestimonialRequest $request
     * @return JsonResponse
     */
    public function store(UpsertTestimonialRequest $request): JsonResponse
    {
        try {
            DB::beginTransaction();
            $validated = $request->validated();
            $testimonial = Testimonial::create($validated);

            if ($request->hasFile(Asset::$PHOTO)) {
                return $this->handleFileUpload($request, $testimonial);
            }

            DB::commit();
            return $this->created(data: new TestimonialResource($testimonial));
        } catch (Exception $e) {
            DB::rollBack();
            Log::error($e->getMessage());
            return $this->serverError($e->getMessage());
        }
    }

    /**
     * Display the specified resource.
     *
     * @param Testimonial $testimonial
     * @return JsonResponse
     */
    public function show(Testimonial $testimonial): JsonResponse
    {
        return $this->ok(data: new TestimonialResource($testimonial));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param UpsertTestimonialRequest $request
     * @param Testimonial $testimonial
     * @return JsonResponse
     */
    public function update(UpsertTestimonialRequest $request, Testimonial $testimonial): JsonResponse
    {
        $validated = $request->validated();
        $updated = $testimonial->update($validated);

        if ($request->hasFile(Asset::$PHOTO)) {
            return $this->handleFileUpload($request, $testimonial);
        }

        return $updated ? $this->ok() : $this->serverError();
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param Testimonial $testimonial
     * @return JsonResponse
     */
    public function destroy(Testimonial $testimonial): JsonResponse
    {
        try {
            DB::beginTransaction();
            if($testimonial->avatar && Storage::disk(Asset::$PHOTO)->exists($testimonial->avatar)) {
                Storage::disk(Asset::$PHOTO)->delete($testimonial->avatar);
            }
            $testimonial->delete();
            DB::commit();
            return $this->noContent();
        } catch (Exception $e) {
            DB::rollBack();
            Log::error($e->getMessage());
            return $this->serverError();
        }
    }


    /**
     * Process file storage.
     *
     * @param UpsertTestimonialRequest $request
     * @param Testimonial $testimonial
     * @return JsonResponse
     */
    private function handleFileUpload(UpsertTestimonialRequest $request, Testimonial $testimonial): JsonResponse
    {
        if ($testimonial->avatar && Storage::disk(Asset::$PHOTO)->exists($testimonial->avatar)) {
            Storage::disk(Asset::$PHOTO)->delete($testimonial->avatar);
        }

        $path = $request->file(Asset::$PHOTO)->store(Asset::$PHOTO);
        $testimonial->avatar = basename($path);
        $testimonial->save();

        return $this->ok();
    }
}
