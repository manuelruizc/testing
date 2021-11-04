// import React from 'react';
// import { LogBox } from 'react-native';
// import Rootcomponent from './RootComponent';

// LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
// LogBox.ignoreAllLogs(); //Ignore all log notifications

// // console.log = () => {};

// global.addEventListener = () => {};
// global.removeEventListener = () => {};

// export default function App() {
//     return <Rootcomponent />;
// }
import React from 'react';
import { findNodeHandle, View, Button, StyleSheet } from 'react-native';

import { R5VideoView } from 'react-native-red5pro';
import { R5LogLevel } from 'react-native-red5pro';
import { publish, unpublish, swapCamera } from 'react-native-red5pro';

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.refs = {
            video: null,
        };

        this.state = {
            publisher: {
                ref: 'video',
                configuration: {
                    host: 'your.red5pro.deploy', // IP or Fully Qualified Domain Name
                    port: 8554,
                    contextName: 'live',
                    bufferTime: 0.5,
                    streamBufferTime: 2,
                    key: Math.floor(Math.random() * 0x10000).toString(16),
                    bundleID: 'com.red5pro.example',
                    licenseKey: 'YOUR-LICENSE-KEY',
                    streamName: 'mystream',
                },
                showDebugView: true,
                logLevel: R5LogLevel.DEBUG,
                onConfigured: this.onConfigured.bind(this),
            },
        };

        this.onStop = this.onStop.bind(this);
        this.onSwapCamera = this.onSwapCamera.bind(this);
    }

    render() {
        return (
            <View style={styles.container}>
                <R5VideoView {...this.state.publisher} style={styles.video} />
                <Button
                    style={styles.button}
                    onPress={this.onStop}
                    title="Stop"
                    accessibilityLabel="Stop"
                />
                <Button
                    style={styles.button}
                    onPress={this.onSwapCamera}
                    title="Swap Camera"
                    accessibilityLabel="Swap Camera"
                />
            </View>
        );
    }

    onConfigured() {
        // By providing the `configuration` state prop to the view,
        // the component starts the configuration process.

        const streamName = this.state.publisher.configuration.streamName;
        publish(findNodeHandle(this.refs.video), streamName);
    }

    onStop() {
        unpublish(findNodeHandle(this.refs.video));
    }

    onSwapCamera() {
        swapCamera(findNodeHandle(this.refs.video));
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
    },
    video: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'black',
    },
    button: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        height: 40,
        backgroundColor: 'blue',
        color: 'white',
    },
});
