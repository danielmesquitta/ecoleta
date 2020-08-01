import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'
import { TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/Feather'
import Whatsapp from 'react-native-vector-icons/FontAwesome'
import api from '../../services/api'

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

interface Params {
  pointId: string
}

interface Data {
  point: {
    image: string
    name: string
    email: string
    whatsapp: string
    city: string
    uf: string
  }
  items: { title: string }[]
}

const Details: React.FC = () => {
  const navigation = useNavigation()
  const { pointId } = useRoute().params as Params

  const [data, setData] = useState<Data>({} as Data)

  useEffect(() => {
    api.get(`points/${pointId}`).then(response => setData(response.data))
  }, [])

  if (!data.point) {
    return null
  }
  const { point, items } = data

  return (
    <>
      <Container>
        <TouchableOpacity onPress={navigation.goBack}>
          <Icon name="arrow-left" size={20} color="#34cb79" />
        </TouchableOpacity>

        <PointImage source={{ uri: point.image }} />
        <PointName>{point.name}</PointName>
        <PointItems>{items.map(item => item.title).join(', ')}</PointItems>

        <Address>
          <AddressTitle>Endereço</AddressTitle>
          <AddressContent>{`${point.city}, ${point.uf}`}</AddressContent>
        </Address>
      </Container>
      <Footer>
        <Button onPress={() => {}}>
          <Whatsapp name="whatsapp" size={20} color="#fff" />
          <ButtonText>Whatsapp</ButtonText>
        </Button>

        <Button onPress={() => {}}>
          <Icon name="mail" size={20} color="#fff" />
          <ButtonText>Email</ButtonText>
        </Button>
      </Footer>
    </>
  )
}

export default Details
