import React, { useState } from 'react'
import { ScrollView, KeyboardAvoidingView } from 'react-native'

import { getUserData } from '../../storage/UserSettings'
import {
  Container,
  AccessCodeInput,
  JustificationInput,
  CheckinButton,
} from './styles'

export default function AdminCheckin({ navigation }) {
  const [accessCode, setAccessCode] = useState('')
  const [justification, setJustification] = useState('')

  async function handleCheckin() {
    const user = await getUserData()
    console.log(user)
    // navigation.navigate('Picture')
  }

  function handleAccessCode(value) {
    const lastChar = value.substr(value.length -1, value.length)
    if (!isNaN(lastChar)) {
      setAccessCode(value)
    }
  }

  return (
    <Container>
      <ScrollView>
        <KeyboardAvoidingView behavior='height'>
          <AccessCodeInput
            placeholder='Código de Acesso'
            keyboardType='phone-pad'
            onChangeText={handleAccessCode}
            value={accessCode}
          />

          <JustificationInput
            placeholder='Justificativa'
            multiline
            numberOfLines={8}
            onChangeText={j => setJustification(j)}
            value={justification}
          />
        </KeyboardAvoidingView>
      </ScrollView>

      <CheckinButton text='AUTORIZAR' color='#354C4C' textColor='#FCE1E3' onPress={handleCheckin}/>
    </Container>
  )
}
