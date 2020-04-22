import React, { useState, useEffect, useRef } from 'react'
import { ScrollView, Alert } from 'react-native'

import { Keyboard } from '../../components'
import { getUser } from '../../services/user.service'
import { saveUser, clear } from '../../storage/UserSettings'
import {
  Container,
  Form,
  TextInput,
  CheckinButton,
} from './styles'

export default function Checkin({ navigation }) {
  const mounted = useRef(false)
  const [loading, setLoading] = useState(false)
  const [accessCode, setAccessCode] = useState('')

  useEffect(() => {
    mounted.current = true

    clear()

    return () => mounted.current = false
  }, [])

  async function checkin() {
    setLoading(true)

    try {
      const response = await getUser(accessCode)

      if (mounted.current) {
        await saveUser(response.data.user)

        if (response.data.user.autorizacao) {
          navigation.navigate('AdminCheckin')
        } else {
          navigation.navigate('Picture')
        }
      }
    } catch (error) {
      if (mounted.current) handleApiError(error)
    }

    if (mounted.current) setLoading(false)
  }

  function handleApiError(error) {
    if (error.response) {
      const { message } = error.response.data
  
      Alert.alert(
        'Erro',
        message,
        [{ text: 'ENTENDI', onPress: () => {} }],
        { cancelable: false },
      )
    } else {
      Alert.alert(
        'Erro',
        'Opa! Erro ao se registrar :( Tente novamente',
        [{ text: 'ENTENDI', onPress: () => {} }],
        { cancelable: false },
      )
    }

  }

  function handleCheckin() {
    if (accessCode.length <= 0) {
      return Alert.alert(
        'Erro',
        'Informe seu código de acesso',
        [{ text: 'ENTENDI', onPress: () => {} }],
        { cancelable: false },
      )
    }

    checkin()
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
          setAccessCode(prevState => prevState.substr(0, accessCode.length - 1))
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

      <CheckinButton
        text='REGISTRAR'
        color='#354C4C'
        textColor='#FCE1E3'
        onPress={handleCheckin}
        loading={loading}
        disabled={loading}
      />
    </Container>
  )
}
