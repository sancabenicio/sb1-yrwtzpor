import * as React from 'react';
import { start } from 'react-nativescript';
import { MainStack } from './components/MainStack';
import { CartProvider } from './contexts/CartContext';
import { ThemeProvider } from './contexts/ThemeContext';

// Controls react-nativescript log verbosity
Object.defineProperty(global, '__DEV__', { value: false });

const App = () => (
    React.createElement(ThemeProvider, {},
        React.createElement(CartProvider, {},
            React.createElement(MainStack, {})
        )
    )
);

start(React.createElement(App, {}));