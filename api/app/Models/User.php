<?php

namespace App\Models;

use App\Utils\Enums\UserStatus;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Str;
use Laravel\Sanctum\HasApiTokens;
use App\Utils\Enums\Roles;

/**
 * @method static findOrFail(int $id)
 * @method static create(array $array)
 * @method static update(array $array)
 * @method static where(string $string, mixed $input)
 * @method static get(string $string, string $string1, string $string2, string $string3, string $string4, string $string5)
 * @property string $first_name
 * @property string $last_name
 * @property string $email
 * @property string $password
 * @property int $position_id
 * @property string $avatar
 * @property string $position
 * @property string $status
 * @property mixed $member_since
 * @property string $roles
 * @property string $title
 * @property string $postal_code
 * @property string $city
 * @property mixed $telephone
 * @property string $address
 * @property string $gender
 * @property int $id
 * @property string $country
 * @property string $country_of_residence
 * @property string $home_country
 * @property mixed $email_verified_at
 */
class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;


    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'first_name',
        'last_name',
        'email',
        'telephone',
        'gender',
        'address',
        'membership',
        'member_since',
        'city',
        'postal_code',
        'country_of_origin',
        'country_of_residence',
        'avatar',
        'status',
        'roles',
        'password'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password'
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed'
    ];

    /**
     * Interact with the user's first name.
     *
     * @return Attribute
     */
    protected function firstName(): Attribute
    {
        return Attribute::make(
            get: fn ($value) => Str::ucfirst($value),
            set: fn ($value) => Str::lower($value),
        );
    }

    /**
     * Interact with the user's last name.
     *
     * @return Attribute
     */
    protected function lastName(): Attribute
    {
        return Attribute::make(
            get: fn ($value) => Str::ucfirst($value),
            set: fn ($value) => Str::lower($value),
        );
    }

    /**
     * Interact with the user's email.
     *
     * @return Attribute
     */
    protected function email(): Attribute
    {
        return Attribute::make(
            get: fn ($value) => $value,
            set: fn ($value) => Str::lower($value),
        );
    }

    /**
     * Convert address to uppercase.
     *
     * @return Attribute
     */
    protected function address(): Attribute
    {
        return Attribute::make(
            get: fn ($value) => $value,
            set: fn ($value) => Str::upper($value),
        );
    }

    /**
     * Convert address to uppercase.
     *
     * @return Attribute
     */
    protected function postalCode(): Attribute
    {
        return Attribute::make(
            get: fn ($value) => $value,
            set: fn ($value) => Str::upper($value),
        );
    }

    /**
     * Check if user has 'admin' role.
     *
     * @return bool
     */
    public function isAdmin(): bool
    {
        return $this->roles === Roles::Admin->value;
    }

    /**
     * Check if user has 'super' role.
     *
     * @return bool
     */
    public function isSuper(): bool
    {
        return $this->roles === Roles::Super->value;
    }

    /**
     * Check if user has 'super' role.
     *
     * @return bool
     */
    public function isUser(): bool
    {
        return $this->roles === Roles::User->value;
    }

    /**
     * Check if user has 'super' role.
     *
     * @return bool
     */
    public function isSuperAdmin(): bool
    {
        return $this->isSuper() || $this->isAdmin();
    }

    /**
     * Check if user is verified and has an active status and is either admin or super.
     *
     * @return bool
     */
    public function isAuthorizedSuperAdmin(): bool
    {
        return $this->isAuthorized() && ($this->isSuper() || $this->isAdmin());
    }

    /**
     * Check if user is verified and has an active status and is super.
     *
     * @return bool
     */
    public function isAuthorizedSuper(): bool
    {
        return $this->isAuthorized() && $this->isSuper();
    }

    /**
     * Check if user is verified and has an active status and is admin.
     *
     * @return bool
     */
    public function isAuthorizedAdmin(): bool
    {
        return $this->isAuthorized() && $this->isAdmin();
    }

    /**
     * Check if user is verified and has an active status and is admin.
     *
     * @return bool
     */
    public function isAuthorizedUser(): bool
    {
        return $this->isAuthorized() && $this->isUser();
    }

    /**
     * Check if user is verified.
     *
     * @return bool
     */
    private function isVerified(): bool
    {
        return ! is_null($this->email_verified_at);
    }

    /**
     * Check if user has is active.
     *
     * @return bool
     */
    private function isActive(): bool
    {
        return $this->status === UserStatus::Active->value;
    }

    /**
     * Check if user is both active and verified.
     *
     * @return bool
     */
    private function isAuthorized(): bool
    {
        return $this->isVerified() && $this->isActive();
    }

    /**
     * User entitled to comments.
     *
     * @return HasMany
     */
    public function comments(): HasMany
    {
        return $this->hasMany(Comment::class);
    }

    /**
     * User has one position.
     *
     * @return HasOne
     */
    public function position(): HasOne
    {
        return $this->hasOne(Position::class, 'id', 'position_id');
    }



}
