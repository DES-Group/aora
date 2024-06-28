import { View, Text, FlatList, TouchableOpacity, ImageBackground } from 'react-native'
import React, { useEffect, useState } from 'react'
import * as Animatable from 'react-native-animatable'


const zoomIn = {
    0: {
        scale: 0.9
    }, 
    1: {
        scale: 1
    }
}

const zoomOut = {
    0: {
        scale: 1
    }, 
    1: {
        scale: 0.9
    }
}



const TrendingItem = ({ activeItem, item }) => {
    
    const [play, setPlay] = useState(false)

    return (
        <Animatable.View
            className="mr-5"
            animation={activeItem === item.$id ? zoomIn : zoomOut}
            duration={500}
        >
            {play ? (
                    <Text className="text-white">playing</Text>
            ) : (
                    <TouchableOpacity
                        className="relative justify-center items-start"
                        activeOpacity={0.7}
                        onPress={() => setPlay(true)}
                    >
                        <ImageBackground
                            source={{
                                uri: item.thumbnail
                            }}
                            className="border-2 w-52 h-72 rounded-[35px] my-5 
                            overflow-hidden shadow-lg shadow-black/40"
                            resizeMode='cover'
                        />
                    </TouchableOpacity>
            )}
        </Animatable.View>
    )
}

const Trending = ({ posts }) => {
    
    const [activeItem, setActiveItem] = useState(posts[0])
  
    return (
        <FlatList
            data={posts}
            keyExtractor={(item) => item.$id}
            renderItem={({ item }) => (
                <TrendingItem
                    activeItem={activeItem}
                    item={item}
                /> 
            )}
            horizontal
        />
    )
}

export default Trending