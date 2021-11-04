import React, { useMemo } from 'react';
import { View, ActivityIndicator, Text, ScrollView } from 'react-native';
import useStyles from 'kwivrr-hooks/useStyles';
import styles from './styles';

const ResultQuery = ({
    query,
    Success,
    Error,
    Loading,
    normalizeProps = (props) => ({ ...props }),
    ...rest
}) => {
    const { isLoading, isFetching, isError, isSuccess, data, ...queryRest } =
        query;

    const classes = useStyles(styles);
    const normalizedProps = useMemo(() => {
        if (data === undefined || data === null) return data;
        return normalizeProps(data);
    }, [data]);

    if (isFetching) {
        if (Loading) {
            return (
                <Loading
                    data={data}
                    isLoading={isLoading}
                    isError={isError}
                    {...rest}
                    {...queryRest}
                />
            );
        }
        return (
            <View style={classes.loadingContainer}>
                <ActivityIndicator color="red" size="small" />
            </View>
        );
    }
    if (isSuccess) {
        return (
            <Success
                data={data}
                isLoading={isLoading}
                isError={isError}
                {...rest}
                {...queryRest}
                {...normalizedProps}
            />
        );
    }
    if (isError) {
        if (Error) {
            return (
                <Error
                    data={data}
                    isLoading={isLoading}
                    isError={isError}
                    isFetching={isFetching}
                    isInfinite={isInfinite}
                    {...rest}
                    {...queryRest}
                />
            );
        }
        return <View style={classes.errorContainer}></View>;
    }
    return <></>;
};

export default ResultQuery;
