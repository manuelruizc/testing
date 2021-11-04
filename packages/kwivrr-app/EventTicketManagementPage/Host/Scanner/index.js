import React, { useEffect, useState } from 'react';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { Button, Text, View, StyleSheet } from 'react-native';
import kwivrrApi from 'kwivrr-common/sdk';

const Scanner = ({ findTicket, closeModal }) => {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);

    useEffect(() => {
        (async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    const handleBarCodeScanned = ({ type, data }) => {
        setScanned(true);
        // const ticketId = kwivrrApi.getTicketIdFromQrCode(data);
        const dataSplitted = data.split('/');
        const ticketId = dataSplitted[dataSplitted.length - 1];
        findTicket(ticketId);
        closeModal();
    };

    if (hasPermission === null) {
        return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    return (
        <View style={{ flex: 1, width: '100%', height: 300 }}>
            <BarCodeScanner
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                style={StyleSheet.absoluteFillObject}
            />
            {scanned && (
                <Button
                    title={'Tap to Scan Again'}
                    onPress={() => setScanned(false)}
                />
            )}
        </View>
    );
};

export default Scanner;
