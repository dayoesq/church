<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdateDonationRequest;
use App\Models\Donation;
use App\Models\Project;
use Illuminate\Http\JsonResponse;

class DonationController extends Controller
{

    public function __construct()
    {
        $this->authorizeResource(Donation::class, 'donation');

    }


    /**
     * Display a listing of the resource.
     *
     * @return JsonResponse
     */
    public function index(): JsonResponse
    {
        $donations = Donation::all();
        return $this->ok(data: $donations);
    }

    /**
     * Display the specified resource.
     *
     * @param Donation $donation
     * @return JsonResponse
     */
    public function show(Donation $donation): JsonResponse
    {
        return $this->ok($donation);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param UpdateDonationRequest $request
     * @param Donation $donation
     * @param Project $project
     * @return JsonResponse
     */
    public function update(UpdateDonationRequest $request, Donation $donation, Project $project): JsonResponse
    {
        $data = $request->validated();
        $donation->project_id = $project->id;
        $donation->fill($data);
        return $donation->save() ? $this->noContent() : $this->serverError();

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param Donation $donation
     * @return JsonResponse
     */
    public function destroy(Donation $donation): JsonResponse
    {
        $donation->delete();
        return $this->ok();
    }
}
