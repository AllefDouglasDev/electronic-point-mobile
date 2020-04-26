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

export const Image = styled.Image`
  position: absolute;
  width: 100px;
  height: 160px;
  top: 60px;
  left: ${Math.round(Dimensions.get('window').width) - 120}px;
`
