import {StyleSheet} from "react-native"
import {windowHeight, windowWidth} from "../NativeElements/Dimensions/WindowDimensions"
const style = StyleSheet.create({
    image : {
        width: 320,
        height: 320
    },
    imageContainer : {
        width : windowWidth,
        alignItems : "center"
    },
    title: {
        fontSize: 26,
        textAlign:"center",
        textTransform:"capitalize"
    },
    artist: {
        fontSize: 18,
        textAlign:"center",
        textTransform:"capitalize"
    },
    container: {
        justifyContent: "space-evenly",
        height: windowHeight,
        maxHeight : 500
    }
})

export default style;