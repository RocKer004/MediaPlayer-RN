import React from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {TouchableOpacity} from "react-native"

const ControllerButton = props =>{
    return(
        <TouchableOpacity onPress={props.onClick}>
        <MaterialCommunityIcons
                      name={props.icon}
                      color={props.color}
                      size={props.size}
                    />
         </TouchableOpacity>
    )

}

export default ControllerButton;