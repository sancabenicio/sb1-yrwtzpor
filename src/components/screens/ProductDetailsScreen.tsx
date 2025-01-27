import { RouteProp } from '@react-navigation/core';
import * as React from "react";
import { FrameNavigationProp } from "react-nativescript-navigation";
import { MainStackParamList } from "../../NavigationParamList";
import { CartContext } from "../../contexts/CartContext";

type ProductDetailsScreenProps = {
    route: RouteProp<MainStackParamList, "ProductDetails">,
    navigation: FrameNavigationProp<MainStackParamList, "ProductDetails">,
};

interface Review {
    id: string;
    user: {
        name: string;
        avatar: string;
    };
    rating: number;
    comment: string;
    date: string;
}

export function ProductDetailsScreen({ route, navigation }: ProductDetailsScreenProps) {
    const { addToCart } = React.useContext(CartContext);
    const [isFavorite, setIsFavorite] = React.useState(false);
    const [quantity, setQuantity] = React.useState(1);
    const [selectedImage, setSelectedImage] = React.useState(0);
    const [showFullDescription, setShowFullDescription] = React.useState(false);

    // Mock product data - replace with API call
    const product = {
        id: route.params.productId,
        name: "Vintage Camera",
        price: 299.99,
        description: "Professional vintage camera in excellent condition. Perfect for photography enthusiasts. Includes original leather case and manual. Features:\n\n• Original 1960s model\n• Fully mechanical operation\n• Recently serviced\n• Comes with 50mm f/1.8 lens\n• Includes leather case and strap\n• Original manual included\n• Light meter works perfectly\n• All mechanical parts in working order",
        images: ["res://icon", "res://icon", "res://icon", "res://icon"],
        condition: "Like New",
        category: "Electronics",
        brand: "Canon",
        model: "AE-1",
        year: "1976",
        warranty: "30 days seller warranty",
        location: "São Paulo",
        postedAt: "2h ago",
        stock: 5,
        shipping: {
            free: true,
            estimated: "3-5 business days",
            methods: ["Standard", "Express"]
        },
        specifications: [
            { label: "Brand", value: "Canon" },
            { label: "Model", value: "AE-1" },
            { label: "Year", value: "1976" },
            { label: "Type", value: "SLR Camera" },
            { label: "Lens Mount", value: "FD Mount" },
            { label: "Film Format", value: "35mm" }
        ],
        seller: {
            id: "seller1",
            name: "John Doe",
            rating: 4.8,
            totalSales: 156,
            memberSince: "2023",
            responseTime: "< 1 hour",
            avatar: "res://icon"
        },
        rating: {
            average: 4.7,
            total: 28,
            distribution: [5, 15, 5, 2, 1]
        }
    };

    // Mock reviews data
    const reviews: Review[] = [
        {
            id: "1",
            user: {
                name: "Alice Smith",
                avatar: "res://icon"
            },
            rating: 5,
            comment: "Excellent vintage camera! Exactly as described and in perfect working condition.",
            date: "2 days ago"
        },
        {
            id: "2",
            user: {
                name: "Bob Johnson",
                avatar: "res://icon"
            },
            rating: 4,
            comment: "Great camera, fast shipping. Minor wear but works perfectly.",
            date: "1 week ago"
        }
    ];

    const handleQuantityChange = (value: number) => {
        if (value >= 1 && value <= product.stock) {
            setQuantity(value);
        }
    };

    const handleBuyNow = () => {
        navigation.navigate("Checkout", {
            productId: product.id,
            quantity: quantity
        });
    };

    const handleAddToCart = () => {
        addToCart({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.images[0],
            quantity: quantity
        });
        navigation.navigate("Cart");
    };

    const renderRatingStars = (rating: number) => {
        const stars = "⭐".repeat(Math.floor(rating)) + "☆".repeat(5 - Math.floor(rating));
        return stars;
    };

    return (
        <scrollView className="bg-gray-100">
            {/* Image Gallery */}
            <gridLayout rows="*, auto" className="bg-black aspect-square">
                <image
                    row={0}
                    src={product.images[selectedImage]}
                    className="w-full h-full"
                    stretch="aspectFit"
                />
                <scrollView
                    row={1}
                    orientation="horizontal"
                    className="bg-black bg-opacity-50 responsive-padding"
                >
                    <stackLayout orientation="horizontal" className="responsive-gap">
                        {product.images.map((image, index) => (
                            <image
                                key={index}
                                src={image}
                                className={`w-16 h-16 rounded-lg ${
                                    selectedImage === index ? 'border-2 border-white' : ''
                                }`}
                                stretch="aspectFill"
                                onTap={() => setSelectedImage(index)}
                            />
                        ))}
                    </stackLayout>
                </scrollView>
            </gridLayout>
            
            {/* Product Info */}
            <stackLayout className="responsive-padding space-y-4">
                {/* Basic Info */}
                <stackLayout className="bg-white p-4 rounded-2xl space-y-2">
                    <gridLayout columns="*, auto">
                        <label col={0} className="text-2xl font-bold text-gray-800">{product.name}</label>
                        <button
                            col={1}
                            className={`text-2xl ${isFavorite ? 'text-red-500' : 'text-gray-400'}`}
                            onTap={() => setIsFavorite(!isFavorite)}
                        >
                            ❤️
                        </button>
                    </gridLayout>
                    <label className="text-2xl text-[#006B3F] font-bold">R$ {product.price.toFixed(2)}</label>
                    <gridLayout columns="auto, auto, *" className="items-center">
                        <label col={0} className="text-sm text-gray-500 mr-4">{product.location}</label>
                        <label col={1} className="text-sm text-gray-500">Posted {product.postedAt}</label>
                        <label col={2} className="text-right text-sm text-[#006B3F]">{product.stock} available</label>
                    </gridLayout>
                </stackLayout>

                {/* Quantity Selector */}
                <stackLayout className="bg-white p-4 rounded-2xl space-y-2">
                    <label className="text-lg font-semibold">Quantity</label>
                    <gridLayout columns="auto, *, auto" className="items-center">
                        <button
                            col={0}
                            className="bg-gray-100 w-12 h-12 rounded-xl text-xl"
                            onTap={() => handleQuantityChange(quantity - 1)}
                        >
                            -
                        </button>
                        <label col={1} className="text-center text-lg font-medium">{quantity}</label>
                        <button
                            col={2}
                            className="bg-gray-100 w-12 h-12 rounded-xl text-xl"
                            onTap={() => handleQuantityChange(quantity + 1)}
                        >
                            +
                        </button>
                    </gridLayout>
                </stackLayout>

                {/* Shipping Info */}
                <stackLayout className="bg-white p-4 rounded-2xl space-y-2">
                    <label className="text-lg font-semibold">Shipping</label>
                    <gridLayout columns="auto, *" className="items-center">
                        <label col={0} className="text-2xl mr-2">🚚</label>
                        <stackLayout col={1}>
                            <label className="text-[#006B3F] font-medium">
                                {product.shipping.free ? 'Free Shipping' : 'Paid Shipping'}
                            </label>
                            <label className="text-sm text-gray-500">
                                Estimated delivery: {product.shipping.estimated}
                            </label>
                        </stackLayout>
                    </gridLayout>
                </stackLayout>

                {/* Product Details */}
                <stackLayout className="bg-white p-4 rounded-2xl space-y-4">
                    <label className="text-lg font-semibold">Product Details</label>
                    <gridLayout columns="auto, *" rows="auto, auto, auto, auto" className="text-sm">
                        <label col={0} row={0} className="text-gray-500 mr-4">Condition</label>
                        <label col={1} row={0} className="text-gray-800">{product.condition}</label>
                        
                        <label col={0} row={1} className="text-gray-500 mr-4">Category</label>
                        <label col={1} row={1} className="text-gray-800">{product.category}</label>
                        
                        <label col={0} row={2} className="text-gray-500 mr-4">Brand</label>
                        <label col={1} row={2} className="text-gray-800">{product.brand}</label>
                        
                        <label col={0} row={3} className="text-gray-500 mr-4">Warranty</label>
                        <label col={1} row={3} className="text-gray-800">{product.warranty}</label>
                    </gridLayout>
                </stackLayout>

                {/* Description */}
                <stackLayout className="bg-white p-4 rounded-2xl">
                    <label className="text-lg font-semibold mb-2">Description</label>
                    <label className="text-gray-700" textWrap={true}>
                        {showFullDescription 
                            ? product.description 
                            : product.description.slice(0, 150) + "..."}
                    </label>
                    <button
                        className="text-[#006B3F] font-medium mt-2"
                        onTap={() => setShowFullDescription(!showFullDescription)}
                    >
                        {showFullDescription ? "Show Less" : "Read More"}
                    </button>
                </stackLayout>

                {/* Specifications */}
                <stackLayout className="bg-white p-4 rounded-2xl space-y-2">
                    <label className="text-lg font-semibold">Specifications</label>
                    {product.specifications.map((spec, index) => (
                        <gridLayout key={index} columns="*, *" className="text-sm">
                            <label col={0} className="text-gray-500">{spec.label}</label>
                            <label col={1} className="text-right text-gray-800">{spec.value}</label>
                        </gridLayout>
                    ))}
                </stackLayout>

                {/* Seller Info */}
                <stackLayout className="bg-white p-4 rounded-2xl">
                    <gridLayout columns="auto, *, auto" rows="auto, auto" className="items-center">
                        <image
                            row={0}
                            col={0}
                            rowSpan={2}
                            src={product.seller.avatar}
                            className="w-16 h-16 rounded-full mr-3"
                            stretch="aspectFill"
                        />
                        <stackLayout row={0} col={1}>
                            <label className="font-semibold">{product.seller.name}</label>
                            <label className="text-sm text-gray-500">
                                {renderRatingStars(product.seller.rating)} ({product.seller.totalSales} sales)
                            </label>
                        </stackLayout>
                        <button
                            row={0}
                            col={2}
                            rowSpan={2}
                            className="bg-[#006B3F] text-white px-4 py-2 rounded-xl"
                            onTap={() => navigation.navigate("Chat", { userId: product.seller.id })}
                        >
                            Chat
                        </button>
                        <stackLayout row={1} col={1}>
                            <label className="text-sm text-gray-500">
                                Member since {product.seller.memberSince}
                            </label>
                            <label className="text-sm text-gray-500">
                                Response time: {product.seller.responseTime}
                            </label>
                        </stackLayout>
                    </gridLayout>
                </stackLayout>

                {/* Reviews */}
                <stackLayout className="bg-white p-4 rounded-2xl space-y-4">
                    <gridLayout columns="*, auto">
                        <label col={0} className="text-lg font-semibold">Reviews</label>
                        <label col={1} className="text-[#006B3F]">
                            {product.rating.average} {renderRatingStars(product.rating.average)}
                        </label>
                    </gridLayout>

                    {/* Rating Distribution */}
                    <stackLayout className="space-y-2">
                        {product.rating.distribution.map((count, index) => (
                            <gridLayout key={5-index} columns="auto, *, auto" className="items-center">
                                <label col={0} className="text-sm text-gray-500 w-12">
                                    {5-index} stars
                                </label>
                                <stackLayout col={1} className="bg-gray-200 h-2 rounded-full mx-2">
                                    <stackLayout
                                        className="bg-[#006B3F] h-2 rounded-full"
                                        width={`${(count / product.rating.total) * 100}%`}
                                    />
                                </stackLayout>
                                <label col={2} className="text-sm text-gray-500 w-8">
                                    {count}
                                </label>
                            </gridLayout>
                        ))}
                    </stackLayout>

                    {/* Review List */}
                    <stackLayout className="space-y-4">
                        {reviews.map((review) => (
                            <stackLayout key={review.id} className="space-y-2">
                                <gridLayout columns="auto, *">
                                    <image
                                        col={0}
                                        src={review.user.avatar}
                                        className="w-10 h-10 rounded-full mr-3"
                                        stretch="aspectFill"
                                    />
                                    <stackLayout col={1}>
                                        <label className="font-medium">{review.user.name}</label>
                                        <label className="text-sm text-gray-500">
                                            {renderRatingStars(review.rating)}
                                        </label>
                                    </stackLayout>
                                </gridLayout>
                                <label className="text-gray-700" textWrap={true}>{review.comment}</label>
                                <label className="text-sm text-gray-500">{review.date}</label>
                            </stackLayout>
                        ))}
                    </stackLayout>
                </stackLayout>
            </stackLayout>

            {/* Bottom Action Bar */}
            <gridLayout columns="*, *" className="bg-white responsive-padding border-t border-gray-200">
                <button
                    col={0}
                    className="bg-gray-100 text-gray-800 p-4 rounded-xl mx-2 font-medium"
                    onTap={handleAddToCart}
                >
                    Add to Cart
                </button>
                <button
                    col={1}
                    className="bg-[#006B3F] text-white p-4 rounded-xl mx-2 font-medium"
                    onTap={handleBuyNow}
                >
                    Buy Now • R$ {(product.price * quantity).toFixed(2)}
                </button>
            </gridLayout>
        </scrollView>
    );
}