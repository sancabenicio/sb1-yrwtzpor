import * as React from "react";
import { FrameNavigationProp } from "react-nativescript-navigation";
import { MainStackParamList } from "../NavigationParamList";

type SplashScreenProps = {
    navigation: FrameNavigationProp<MainStackParamList, "Splash">,
};

export function SplashScreen({ navigation }: SplashScreenProps) {
    React.useEffect(() => {
        setTimeout(() => {
            navigation.navigate("Login");
        }, 2000);
    }, []);

    return React.createElement(
        "gridLayout",
        { className: "splash-screen" },
        React.createElement(
            "stackLayout",
            {
                className: "p-8",
                verticalAlignment: "center",
                horizontalAlignment: "center"
            },
            [
                React.createElement("image", {
                    key: "logo",
                    src: "https://asset.cloudinary.com/dgwmasvg7/724e3357db9ce50c41b73ac7f06cb893",
                    className: "w-32 h-32 logo-pulse",
                    stretch: "aspectFit",
                    horizontalAlignment: "center"
                }),
                React.createElement(
                    "label",
                    { 
                        key: "title",
                        className: "text-3xl font-bold text-white text-center mt-4" 
                    },
                    "No Bindi"
                ),
                React.createElement(
                    "label",
                    { 
                        key: "subtitle",
                        className: "text-lg text-white text-center opacity-80" 
                    },
                    "Your Trusted Marketplace"
                )
            ]
        )
    );
}