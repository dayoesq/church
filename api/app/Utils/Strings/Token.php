<?php

namespace App\Utils\Strings;

use App\Utils\Errors\ErrorResponse;
use Exception;

class Token
{

    public static int $RANDOM_STRING_LENGTH = 20;
    public static int $PASSWORD_MIN_LENGTH = 10;

    /**
     * Generate a random token.
     *
     * @param int $length
     * @return string
     * @throws Exception
     */
    public static function generateRandomString(int $length): string
    {
        try {
            return bin2hex(random_bytes($length));
        } catch (Exception $e) {
            throw new Exception(ErrorResponse::$SERVER_ERROR);
        }
    }

    /**
     * Hash password
     *
     * @param string $password
     * @return string
     * @throws Exception
     */
    public static function hashPassword(string $password): string
    {
        try {
            return password_hash($password, PASSWORD_DEFAULT, ['cost' => '12']);
        } catch (Exception $e) {
            throw new Exception(ErrorResponse::$SERVER_ERROR);
        }
    }

}
