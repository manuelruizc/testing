import React, { memo, useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Navigation from './packages/kwivrr-app/Navigation';
import { useFonts } from 'expo-font';
import { StatusBar, Text } from 'react-native';
import { MiniModalsProvider } from 'kwivrr-common/MiniModalsContext';
import MiniModals from './MiniModals';
import { ToastProvider } from 'kwivrr-common/ToastContext';
import Toast from 'kwivrr-ui/Toast';
import { AuthProvider } from 'kwivrr-common/AuthContext';
import { QRCodeProvider } from 'kwivrr-common/QRCodeContext';
import { ShareModalProvider } from 'kwivrr-common/ShareModalContext';
import SplashScreen from './SplashScreen';
import { ThemeProvider } from 'kwivrr-common/ThemeContext';
import { BottomSheetProvider } from 'kwivrr-common/BottomSheetContext';
import { SearchProvider } from 'kwivrr-common/SearchContext';
import { ConfirmModalProvider } from 'kwivrr-common/ConfirmModalContext';
import { QueryClient, QueryClientProvider } from 'react-query';
import { WaitListProvider } from 'kwivrr-common/WaitListContext';
import AppActionsProvider from 'kwivrr-common/AppActionsContext';

const queryClient = new QueryClient();

function Rootcomponent({ children }) {
    const navigationRef = React.createRef();

    return (
        <React.Fragment>
            <AppActionsProvider>
                <QueryClientProvider client={queryClient}>
                    <ThemeProvider>
                        <WaitListProvider>
                            <ConfirmModalProvider>
                                <ShareModalProvider>
                                    <QRCodeProvider>
                                        <BottomSheetProvider>
                                            <SearchProvider>
                                                <AuthProvider>
                                                    <ToastProvider>
                                                        <MiniModalsProvider>
                                                            <NavigationContainer
                                                                ref={
                                                                    navigationRef
                                                                }
                                                            >
                                                                <StatusBar barStyle="light-content" />
                                                                <Navigation />
                                                                <MiniModals
                                                                    navigationRef={
                                                                        navigationRef
                                                                    }
                                                                />
                                                            </NavigationContainer>
                                                            <Toast />
                                                        </MiniModalsProvider>
                                                    </ToastProvider>
                                                </AuthProvider>
                                            </SearchProvider>
                                        </BottomSheetProvider>
                                    </QRCodeProvider>
                                </ShareModalProvider>
                            </ConfirmModalProvider>
                        </WaitListProvider>
                    </ThemeProvider>
                </QueryClientProvider>
            </AppActionsProvider>
        </React.Fragment>
    );
}

export default memo(Rootcomponent);
