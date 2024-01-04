<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreBlogRequest;
use App\Http\Requests\UpdateBlogRequest;
use App\Http\Resources\Blogs\BlogResource;
use App\Models\Blog;
use App\Models\Comment;
use App\Utils\Assets\Asset;
use App\Utils\Enums\PostStatus;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class BlogController extends Controller
{

    public function __construct()
    {
        $this->authorizeResource(Blog::class, 'blog');
    }

    /**
     * Display a listing of the resource.
     *
     * @return JsonResponse
     */
    public function index(): JsonResponse
    {
        $posts = Blog::with(['comments', 'author'])->get();
        return $this->ok(data: BlogResource::collection($posts));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param StoreBlogRequest $request
     * @return JsonResponse
     */
    public function store(StoreBlogRequest $request): JsonResponse
    {
        $request->validated();

        $blogExists = Blog::where('slug', Str::slug($request->input('title')))->first();
        if($blogExists) return $this->conflict();
        $blog = new Blog();
        $blog->title = Str::ucfirst($request->input('title'));
        $blog->content = $request->input('content');
        $blog->author = Auth::id();

        if($request->hasFile('cover_image')) {
            $filePath = $request->file('cover_image')->store('images');
            $finalPath = basename($filePath);
            $blog->cover_image = $finalPath;
        }

        return $blog->save() ? $this->created(data: new BlogResource($blog)) : $this->serverError();
    }

    /**
     * Display the specified resource.
     *
     * @param Blog $blog
     * @return JsonResponse
     */
    public function show(Blog $blog): JsonResponse
    {
        $blog->load(['comments', 'author']);
        return $this->ok(data: new BlogResource($blog));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param UpdateBlogRequest $request
     * @param Blog $blog
     * @return JsonResponse
     */
    public function update(UpdateBlogRequest $request, Blog $blog): JsonResponse
    {
        $validated = $request->validated();
        if($request->filled('title')) {
            $blogExists = Blog::where('slug', Str::slug($request->input('title')))->first();
            if($blogExists) return $this->conflict();
            $blog->title = Str::ucfirst($request->input('title'));
            $blog->slug = Str::slug($request->input('title'));
        }

        if($request->hasFile('cover_image')) {
            if(Storage::disk('images')->exists($blog->cover_image)){
                Storage::disk('images')->delete($blog->cover_image);
            }
            $filePath = $request->file('cover_image')->store('images');
            $finalPath = basename($filePath);
            $blog->cover_image = $finalPath;
        }

        $updated = $blog->update($validated);

        return $updated ? $this->ok(data: new BlogResource($blog)) : $this->serverError();


    }

    /**
     * Update the specified resource in storage.
     *
     * @param Request $request
     * @param Blog $blog
     * @return JsonResponse
     */
    public function commentToBlog(Request $request, Blog $blog): JsonResponse
    {
        if($request->filled('content')) {
            $comment = new Comment();
            $comment->content = $request->input('content');
            $comment->author = Auth::id();
            $comment->blog_id = $blog->id;
            return $comment->save() ? $this->ok() : $this->serverError();

        }
        return $this->ok();
    }

    /**
     * Get all published blogs.
     *
     * @return JsonResponse
     */
    public function getPublishedBlogs(): JsonResponse
    {
        $blogs = Blog::where('status', PostStatus::Published->value)->get();
        return $this->ok(data: BlogResource::collection($blogs));
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param Blog $blog
     * @return JsonResponse
     */
    public function destroy(Blog $blog): JsonResponse
    {
        return ! $this->deleteAssetsAndModel($blog, Asset::$IMAGES) ? $this->serverError() : $this->noContent();
    }
}
