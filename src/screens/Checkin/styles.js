import styled from 'styled-components/native'

import { Input, Button } from '../../components'

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: white;
  padding: 0 20px;
  padding-top: 80px;
`

export const Form = styled.View`
  margin-top: 20px;
`;

export const TextInput = styled(Input)`
  margin: 0 8px;
  margin-bottom: 20px;
  elevation: 8;
`

export const CheckinButton = styled(Button)``
