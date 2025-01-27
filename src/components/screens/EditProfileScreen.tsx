import { Dialogs, ImageSource } from '@nativescript/core';
import { RouteProp } from '@react-navigation/core';
import * as React from "react";
import { FrameNavigationProp } from "react-nativescript-navigation";
import { MainStackParamList } from "../../NavigationParamList";

type EditProfileScreenProps = {
    route: RouteProp<MainStackParamList, "EditProfile">,
    navigation: FrameNavigationProp<MainStackParamList, "EditProfile">,
};

export function EditProfileScreen({ navigation }: EditProfileScreenProps) {
    const [name, setName] = React.useState("John Doe");
    const [email, setEmail] = React.useState("john@example.com");
    const [phone, setPhone] = React.useState("+55 11 99999-9999");
    const [location, setLocation] = React.useState("São Paulo, Brazil");
    const [bio, setBio] = React.useState("I love buying and selling vintage items!");
    const [avatar, setAvatar] = React.useState("res://icon");

    const handleSelectImage = async () => {
        // TODO: Implement image picker
        await Dialogs.alert("Image picker will be implemented here");
    };

    const handleSave = async () => {
        if (!name || !email) {
            await Dialogs.alert("Name and email are required");
            return;
        }

        // TODO: Implement profile update
        navigation.goBack();
    };

    return (
        <scrollView className="bg-gray-100">
            <stackLayout className="p-4 space-y-4">
                {/* Profile Photo */}
                <stackLayout className="items-center space-y-4">
                    <image
                        src={avatar}
                        className="w-32 h-32 rounded-full border-4 border-white shadow-soft"
                        stretch="aspectFill"
                    />
                    <button
                        className="bg-[#006B3F] text-white px-6 py-3 rounded-full"
                        onTap={handleSelectImage}
                    >
                        Change Photo
                    </button>
                </stackLayout>

                {/* Form Fields */}
                <stackLayout className="bg-white rounded-2xl p-4 space-y-4">
                    <stackLayout className="space-y-2">
                        <label className="text-sm font-medium text-gray-500">Full Name</label>
                        <textField
                            className="input-field"
                            text={name}
                            onTextChange={(e) => setName(e.value)}
                        />
                    </stackLayout>

                    <stackLayout className="space-y-2">
                        <label className="text-sm font-medium text-gray-500">Email</label>
                        <textField
                            className="input-field"
                            text={email}
                            keyboardType="email"
                            onTextChange={(e) => setEmail(e.value)}
                        />
                    </stackLayout>

                    <stackLayout className="space-y-2">
                        <label className="text-sm font-medium text-gray-500">Phone</label>
                        <textField
                            className="input-field"
                            text={phone}
                            keyboardType="phone"
                            onTextChange={(e) => setPhone(e.value)}
                        />
                    </stackLayout>

                    <stackLayout className="space-y-2">
                        <label className="text-sm font-medium text-gray-500">Location</label>
                        <textField
                            className="input-field"
                            text={location}
                            onTextChange={(e) => setLocation(e.value)}
                        />
                    </stackLayout>

                    <stackLayout className="space-y-2">
                        <label className="text-sm font-medium text-gray-500">Bio</label>
                        <textView
                            className="input-field h-32"
                            text={bio}
                            onTextChange={(e) => setBio(e.value)}
                        />
                    </stackLayout>
                </stackLayout>

                {/* Save Button */}
                <button
                    className="bg-[#006B3F] text-white p-4 rounded-2xl font-medium"
                    onTap={handleSave}
                >
                    Save Changes
                </button>
            </stackLayout>
        </scrollView>
    );
}