import React from 'react'
import { Text, View, StyleSheet, Image, TouchableOpacity  } from 'react-native'

const HeroesListItem = props => {
    const { hero, navigateHeroDetail } = props
    return (
        <TouchableOpacity onPress={() => navigateHeroDetail({hero})}>
            <View key={ hero.id } style={ style.heroesContainerList }>
                <Image style={ style.avatar } source={{ uri: hero.thumbnail.path + '/portrait_small.' + hero.thumbnail.extension }} />
                <Text style={ style.heroesTextList }>{ hero.name }</Text>
            </View>
        </TouchableOpacity>
    )
}

const style = StyleSheet.create({
    heroesContainerList: {
        marginLeft: 8,
        marginRight: 8,
        borderBottomWidth: 2,
        borderBottomColor: '#2D2D2D',
        paddingLeft: 12,
        paddingRight: 12,
        position: 'relative',
        alignItems: 'center',
        flexDirection: 'row',
        minHeight: 58
    },
    heroesTextList: {
      color: '#F6F6F6',
      fontSize: 16,
      //fontFamily: 'BarlowCondensed-Regular'
    },
    avatar: {
        aspectRatio: 1,
        width: 45,
        borderRadius: 50,
        marginRight: 8
    }
})
export default HeroesListItem