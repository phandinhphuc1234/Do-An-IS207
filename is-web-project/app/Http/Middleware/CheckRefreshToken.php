<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;
use App\Models\RefreshToken;
use PHPOpenSourceSaver\JWTAuth\Facades\JWTAuth;
use PHPOpenSourceSaver\JWTAuth\Exceptions\JWTException;

class CheckRefreshToken
{
    public function handle(Request $request, Closure $next)
    {
        if ($request->header('Authorization')) {
            $user = JWTAuth::parseToken()->authenticate(false); // Pass false to avoid exceptions

            if ($user) {
                Auth::setUser($user);
                return response()->json([
                    'success' => false,
                    'message' => 'User is already authenticated.',
                ], Response::HTTP_FORBIDDEN);
            }
        }

        $accessToken = $this->refresh($request);

        if ($accessToken !== null) {
            return response()->json([
                'success' => true,
                'access_token' => $accessToken,
            ], 200);
        }

        return $next($request);
    }

    public function refresh(Request $request)
    {
        $refreshToken = RefreshToken::with('user.roles')
            ->where('token', $request->header('refresh-token'))
            ->where('revoked', false)
            ->where('expires_at', '>', now())
            ->first();

        if (!$refreshToken || !$refreshToken->user) {
            return null;
        }
        return JWTAuth::fromUser($refreshToken->user);
    }
}
