import useStyles from 'kwivrr-hooks/useStyles';
import React from 'react';
import { View } from 'react-native';
import Speaker from '../Speaker';
import styles from './styles';

function Speakers({ children, speakers }) {
    const classes = useStyles(styles);
    if (speakers.length === 0) {
        return <React.Fragment></React.Fragment>;
    }
    return (
        <View style={classes.container}>
            {speakers.map((speaker, index) => (
                <Speaker key={index} speakerObject={speaker} />
            ))}
        </View>
    );
}

export default Speakers;
