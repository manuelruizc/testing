import useDimensions from "kwivrr-hooks/useDimensions";
import useTheme from "kwivrr-hooks/useTheme";

function useAnimatedClasses(stylesheet, animatedValues, payload) {
    const theme = useTheme()
    const { screenWidth, screenHeight } = useDimensions()
    if (!stylesheet) {
        return {};
    }
    const styles = stylesheet({...theme, screenHeight, screenWidth, animatedValues, ...animatedValues, ...payload});
    return styles;
}

export default useAnimatedClasses;
