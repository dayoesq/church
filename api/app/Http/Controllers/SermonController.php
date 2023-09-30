<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreSermonRequest;
use App\Http\Requests\UpdateSermonRequest;
use App\Models\Gallery;
use App\Models\Sermon;

class SermonController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //There should some pagination here!
        //return Gallery::with('images')->get();

    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreSermonRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Sermon $sermon)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateSermonRequest $request, Sermon $sermon)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Sermon $sermon)
    {
        //
    }
}
