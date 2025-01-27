import { RouteProp } from '@react-navigation/core';
import * as React from "react";
import { FrameNavigationProp } from "react-nativescript-navigation";
import { MainStackParamList } from "../../NavigationParamList";

type ChatScreenProps = {
    route: RouteProp<MainStackParamList, "Chat">,
    navigation: FrameNavigationProp<MainStackParamList, "Chat">,
};

export function ChatScreen({ route }: ChatScreenProps) {
    const [message, setMessage] = React.useState("");
    // Mock messages - replace with real-time chat implementation
    const [messages] = React.useState([
        { id: 1, text: "Hello!", sender: "them", time: "10:00" },
        { id: 2, text: "Hi there!", sender: "me", time: "10:01" }
    ]);

    const handleSend = () => {
        if (message.trim()) {
            // TODO: Implement actual message sending
            setMessage("");
        }
    };

    return (
        <gridLayout rows="*, auto" className="bg-gray-100">
            <scrollView row={0} className="p-4">
                <stackLayout className="space-y-2">
                    {messages.map((msg) => (
                        <stackLayout
                            key={msg.id}
                            className={`p-3 rounded-lg max-w-[80%] ${
                                msg.sender === "me"
                                    ? "bg-blue-600 text-white self-end"
                                    : "bg-white text-gray-800"
                            }`}
                        >
                            <label className="text-sm">{msg.text}</label>
                            <label className="text-xs opacity-70">{msg.time}</label>
                        </stackLayout>
                    ))}
                </stackLayout>
            </scrollView>

            <gridLayout row={1} columns="*, auto" className="p-2 bg-white">
                <textField
                    col={0}
                    className="p-2 border rounded-lg"
                    hint="Type a message..."
                    text={message}
                    onTextChange={(e) => setMessage(e.value)}
                />
                <button
                    col={1}
                    className="ml-2 bg-blue-600 text-white p-2 rounded-lg w-16"
                    onTap={handleSend}
                >
                    Send
                </button>
            </gridLayout>
        </gridLayout>
    );
}