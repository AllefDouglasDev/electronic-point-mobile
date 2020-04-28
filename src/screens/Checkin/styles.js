import styled from 'styled-components/native'

import { Input, Button, Keyboard as KeyboardC } from '../../components'

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: white;
  padding: 0 20px;
`

export const Form = styled.View`
  margin-top: 20px;
`;

export const TextInput = styled(Input)`
  margin: 20px 8px;
  elevation: 8;
`

export const CheckinButton = styled(Button)``

export const Keyboard = styled(KeyboardC)`
  margin: 20px 0;
`
