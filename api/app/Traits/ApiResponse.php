<?php

namespace App\Traits;

use App\Models\User;
use App\Utils\Errors\ErrorResponse;
use App\Utils\Success\SuccessResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

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
        return response()->json(['message' => $message, 'data' => $data]);
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
     * @param string $fileName
     * @param array $allowedExtensions
     * @return array
     * @throws ValidationException
     */
    public function handleAssetsStorage(Request $request, string $fileName, array $allowedExtensions): array
    {
        $files = [];
        $directory = 'gallery' ? $fileName . "ies" : $fileName . "s";

        $attachments = $request->file($fileName);

        foreach ($attachments as $attachment) {
            if(! in_array($attachment->extension(), $allowedExtensions)) {
                throw ValidationException::withMessages([
                    "$fileName" => ['Invalid file type.']
                ]);
            }
        }

        $request->validate([
            "$fileName.*" => [
                'file',
                'mimes:' . implode(',', $allowedExtensions),
                'max:5000',
                'dimensions:min_width=200,min_height=200,max_width=800,max_height=600',
            ],
        ]);

        foreach ($attachments as $attachment) {
            $storedPath = $attachment->store($directory);
            $files[] = basename($storedPath);
        }

        return $files;
    }

    /**
     * Process image file before storage.
     *
     * @param Request $request
     * @param string $fileName
     * @param array $allowedExtensions
     * @return string
     * @throws ValidationException
     */
    public function handleAssetStorage(Request $request, string $fileName, array $allowedExtensions): string
    {

        $attachment = $request->file($fileName);
        $directory = 'gallery' ? $fileName . "ies" : $fileName . "s";

        if(! in_array($attachment->extension(), $allowedExtensions)) {
            throw ValidationException::withMessages([
                "$fileName" => ['Invalid file type.']
            ]);
        }

        $request->validate([
            "$fileName" => [
                'file',
                'mimes:' . implode(',', $allowedExtensions),
                'max:5000',
                'dimensions:min_width=200,min_height=200,max_width=800,max_height=600',
            ],
        ]);

        $storedPath = $attachment->store($directory);
        return basename($storedPath);

    }

}
