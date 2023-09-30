<?php

namespace App\Utils\Errors;

class ErrorResponse
{
    public static string $INVALID_CREDENTIALS = 'Invalid credentials.';
    public static string $NOT_FOUND = 'The requested resource could not be found.';
    public static string $NOT_ALLOWED = 'The specified method for the request is not allowed.';
    public static string $INVALID_METHOD = 'The specified method for the request is not allowed.';
    public static string $CONFLICT = 'A similar resource already exists.';
    public static string $TOO_MANY_REQUESTS = 'Too many requests.';
    public static string $UNAUTHORIZED = 'Unauthorized.';
    public static string $FORBIDDEN = 'Forbidden.';
    public static string $SERVER_ERROR = 'An error occurred.';

}
