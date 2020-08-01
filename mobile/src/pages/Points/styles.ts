import styled, { css } from 'styled-components/native'
import { StatusBar } from 'react-native'

export const Container = styled.View`
  flex: 1;
  padding: 0 32px;
  padding-top: ${20 + Number(StatusBar.currentHeight)}px;
`

export const Title = styled.Text`
  font-size: 20px;
  font-weight: bold;
  margin-top: 24px;
`

export const Description = styled.Text`
  color: #6c6c80;
  font-size: 16px;
  margin-top: 4px;
`

export const MapContainer = styled.View`
  flex: 1;
  width: 100%;
  border-radius: 10px;
  overflow: hidden;
  margin-top: 16px;
`

export const ItemsContainer = styled.View`
  flex-direction: row;
  margin-top: 16px;
  margin-bottom: 32px;
`

interface ItemProps {
  selected?: boolean
}

export const Item = styled.TouchableOpacity<ItemProps>`
  background-color: #fff;
  border-width: 2px;
  border-color: #eee;
  height: 120px;
  width: 120px;
  border-radius: 8px;
  padding: 20px 16px 16px;
  margin-right: 8px;
  align-items: center;
  justify-content: space-between;
  text-align: center;

  ${props =>
    props.selected &&
    css`
      background: #e1faec;
      border-color: #34cb79;
      border-width: 2px;
    `}
`

export const ItemTitle = styled.Text`
  text-align: center;
  font-size: 13px;
`
