<?php

namespace App\Http\Resources\Users;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @property int $id
 * @property string $first_name
 * @property string $last_name
 * @property string $email
 * @property string $created_at
 * @property string $updated_at
 * @property string $telephone
 * @property string $address_one
 * @property string $gender
 * @property string $address_two
 * @property string $postal_code
 * @property string $city
 * @property string $home_country
 * @property string $country_residence
 * @property string $member_since
 * @property string $membership
 * @property string $status
 * @property string $roles
 * @property string $email_verified_at
 * @property int $position_id
 */
class UserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'firstName' => $this->first_name,
            'lastName' => $this->last_name,
            'email' => $this->email,
            'telephone' => $this->telephone,
            'gender' => $this->gender,
            'addressOne' => $this->address_one,
            'addressTwo' => $this->address_two,
            'postalCode' => $this->postal_code,
            'city' => $this->city,
            'countryOfBirth' => $this->home_country,
            'countryOfResidence' => $this->country_residence,
            'JoinedOn' => $this->member_since,
            'membership' => $this->membership,
            'membershipStatus' => $this->status,
            'roles' => $this->roles,
            'accountVerifiedAt' => $this->email_verified_at,
            'positionId' => $this->position_id,
            'createdAt' => $this->created_at,
            'updatedAt' => $this->updated_at,
        ];
    }
}
