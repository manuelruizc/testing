import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import TextHeader from 'kwivrr-ui/TextHeader';
import useStyles from 'kwivrr-hooks/useStyles';
import styles from './styles';
import TextRegular from '../../../TextRegular';

function TicketsSelection({ setTickets, tickets, type = 'VIP' }) {
    const classes = useStyles(styles);
    return (
        <View style={{ flex: 1 }}>
            <View style={classes.labelContainer}>
                <TextHeader size={18}>{type}</TextHeader>
            </View>
            <View style={classes.ticketsButtons}>
                <TouchableOpacity
                    onPress={() =>
                        setTickets((prev) => (prev - 1 < 0 ? prev : prev - 1))
                    }
                    style={classes.ticketButton}
                >
                    <TextHeader color="white" size={28}>
                        -
                    </TextHeader>
                </TouchableOpacity>
                <View style={classes.numberTickets}>
                    <TextHeader color="white" size={28}>
                        {tickets}
                    </TextHeader>
                </View>
                <TouchableOpacity
                    onPress={() => setTickets((prev) => prev + 1)}
                    style={classes.ticketButton}
                >
                    <TextHeader color="white" size={28}>
                        +
                    </TextHeader>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default TicketsSelection;
