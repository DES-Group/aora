import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'

const useAppwrite = (fn) => {

    const [data, setData] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const fetchData = async () => {
        setIsLoading(true)

        try {
            posts = await fn();
            setData(posts)

        } catch (error) {
            Alert.alert('Erreur', error.message)
        }
        finally {
            setIsLoading(false)
        }
    }
    
    useEffect(() => {
        
        fetchData()
    }, [])

    const reflesh = () => fetchData()

    return { data, isLoading, reflesh }
}

export default useAppwrite