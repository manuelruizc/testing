const styles = ({
    shadows,
    screenHeight,
    screenWidth,
    dhPercentage,
    dwPercentage,
}) => {
    const HEIGHT_16_9 = screenWidth * 0.5625;
    return {
        container: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'white',
        },
        coverImage: {
            width: screenWidth,
            height: screenHeight * 0.16,
            transform: [{ scaleX: -1 }], // just for thor image
        },
        userInfoContainer: {
            width: screenWidth * 0.96,
            backgroundColor: 'white',
            padding: 12,
            borderRadius: 6,
            marginTop: -28,
            ...shadows(1),
        },
        topInfo: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
        },
        email: {
            flexDirection: 'row',
            marginBottom: 8,
        },
        phone: {
            flexDirection: 'row',
        },
        socialMedia: {
            flexDirection: 'row',
        },
        social: {
            marginRight: 12,
        },
        profilePicture: {
            position: 'absolute',
            left: '42%',
            top: '-24%',
            borderRadius: 10000,
            padding: 8,
            backgroundColor: 'white',
        },
        bottomInfo: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            paddingTop: 20,
        },
        bottomButton: {
            paddingHorizontal: 22,
            paddingVertical: 3,
            backgroundColor: 'rgb(211, 105, 99)',
        },
        follow: {
            backgroundColor: 'rgb(211, 105, 99)',
        },
        shop: {
            backgroundColor: 'rgb(228, 189, 83)',
        },
        userData: {
            alignItems: 'center',
            justifyContent: 'center',
        },
        upcomingEvents: {
            width: screenWidth * 0.94,
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            marginTop: 18,
        },
        header: {
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 22,
            marginBottom: 18,
        },
        filter: {
            width: '44%',
            borderRadius: 10000,
            borderWidth: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            overflow: 'hidden',
        },
        filterPressing: {
            width: '50%',
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: 6,
        },
        filterPressing2: {
            width: '50%',
            justifyContent: 'center',
            alignItems: 'center',
            borderLeftWidth: 1,
            paddingVertical: 6,
        },
        eventsContainer: {
            width: '100%',
            flex: 1,
        },
        card: {
            width: screenWidth * 0.76,
            backgroundColor: 'white',
            borderRadius: 10,
            overflow: 'hidden',
            borderWidth: 1,
            borderColor: 'rgba(0, 0, 0, 0.15)',
            marginRight: screenWidth * 0.04,
        },
        cardImage: {
            width: '100%',
            height: 180,
        },
        cardFooter: {
            paddingVertical: 12,
            paddingHorizontal: 12,
        },
        topInfo: {
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 6,
        },
        topInfoOptions: {
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
        },

        // ???
        footageContainer: {
            width: screenWidth,
            marginTop: 28,
        },
        footage: {
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            flexWrap: 'wrap',
        },
        footageCard: {
            width: screenWidth * 0.52,
            marginBottom: 18,
            borderWidth: 2,
            borderColor: 'rgba(0, 0, 0, 0.15)',
            borderRadius: 8,
        },
        footageCardImage: {
            width: '100%',
            height: screenWidth * 0.48,
        },
        footageInfo: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 8,
            paddingVertical: 8,
        },
        footageIcons: {
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
        },

        // ?????
        shopping: {
            width: screenWidth,
        },
        shoppingCard: {
            width: screenWidth * 0.52,
            borderWidth: 2,
            borderColor: 'rgba(0, 0, 0, 0.15)',
            borderRadius: 8,
        },
        shoppingCardImage: {
            width: '100%',
            height: screenWidth * 0.36,
        },
        shoppingInfo: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingVertical: 10,
            paddingHorizontal: 12,
        },
        shoppingButton: {
            paddingHorizontal: 8,
            paddingVertical: 3,
            backgroundColor: 'rgb(211, 105, 99)',
        },
        shoppingIcons: {
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'flex-end',
            alignItems: 'center',
        },

        attendedEvents: {
            width: screenWidth,
        },

        // ?? ?
        attendedEventCard: {
            width: screenWidth * 0.52,
            marginLeft: screenWidth * 0.03,
            overflow: 'hidden',
            borderWidth: 2,
            borderColor: 'rgba(0, 0, 0, 0.15)',
            borderRadius: 8,
        },
        attendedEventCardImage: {
            width: '100%',
            height: screenWidth * 0.3,
        },
        attendedEventInfo: {
            width: '100%',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            paddingHorizontal: 10,
            paddingVertical: 12,
        },

        coverImage: {
            // width: '100%',
            // height: '100%',
        },
        scrollStyle: {
            flex: 1,
            width: '100%',
        },
        scrollContent: {
            flexGrow: 1,
            alignItems: 'center',
            backgroundColor: 'transparent',
            marginTop: dhPercentage(2),
            paddingBottom: 40,
            paddingTop: 200,
        },
        row: {
            width: '100%',
            paddingVertical: 24,
            backgroundColor: 'white',
        },
        rowTitle: {
            textAlign: 'center',
            marginBottom: 18,
        },
        rowHeaderWithOption: {
            width: '100%',
            height: 'auto',
            justifyContent: 'center',
            alignItems: 'center',
        },
        addShopItem: {
            position: 'absolute',
            top: 0,
            right: 12,
        },
    };
};

export default styles;
