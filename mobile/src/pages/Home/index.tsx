import React, { useState, useEffect } from 'react'
import { Image, KeyboardAvoidingView, Platform } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Picker } from '@react-native-community/picker'
import axios from 'axios'

import {
  Container,
  Main,
  Title,
  Description,
  Footer,
  Select,
  Input,
  Button,
  ButtonIcon,
  Icon,
  ButtonText,
} from './styles'

interface IBGEUfResponse {
  sigla: string
  nome: string
}

interface IBGECityResponse {
  nome: string
}

interface Uf {
  initials: string
  name: string
}

const Home: React.FC = () => {
  const navigation = useNavigation()

  const [ufs, setUfs] = useState<Uf[]>([])
  const [cities, setCities] = useState<string[]>([])

  const [selectedUf, setSelectedUf] = useState('')
  const [selectedCity, setSelectedCity] = useState('')

  useEffect(() => {
    axios
      .get('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
      .then(response => {
        const sortedUfs = response.data
          .map((uf: IBGEUfResponse) => ({
            initials: uf.sigla,
            name: uf.nome,
          }))
          .sort((a: Uf, b: Uf) => (a.name > b.name ? 1 : -1))
        setUfs(sortedUfs)
      })
  }, [])

  useEffect(() => {
    axios
      .get(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`
      )
      .then(response => {
        setCities(response.data.map((city: IBGECityResponse) => city.nome))
      })
  }, [selectedUf])

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <Container source={require('../../assets/home-background.png')}>
        <Main>
          <Image source={require('../../assets/logo.png')} />
          <Title>Seu marketplace de coleta de resíduos</Title>
          <Description>
            Ajudamos pessoas a encontrar pontos de coleta de forma eficiente
          </Description>
        </Main>

        <Footer>
          <Select>
            <Picker
              selectedValue={selectedUf}
              onValueChange={value => setSelectedUf(String(value))}
            >
              <Picker.Item label="Selecione uma UF" value="" />
              {ufs.map(uf => (
                <Picker.Item
                  label={`${uf.initials} - ${uf.name}`}
                  value={uf.initials}
                  key={uf.initials}
                />
              ))}
            </Picker>
          </Select>

          <Select>
            <Picker
              selectedValue={selectedCity}
              onValueChange={value => setSelectedCity(String(value))}
            >
              <Picker.Item label="Selecione uma cidade" value="" />
              {cities.map(city => (
                <Picker.Item label={city} value={city} key={city} />
              ))}
            </Picker>
          </Select>

          <Button
            onPress={() =>
              navigation.navigate('Points', {
                uf: selectedUf,
                city: selectedCity,
              })
            }
          >
            <ButtonIcon>
              <Icon />
            </ButtonIcon>
            <ButtonText>Entrar</ButtonText>
          </Button>
        </Footer>
      </Container>
    </KeyboardAvoidingView>
  )
}

export default Home
