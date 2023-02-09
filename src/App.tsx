import React, { FC, lazy, Suspense } from 'react'

import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { Outline } from '@/components/Outline';
import { theme } from '@/theme';
import Tracker from '@/Tracker';
import Viewport from '@/Viewport';
import { CartProvider } from '@/views/Cart/cartProvider';

const Content = lazy(() => import('@/views/Content'));
const Cart = lazy(() => import('@/views/Cart'));
const PaymentSuccess = lazy(() => import('@/views/PaymentSuccess'));

const queryClient = new QueryClient();

export const App: FC = () => {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <QueryClientProvider client={queryClient}>
                <BrowserRouter>
                    <Tracker>
                        <CartProvider>
                            <Suspense fallback={<Outline />}>
                                <Viewport>
                                    <Routes>
                                        <Route path="/" element={<Content />} />
                                        <Route path="/:slug" element={<Content />} />
                                        <Route path="/:type/:slug" element={<Content />} />
                                        <Route path="/cart" element={<Cart />} />
                                        <Route path="/success" element={<PaymentSuccess />} />
                                        <Route path="/preview/:slug" element={<Content preview />} />
                                        <Route path="/preview/:type/:slug" element={<Content preview />} />
                                    </Routes>
                                </Viewport>
                            </Suspense>
                        </CartProvider>
                    </Tracker>
                </BrowserRouter>
            </QueryClientProvider>
        </ThemeProvider >
    )
}

export default App;