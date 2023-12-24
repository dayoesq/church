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
        $testimonials = Testimonial::with('images')->get(['id', 'first_name', 'last_name', 'content', 'status']);
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
        $testimonial->load('images');
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

            if($request->hasFile('images')) {
                $this->createOrUpdateAssets($testimonial, $request, Asset::$IMAGES, true);
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
     * @throws AuthorizationException
     */
    public function deleteTestimonialAvatar(Testimonial $testimonial): JsonResponse
    {
        $this->authorize('deleteTestimonialAvatar', $testimonial);
        $this->deleteDuplicateAssets($testimonial, Asset::$IMAGES);
        return $this->noContent();

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
            $this->deleteAssetsAndModel($testimonial, Asset::$IMAGES);
            DB::commit();
            return $this->noContent();
        } catch (Exception $e) {
            DB::rollBack();
            Log::error($e->getMessage());
            return $this->serverError();
        }
    }

}
