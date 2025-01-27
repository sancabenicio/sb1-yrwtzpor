import { Dialogs } from '@nativescript/core';
import { RouteProp } from '@react-navigation/core';
import * as React from "react";
import { FrameNavigationProp } from "react-nativescript-navigation";
import { MainStackParamList } from "../../NavigationParamList";
import { ThemeContext } from "../../contexts/ThemeContext";

type SettingsScreenProps = {
    route: RouteProp<MainStackParamList, "Settings">,
    navigation: FrameNavigationProp<MainStackParamList, "Settings">,
};

export function SettingsScreen({ navigation }: SettingsScreenProps) {
    const { isDarkMode, toggleTheme } = React.useContext(ThemeContext);

    const settingsSections = [
        {
            title: "Account",
            items: [
                {
                    title: "Edit Profile",
                    icon: "👤",
                    onTap: () => navigation.navigate("EditProfile")
                },
                {
                    title: "Change Password",
                    icon: "🔒",
                    onTap: () => navigation.navigate("ChangePassword")
                },
                {
                    title: "Notifications",
                    icon: "🔔",
                    onTap: () => {}
                }
            ]
        },
        {
            title: "Preferences",
            items: [
                {
                    title: "Dark Mode",
                    icon: isDarkMode ? "🌙" : "☀️",
                    value: isDarkMode ? "On" : "Off",
                    onTap: toggleTheme
                },
                {
                    title: "Language",
                    icon: "🌐",
                    value: "English",
                    onTap: () => {}
                },
                {
                    title: "Currency",
                    icon: "💰",
                    value: "BRL",
                    onTap: () => {}
                }
            ]
        },
        // Rest of your settings sections...
    ];

    return (
        <scrollView className="bg-theme">
            <stackLayout className="p-4 space-y-4">
                {settingsSections.map((section, sectionIndex) => (
                    <stackLayout key={sectionIndex} className="space-y-2">
                        <label className="text-sm font-medium text-theme-secondary px-2">
                            {section.title}
                        </label>
                        <stackLayout className="card">
                            {section.items.map((item, itemIndex) => (
                                <gridLayout
                                    key={itemIndex}
                                    columns="auto, *, auto"
                                    className={`p-4 ${
                                        itemIndex !== section.items.length - 1 ? 'border-b border-theme' : ''
                                    }`}
                                    onTap={item.onTap}
                                >
                                    <label col={0} className="text-2xl mr-4">{item.icon}</label>
                                    <label col={1} className="text-theme font-medium">{item.title}</label>
                                    <stackLayout col={2} className="flex-row items-center">
                                        {item.value && (
                                            <label className="text-theme-secondary mr-2">{item.value}</label>
                                        )}
                                        <label className="text-theme-secondary">›</label>
                                    </stackLayout>
                                </gridLayout>
                            ))}
                        </stackLayout>
                    </stackLayout>
                ))}

                <button
                    className="bg-red-50 text-red-600 p-4 rounded-2xl font-medium mt-4"
                    onTap={() => navigation.navigate("Login")}
                >
                    Delete Account
                </button>
            </stackLayout>
        </scrollView>
    );
}