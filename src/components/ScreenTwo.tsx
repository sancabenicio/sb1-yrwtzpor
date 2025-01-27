import { RouteProp } from '@react-navigation/core';
import * as React from "react";
import { FrameNavigationProp } from "react-nativescript-navigation";
import { MainStackParamList } from "../NavigationParamList";

type ScreenTwoProps = {
    route: RouteProp<MainStackParamList, "Two">,
    navigation: FrameNavigationProp<MainStackParamList, "Two">,
};

export function ScreenTwo({ navigation, route }: ScreenTwoProps) {
    return React.createElement(
        "gridLayout",
        { className: "bg-yellow-200" },
        React.createElement(
            "stackLayout",
            {
                className: "p-8",
                verticalAlignment: "center",
                horizontalAlignment: "center"
            },
            [
                React.createElement(
                    "label",
                    {
                        key: "title",
                        className: "text-2xl mb-4 text-center text-black"
                    },
                    "You're viewing screen two!"
                ),
                React.createElement(
                    "label",
                    {
                        key: "message",
                        className: "text-xl mb-4 text-center text-black"
                    },
                    `Message: ${route.params.message}`
                ),
                React.createElement(
                    "button",
                    {
                        key: "back-button",
                        className: "btn-primary",
                        onTap: () => navigation.goBack()
                    },
                    "Go back"
                )
            ]
        )
    );
}