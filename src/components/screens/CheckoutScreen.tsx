import { Dialogs } from '@nativescript/core';
import { RouteProp } from '@react-navigation/core';
import * as React from "react";
import { FrameNavigationProp } from "react-nativescript-navigation";
import { MainStackParamList } from "../../NavigationParamList";

type CheckoutScreenProps = {
    route: RouteProp<MainStackParamList, "Checkout">,
    navigation: FrameNavigationProp<MainStackParamList, "Checkout">,
};

export function CheckoutScreen({ route, navigation }: CheckoutScreenProps) {
    const [address, setAddress] = React.useState("");
    const [paymentMethod, setPaymentMethod] = React.useState("credit");
    
    // Mock product data - replace with API call
    const product = {
        id: route.params.productId,
        name: "Vintage Camera",
        price: 299.99,
        image: "res://icon"
    };

    const quantity = route.params.quantity;
    const total = product.price * quantity;

    const handlePlaceOrder = async () => {
        if (!address) {
            await Dialogs.alert("Please enter your delivery address");
            return;
        }

        // TODO: Implement actual order placement
        const orderId = "ORDER" + Math.random().toString(36).substr(2, 9);
        navigation.navigate("OrderConfirmation", { orderId });
    };

    return (
        <scrollView className="bg-gray-100">
            <stackLayout className="p-4 space-y-4">
                {/* Order Summary */}
                <stackLayout className="bg-white p-4 rounded-lg">
                    <label className="text-xl font-bold mb-4">Order Summary</label>
                    <gridLayout columns="auto, *" className="mb-2">
                        <image
                            col={0}
                            src={product.image}
                            className="w-16 h-16 rounded-lg"
                            stretch="aspectFill"
                        />
                        <stackLayout col={1} className="ml-3">
                            <label className="font-semibold">{product.name}</label>
                            <label className="text-gray-600">Quantity: {quantity}</label>
                            <label className="text-green-600 font-bold">R$ {product.price}</label>
                        </stackLayout>
                    </gridLayout>
                </stackLayout>

                {/* Delivery Address */}
                <stackLayout className="bg-white p-4 rounded-lg">
                    <label className="text-xl font-bold mb-4">Delivery Address</label>
                    <textView
                        className="border rounded-lg p-3 h-32"
                        hint="Enter your complete delivery address"
                        text={address}
                        onTextChange={(e) => setAddress(e.value)}
                    />
                </stackLayout>

                {/* Payment Method */}
                <stackLayout className="bg-white p-4 rounded-lg">
                    <label className="text-xl font-bold mb-4">Payment Method</label>
                    <stackLayout className="space-y-2">
                        <gridLayout columns="auto, *" className="items-center" onTap={() => setPaymentMethod("credit")}>
                            <label col={0} className="w-6 h-6 border-2 rounded-full mr-2 text-center">
                                {paymentMethod === "credit" ? "●" : ""}
                            </label>
                            <label col={1}>Credit Card</label>
                        </gridLayout>
                        <gridLayout columns="auto, *" className="items-center" onTap={() => setPaymentMethod("pix")}>
                            <label col={0} className="w-6 h-6 border-2 rounded-full mr-2 text-center">
                                {paymentMethod === "pix" ? "●" : ""}
                            </label>
                            <label col={1}>PIX</label>
                        </gridLayout>
                    </stackLayout>
                </stackLayout>

                {/* Order Total */}
                <stackLayout className="bg-white p-4 rounded-lg">
                    <gridLayout columns="*, auto">
                        <label col={0} className="text-xl font-bold">Total</label>
                        <label col={1} className="text-xl font-bold text-green-600">R$ {total.toFixed(2)}</label>
                    </gridLayout>
                </stackLayout>

                {/* Place Order Button */}
                <button
                    className="bg-green-600 text-white p-4 rounded-lg text-lg font-semibold"
                    onTap={handlePlaceOrder}
                >
                    Place Order
                </button>
            </stackLayout>
        </scrollView>
    );
}