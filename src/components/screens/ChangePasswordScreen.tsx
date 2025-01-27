import { Dialogs } from '@nativescript/core';
import { RouteProp } from '@react-navigation/core';
import * as React from "react";
import { FrameNavigationProp } from "react-nativescript-navigation";
import { MainStackParamList } from "../../NavigationParamList";

type ChangePasswordScreenProps = {
    route: RouteProp<MainStackParamList, "ChangePassword">,
    navigation: FrameNavigationProp<MainStackParamList, "ChangePassword">,
};

export function ChangePasswordScreen({ navigation }: ChangePasswordScreenProps) {
    const [currentPassword, setCurrentPassword] = React.useState("");
    const [newPassword, setNewPassword] = React.useState("");
    const [confirmPassword, setConfirmPassword] = React.useState("");

    const handleChangePassword = async () => {
        if (!currentPassword || !newPassword || !confirmPassword) {
            await Dialogs.alert("Please fill in all fields");
            return;
        }

        if (newPassword !== confirmPassword) {
            await Dialogs.alert("New passwords do not match");
            return;
        }

        if (newPassword.length < 8) {
            await Dialogs.alert("Password must be at least 8 characters long");
            return;
        }

        // TODO: Implement password change
        navigation.goBack();
    };

    return (
        <scrollView className="bg-gray-100">
            <stackLayout className="p-4 space-y-4">
                <stackLayout className="bg-white rounded-2xl p-4 space-y-4">
                    <stackLayout className="space-y-2">
                        <label className="text-sm font-medium text-gray-500">Current Password</label>
                        <textField
                            className="input-field"
                            secure={true}
                            text={currentPassword}
                            onTextChange={(e) => setCurrentPassword(e.value)}
                        />
                    </stackLayout>

                    <stackLayout className="space-y-2">
                        <label className="text-sm font-medium text-gray-500">New Password</label>
                        <textField
                            className="input-field"
                            secure={true}
                            text={newPassword}
                            onTextChange={(e) => setNewPassword(e.value)}
                        />
                    </stackLayout>

                    <stackLayout className="space-y-2">
                        <label className="text-sm font-medium text-gray-500">Confirm New Password</label>
                        <textField
                            className="input-field"
                            secure={true}
                            text={confirmPassword}
                            onTextChange={(e) => setConfirmPassword(e.value)}
                        />
                    </stackLayout>
                </stackLayout>

                {/* Password Requirements */}
                <stackLayout className="bg-blue-50 p-4 rounded-xl space-y-2">
                    <label className="text-blue-800 font-medium">Password Requirements:</label>
                    <label className="text-blue-600">• At least 8 characters long</label>
                    <label className="text-blue-600">• Contains uppercase and lowercase letters</label>
                    <label className="text-blue-600">• Contains numbers</label>
                    <label className="text-blue-600">• Contains special characters</label>
                </stackLayout>

                <button
                    className="bg-[#006B3F] text-white p-4 rounded-2xl font-medium"
                    onTap={handleChangePassword}
                >
                    Change Password
                </button>
            </stackLayout>
        </scrollView>
    );
}