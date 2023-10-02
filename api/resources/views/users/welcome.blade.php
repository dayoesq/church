<p>Congratulations {{ $user->first_name }}! Your account has been created! </p>
<p>In order to gain access to your account, you must
    <a href="{{ config('app.client_base_url') }}/password-reset/{{ $passwordResetToken }}">
        change your password.
    </a>
</p>
<p>Please note that the above link expires in 24 hours!</p>

---
<p>Regards,</p>
<p>{{ config('app.name') }}</p>
