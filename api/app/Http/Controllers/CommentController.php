<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CommentController extends Controller
{
    public function __construct()
    {
        $this->authorizeResource(Comment::class, 'comment');
    }


    /**
     * Display a listing of the resource.
     *
     * @return JsonResponse
     */
    public function index(): JsonResponse
    {
        $comments = Comment::all();
        return $this->ok(data: $comments);
    }

    /**
     * Display the specified resource.
     *
     * @param Comment $comment
     * @return JsonResponse
     */
    public function show(Comment $comment): JsonResponse
    {
        return $this->ok(data: $comment);
    }

    /**
     * Reply to a comment.
     *
     * @param Request $request
     * @param Comment $comment
     * @return JsonResponse
     */
    public function replyToAComment(Request $request, Comment $comment): JsonResponse
    {
        $reply = new Comment();
        $reply->content = $request->input('content');
        $reply->blog_id = $comment->blog_id;
        $reply->author = Auth::id();
        $reply->parent_id = $comment->id;
        $reply->save();
        return $this->ok();
    }

    /**
     * Fetch replies specific to a comment.
     *
     * @param Comment $comment
     * @return JsonResponse
     */
    public function getCommentReplies(Comment $comment): JsonResponse
    {
        $replies = $comment->replies()->get();
        return $this->ok(data: $replies);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param Comment $comment
     * @return JsonResponse
     */
    public function destroy(Comment $comment): JsonResponse
    {
        $comment->delete();
        return $this->ok();
    }
}
