import { RouteProp } from '@react-navigation/core';
import * as React from "react";
import { FrameNavigationProp } from "react-nativescript-navigation";
import { MainStackParamList } from "../../NavigationParamList";
import { CartContext } from "../../contexts/CartContext";

type CartScreenProps = {
    route: RouteProp<MainStackParamList, "Cart">,
    navigation: FrameNavigationProp<MainStackParamList, "Cart">,
};

export function CartScreen({ navigation }: CartScreenProps) {
    const { items, removeFromCart, updateQuantity } = React.useContext(CartContext);

    const calculateTotal = () => {
        return items.reduce((total, item) => total + (item.price * item.quantity), 0);
    };

    const handleCheckout = () => {
        if (items.length === 0) return;
        // For now, we'll just navigate to checkout with the first item
        // In a real app, you'd handle multiple items
        const firstItem = items[0];
        navigation.navigate("Checkout", {
            productId: firstItem.id,
            quantity: firstItem.quantity
        });
    };

    return (
        <gridLayout rows="*, auto" className="bg-gray-100">
            {items.length > 0 ? (
                <>
                    <scrollView row={0} className="responsive-padding">
                        <stackLayout className="responsive-gap">
                            {items.map((item) => (
                                <gridLayout
                                    key={item.id}
                                    className="bg-white responsive-padding rounded-lg"
                                    rows="auto, auto"
                                    columns="auto, *, auto"
                                >
                                    <image
                                        row={0}
                                        col={0}
                                        rowSpan={2}
                                        src={item.image}
                                        className="w-20 h-20 rounded-lg mr-3"
                                        stretch="aspectFill"
                                    />
                                    <stackLayout row={0} col={1}>
                                        <label className="font-semibold text-lg">{item.name}</label>
                                        <label className="text-[#006B3F] font-bold">
                                            R$ {item.price.toFixed(2)}
                                        </label>
                                    </stackLayout>
                                    <button
                                        row={0}
                                        col={2}
                                        className="text-red-500 p-2"
                                        onTap={() => removeFromCart(item.id)}
                                    >
                                        ✕
                                    </button>
                                    <gridLayout
                                        row={1}
                                        col={1}
                                        colSpan={2}
                                        columns="auto, auto, auto"
                                        className="mt-2"
                                    >
                                        <button
                                            col={0}
                                            className="bg-gray-100 w-8 h-8 rounded-lg text-lg"
                                            onTap={() => updateQuantity(item.id, item.quantity - 1)}
                                        >
                                            -
                                        </button>
                                        <label
                                            col={1}
                                            className="w-12 text-center text-lg"
                                        >
                                            {item.quantity}
                                        </label>
                                        <button
                                            col={2}
                                            className="bg-gray-100 w-8 h-8 rounded-lg text-lg"
                                            onTap={() => updateQuantity(item.id, item.quantity + 1)}
                                        >
                                            +
                                        </button>
                                    </gridLayout>
                                </gridLayout>
                            ))}
                        </stackLayout>
                    </scrollView>

                    <stackLayout row={1} className="bg-white responsive-padding border-t border-gray-200">
                        <gridLayout columns="*, auto" className="mb-4">
                            <label col={0} className="text-gray-600">Total</label>
                            <label col={1} className="text-xl font-bold text-[#006B3F]">
                                R$ {calculateTotal().toFixed(2)}
                            </label>
                        </gridLayout>
                        <button
                            className="bg-[#006B3F] text-white p-4 rounded-lg text-lg font-semibold"
                            onTap={handleCheckout}
                        >
                            Proceed to Checkout
                        </button>
                    </stackLayout>
                </>
            ) : (
                <gridLayout row={0} className="p-4">
                    <stackLayout verticalAlignment="center" horizontalAlignment="center">
                        <label className="text-display text-center mb-4">🛒</label>
                        <label className="text-title text-center">Your cart is empty</label>
                        <label className="text-body text-center mb-4">Add some products to your cart</label>
                        <button
                            className="bg-[#006B3F] text-white px-6 py-3 rounded-lg"
                            onTap={() => navigation.navigate("Home")}
                        >
                            Continue Shopping
                        </button>
                    </stackLayout>
                </gridLayout>
            )}
        </gridLayout>
    );
}