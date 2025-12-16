<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use League\OAuth2\Client\Provider\Google;
use App\Models\User;
use App\Repositories\RefreshTokenRepository;

class GoogleController extends Controller
{
    private $refreshTokenRepository;

    public function __construct(RefreshTokenRepository $refreshTokenRepository)
    {
        $this->refreshTokenRepository = $refreshTokenRepository;
    }
    public function exchange(Request $request)
    {
        $request->validate([
            'code' => 'required|string',
            'verifier' => 'required|string',
        ]);

        $provider = new Google([
            'clientId' => env('GOOGLE_CLIENT_ID'),
            'redirectUri' => 'https://your-frontend.com/callback', // must match Google Console
        ]);

        try {
            $token = $provider->getAccessToken('authorization_code', [
                'code' => $request->input('code'),
                'code_verifier' => $request->input('verifier'),
            ]);

            $gg_user = $provider->getResourceOwner($token)->toArray();
            if (empty($gg_user['email'])) {
                return response()->json(['error' => 'Email not provided by Google'], 400);
            }
            $user = User::firstOrCreate([
                'email' => $gg_user['email'],
            ], [
                'email_verified' => true,
                'full_name' => $gg_user['name'],
            ]);
            $refreshToken = $this->refreshTokenRepository->generateRefreshTokenForUser($user);
            return response()->json([
                'success' => true,
                'access_token' => is_object($token) && method_exists($token, 'getToken') ? $token->getToken() : (string)$token,
                'refresh_token' => $refreshToken,
            ]);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 400);
        }
    }
}
