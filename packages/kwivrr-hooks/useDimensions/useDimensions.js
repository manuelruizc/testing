import React from 'react'
import { Dimensions } from 'react-native'

function useDimensions() {
    const { width, height } = Dimensions.get('screen')
    return {
        screenWidth: width,
        screenHeight: height
    }
}

export default useDimensions
