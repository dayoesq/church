<?php

namespace App\Exceptions;

use App\Traits\ApiResponse;
use Exception;
use Fruitcake\Cors\CorsService;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Database\QueryException;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Illuminate\Http\JsonResponse;
use Illuminate\Session\TokenMismatchException;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Request;
use Illuminate\Validation\ValidationException;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Symfony\Component\HttpKernel\Exception\MethodNotAllowedHttpException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Throwable;

class Handler extends ExceptionHandler
{
    use ApiResponse;
    /**
     * The list of the inputs that are never flashed to the session on validation exceptions.
     *
     * @var array<int, string>
     */
    protected $dontFlash = [
        'current_password',
        'password',
        'password_confirmation',
    ];

    /**
     * Register the exception handling callbacks for the application.
     */
    public function register(): void
    {
        $this->reportable(function (Throwable $e) {
            //
        });
    }

    /**
     * Render the exception into an HTTP response.
     *
     * @param Request $request
     * @param Exception|Throwable $e
     * @return Response
     * @throws Throwable
     */
    public function render($request, Exception|Throwable $e): Response
    {
        $response = $this->handleException($request, $e);
        app(CorsService::class)->addActualRequestHeaders($response, $request);
        return $response;
    }

    /**
     * Render the exception into an HTTP response.
     *
     * @param ValidationException $e
     * @param Request $request
     * @return JsonResponse
     */
    public function convertValidationExceptionToResponse(ValidationException $e, $request): JsonResponse
    {
        $errors = $e->validator->errors()->getMessages();
        return response()->json($errors, 422);
    }

    /**
     * @param $request
     * @param Exception $exception
     * @return Response
     * @throws Throwable
     */
    public function handleException($request, Exception $exception): Response
    {
        if ($exception instanceof ValidationException) {
            return $this->convertValidationExceptionToResponse($exception, $request);
        }

        if ($exception instanceof ModelNotFoundException) {
            $modelName = strtolower(class_basename($exception->getModel()));

            return $this->notFound(ucfirst($modelName) . ' with that id could not be found.');
        }

        if ($exception instanceof AuthenticationException) {
            return $this->unauthenticated($request, $exception);
        }

        if ($exception instanceof AuthorizationException) {
            return $this->forbidden($exception->getMessage());
        }

        if ($exception instanceof MethodNotAllowedHttpException) {
            return $this->invalidMethod('The specified method for the request is invalid.');
        }

        if ($exception instanceof NotFoundHttpException) {
            return $this->notFound('The specified url could not be found.');
        }

        if ($exception instanceof HttpException) {
            return $this->badRequest($exception->getMessage(), $exception->getStatusCode());
        }

        if ($exception instanceof QueryException) {
            $errorCode = $exception->errorInfo[1];

            if ($errorCode === 1451) {
                return $this->conflict('Cannot remove this resource completely - it has other relationship(s).');
            }
            if($errorCode === 1265) {
                return $this->forbidden('Invalid enum value.');
            }
        }

        if ($exception instanceof TokenMismatchException) {
            return redirect()->back()->withInput($request->input());
        }

        if (config('app.debug')) {
            return parent::render($request, $exception);
        }

        return $this->serverError();

    }
}
