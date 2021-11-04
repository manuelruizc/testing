import useDimensions from 'kwivrr-hooks/useDimensions';
import useTheme from 'kwivrr-hooks/useTheme';

function useAnimatedClasses(stylesheet, animatedValues, payload) {
    const theme = useTheme();
    const { screenWidth, screenHeight } = useDimensions();
    if (!stylesheet) {
        return {};
    }
    const styles = stylesheet({
        ...theme,
        // ...animatedValues,
        ...payload,
        screenHeight,
        screenWidth,
        animatedValues,
        OS: Platform.OS,
    });
    return styles;
}

export default useAnimatedClasses;
