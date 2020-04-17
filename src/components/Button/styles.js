import styled from 'styled-components/native'

export const Touchable = styled.TouchableOpacity`
  flex: 1;
  padding: 15px 0;
  justify-content: center;
  align-items: center;
  background-color: ${({ color }) => color};
`

export const Text = styled.Text`
  color: ${({ color }) => color};
`
