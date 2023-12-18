<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpsertTestimonialRequest;
use App\Http\Resources\Testimonials\TestimonialResource;
use App\Models\Testimonial;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

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
        return $this->ok(data: TestimonialResource::collection($testimonials));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param UpsertTestimonialRequest $request
     * @return JsonResponse
     */
    public function store(UpsertTestimonialRequest $request): JsonResponse
    {
        $request->validated();
        $testimonial = new Testimonial();
        $testimonial->first_name = $request->input('first_name');
        $testimonial->last_name = $request->input('last_name');
        $testimonial->content = $request->input('content');
        $testimonial->save();
        return $this->created(data: new TestimonialResource($testimonial));
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
        try {
            DB::beginTransaction();
            $validated = $request->validated();
            $testimonial->update($validated);

            if($request->hasFile('avatar')) {
                $this->processAvatarStorage($request, $testimonial);
            }

            $testimonial->save();
            DB::commit();
            return $this->ok(data: new TestimonialResource($testimonial));

        } catch(Exception $e) {
            DB::rollBack();
            Log::error($e->getMessage());
            return $this->serverError();
        }

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
            $this->deleteAvatarAndModel($testimonial);
            DB::commit();
            return $this->noContent();
        } catch (Exception $e) {
            DB::rollBack();
            Log::error($e->getMessage());
            return $this->serverError();
        }
    }

}
