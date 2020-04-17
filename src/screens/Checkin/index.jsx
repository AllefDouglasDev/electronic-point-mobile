import React, { useState } from 'react'
import { ScrollView } from 'react-native'

import Keyboard from './Keyboard'
import {
  Container,
  Form,
  TextInput,
  CheckinButton,
} from './styles'

export default function Checkin({ navigation }) {
  const [accessCode, setAccessCode] = useState('')

  function handleCheckin() {
    navigation.navigate('AdminCheckin')
  }

  function handleAdminCheckin() {
    navigation.navigate('AdminCheckin')
  }

  function handleKeyboard(value) {
    if (!isNaN(value)) {
      setAccessCode(`${accessCode}${value}`)
    } else {
      handleAction(value)
    }
  }

  function handleAction(action) {
    switch (action) {
      case 'back':
        if (accessCode.length > 0) {
          const newAccessCode = accessCode.substr(0, accessCode.length - 1)
          setAccessCode(newAccessCode)
        }
        break;
      case 'clean':
        setAccessCode('')
        break;
    }
  }

  return (
    <Container>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Form>
          <TextInput placeholder='Código de Acesso' editable={false} value={accessCode} />

          <Keyboard onPress={handleKeyboard}/>
        </Form>
      </ScrollView>

      <CheckinButton text='REGISTRAR' color='#354C4C' textColor='#FCE1E3' onPress={handleCheckin}/>
    </Container>
  )
}
