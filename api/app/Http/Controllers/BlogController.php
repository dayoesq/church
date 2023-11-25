<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreBlogRequest;
use App\Http\Resources\Blogs\BlogResource;
use App\Models\Blog;
use App\Models\Comment;
use App\Utils\Enums\PostStatus;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
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
        $posts = Blog::with('comments')->get();
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

        $existingBlog = Blog::where('slug', Str::slug($request->input('title')))->first();
        if($existingBlog) return $this->conflict();
        $blog = new Blog();
        $blog->title = $request->input('title');
        $blog->content = $request->input('content');
        $blog->author = Auth::id();

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
        $blogWithComments = $blog->with('comments')->first();
        return $this->ok(data: new BlogResource($blogWithComments));
    }

    /**
     * Update the specified resource in storage.
     *
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

        if($request->filled('author')) {
            $blog->author = $request->input('author');
        }

        return $blog->save() ? $this->noContent() : $this->serverError();


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
        $blog->delete();
        return $this->noContent();
    }
}
