<?php

namespace App\Http\Resources\Users;


use App\Http\Resources\Images\ImageResource;
use App\Http\Resources\Positions\PositionResource;
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
 * @property string $address
 * @property string $gender
 * @property string $postal_code
 * @property string $city
 * @property string $country_of_origin
 * @property string $country_of_residence
 * @property string $member_since
 * @property string $membership
 * @property string $status
 * @property string $roles
 * @property string $email_verified_at
 * @property int $position_id
 * @property array $images
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
            'address' => $this->address,
            'postalCode' => $this->postal_code,
            'city' => $this->city,
            'images' => ImageResource::collection($this->whenLoaded('images')),
            'countryOfOrigin' => $this->country_of_origin,
            'countryOfResidence' => $this->country_of_residence,
            'memberSince' => $this->member_since,
            'membership' => $this->membership,
            'status' => $this->status,
            'roles' => $this->roles,
            'accountVerifiedAt' => $this->email_verified_at,
            'position' => new PositionResource($this->whenLoaded('position')),
            'createdAt' => $this->created_at,
            'updatedAt' => $this->updated_at,
        ];
    }
}
