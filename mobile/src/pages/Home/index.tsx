import React from 'react'
import { Image } from 'react-native'
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

  function handleNavigation() {
    navigation.navigate('Points')
  }

  return (
    <Container source={require('../../assets/home-background.png')}>
      <Main>
        <Image source={require('../../assets/logo.png')} />
        <Title>Seu marketplace de coleta de resíduos</Title>
        <Description>
          Ajudamos pessoas a encontrar pontos de coleta de forma eficiente
        </Description>
      </Main>

      <Footer>
        <Button onPress={handleNavigation}>
          <ButtonIcon>
            <Icon />
          </ButtonIcon>
          <ButtonText>Entrar</ButtonText>
        </Button>
      </Footer>
    </Container>
  )
}

export default Home
