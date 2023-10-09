<?php

namespace App\Traits;

use App\Utils\Errors\ErrorResponse;
use App\Utils\Success\SuccessResponse;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

trait ApiResponse
{
    /**
     * Display a pretty response when a resource is added.
     *
     * @param string|null $message
     * @param mixed|null $data
     * @return JsonResponse
     */
    protected function created(string $message = null, mixed $data = null): JsonResponse
    {
        if (empty($message)) $message = SuccessResponse::$CREATED;
        return response()->json(['message' => $message, 'data' => $data], 201);
    }

    /**
     * Display a pretty success response when a resource is added.
     *
     * @param string|null $message
     * @param array|string|object $data
     * @return JsonResponse
     */
    protected function ok(string $message = null, mixed $data = null): JsonResponse
    {
        if (empty($message)) $message = SuccessResponse::$OK;
        return response()->json(['message' => $message, 'data' => $data], 201);
    }

    /**
     * Display a pretty error response when a similar resource already exists.
     *
     * @param string|null $message
     * @return JsonResponse
     */
    protected function conflict(string $message = null): JsonResponse
    {
        if (empty($message)) $message = ErrorResponse::$CONFLICT;
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
        if(empty($message)) $message = ErrorResponse::$FORBIDDEN;
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
        if(empty($message)) $message = ErrorResponse::$NOT_FOUND;
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
        if(empty($message)) $message = SuccessResponse::$NO_CONTENT;
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
        if(empty($message)) $message = ErrorResponse::$NOT_ALLOWED;
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
        if(empty($message)) $message = ErrorResponse::$INVALID_METHOD;
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
        if(empty($message)) $message = ErrorResponse::$SERVER_ERROR;
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
     * Process image files before storage.
     *
     * @param Request $request
     * @param string $directory
     * @param array $allowedExtensions
     * @param string $fileName
     * @return array
     * @throws Exception
     */
    public function assetHandler(Request $request, string $directory, array $allowedExtensions, string $fileName): array
    {
        $files = [];

        $attachments = $request->file($directory);

        foreach ($attachments as $attachment) {
            $extension = $attachment->getClientOriginalExtension();
            if (!in_array($extension, $allowedExtensions, true)) {
                throw new Exception('Invalid file type.');
            }

            $request->validate([
                "$fileName" => [
                    'file',
                    'mimes:' . implode(',', $allowedExtensions),
                    'max:5000',
                    'dimensions:min_width=200,min_height=200,max_width=500,max_height=500',
                ],
            ]);

            $storedPath = $attachment->store($directory);
            $files[] = $storedPath;
        }

        return $files;
    }

}
