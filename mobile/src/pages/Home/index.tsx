import React, { useState } from 'react'
import { Image, KeyboardAvoidingView, Platform } from 'react-native'
import { useNavigation } from '@react-navigation/native'

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

const Home: React.FC = () => {
  const navigation = useNavigation()

  const [uf, setUf] = useState('')
  const [city, setCity] = useState('')

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
          <Input
            placeholder="Digite a Uf"
            maxLength={2}
            autoCapitalize="characters"
            autoCorrect={false}
            value={uf}
            onChangeText={setUf}
          />

          <Input
            placeholder="Digite a Cidade"
            autoCapitalize="words"
            value={city}
            onChangeText={setCity}
          />

          <Button onPress={() => navigation.navigate('Points', { uf, city })}>
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
