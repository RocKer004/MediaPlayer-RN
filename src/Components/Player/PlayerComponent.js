/* eslint-disable prettier/prettier */
import React, { useEffect, useRef, useState } from "react";
import {View, Text, SafeAreaView, FlatList,Image, Animated} from "react-native";
import playlist from "../../Source";
import playerStyle from "./PlayerStyle"
import { windowWidth,windowHeight } from "../../NativeElements/Dimensions/WindowDimensions";
import Controller from "../../Controllers/Controller"
import TrackPlayer from 'react-native-track-player/';
import { Event } from "react-native-track-player/lib/interfaces";

const PlayerComponent = () => {

    const scrollX = useRef (new Animated.Value(0)).current;
    const [slideIndex,setSlideIndex] = useState(0);
    const [playing,setPlaying] = useState(false);
    const [loading, setLoading] = useState(false);
    const PlayerIsReady = useRef(false);
    const slider = useRef(null);

    useEffect(()=>{
        scrollX.addListener(({value}) =>{
            const index= Math.round(value/windowWidth);
            setSlideIndex(index)
        })

        TrackPlayer.addEventListener(Event.PlaybackTrackChanged, (e) => {
            console.log(e)
        })

        TrackPlayer.setupPlayer().then( async () => {
            console.log("Player is Ready !")
            await TrackPlayer.reset();
            await TrackPlayer.add(playlist)
            PlayerIsReady.current = true;
           // TrackPlayer.play()
           
        })
        return () => {
            scrollX.removeAllListeners();
        }
       
    }, []);

    useEffect(()=>{
     
        PlayerIsReady.current && TrackPlayer.skip(playlist[slideIndex].id)
        
   
    },[slideIndex]
    )
    
    const play = () => {
        !playing && TrackPlayer.play();
        setPlaying(true);
    }

    const pause = () => {
        playing && TrackPlayer.pause();
        setPlaying(false);
    }
    const skipNext = () =>{
        slider.current.scrollToOffset({
            offset : (slideIndex + 1) * windowWidth
        })
    }
    const skipPrevious = () =>{
        slider.current.scrollToOffset({
            offset : (slideIndex - 1) * windowWidth
        })
    }

    const renderItem = ({item}) =>
    (
    <View style={playerStyle.imageContainer}>
        <Image style={playerStyle.image} source={item.albumart} />
    </View>
    )


    return (
        <View style={playerStyle.container}>
            <SafeAreaView style={{height: 320}}>
            <FlatList 
            ref={slider}
            data={playlist} 
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
            <Controller onSkipNext ={skipNext} onSkipPrevious={skipPrevious} onPlay ={play} onPause = {pause} playing={playing} />
        </View>
        
    )
}

export default PlayerComponent;