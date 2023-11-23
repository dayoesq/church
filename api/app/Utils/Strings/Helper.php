<?php

namespace App\Utils\Strings;

use App\Utils\Errors\ErrorResponse;
use Exception;

class Helper
{

    public static int $RANDOM_STRING_LENGTH = 20;
    public static int $DEFAULT_RANDOM_NUMBER = 9;
    public static int $PASSWORD_MIN_LENGTH = 10;
    public static int $PASSWORD_MAX_LENGTH = 100;

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
     * Generate a random token.
     *
     * @param int $length
     * @return string
     * @throws Exception
     */
    public static function generateRandomNumber(int $length): string
    {
        $min = 6; $max = 20;
        try {
            if ($length < $min || $length > $max) {
                throw new Exception("Invalid length. The length should be between $min and $max.");
            }

            $randomBytes = random_bytes($length);
            $randomNumber = current(unpack('L', $randomBytes)) % (pow(10, $length) - pow(10, $length - 1)) + pow(10, $length - 1);

            return str_pad($randomNumber, $length, '0', STR_PAD_LEFT);
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
