import { RouteProp } from '@react-navigation/core';
import * as React from "react";
import { FrameNavigationProp } from "react-nativescript-navigation";
import { MainStackParamList } from "../../NavigationParamList";

type OrderConfirmationScreenProps = {
    route: RouteProp<MainStackParamList, "OrderConfirmation">,
    navigation: FrameNavigationProp<MainStackParamList, "OrderConfirmation">,
};

export function OrderConfirmationScreen({ route, navigation }: OrderConfirmationScreenProps) {
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
                        key: "emoji",
                        className: "text-6xl text-center"
                    },
                    "🎉"
                ),
                React.createElement(
                    "label",
                    {
                        key: "title",
                        className: "text-2xl font-bold text-green-600 text-center"
                    },
                    "Order Confirmed!"
                ),
                React.createElement(
                    "label",
                    {
                        key: "orderId",
                        className: "text-gray-600 text-center"
                    },
                    `Order ID: ${route.params.orderId}`
                ),
                React.createElement(
                    "label",
                    {
                        key: "message",
                        className: "text-gray-600 text-center"
                    },
                    "Thank you for your purchase. We'll notify you when the seller ships your order."
                ),
                React.createElement(
                    "button",
                    {
                        key: "continue",
                        className: "bg-green-600 text-white p-4 rounded-lg mt-8",
                        onTap: () => navigation.navigate("Home")
                    },
                    "Continue Shopping"
                )
            ]
        )
    );
}