<?php

namespace App\Traits;

use App\Utils\Errors\ErrorResponse;
use App\Utils\Success\SuccessResponse;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use function PHPUnit\Framework\isEmpty;

trait ApiResponse
{
    /**
     * Display a pretty response when a resource is added.
     *
     * @param array|string|object $data
     * @param string|null $message
     * @return JsonResponse
     */
    protected function created(string $message = null, mixed $data = null): JsonResponse
    {
        if($message == null || isEmpty($message) && $data == null || isEmpty($data)) {
            $message = SuccessResponse::$CREATED;
            return response()->json(['message' => $message], 201);
        }
        return response()->json(['message' => $message, 'data' => $data], 201);
    }

    /**
     * Display a pretty success response when a resource is added.
     *
     * @param array|string|object $data
     * @param string|null $message
     * @return JsonResponse
     */
    protected function ok(mixed $data = null, string $message = null): JsonResponse
    {
        if($message == null && ($data == null || isEmpty($data))) {
            return response()->json(['data' => $data, 'message' => SuccessResponse::$OK]);
        }
        return response()->json(['data' => $data, 'message' => $message]);
    }

    /**
     * Display a pretty error response when a similar resource already exists.
     *
     * @param string|null $message
     * @return JsonResponse
     */
    protected function conflict(string $message = null): JsonResponse
    {
        if($message == null) {
            $message = ErrorResponse::$CONFLICT;
        }
        return response()->json(['message' => $message], 409);
    }

    /**
     * Display a pretty error response for an unauthorized operation.
     *
     * @param string|null $message
     * @return JsonResponse
     */
    protected function forbidden(string $message = null): JsonResponse
    {
        if($message == null) {
            $message = ErrorResponse::$FORBIDDEN;
        }
        return response()->json(['message' => $message], 403);
    }

    /**
     * Display a pretty error response for a not found resource.
     *
     * @param string|null $message
     * @return JsonResponse
     */
    protected function notFound(string $message = null): JsonResponse
    {
        if($message == null) {
            $message = ErrorResponse::$NOT_FOUND;
        }
        return response()->json(['message' => $message], 404);
    }

    /**
     * Display a pretty success response for a no content.
     *
     * @param string|null $message
     * @return JsonResponse
     */
    protected function noContent(string $message = null): JsonResponse
    {
        if($message == null) {
            $message = SuccessResponse::$NO_CONTENT;
        }
        return response()->json(['message' => $message], 204);
    }

    /**
     * Display a pretty error response for no allowed method.
     *
     * @param string|null $message
     * @return JsonResponse
     */
    protected function notAllowed(string $message = null): JsonResponse
    {
        if($message == null) {
            $message = ErrorResponse::$NOT_ALLOWED;
        }
        return response()->json(['message' => $message], 405);
    }

    /**
     * Display a pretty error response for an invalid method.
     *
     * @param string|null $message
     * @return JsonResponse
     */
    protected function invalidMethod(string $message = null): JsonResponse
    {
        if($message == null) {
            $message = ErrorResponse::$INVALID_METHOD;
        }
        return response()->json(['message' => $message], 405);
    }

    /**
     * Display a pretty error response a server error.
     *
     * @param string|null $message
     * @return JsonResponse
     */
    protected function serverError(string $message = null): JsonResponse
    {
        if($message == null) {
            $message = ErrorResponse::$SERVER_ERROR;
        }
        return response()->json(['message' => $message], 500);
    }

    /**
     * Display an array of pretty error responses.
     *
     * @param string $message
     * @param int $statusCode
     * @return JsonResponse
     */
    protected function badRequest(string $message, int $statusCode = 400): JsonResponse
    {
        return response()->json(['message' => $message], $statusCode);
    }

    /**
     * Process image before storage.
     *
     * @param Request $request
     * @param string $data
     * @param array $extensions
     * @return array
     * @throws Exception
     */
    public function imageHandler(Request $request, string $data, array $extensions): array
    {
        $files = [];
        $attachments = $request->file($data);
        foreach($attachments as $attachment) {
            if(!in_array($attachment->extension(), $extensions)){
                throw new Exception('Invalid file type.');
            }
            $tempAttachment[] = $attachment->store('');
            $files = $tempAttachment;
        }
        return $files;
    }
}
