import styled from 'styled-components/native'

import { Input, Button } from '../../components'

export const Container = styled.View`
  flex: 1;
  background-color: white;
`

export const AccessCodeInput = styled(Input)`
  elevation: 8;
  margin: 40px 20px;
`

export const JustificationInput = styled.TextInput`
  padding: 16px;
  elevation: 8;
  border-radius: 25px;
  background-color: white;
  color: #4C4C4C;
  margin: 20px;
`

export const AuthorizationButton = styled(Button)``
