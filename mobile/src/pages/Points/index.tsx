import React from 'react'
import { TouchableOpacity, ScrollView } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/Feather'
import { SvgUri } from 'react-native-svg'

import {
  Container,
  Title,
  Description,
  MapContainer,
  Map,
  MapMarkerContainer,
  MapMarker,
  MapMarkerImage,
  MapMarkerTitle,
  ItemsContainer,
  Item,
  ItemTitle,
  SelectedItem,
} from './styles'

const Points: React.FC = () => {
  const navigation = useNavigation()

  return (
    <>
      <Container>
        <TouchableOpacity onPress={navigation.goBack}>
          <Icon name="arrow-left" size={20} color="#34cb79" />
        </TouchableOpacity>

        <Title>😉 Bem vindo.</Title>
        <Description>Encontre no mapa um ponto de coleta.</Description>

        <MapContainer>
          <Map
          // initialRegion={{
          //   latitude: '',
          //   longitude: '',
          //   latitudeDelta: 0.014,
          // }}
          >
            <MapMarker
              // coordinates={{ latitude: '', longitude: '' }}
              onPress={() => navigation.navigate('Details')}
            >
              <MapMarkerContainer>
                <MapMarkerImage source={{}} />
                <MapMarkerTitle>Mercado</MapMarkerTitle>
              </MapMarkerContainer>
            </MapMarker>
          </Map>
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
          <Item onPress={() => {}}>
            <SvgUri
              width={42}
              height={42}
              uri="http://192.168.100.26:3333/uploads/lampadas.svg"
            />
            <ItemTitle>Item</ItemTitle>
          </Item>

          <Item onPress={() => {}}>
            <SvgUri
              width={42}
              height={42}
              uri="http://192.168.100.26:3333/uploads/lampadas.svg"
            />
            <ItemTitle>Item</ItemTitle>
          </Item>

          <Item onPress={() => {}}>
            <SvgUri
              width={42}
              height={42}
              uri="http://192.168.100.26:3333/uploads/lampadas.svg"
            />
            <ItemTitle>Item</ItemTitle>
          </Item>

          <Item onPress={() => {}}>
            <SvgUri
              width={42}
              height={42}
              uri="http://192.168.100.26:3333/uploads/lampadas.svg"
            />
            <ItemTitle>Item</ItemTitle>
          </Item>

          <Item onPress={() => {}}>
            <SvgUri
              width={42}
              height={42}
              uri="http://192.168.100.26:3333/uploads/lampadas.svg"
            />
            <ItemTitle>Item</ItemTitle>
          </Item>

          <Item onPress={() => {}}>
            <SvgUri
              width={42}
              height={42}
              uri="http://192.168.100.26:3333/uploads/lampadas.svg"
            />
            <ItemTitle>Item</ItemTitle>
          </Item>
        </ScrollView>
      </ItemsContainer>
    </>
  )
}

export default Points
