import { Http } from '@nativescript/core';

export interface SocialUser {
    id: string;
    name: string;
    email: string;
    photoUrl?: string;
    provider: 'google' | 'facebook' | 'apple';
}

class AuthService {
    private static instance: AuthService;

    private constructor() {}

    public static getInstance(): AuthService {
        if (!AuthService.instance) {
            AuthService.instance = new AuthService();
        }
        return AuthService.instance;
    }

    // Simulated social login for demo purposes
    async signInWithSocial(provider: 'google' | 'facebook' | 'apple'): Promise<SocialUser> {
        // Simulate different user data based on provider
        const userData = {
            google: {
                id: 'google-user-123',
                name: 'Google User',
                email: 'user@gmail.com',
                photoUrl: 'https://via.placeholder.com/150?text=G',
            },
            facebook: {
                id: 'fb-user-123',
                name: 'Facebook User',
                email: 'user@facebook.com',
                photoUrl: 'https://via.placeholder.com/150?text=F',
            },
            apple: {
                id: 'apple-user-123',
                name: 'Apple User',
                email: 'user@icloud.com',
                photoUrl: 'https://via.placeholder.com/150?text=A',
            }
        };

        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        return {
            ...userData[provider],
            provider
        };
    }
}

export const authService = AuthService.getInstance();