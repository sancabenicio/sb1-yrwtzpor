import { RouteProp } from '@react-navigation/core';
import * as React from "react";
import { FrameNavigationProp } from "react-nativescript-navigation";
import { MainStackParamList } from "../../NavigationParamList";

type ManageProductsScreenProps = {
    route: RouteProp<MainStackParamList, "ManageProducts">,
    navigation: FrameNavigationProp<MainStackParamList, "ManageProducts">,
};

interface Product {
    id: string;
    name: string;
    price: number;
    stock: number;
    image: string;
    status: 'active' | 'sold' | 'draft';
}

export function ManageProductsScreen({ navigation }: ManageProductsScreenProps) {
    // Mock products data - replace with API call
    const [products] = React.useState<Product[]>([
        {
            id: "1",
            name: "Vintage Camera",
            price: 299.99,
            stock: 5,
            image: "res://icon",
            status: 'active'
        },
        {
            id: "2",
            name: "Mountain Bike",
            price: 450,
            stock: 2,
            image: "res://icon",
            status: 'sold'
        }
    ]);

    return (
        <gridLayout rows="auto, *" className="bg-gray-100">
            {/* Header Actions */}
            <stackLayout row={0} className="p-4">
                <button
                    className="bg-green-600 text-white p-4 rounded-lg text-lg font-semibold"
                    onTap={() => navigation.navigate("AddProduct")}
                >
                    Add New Product
                </button>
            </stackLayout>

            {/* Products List */}
            <scrollView row={1}>
                <stackLayout className="p-4 space-y-4">
                    {products.map((product) => (
                        <gridLayout
                            key={product.id}
                            columns="auto, *, auto"
                            className="bg-white p-4 rounded-lg"
                        >
                            <image
                                col={0}
                                src={product.image}
                                className="w-16 h-16 rounded-lg"
                                stretch="aspectFill"
                            />
                            <stackLayout col={1} className="ml-3">
                                <label className="font-semibold">{product.name}</label>
                                <label className="text-green-600">R$ {product.price}</label>
                                <label className="text-sm text-gray-500">Stock: {product.stock}</label>
                            </stackLayout>
                            <stackLayout col={2} className="justify-center">
                                <label className={`px-2 py-1 rounded-full text-center text-sm ${
                                    product.status === 'active' ? 'bg-green-100 text-green-800' :
                                    product.status === 'sold' ? 'bg-gray-100 text-gray-800' :
                                    'bg-yellow-100 text-yellow-800'
                                }`}>
                                    {product.status.charAt(0).toUpperCase() + product.status.slice(1)}
                                </label>
                            </stackLayout>
                        </gridLayout>
                    ))}
                </stackLayout>
            </scrollView>
        </gridLayout>
    );
}