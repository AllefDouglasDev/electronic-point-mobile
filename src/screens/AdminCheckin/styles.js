import styled from 'styled-components/native'

import { Input, Button } from '../../components'

export const Container = styled.View`
  flex: 1;
  background-color: white;
  padding-top: 80px;
`

export const AccessCodeInput = styled(Input)`
  elevation: 8;
  margin: 20px;
`

export const JustificationInput = styled.TextInput`
  padding: 16px;
  elevation: 8;
  border-radius: 25px;
  background-color: white;
  color: #4C4C4C;
  margin: 20px;
`

export const CheckinButton = styled(Button)`
  margin: 20px;
`
