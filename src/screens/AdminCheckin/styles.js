import styled from 'styled-components/native'

import { Input, Button } from '../../components'

export const Container = styled.View`
  flex: 1;
  background-color: white;
`

export const AccessCodeLabel = styled.Text`
  margin: 30px 20px 10px 20px;
  font-size: 18px;
  font-weight: bold;
  color: #354C4C;
  padding: 5px;
  border-radius: 5px;
  background-color: rgba(57, 76, 76, .1);
`

export const AccessCodeInput = styled(Input)`
  elevation: 8;
  margin: 0 20px;
  margin-bottom: 30px;
`

export const JustificationLabel = styled.Text`
  margin: 0 20px 10px 20px;
  font-size: 18px;
  font-weight: bold;
  color: #354C4C;
  padding: 5px;
  border-radius: 5px;
  background-color: rgba(57, 76, 76, .1);
`

export const JustificationInput = styled.TextInput`
  padding: 16px;
  elevation: 8;
  border-radius: 25px;
  background-color: white;
  color: #4C4C4C;
  margin: 0 20px;
  margin-bottom: 20px;
`

export const AuthorizationButton = styled(Button)``
