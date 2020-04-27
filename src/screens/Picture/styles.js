import styled from 'styled-components/native'
import { Dimensions } from 'react-native'

export const Container = styled.View`
  flex: 1;
`

export const CenterItemsContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`

export const Title = styled.Text``

export const CameraContent = styled.View`
  flex: 1;
  background-color: transparent;
  flex-direction: row;
`

export const ButtonsContainer = styled.View`
  width: 100%;
  flex-direction: row;
  align-self: flex-end;
  background-color: transparent;
  padding: 20px;
  justify-content: center;
  align-items: center;
`

export const FlipButton = styled.TouchableOpacity`
  flex: 1;
  justify-content: center;
  align-items: center;
`

export const TakePictureButton = styled.TouchableOpacity`
  flex: 1;
  justify-content: center;
  align-items: center;
`

export const ConfirmButton = styled.TouchableOpacity`
  flex: 1;
  justify-content: center;
  align-items: center;
`

export const ResultContainer = styled.View`
  position: absolute;
  width: 100px;
  height: 180px;
  top: 60px;
  left: ${Math.round(Dimensions.get('window').width) - 120}px;
`

export const Image = styled.Image`
  width: 100px;
  height: 160px;
`

export const UserName = styled.Text`
  color: #fff;
  margin-top: 5px;
  text-align: center;
  max-width: 100px;
  font-weight: bold;
  font-size: 18px;
  background-color: rgba(0, 0, 0, .4)
`
