<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\MorphOne;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Str;
use Laravel\Sanctum\HasApiTokens;
use App\Utils\Enums\Roles;

/**
 * @method static findOrFail(string $id)
 * @method static create(array $array)
 * @method static where(string $string, mixed $input)
 * @property string $first_name
 * @property mixed $last_name
 * @property mixed $email
 * @property mixed|string $password
 * @property int|mixed $position_id
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
        'password',
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
        'member_since' => 'datetime',
        'password' => 'hashed',
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
     * Interact with the user's position.
     *
     * @return Attribute
     */
    protected function position(): Attribute
    {
        return Attribute::make(
            get: fn ($value) => Str::ucfirst($value),
            set: fn ($value) => Str::lower($value),
        );
    }

    /**
     * Check if user has 'admin' role.
     *
     * @return bool
     */
    public function isAdmin(): bool
    {
        return $this->attributes['roles'] = Roles::Admin->value;
    }

    /**
     * Check if user has 'super' role.
     *
     * @return bool
     */
    public function isSuper(): bool
    {
        return $this->attributes['roles'] = Roles::Super->value;
    }

    /**
     * Check if user has 'management' role.
     *
     * @return bool
     */
    public function isManagement(): bool
    {
        return $this->attributes['roles'] = Roles::Management->value;
    }

    /**
     * Check if user has 'user' role.
     *
     * @return bool
     */
    public function isUser(): bool
    {
        return $this->attributes['roles'] = Roles::User->value;
    }

    /**
     * User's relationship with the image.
     *
     * @return MorphOne
     */
    public function image(): MorphOne
    {
        return $this->morphOne(Image::class, 'imageable');
    }
}
