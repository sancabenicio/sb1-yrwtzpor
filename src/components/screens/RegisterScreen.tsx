import { Dialogs } from '@nativescript/core';
import { RouteProp } from '@react-navigation/core';
import * as React from "react";
import { FrameNavigationProp } from "react-nativescript-navigation";
import { MainStackParamList } from "../../NavigationParamList";
import { ThemeContext } from "../../contexts/ThemeContext";

type RegisterScreenProps = {
    route: RouteProp<MainStackParamList, "Register">,
    navigation: FrameNavigationProp<MainStackParamList, "Register">,
};

export function RegisterScreen({ navigation }: RegisterScreenProps) {
    const { isDarkMode, toggleTheme } = React.useContext(ThemeContext);
    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [confirmPassword, setConfirmPassword] = React.useState("");

    const handleRegister = () => {
        if (!name || !email || !password || !confirmPassword) {
            Dialogs.alert("Please fill in all fields");
            return;
        }
        
        if (password !== confirmPassword) {
            Dialogs.alert("Passwords do not match");
            return;
        }

        if (password.length < 6) {
            Dialogs.alert("Password must be at least 6 characters long");
            return;
        }

        navigation.navigate("Home");
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
                            className: "text-2xl self-end mb-4",
                            onTap: toggleTheme
                        },
                        isDarkMode ? '☀️' : '🌙'
                    ),

                    // Logo and Header
                    React.createElement(
                        "stackLayout",
                        { className: "text-center mb-12" },
                        [
                            React.createElement(
                                "image",
                                {
                                    src: "https://asset.cloudinary.com/dgwmasvg7/724e3357db9ce50c41b73ac7f06cb893",
                                    className: "h-32 w-32 mb-4",
                                    horizontalAlignment: "center",
                                    stretch: "aspectFit"
                                }
                            ),
                            React.createElement(
                                "label",
                                { className: "auth-title" },
                                "Create Account"
                            ),
                            React.createElement(
                                "label",
                                { className: "auth-subtitle" },
                                "Join our marketplace community"
                            )
                        ]
                    ),

                    // Registration Form
                    React.createElement(
                        "stackLayout",
                        { className: "mb-8" },
                        [
                            React.createElement(
                                "label",
                                { className: "auth-label" },
                                "Full Name"
                            ),
                            React.createElement(
                                "textField",
                                {
                                    className: "auth-input",
                                    hint: "Enter your full name",
                                    text: name,
                                    onTextChange: (e) => setName(e.value)
                                }
                            ),
                            React.createElement(
                                "label",
                                { className: "auth-label" },
                                "Email Address"
                            ),
                            React.createElement(
                                "textField",
                                {
                                    className: "auth-input",
                                    hint: "Enter your email",
                                    keyboardType: "email",
                                    autocorrect: false,
                                    autocapitalizationType: "none",
                                    text: email,
                                    onTextChange: (e) => setEmail(e.value)
                                }
                            ),
                            React.createElement(
                                "label",
                                { className: "auth-label" },
                                "Password"
                            ),
                            React.createElement(
                                "textField",
                                {
                                    className: "auth-input",
                                    hint: "Create a password",
                                    secure: true,
                                    text: password,
                                    onTextChange: (e) => setPassword(e.value)
                                }
                            ),
                            React.createElement(
                                "label",
                                { className: "auth-label" },
                                "Confirm Password"
                            ),
                            React.createElement(
                                "textField",
                                {
                                    className: "auth-input",
                                    hint: "Confirm your password",
                                    secure: true,
                                    text: confirmPassword,
                                    onTextChange: (e) => setConfirmPassword(e.value)
                                }
                            )
                        ]
                    ),

                    // Password Requirements
                    React.createElement(
                        "stackLayout",
                        { className: "auth-requirements" },
                        [
                            React.createElement(
                                "label",
                                { className: "auth-requirements-title" },
                                "Password Requirements"
                            ),
                            React.createElement(
                                "label",
                                { className: "auth-requirements-item" },
                                "• At least 6 characters long"
                            ),
                            React.createElement(
                                "label",
                                { className: "auth-requirements-item" },
                                "• Contains uppercase and lowercase letters"
                            ),
                            React.createElement(
                                "label",
                                { className: "auth-requirements-item" },
                                "• Contains at least one number"
                            )
                        ]
                    ),

                    // Buttons
                    React.createElement(
                        "stackLayout",
                        { className: "mt-4" },
                        [
                            React.createElement(
                                "button",
                                {
                                    className: "auth-button-primary",
                                    onTap: handleRegister
                                },
                                "Create Account"
                            ),
                            React.createElement(
                                "button",
                                {
                                    className: "auth-button-secondary",
                                    onTap: () => navigation.navigate("Login")
                                },
                                "Back to Login"
                            )
                        ]
                    )
                ]
            )
        )
    );
}