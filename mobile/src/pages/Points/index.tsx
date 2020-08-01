import React, { useEffect, useState } from 'react'
import { TouchableOpacity, ScrollView } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/Feather'
import { SvgUri } from 'react-native-svg'
import { WebView, WebViewNavigation } from 'react-native-webview'
import api from '../../services/api'

import {
  Container,
  Title,
  Description,
  MapContainer,
  ItemsContainer,
  Item,
  ItemTitle,
} from './styles'

interface Item {
  id: number
  title: string
  image_url: string
}

interface Params {
  uf: string
  city: string
}

type Tuple = [string | number, any]

const Points: React.FC = () => {
  const navigation = useNavigation()
  const { uf, city } = useRoute().params as Params

  const [items, setItems] = useState<Item[]>([])
  const [selectedItems, setSelectedItems] = useState([1])

  useEffect(() => {
    api.get('items').then(response => setItems(response.data))
  }, [])

  function handleSelectItem(id: number) {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter(selectedId => selectedId !== id))
    } else {
      setSelectedItems([...selectedItems, id])
    }
  }

  function handleNavigation(event: WebViewNavigation) {
    const { url } = event
    if (url.includes('&id=')) {
      function fromEntries(arr: Tuple[]) {
        return Object.assign({}, ...Array.from(arr, ([k, v]) => ({ [k]: v })))
      }
      const query = fromEntries(
        url
          .split('?')[1]
          .split('&')
          .map(item => item.split('=')) as Tuple[]
      )
      const { id: pointId } = query
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
              uri: `http://192.168.100.26:3000/maps?city=${city}&uf=${uf}&items=${String(
                selectedItems
              )}`,
            }}
            geolocationEnabled={true}
            onNavigationStateChange={handleNavigation}
          />
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
