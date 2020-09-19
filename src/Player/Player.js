import React, { useEffect, useRef, useState } from "react";
import {View, Text, SafeAreaView, FlatList,Image, Animated} from "react-native";
import playlist from "../Source";
import playerStyle from "../Player/PlayerStyle"
import { windowWidth,windowHeight } from "../NativeElements/Dimensions/WindowDimensions";

const Player = () => {

    const scrollX = useRef (new Animated.Value(0)).current;
    const [slideIndex,setSlideIndex] = useState(0)


    useEffect(()=>{
        scrollX.addListener(({value}) =>{
            const index= Math.round(value/windowWidth);
            setSlideIndex(index)
            console.log(index)
        })
    })


    const renderItem = ({item}) =>
    (
    <View style={playerStyle.imageContainer}>
        <Image style={playerStyle.image} source={item.image} />
    </View>
    )


    return (
        <View style={playerStyle.container}>
            <SafeAreaView>
            <FlatList data={playlist} 
            renderItem={renderItem} 
            keyExtractor={(item)=>item.id}
            horizontal
            showsHorizontalScrollIndicator ={false}
            pagingEnabled
            scrollEventThrottle={16}
            onScroll={Animated.event([{nativeEvent: {contentOffset: {x:scrollX}}}], {useNativeDriver : false})}
            />
        </SafeAreaView>
            <View>
            <Text style={playerStyle.title}>{playlist[slideIndex].title}</Text>
            <Text style={playerStyle.artist}>{playlist[slideIndex].artist}</Text>
            </View>
        </View>
        
    )
}

export default Player;