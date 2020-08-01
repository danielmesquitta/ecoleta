import React, { useEffect, useState } from 'react'
import { TouchableOpacity, ScrollView, Alert } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/Feather'
import { SvgUri } from 'react-native-svg'
import { WebView, WebViewNavigation } from 'react-native-webview'
import api from '../../services/api'

import {
  Container,
  Title,
  Description,
  MapContainer,
  // Map,
  // MapMarkerContainer,
  // MapMarker,
  // MapMarkerImage,
  // MapMarkerTitle,
  ItemsContainer,
  Item,
  ItemTitle,
} from './styles'

interface Item {
  id: number
  title: string
  image_url: string
}

const Points: React.FC = () => {
  const navigation = useNavigation()

  const [items, setItems] = useState<Item[]>([])
  const [selectedItems, setSelectedItems] = useState([1])

  useEffect(() => {
    api.get('items').then(response => setItems(response.data))
  }, [])

  useEffect(() => {
    console.log(String(selectedItems))
  }, [selectedItems])

  function handleSelectItem(id: number) {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter(selectedId => selectedId !== id))
    } else {
      setSelectedItems([...selectedItems, id])
    }
  }

  function handleNavigation(id: number) {
    navigation.navigate('Details')
  }

  function handleWebViewData(event: WebViewNavigation) {
    const { url } = event

    if (url.includes('id')) {
      const { id: pointId } = url
        .split('?')[1]
        .split('&')
        .map(item => item.split('='))
        .map(([key, value]) => ({ [key]: value }))[3]

      navigation.navigate('Details', { pointId })
    }
  }

  return (
    <>
      <Container>
        <TouchableOpacity onPress={navigation.goBack}>
          <Icon name="arrow-left" size={20} color="#34cb79" />
        </TouchableOpacity>

        <Title>😉 Bem vindo.</Title>
        <Description>Encontre no mapa um ponto de coleta.</Description>

        <MapContainer>
          <WebView
            source={{
              uri: `http://192.168.100.26:3000/maps?city=Araguari&uf=MG&items=${String(
                selectedItems
              )}`,
            }}
            geolocationEnabled={true}
            onNavigationStateChange={handleWebViewData}
          />
          {/* <Map
            initialRegion={{
              latitude: -24,
              longitude: -24,
              latitudeDelta: 0.014,
              longitudeDelta: 0.014,
            }}
          >
            <MapMarker
              coordinate={{ latitude: -24, longitude: -24 }}
              onPress={() => navigation.navigate('Details')}
            >
              <MapMarkerContainer>
                <MapMarkerImage source={{}} />
                <MapMarkerTitle>Mercado</MapMarkerTitle>
              </MapMarkerContainer>
            </MapMarker>
          </Map> */}
        </MapContainer>
      </Container>
      <ItemsContainer>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 20,
          }}
        >
          {items.map(item => (
            <Item
              key={String(item.id)}
              onPress={() => handleSelectItem(item.id)}
              selected={selectedItems.includes(item.id)}
            >
              <SvgUri width={42} height={42} uri={item.image_url} />
              <ItemTitle>{item.title}</ItemTitle>
            </Item>
          ))}
        </ScrollView>
      </ItemsContainer>
    </>
  )
}

export default Points
