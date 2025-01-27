import { Dialogs } from '@nativescript/core';
import { RouteProp } from '@react-navigation/core';
import * as React from "react";
import { StyleSheet } from "react-nativescript";
import { FrameNavigationProp } from "react-nativescript-navigation";
import { MainStackParamList } from "../NavigationParamList";

type ScreenOneProps = {
    route: RouteProp<MainStackParamList, "One">,
    navigation: FrameNavigationProp<MainStackParamList, "One">,
};

export function ScreenOne({ navigation }: ScreenOneProps) {
    return React.createElement(
        "gridLayout",
        { className: "bg-white" },
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
                        className: "text-2xl mb-4 font-bold text-center" 
                    },
                    "Hello World!"
                ),
                React.createElement(
                    "button",
                    {
                        key: "alert-button",
                        className: "btn-primary mb-4",
                        onTap: () => Dialogs.alert("Tapped!")
                    },
                    "Tap me for an alert"
                ),
                React.createElement(
                    "button",
                    {
                        key: "nav-button",
                        className: "btn-secondary",
                        onTap: () => navigation.navigate("Two", { message: "Hello, world!" })
                    },
                    "Go to next screen"
                )
            ]
        )
    );
}