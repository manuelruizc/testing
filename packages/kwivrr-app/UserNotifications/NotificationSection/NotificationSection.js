import React, { useMemo } from 'react';
import faker from 'faker';
import moment from 'moment';
import TextHeader from 'kwivrr-ui/TextHeader';
import Notification from '../Notification';
import useStyles from 'kwivrr-hooks/useStyles';
import styles from '../styles';

function NotificationSection({ item, index, navigationRef }) {
    const classes = useStyles(styles);
    const dateTitle = useMemo(() => {
        const today = moment(new Date()).format('MM-DD-YYYY');
        const yesterday = moment(new Date())
            .subtract(1, 'day')
            .format('MM-DD-YYYY');
        const sectionDate = moment(item.createdAt).format('MM-DD-YYYY');
        if (today === sectionDate) return 'Today';
        if (yesterday === sectionDate) return 'Yesterday';
        return moment(item.createdAt).format('MMMM DD');
    }, [item.createdAt]);

    return (
        <>
            <TextHeader style={classes.title} size={18}>
                {dateTitle}
            </TextHeader>
            {/* {item.map((item, idx) => {
                return (
                    <React.Fragment key={faker.datatype.uuid()}>
                        <Notification
                            key={idx}
                            navigationRef={navigationRef}
                            dateTitle={dateTitle}
                            item={item}
                            index={idx}
                        />
                    </React.Fragment>
                );
            })} */}
        </>
    );
}

export default NotificationSection;
