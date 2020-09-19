import React from "react"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import ControllerButton from "../NativeElements/UIelements/ControllerButton"
import {View,Text,TouchableOpacity} from "react-native"
import controllerStyle from "./ControllerStyle"
import { usePlaybackState } from "react-native-track-player/lib/hooks";

const Controller = (props) => {
    let playing = usePlaybackState();
    
    return(
    <View style={controllerStyle.container}>
    <ControllerButton icon="skip-previous" color="black" size={46} onClick ={props.onSkipPrevious} />
    {props.playing ? 
    <ControllerButton icon="pause" color="black" size={46} onClick ={props.onPause}/>
    :
    <ControllerButton icon="play" color="black" size={46} onClick ={props.onPlay}/>
    }
    <ControllerButton icon="skip-next" color="black" size={46}  onClick={props.onSkipNext} />
    </View>
    )
}

export default Controller;