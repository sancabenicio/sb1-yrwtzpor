import { BaseNavigationContainer } from '@react-navigation/core';
import * as React from "react";
import { stackNavigatorFactory } from "react-nativescript-navigation";
import { SplashScreen } from "./SplashScreen";
import { LoginScreen } from "./screens/LoginScreen";
import { RegisterScreen } from "./screens/RegisterScreen";
import { HomeScreen } from "./screens/HomeScreen";
import { ProductDetailsScreen } from "./screens/ProductDetailsScreen";
import { ProfileScreen } from "./screens/ProfileScreen";
import { SettingsScreen } from "./screens/SettingsScreen";
import { EditProfileScreen } from "./screens/EditProfileScreen";
import { ChangePasswordScreen } from "./screens/ChangePasswordScreen";
import { AddProductScreen } from "./screens/AddProductScreen";
import { ChatScreen } from "./screens/ChatScreen";
import { CheckoutScreen } from "./screens/CheckoutScreen";
import { OrderConfirmationScreen } from "./screens/OrderConfirmationScreen";
import { ManageProductsScreen } from "./screens/ManageProductsScreen";
import { OrderManagementScreen } from "./screens/OrderManagementScreen";
import { CartScreen } from "./screens/CartScreen";

const StackNavigator = stackNavigatorFactory();

export function MainStack() {
    return React.createElement(
        BaseNavigationContainer,
        {},
        React.createElement(
            StackNavigator.Navigator,
            {
                initialRouteName: "Splash",
                screenOptions: {
                    headerStyle: {
                        backgroundColor: "#006B3F",
                    },
                    headerTintColor: "#ffffff",
                    headerShown: true,
                }
            },
            [
                React.createElement(StackNavigator.Screen, {
                    key: "splash",
                    name: "Splash",
                    component: SplashScreen,
                    options: { headerShown: false }
                }),
                React.createElement(StackNavigator.Screen, {
                    key: "login",
                    name: "Login",
                    component: LoginScreen,
                    options: { headerShown: false }
                }),
                React.createElement(StackNavigator.Screen, {
                    key: "register",
                    name: "Register",
                    component: RegisterScreen,
                    options: { headerShown: false }
                }),
                React.createElement(StackNavigator.Screen, {
                    key: "home",
                    name: "Home",
                    component: HomeScreen,
                    options: {
                        title: "No Bindi",
                        headerLeft: () => null,
                        gestureEnabled: false
                    }
                }),
                React.createElement(StackNavigator.Screen, {
                    key: "cart",
                    name: "Cart",
                    component: CartScreen,
                    options: { title: "Shopping Cart" }
                }),
                React.createElement(StackNavigator.Screen, {
                    key: "productDetails",
                    name: "ProductDetails",
                    component: ProductDetailsScreen,
                    options: { title: "Product Details" }
                }),
                React.createElement(StackNavigator.Screen, {
                    key: "profile",
                    name: "Profile",
                    component: ProfileScreen,
                    options: { title: "My Profile" }
                }),
                React.createElement(StackNavigator.Screen, {
                    key: "settings",
                    name: "Settings",
                    component: SettingsScreen,
                    options: { title: "Settings" }
                }),
                React.createElement(StackNavigator.Screen, {
                    key: "editProfile",
                    name: "EditProfile",
                    component: EditProfileScreen,
                    options: { title: "Edit Profile" }
                }),
                React.createElement(StackNavigator.Screen, {
                    key: "changePassword",
                    name: "ChangePassword",
                    component: ChangePasswordScreen,
                    options: { title: "Change Password" }
                }),
                React.createElement(StackNavigator.Screen, {
                    key: "addProduct",
                    name: "AddProduct",
                    component: AddProductScreen,
                    options: { title: "Add Product" }
                }),
                React.createElement(StackNavigator.Screen, {
                    key: "chat",
                    name: "Chat",
                    component: ChatScreen,
                    options: { title: "Messages" }
                }),
                React.createElement(StackNavigator.Screen, {
                    key: "checkout",
                    name: "Checkout",
                    component: CheckoutScreen,
                    options: { title: "Checkout" }
                }),
                React.createElement(StackNavigator.Screen, {
                    key: "orderConfirmation",
                    name: "OrderConfirmation",
                    component: OrderConfirmationScreen,
                    options: { title: "Order Confirmation" }
                }),
                React.createElement(StackNavigator.Screen, {
                    key: "manageProducts",
                    name: "ManageProducts",
                    component: ManageProductsScreen,
                    options: { title: "Manage Products" }
                }),
                React.createElement(StackNavigator.Screen, {
                    key: "orderManagement",
                    name: "OrderManagement",
                    component: OrderManagementScreen,
                    options: { title: "Order Management" }
                })
            ]
        )
    );
}