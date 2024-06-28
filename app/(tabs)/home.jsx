import { View, Text, SafeAreaView, FlatList, Image, RefreshControl, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { images } from '../../constants'
import SearchInput from '../../components/SearchInput'
import Trending from '../../components/Trending'
import EmptyState from '../../components/EmptyState'
import { getAllPosts, getLatestPosts } from '../../lib/appwrite'
import useAppwrite from '../../lib/useAppwrite'
import VideoCard from '../../components/VideoCard'

const Home = () => {

  const { data: posts, reflesh } = useAppwrite(getAllPosts) 
  const {data: latestPosts} = useAppwrite(getLatestPosts) 

  const [refleshing, setRefleshing] = useState(false)

  const onReflesh = async () => {
    setRefleshing(true)
    //Re call videos in any videos appears 
    await reflesh()
    setRefleshing(false)
  }


  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <VideoCard video={item} />
        )}
        ListHeaderComponent={() => (
          <View className="my-6 px-4 space-y-6">
            <View className="justify-between items-start flex-row mb-6">
              <View>
                <Text className="font-pmedium text-sm text-gray-100">
                  Content de vous revoir
                </Text>
                <Text className="text-2xl font-psemibold text-white">
                  oussa
                </Text>
              </View>

              <View className="mt-1.5">
                <Image
                  source={images.logoSmall}
                  className="w-9 h-10"
                  resizeMode='contain'
                />
              </View>
            </View>

            <SearchInput />

            <View className="w-full flex-1 pt-5 pb-8">
              <Text className="text-gray-100 text-lg font-pregular mb-3">
                Dernières vidéos
              </Text>

              <Trending
                posts={latestPosts}
              />
            </View>
          </View>
        )}

        ListEmptyComponent={() => (
          <EmptyState
            title="Pas de vidéos trouvés"
            subtitle="Soyez la première personne à créer une vidéo."
          />
        )}

        refreshControl={<RefreshControl refleshing={refleshing} onRefresh={onReflesh} />}
      />
    </SafeAreaView>
  )
}

export default Home