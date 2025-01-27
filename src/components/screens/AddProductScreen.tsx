import { Dialogs } from '@nativescript/core';
import { RouteProp } from '@react-navigation/core';
import * as React from "react";
import { FrameNavigationProp } from "react-nativescript-navigation";
import { MainStackParamList } from "../../NavigationParamList";

type AddProductScreenProps = {
    route: RouteProp<MainStackParamList, "AddProduct">,
    navigation: FrameNavigationProp<MainStackParamList, "AddProduct">,
};

export function AddProductScreen({ navigation }: AddProductScreenProps) {
    const [name, setName] = React.useState("");
    const [price, setPrice] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [category, setCategory] = React.useState("");
    const [condition, setCondition] = React.useState("");
    const [stock, setStock] = React.useState("");
    const [images, setImages] = React.useState<string[]>([]);
    const [shipping, setShipping] = React.useState("");

    const handleAddImage = () => {
        // TODO: Implement image picker
        setImages([...images, "res://icon"]);
    };

    const handleSubmit = async () => {
        if (!name || !price || !description || !category || !condition || !stock || images.length === 0) {
            await Dialogs.alert("Please fill in all required fields and add at least one image");
            return;
        }

        // TODO: Implement actual product creation
        navigation.navigate("ManageProducts");
    };

    return (
        <scrollView className="bg-gray-100">
            <stackLayout className="p-4 space-y-4">
                {/* Product Images */}
                <stackLayout className="bg-white p-4 rounded-lg">
                    <label className="text-lg font-bold mb-2">Product Images</label>
                    <scrollView orientation="horizontal" className="h-24">
                        <stackLayout orientation="horizontal" className="space-x-2">
                            {images.map((image, index) => (
                                <image
                                    key={index}
                                    src={image}
                                    className="w-24 h-24 rounded-lg"
                                    stretch="aspectFill"
                                />
                            ))}
                            <button
                                className="w-24 h-24 bg-gray-100 rounded-lg text-4xl text-gray-400"
                                onTap={handleAddImage}
                            >
                                +
                            </button>
                        </stackLayout>
                    </scrollView>
                </stackLayout>

                {/* Basic Information */}
                <stackLayout className="bg-white p-4 rounded-lg space-y-4">
                    <label className="text-lg font-bold">Basic Information</label>
                    
                    <textField
                        className="border rounded-lg p-3"
                        hint="Product Name"
                        text={name}
                        onTextChange={(e) => setName(e.value)}
                    />

                    <textField
                        className="border rounded-lg p-3"
                        hint="Price"
                        keyboardType="number"
                        text={price}
                        onTextChange={(e) => setPrice(e.value)}
                    />

                    <textField
                        className="border rounded-lg p-3"
                        hint="Category"
                        text={category}
                        onTextChange={(e) => setCategory(e.value)}
                    />

                    <textField
                        className="border rounded-lg p-3"
                        hint="Condition"
                        text={condition}
                        onTextChange={(e) => setCondition(e.value)}
                    />

                    <textField
                        className="border rounded-lg p-3"
                        hint="Stock Quantity"
                        keyboardType="number"
                        text={stock}
                        onTextChange={(e) => setStock(e.value)}
                    />
                </stackLayout>

                {/* Description */}
                <stackLayout className="bg-white p-4 rounded-lg">
                    <label className="text-lg font-bold mb-2">Description</label>
                    <textView
                        className="border rounded-lg p-3 h-32"
                        hint="Detailed product description"
                        text={description}
                        onTextChange={(e) => setDescription(e.value)}
                    />
                </stackLayout>

                {/* Shipping */}
                <stackLayout className="bg-white p-4 rounded-lg">
                    <label className="text-lg font-bold mb-2">Shipping Information</label>
                    <textView
                        className="border rounded-lg p-3 h-24"
                        hint="Shipping options and conditions"
                        text={shipping}
                        onTextChange={(e) => setShipping(e.value)}
                    />
                </stackLayout>

                {/* Submit Button */}
                <button
                    className="bg-green-600 text-white p-4 rounded-lg text-lg font-semibold"
                    onTap={handleSubmit}
                >
                    List Product
                </button>
            </stackLayout>
        </scrollView>
    );
}