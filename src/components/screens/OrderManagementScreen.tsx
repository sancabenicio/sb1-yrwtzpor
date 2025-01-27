import { RouteProp } from '@react-navigation/core';
import * as React from "react";
import { FrameNavigationProp } from "react-nativescript-navigation";
import { MainStackParamList } from "../../NavigationParamList";

type OrderManagementScreenProps = {
    route: RouteProp<MainStackParamList, "OrderManagement">,
    navigation: FrameNavigationProp<MainStackParamList, "OrderManagement">,
};

interface Order {
    id: string;
    productName: string;
    buyerName: string;
    price: number;
    quantity: number;
    status: 'pending' | 'confirmed' | 'shipped' | 'delivered';
    date: string;
}

export function OrderManagementScreen({ navigation }: OrderManagementScreenProps) {
    // Mock orders data - replace with API call
    const [orders] = React.useState<Order[]>([
        {
            id: "ORDER123",
            productName: "Vintage Camera",
            buyerName: "John Doe",
            price: 299.99,
            quantity: 1,
            status: 'pending',
            date: "2024-01-20"
        }
    ]);

    const handleUpdateStatus = (orderId: string, newStatus: Order['status']) => {
        // TODO: Implement status update
        console.log(`Updating order ${orderId} to ${newStatus}`);
    };

    return (
        <scrollView className="bg-gray-100">
            <stackLayout className="p-4 space-y-4">
                {orders.map((order) => (
                    <stackLayout key={order.id} className="bg-white p-4 rounded-lg space-y-3">
                        <gridLayout columns="*, auto">
                            <label col={0} className="font-bold">Order #{order.id}</label>
                            <label col={1} className="text-sm text-gray-500">{order.date}</label>
                        </gridLayout>

                        <stackLayout className="space-y-1">
                            <label className="font-semibold">{order.productName}</label>
                            <label className="text-sm text-gray-600">Buyer: {order.buyerName}</label>
                            <label className="text-sm text-gray-600">Quantity: {order.quantity}</label>
                            <label className="text-green-600 font-bold">R$ {order.price}</label>
                        </stackLayout>

                        <gridLayout columns="*, auto" className="items-center">
                            <label col={0} className={`px-3 py-1 rounded-full text-center text-sm w-24 ${
                                order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                order.status === 'confirmed' ? 'bg-blue-100 text-blue-800' :
                                order.status === 'shipped' ? 'bg-purple-100 text-purple-800' :
                                'bg-green-100 text-green-800'
                            }`}>
                                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                            </label>
                            
                            <button
                                col={1}
                                className="bg-green-600 text-white px-4 py-2 rounded-lg"
                                onTap={() => {
                                    if (order.status === 'pending') {
                                        handleUpdateStatus(order.id, 'confirmed');
                                    } else if (order.status === 'confirmed') {
                                        handleUpdateStatus(order.id, 'shipped');
                                    }
                                }}
                                visibility={order.status !== 'delivered' ? 'visible' : 'collapsed'}
                            >
                                {order.status === 'pending' ? 'Confirm' :
                                 order.status === 'confirmed' ? 'Ship' : ''}
                            </button>
                        </gridLayout>
                    </stackLayout>
                ))}
            </stackLayout>
        </scrollView>
    );
}