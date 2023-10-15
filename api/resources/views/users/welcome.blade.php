<p>Congratulations {{ $user->first_name }}! Your account has been created! </p>
<p>Please use this token to verify your account and change your password <strong>{{ $passwordResetToken }}</strong>.</p>
<p>Also note that the above code expires in 24 hours! On expiration, you may have to request another one.</p>

---
<p>Regards,</p>
<p>{{ config('app.name') }}</p>
