import * as React from "react";
import { Dialogs } from "@nativescript/core";
import { authService } from "../services/auth.service";

interface SocialAuthButtonsProps {
    onSuccess: (user: any) => void;
    onError: (error: any) => void;
}

export function SocialAuthButtons({ onSuccess, onError }: SocialAuthButtonsProps) {
    const handleSocialLogin = async (provider: 'google' | 'facebook' | 'apple') => {
        try {
            let user;
            switch (provider) {
                case 'google':
                    user = await authService.signInWithGoogle();
                    break;
                case 'facebook':
                    user = await authService.signInWithFacebook();
                    break;
                case 'apple':
                    user = await authService.signInWithApple();
                    break;
            }
            onSuccess(user);
        } catch (error) {
            onError(error);
            await Dialogs.alert({
                title: "Authentication Error",
                message: "Failed to sign in. Please try again.",
                okButtonText: "OK"
            });
        }
    };

    return React.createElement(
        "stackLayout",
        { className: "mt-8" },
        [
            React.createElement(
                "label",
                {
                    key: "divider",
                    className: "text-theme-secondary text-center mb-4"
                },
                "or continue with"
            ),
            React.createElement(
                "gridLayout",
                {
                    key: "buttons",
                    columns: "*, *, *",
                    className: "gap-4"
                },
                [
                    React.createElement(
                        "button",
                        {
                            col: 0,
                            className: "social-auth-button",
                            onTap: () => handleSocialLogin('google')
                        },
                        "G"
                    ),
                    React.createElement(
                        "button",
                        {
                            col: 1,
                            className: "social-auth-button",
                            onTap: () => handleSocialLogin('facebook')
                        },
                        "f"
                    ),
                    React.createElement(
                        "button",
                        {
                            col: 2,
                            className: "social-auth-button",
                            onTap: () => handleSocialLogin('apple')
                        },
                        ""
                    )
                ]
            )
        ]
    );
}