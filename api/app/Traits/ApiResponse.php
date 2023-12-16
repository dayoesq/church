<?php

namespace App\Traits;

use App\Utils\Assets\Asset;
use App\Utils\Errors\ErrorResponse;
use App\Utils\Success\SuccessResponse;
use Exception;
use App\Utils\Assets;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\File;
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
        return response()->json(['message' => $message, 'data' => $data, 'statusCode' => 201], 201);
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
        return response()->json(['message' => $message, 'data' => $data, 'statusCode' => 200], 200);
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
        return response()->json(['message' => $message, 'statusCode' => 409], 409);
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
        return response()->json(['message' => $message, 'statusCode' => 403], 403);
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
        return response()->json(['message' => $message, 'statusCode' => 404], 404);
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
        return response()->json(['message' => $message, 'statusCode' => 204], 204);
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
        return response()->json(['message' => $message, 'statusCode' => 405], 405);
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
        return response()->json(['message' => $message, 'statusCode' => 405], 405);
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
        return response()->json(['message' => $message, 'statusCode' => 500], 500);
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
        return response()->json(['message' => $message, 'statusCode' => $statusCode], $statusCode);
    }

    /**
     * Process assets before storage.
     *
     * @param Request $request
     * @param string $fileName
     * @return array
     */
    protected function processAssetsStorage(mixed $request, string $fileName): array
    {
        $files = [];
        $directory = $fileName;
        $attachment = $request->file($fileName);
        $attachments = is_array($attachment) ? $attachment : [$attachment];

        foreach ($attachments as $attachment) {
            $storedPath = $attachment->store($directory);
            $files[] = basename($storedPath);
        }

        return $files;
    }

    /**
     * Delete assets.
     *
     * @param mixed $model
     * @param string $assetType
     * @return bool
     */
    protected function deleteAsset(mixed $model, string $assetType): bool
    {
        try {
            DB::beginTransaction();

            // Dynamically access the assets based on the provided $assetType
            $assets = is_array($assetType) ? $model->{$assetType} : [$model->{$assetType}];

            foreach ($assets as $asset) {
                if (Storage::disk($assetType)->exists($asset->url)) {
                    Storage::disk($assetType)->delete($asset->url);
                    $asset->delete();
                }
            }

            $model->delete();
            DB::commit();
            return true;
        } catch (Exception $e) {
            DB::rollBack();
            Log::error($e->getMessage());
            return false;
        }
    }


}
