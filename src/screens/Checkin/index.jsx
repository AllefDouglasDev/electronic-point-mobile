import React, { useState, useEffect, useRef } from 'react'
import { ScrollView, Alert, StatusBar } from 'react-native'

import { getUser } from '../../services/user.service'
import { saveUser, clear } from '../../storage/UserSettings'
import {
  Container,
  Form,
  TextInput,
  CheckinButton,
  Keyboard,
} from './styles'

export default function Checkin({ navigation, route }) {
  const mounted = useRef(false)
  const [loading, setLoading] = useState(false)
  const [accessCode, setAccessCode] = useState('')

  useEffect(() => {
    mounted.current = true
    StatusBar.setBarStyle('light-content')
    clear()
    
    return () => mounted.current = false
  }, [])

  useEffect(() => {
    if (route.params && route.params.resetAccessCode) {
      setAccessCode('')
    }
  }, [route.params])

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
    <>
      <Container>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Form>
            <TextInput secureTextEntry placeholder='Código de Acesso' editable={false} value={accessCode} />

            <Keyboard onPress={handleKeyboard}/>
          </Form>
        </ScrollView>
      </Container>

      <CheckinButton
        text='REGISTRAR'
        color='#354C4C'
        onPress={handleCheckin}
        loading={loading}
        disabled={loading}
      />
    </>
  )
}
