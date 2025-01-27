import { RouteProp } from '@react-navigation/core';
import * as React from "react";
import { FrameNavigationProp } from "react-nativescript-navigation";
import { MainStackParamList } from "../../NavigationParamList";

type ProfileScreenProps = {
    route: RouteProp<MainStackParamList, "Profile">,
    navigation: FrameNavigationProp<MainStackParamList, "Profile">,
};

export function ProfileScreen({ navigation }: ProfileScreenProps) {
    const defaultAvatar = "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y";
    
    // Mock user data - replace with actual user data
    const user = {
        name: "John Doe",
        email: "john@example.com",
        avatar: null, // Set to null to test default avatar
        listings: 5,
        sales: 12,
        rating: 4.8,
        memberSince: "2023",
        location: "São Paulo, Brazil"
    };

    const menuItems = [
        {
            title: "My Products",
            icon: "📦",
            onTap: () => navigation.navigate("ManageProducts")
        },
        {
            title: "Orders",
            icon: "🛍️",
            onTap: () => navigation.navigate("OrderManagement")
        },
        {
            title: "Messages",
            icon: "💬",
            onTap: () => navigation.navigate("Chat", { userId: "all" })
        },
        {
            title: "Settings",
            icon: "⚙️",
            onTap: () => navigation.navigate("Settings")
        }
    ];

    return (
        <scrollView className="bg-gray-100">
            {/* Header Section with Avatar */}
            <gridLayout className="bg-[#006B3F] p-6 pb-20">
                <stackLayout>
                    <label className="text-white text-lg mb-2">Profile</label>
                    <label className="text-white opacity-80">{user.location}</label>
                </stackLayout>
            </gridLayout>

            {/* Profile Card */}
            <stackLayout className="px-4 -mt-16">
                <stackLayout className="bg-white rounded-3xl shadow-medium p-6">
                    <stackLayout className="items-center">
                        <image
                            src={user.avatar || defaultAvatar}
                            className="w-24 h-24 rounded-full border-4 border-white shadow-soft mb-4"
                            stretch="aspectFill"
                        />
                        <label className="text-2xl font-bold text-gray-800">{user.name}</label>
                        <label className="text-gray-500 mb-4">{user.email}</label>
                        
                        {/* Rating and Member Info */}
                        <gridLayout columns="auto, auto" className="bg-gray-50 rounded-full px-6 py-2">
                            <label col={0} className="text-gray-700 mr-4">⭐ {user.rating}</label>
                            <label col={1} className="text-gray-700">🗓️ Member since {user.memberSince}</label>
                        </gridLayout>
                    </stackLayout>

                    {/* Stats */}
                    <gridLayout columns="*, *" className="mt-6 bg-gray-50 rounded-2xl p-4">
                        <stackLayout col={0} className="items-center p-4 border-r border-gray-200">
                            <label className="text-2xl font-bold text-[#006B3F]">{user.listings}</label>
                            <label className="text-gray-600">Products</label>
                        </stackLayout>
                        <stackLayout col={1} className="items-center p-4">
                            <label className="text-2xl font-bold text-[#006B3F]">{user.sales}</label>
                            <label className="text-gray-600">Sales</label>
                        </stackLayout>
                    </gridLayout>
                </stackLayout>

                {/* Quick Actions */}
                <gridLayout columns="*, *" rows="auto, auto" className="gap-4 mt-4">
                    <button
                        col={0}
                        row={0}
                        className="bg-white p-4 rounded-2xl shadow-soft"
                        onTap={() => navigation.navigate("AddProduct")}
                    >
                        <stackLayout className="items-center">
                            <label className="text-2xl mb-2">📦</label>
                            <label className="font-medium text-gray-800">Add Product</label>
                        </stackLayout>
                    </button>
                    <button
                        col={1}
                        row={0}
                        className="bg-white p-4 rounded-2xl shadow-soft"
                        onTap={() => navigation.navigate("ManageProducts")}
                    >
                        <stackLayout className="items-center">
                            <label className="text-2xl mb-2">📊</label>
                            <label className="font-medium text-gray-800">Manage Store</label>
                        </stackLayout>
                    </button>
                </gridLayout>

                {/* Menu Items */}
                <stackLayout className="bg-white rounded-2xl shadow-soft mt-4 mb-4">
                    {menuItems.map((item, index) => (
                        <gridLayout
                            key={index}
                            columns="auto, *, auto"
                            className={`p-4 ${
                                index !== menuItems.length - 1 ? 'border-b border-gray-100' : ''
                            }`}
                            onTap={item.onTap}
                        >
                            <label col={0} className="text-2xl mr-4">{item.icon}</label>
                            <label col={1} className="text-gray-800 font-medium">{item.title}</label>
                            <label col={2} className="text-gray-400">›</label>
                        </gridLayout>
                    ))}
                </stackLayout>

                {/* Logout Button */}
                <button
                    className="bg-gray-100 text-gray-800 p-4 rounded-2xl mb-8 font-medium"
                    onTap={() => navigation.navigate("Login")}
                >
                    Logout
                </button>
            </stackLayout>
        </scrollView>
    );
}