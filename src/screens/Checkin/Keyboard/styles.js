import { Dimensions } from 'react-native'
import styled from 'styled-components/native'

const digitButtonMargin = 20
const digitButtonSize = Math.round(Dimensions.get('window').width) / 3 - digitButtonMargin - 30

export const Container = styled.View``

export const DigitButtonRow = styled.View`
  flex-direction: row;
  justify-content: space-around;
`

export const DigitButton = styled.TouchableOpacity`
  width: ${digitButtonSize}px;
  height: ${digitButtonSize}px;
  background-color: #EBEBEB;
  justify-content: center;
  align-items: center;
  border-radius: ${digitButtonSize / 2}px;
  margin-bottom: ${digitButtonMargin}px;
  elevation: 6;
`

export const DigitNumber = styled.Text`
  font-size: 18px;
  color: #646464;
`
