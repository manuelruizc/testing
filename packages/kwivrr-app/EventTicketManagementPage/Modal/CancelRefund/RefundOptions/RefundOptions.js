import React from 'react';
import { View } from 'react-native';
import KwivrrCreditLogo from '../KwivrrCreditLogo';
import TextRegular from 'kwivrr-ui/TextRegular';
import KwivrrSwitch from 'kwivrr-ui/KwivrrSwitch';
import KwivrrImage from 'kwivrr-ui/KwivrrImage';
import useStyles from 'kwivrr-hooks/useStyles';
import styles from './styles';

function RefundOptions({ onChange, value, label, credits, ...rest }) {
    const classes = useStyles(styles);
    return (
        <View style={classes.refundOptionContainer}>
            {!credits ? (
                <TextRegular style={classes.label} size={16}>
                    {label}
                </TextRegular>
            ) : (
                <View style={classes.credits}>
                    <TextRegular size={16}>Issue only</TextRegular>
                    <KwivrrCreditLogo
                        style={{
                            width: 16 + 10,
                            height: 16 + 10,
                        }}
                    />
                    <TextRegular size={16}>credits?</TextRegular>
                </View>
            )}
            <KwivrrSwitch
                {...rest}
                onChange={onChange}
                // onChange={() => setRefund((prev) => !prev)}
                value={value}
                // value={refund}
            />
        </View>
    );
}

// function RefundOptions({ ticketID, orderID }) {
//     const classes = useStyles(styles);
//     return (
//         <View
//             style={{
//                 flexDirection: 'row',
//                 alignItems: 'center',
//                 justifyContent: 'space-between',
//                 width: '80%',
//                 paddingTop: 12,
//                 paddingBottom: 18,
//             }}
//         >
//             <View
//                 style={{
//                     flexDirection: 'row',
//                     alignItems: 'center',
//                     justifyContent: 'flex-start',
//                     width: '44%',
//                 }}
//             >
//                 <TextRegular style={{ marginRight: 12 }} size={12}>
//                     Refund Amount
//                 </TextRegular>
//                 <InputComponent
//                     keyboardType="decimal-pad"
//                     placeholder="$ 0"
//                     style={classes.inputComponent}
//                     inputStyle={classes.inputStyle}
//                     editable={false}
//                 />
//             </View>
//             <View
//                 style={{
//                     flexDirection: 'row',
//                     alignItems: 'center',
//                     justifyContent: 'flex-end',
//                     width: '44%',
//                 }}
//             >
//                 <TextRegular style={{ marginRight: 12 }} size={12}>
//                     Credit Amount
//                 </TextRegular>
//                 <InputComponent
//                     keyboardType="decimal-pad"
//                     placeholder="$ 0"
//                     style={classes.inputComponent}
//                     inputStyle={classes.inputStyle}
//                     editable={false}
//                 />
//             </View>
//         </View>
//     );
// }

export default RefundOptions;
