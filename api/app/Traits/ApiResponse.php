<?php

namespace App\Traits;

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
     * Process assets before storage.
     *
     * @param Request $request
     * @param string $fileName
     * @return array
     */
    public function processAssetsStorage(mixed $request, string $fileName): array
    {
        $files = [];
        $directory = $fileName . 's';
        $attachment = $request->file($fileName);
        $attachments = [...$attachment];

        match ($fileName) {
            'photo.*' => [
                File::image()
                    ->max('5mb')
                    ->dimensions(Rule::dimensions()->maxWidth(1000)->maxHeight(500)),
            ],
            'attachment.*' => [
                File::types(['pdf, png, svg, jpg, jpeg'])
                    ->max('5mb')
            ],
            'audio.*' => [
                File::types(['mp3','wav'])
                    ->max('5mb')
            ],
        };

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
     * @return bool
     */
    protected function deleteAsset(mixed $model) : bool
    {
        try {
            DB::beginTransaction();
            $photos = $model->images;
            foreach ($photos as $photo) {
                if (Storage::disk(Asset::$PHOTO)->exists($photo->url)) {
                    Storage::disk(Asset::$PHOTO)->delete($photo->url);
                    $photo->delete();
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
