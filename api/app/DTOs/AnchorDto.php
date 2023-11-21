<?php

namespace App\DTOs;

class AnchorDto
{
    protected string $firstName;
    protected string $lastName;
    protected string $email;
    protected string $title;
    public function __construct(string $firstName, string $lastName, string $email, string $title)
    {
        $this->firstName = $firstName;
        $this->lastName = $lastName;
        $this->email = $email;
        $this->title = $title;
    }
}
