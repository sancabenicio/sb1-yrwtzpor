import { Dialogs } from '@nativescript/core';
import { RouteProp } from '@react-navigation/core';
import * as React from "react";
import { FrameNavigationProp } from "react-nativescript-navigation";
import { MainStackParamList } from "../../NavigationParamList";
import { ThemeContext } from "../../contexts/ThemeContext";

type LoginScreenProps = {
    route: RouteProp<MainStackParamList, "Login">,
    navigation: FrameNavigationProp<MainStackParamList, "Login">,
};

export function LoginScreen({ navigation }: LoginScreenProps) {
    const { isDarkMode, toggleTheme } = React.useContext(ThemeContext);
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [isLoading, setIsLoading] = React.useState(false);

    const handleLogin = () => {
        if (!email || !password) {
            Dialogs.alert("Please enter both email and password");
            return;
        }
        navigation.navigate("Home");
    };

    const handleSocialLogin = async (provider: 'google' | 'facebook' | 'apple') => {
        try {
            setIsLoading(true);
            // Simular login social
            await new Promise(resolve => setTimeout(resolve, 1000));
            navigation.navigate("Home");
        } catch (error) {
            console.error(`${provider} login error:`, error);
            await Dialogs.alert({
                title: "Login Failed",
                message: "Could not sign in. Please try again.",
                okButtonText: "OK"
            });
        } finally {
            setIsLoading(false);
        }
    };

    return React.createElement(
        "gridLayout",
        { className: `auth-container ${isDarkMode ? 'ns-dark' : ''}` },
        React.createElement(
            "scrollView",
            {},
            React.createElement(
                "stackLayout",
                { className: "p-6" },
                [
                    // Theme Toggle
                    React.createElement(
                        "button",
                        {
                            key: "theme-toggle",
                            className: "text-2xl self-end mb-4 text-theme",
                            onTap: toggleTheme
                        },
                        isDarkMode ? '☀️' : '🌙'
                    ),

                    // Logo and Header
                    React.createElement(
                        "stackLayout",
                        { key: "header", className: "text-center mb-12" },
                        [
                            React.createElement(
                                "image",
                                {
                                    key: "logo",
                                    src: "https://asset.cloudinary.com/dgwmasvg7/724e3357db9ce50c41b73ac7f06cb893",
                                    className: "h-32 w-32 mb-4",
                                    horizontalAlignment: "center",
                                    stretch: "aspectFit"
                                }
                            ),
                            React.createElement(
                                "label",
                                { key: "title", className: "auth-title" },
                                "Welcome Back"
                            ),
                            React.createElement(
                                "label",
                                { key: "subtitle", className: "auth-subtitle" },
                                "Sign in to continue"
                            )
                        ]
                    ),

                    // Login Form
                    React.createElement(
                        "stackLayout",
                        { key: "form", className: "mb-8" },
                        [
                            React.createElement(
                                "textField",
                                {
                                    key: "email-input",
                                    className: "auth-input",
                                    hint: "Email",
                                    keyboardType: "email",
                                    autocorrect: false,
                                    autocapitalizationType: "none",
                                    text: email,
                                    onTextChange: (e) => setEmail(e.value)
                                }
                            ),
                            React.createElement(
                                "textField",
                                {
                                    key: "password-input",
                                    className: "auth-input",
                                    hint: "Password",
                                    secure: true,
                                    text: password,
                                    onTextChange: (e) => setPassword(e.value)
                                }
                            )
                        ]
                    ),

                    // Login Button
                    React.createElement(
                        "button",
                        {
                            key: "login-button",
                            className: "auth-button-primary",
                            onTap: handleLogin,
                            isEnabled: !isLoading
                        },
                        isLoading ? "Signing in..." : "Sign In"
                    ),

                    // Social Login Divider
                    React.createElement(
                        "stackLayout",
                        { key: "social-divider", className: "mt-6 mb-4" },
                        [
                            React.createElement(
                                "label",
                                { key: "divider-text", className: "text-center text-theme-secondary" },
                                "or continue with"
                            )
                        ]
                    ),

                    // Social Login Buttons
                    React.createElement(
                        "gridLayout",
                        {
                            key: "social-buttons",
                            columns: "*, *, *",
                            className: "gap-4"
                        },
                        [
                            React.createElement(
                                "button",
                                {
                                    key: "google-button",
                                    col: 0,
                                    className: "social-auth-button google",
                                    onTap: () => handleSocialLogin('google'),
                                    isEnabled: !isLoading
                                },
                                "G"
                            ),
                            React.createElement(
                                "button",
                                {
                                    key: "facebook-button",
                                    col: 1,
                                    className: "social-auth-button facebook",
                                    onTap: () => handleSocialLogin('facebook'),
                                    isEnabled: !isLoading
                                },
                                "f"
                            ),
                            React.createElement(
                                "button",
                                {
                                    key: "apple-button",
                                    col: 2,
                                    className: "social-auth-button apple",
                                    onTap: () => handleSocialLogin('apple'),
                                    isEnabled: !isLoading
                                },
                                "Apple"
                            )
                        ]
                    ),

                    // Register Link
                    React.createElement(
                        "button",
                        {
                            key: "register-button",
                            className: "auth-button-secondary mt-6",
                            onTap: () => navigation.navigate("Register"),
                            isEnabled: !isLoading
                        },
                        "Create New Account"
                    )
                ]
            )
        )
    );
}