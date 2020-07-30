import React from 'react'
import { SafeAreaView } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/Feather'
import Whatsapp from 'react-native-vector-icons/FontAwesome'

import {
  Container,
  PointImage,
  PointName,
  PointItems,
  Address,
  AddressTitle,
  AddressContent,
  Footer,
  Button,
  ButtonText,
} from './styles'

const Details: React.FC = () => {
  const navigation = useNavigation()

  return (
    <SafeAreaView>
      <Container>
        <TouchableOpacity>
          <Icon name="arrow-left" size={20} color="#34cb79" />
        </TouchableOpacity>

        <PointImage source={{ uri: '' }} />
        <PointName>Mercado</PointName>
        <PointItems>Lâmpadas, Oleo de cozinha</PointItems>

        <Address>
          <AddressTitle>Endereço</AddressTitle>
          <AddressContent>Araguari, MG</AddressContent>
        </Address>
      </Container>
      <Footer>
        <Button onPress={() => {}}>
          <Whatsapp name="whatsapp" size={20} color="#fff" />
          <ButtonText>Whatsapp</ButtonText>
        </Button>

        <Button onPress={() => {}}>
          <Icon name="mail" size={20} color="#fff" />
          <ButtonText>E-mail</ButtonText>
        </Button>
      </Footer>
    </SafeAreaView>
  )
}

export default Details
