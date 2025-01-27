import { ObservableArray } from '@nativescript/core';
import { RouteProp } from '@react-navigation/core';
import * as React from "react";
import { FrameNavigationProp } from "react-nativescript-navigation";
import { MainStackParamList } from "../../NavigationParamList";
import { CartContext } from "../../contexts/CartContext";

type HomeScreenProps = {
    route: RouteProp<MainStackParamList, "Home">,
    navigation: FrameNavigationProp<MainStackParamList, "Home">,
};

interface Product {
    id: string;
    name: string;
    price: number;
    image: string;
    description: string;
    location: string;
    postedAt: string;
    category: string;
    relevanceScore: number;
    createdAt: Date;
}

type SortOption = 'newest' | 'price-asc' | 'price-desc' | 'relevance';

export function HomeScreen({ navigation }: HomeScreenProps) {
    const { getTotalItems } = React.useContext(CartContext);
    const [selectedCategory, setSelectedCategory] = React.useState("all");
    const [searchQuery, setSearchQuery] = React.useState("");
    const [sortBy, setSortBy] = React.useState<SortOption>('newest');
    const [showSortOptions, setShowSortOptions] = React.useState(false);
    const [favorites, setFavorites] = React.useState<string[]>([]);
    
    const allProducts = new ObservableArray<Product>([
        {
            id: "1",
            name: "Vintage Camera",
            price: 299.99,
            image: "res://icon",
            description: "Classic vintage camera in excellent condition",
            location: "São Paulo",
            postedAt: "2h ago",
            category: "electronics",
            relevanceScore: 95,
            createdAt: new Date('2024-01-20T10:00:00')
        },
        {
            id: "2",
            name: "Mountain Bike",
            price: 450,
            image: "res://icon",
            description: "Professional mountain bike, barely used",
            location: "Rio de Janeiro",
            postedAt: "5h ago",
            category: "sports",
            relevanceScore: 88,
            createdAt: new Date('2024-01-20T07:00:00')
        },
        {
            id: "3",
            name: "Leather Jacket",
            price: 199.99,
            image: "res://icon",
            description: "Genuine leather jacket, perfect condition",
            location: "Curitiba",
            postedAt: "1d ago",
            category: "fashion",
            relevanceScore: 92,
            createdAt: new Date('2024-01-19T15:00:00')
        },
        {
            id: "4",
            name: "Antique Table",
            price: 599.99,
            image: "res://icon",
            description: "Beautiful antique wooden table",
            location: "Salvador",
            postedAt: "3d ago",
            category: "home",
            relevanceScore: 85,
            createdAt: new Date('2024-01-17T14:00:00')
        },
        {
            id: "5",
            name: "Gaming Console",
            price: 899.99,
            image: "res://icon",
            description: "Latest gaming console with controllers",
            location: "Brasília",
            postedAt: "6h ago",
            category: "electronics",
            relevanceScore: 98,
            createdAt: new Date('2024-01-20T06:00:00')
        }
    ]);

    const categories = [
        { id: 'all', name: 'All', icon: '🏠' },
        { id: 'electronics', name: 'Electronics', icon: '📱' },
        { id: 'fashion', name: 'Fashion', icon: '👕' },
        { id: 'home', name: 'Home', icon: '🏡' },
        { id: 'sports', name: 'Sports', icon: '⚽' }
    ];

    const sortOptions = [
        { id: 'newest', name: 'Newest First', icon: '🕒' },
        { id: 'price-asc', name: 'Price: Low to High', icon: '💰' },
        { id: 'price-desc', name: 'Price: High to Low', icon: '💎' },
        { id: 'relevance', name: 'Most Relevant', icon: '⭐' }
    ];

    const toggleFavorite = (productId: string) => {
        setFavorites(prev => 
            prev.includes(productId)
                ? prev.filter(id => id !== productId)
                : [...prev, productId]
        );
    };

    const filteredAndSortedProducts = React.useMemo(() => {
        const filtered = allProducts.filter(product => {
            const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
            const matchesSearch = searchQuery === '' || 
                product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                product.description.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesCategory && matchesSearch;
        });

        return filtered.sort((a, b) => {
            switch (sortBy) {
                case 'newest':
                    return b.createdAt.getTime() - a.createdAt.getTime();
                case 'price-asc':
                    return a.price - b.price;
                case 'price-desc':
                    return b.price - a.price;
                case 'relevance':
                    return b.relevanceScore - a.relevanceScore;
                default:
                    return 0;
            }
        });
    }, [allProducts, selectedCategory, searchQuery, sortBy]);

    const getCurrentSortName = () => {
        return sortOptions.find(option => option.id === sortBy)?.name || 'Sort By';
    };

    return (
        <gridLayout rows="auto, auto, auto, *, auto" className="bg-gray-100">
            <gridLayout row={0} columns="auto, *, auto, auto" className="responsive-padding bg-white border-b border-gray-200">
                <image
                    col={0}
                    src="res://icon"
                    className="w-8 h-8 mr-3"
                    stretch="aspectFit"
                />
                <searchBar
                    col={1}
                    hint="Search in No Bindi..."
                    text={searchQuery}
                    onTextChange={(e) => setSearchQuery(e.value)}
                    onSubmit={() => {/* Handle search submit */}}
                    className="bg-gray-100 rounded-full"
                />
                <stackLayout col={2} className="relative">
                    <button
                        className="ml-2 p-2"
                        onTap={() => navigation.navigate("Cart")}
                    >
                        🛒
                    </button>
                    {getTotalItems() > 0 && (
                        <label
                            className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 text-center"
                        >
                            {getTotalItems()}
                        </label>
                    )}
                </stackLayout>
                <button
                    col={3}
                    className="ml-2 p-2"
                    onTap={() => {/* Show favorites */}}
                >
                    ❤️
                </button>
            </gridLayout>

            <scrollView row={1} orientation="horizontal" className="bg-white">
                <stackLayout orientation="horizontal" className="responsive-padding">
                    {categories.map(category => (
                        <button
                            key={category.id}
                            className={`mx-2 px-4 py-2 rounded-full ${
                                selectedCategory === category.id
                                    ? 'bg-[#006B3F] text-white'
                                    : 'bg-gray-100 text-gray-700'
                            }`}
                            onTap={() => setSelectedCategory(category.id)}
                        >
                            <formattedString>
                                <span>{category.icon} </span>
                                <span>{category.name}</span>
                            </formattedString>
                        </button>
                    ))}
                </stackLayout>
            </scrollView>

            <gridLayout row={2} className="bg-white border-t border-gray-200">
                <button
                    className="p-3 text-gray-700"
                    onTap={() => setShowSortOptions(!showSortOptions)}
                >
                    <formattedString>
                        <span>🔄 </span>
                        <span>{getCurrentSortName()}</span>
                    </formattedString>
                </button>
                {showSortOptions && (
                    <stackLayout className="absolute top-12 left-0 right-0 bg-white shadow-lg z-10">
                        {sortOptions.map(option => (
                            <button
                                key={option.id}
                                className={`p-4 border-b border-gray-100 ${
                                    sortBy === option.id ? 'bg-gray-50' : ''
                                }`}
                                onTap={() => {
                                    setSortBy(option.id as SortOption);
                                    setShowSortOptions(false);
                                }}
                            >
                                <formattedString>
                                    <span>{option.icon} </span>
                                    <span>{option.name}</span>
                                </formattedString>
                            </button>
                        ))}
                    </stackLayout>
                )}
            </gridLayout>

            {filteredAndSortedProducts.length > 0 ? (
                <scrollView row={3}>
                    <wrapLayout className="responsive-padding responsive-grid">
                        {filteredAndSortedProducts.map((product) => (
                            <gridLayout
                                key={product.id}
                                className="product-card bg-white rounded-lg shadow-sm"
                                rows="auto, auto"
                            >
                                <gridLayout row={0} className="relative">
                                    <image
                                        src={product.image}
                                        className="responsive-image rounded-t-lg"
                                        stretch="aspectFill"
                                        onTap={() => navigation.navigate("ProductDetails", { productId: product.id })}
                                    />
                                    <button
                                        className="absolute top-2 right-2 w-8 h-8 bg-white rounded-full"
                                        onTap={() => toggleFavorite(product.id)}
                                    >
                                        {favorites.includes(product.id) ? '❤️' : '🤍'}
                                    </button>
                                </gridLayout>
                                <stackLayout
                                    row={1}
                                    className="p-3"
                                    onTap={() => navigation.navigate("ProductDetails", { productId: product.id })}
                                >
                                    <label className="text-subtitle">{product.name}</label>
                                    <label className="text-[#006B3F] font-bold">R$ {product.price.toFixed(2)}</label>
                                    <label className="text-xs text-gray-500">{product.location} • {product.postedAt}</label>
                                </stackLayout>
                            </gridLayout>
                        ))}
                    </wrapLayout>
                </scrollView>
            ) : (
                <gridLayout row={3} className="p-4">
                    <stackLayout verticalAlignment="center" horizontalAlignment="center">
                        <label className="text-display text-center mb-4">🔍</label>
                        <label className="text-title text-center">No products found</label>
                        <label className="text-body text-center">Try adjusting your search or filters</label>
                    </stackLayout>
                </gridLayout>
            )}

            <gridLayout row={4} columns="*, *, *, *" className="bg-white responsive-padding border-t border-gray-200">
                <stackLayout col={0} className="text-center" onTap={() => {}}>
                    <label className="text-2xl">🏠</label>
                    <label className="text-xs">Home</label>
                </stackLayout>
                <stackLayout col={1} className="text-center" onTap={() => navigation.navigate("Chat", { userId: "all" })}>
                    <label className="text-2xl">💬</label>
                    <label className="text-xs">Messages</label>
                </stackLayout>
                <stackLayout col={2} className="text-center" onTap={() => navigation.navigate("AddProduct")}>
                    <label className="text-2xl">➕</label>
                    <label className="text-xs">Sell</label>
                </stackLayout>
                <stackLayout col={3} className="text-center" onTap={() => navigation.navigate("Profile")}>
                    <label className="text-2xl">👤</label>
                    <label className="text-xs">Profile</label>
                </stackLayout>
            </gridLayout>
        </gridLayout>
    );
}