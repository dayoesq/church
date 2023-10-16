<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreBlogRequest;
use App\Models\Blog;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class BlogController extends Controller
{
    /**
     * Display a listing of the resource.
     * @return JsonResponse
     */
    public function index(): JsonResponse
    {
        // pagination required!
        $posts = Blog::with('images')->get();
        return $this->ok(data: $posts);
    }

    /**
     * Store a newly created resource in storage.
     * @param StoreBlogRequest $request
     * @return JsonResponse
     */
    public function store(StoreBlogRequest $request): JsonResponse
    {
        $request->validated();
        $blog = new Blog();
        $blog->title = $request->input('title');
        $blog->content = $request->input('content');
        $blog->written_by = $request->input('written_by');

        return $blog->save() ? $this->created(data: $blog) : $this->serverError();
    }

    /**
     * Display the specified resource.
     * @param Blog $blog
     * @return JsonResponse
     */
    public function show(Blog $blog): JsonResponse
    {
        $post = $blog->with('image')->first();
        return $this->ok(data: $post);
    }

    /**
     * Update the specified resource in storage.
     * @param Request $request
     * @param Blog $blog
     * @return JsonResponse
     */
    public function update(Request $request, Blog $blog): JsonResponse
    {
        if($request->filled('title')) {
            $request->validate(['title' => ['string', 'min:4', 'max:100']]);
            $blog->title = Str::slug($request->input('title'));
        }

        if($request->filled('content')) {
            $blog->content = $request->input('content');
        }

        if($request->filled('written_by')) {
            $blog->written_by = $request->input('written_by');
        }

        return $blog->save() ? $this->noContent() : $this->serverError();


    }

    /**
     * Remove the specified resource from storage.
     * @param Blog $blog
     * @return JsonResponse
     */
    public function destroy(Blog $blog): JsonResponse
    {
        $postImages = $blog->images;
        if(count($postImages) > 0) {
            foreach ($postImages as $postImage) {
                if(Storage::disk('blog')->exists($postImage->url)) {
                    Storage::disk('blog')->delete($postImage->url);
                    $postImage->delete();
                }
            }
        }

        $blog->delete();
        return $this->ok();
    }
}
