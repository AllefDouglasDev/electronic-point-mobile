import React, { useState, useEffect, useRef } from 'react'
import { ScrollView, KeyboardAvoidingView, Alert, StatusBar } from 'react-native'

import { authorization } from '../../services/user.service'
import * as UserSettings from '../../storage/UserSettings'
import {
  Container,
  AccessCodeInput,
  JustificationInput,
  AuthorizationButton,
} from './styles'

export default function AdminCheckin({ navigation }) {
  const mounted = useRef(false)
  const [loading, setLoading] = useState(false)
  const [accessCode, setAccessCode] = useState('')
  const [justification, setJustification] = useState('')

  useEffect(() => {
    mounted.current = true

    StatusBar.setBarStyle('light-content')

    return () => mounted.current = false
  }, [])

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

  async function handleAuthorization() {
    if (accessCode.length <= 0) {
      return Alert.alert(
        'Erro',
        'Informe seu código de acesso',
        [{ text: 'ENTENDI', onPress: () => {} }],
        { cancelable: false },
      )
    }

    if (justification.length <= 0) {
      return Alert.alert(
        'Erro',
        'Informe uma justificativa para autorizar',
        [{ text: 'ENTENDI', onPress: () => {} }],
        { cancelable: false },
      )
    }

    setLoading(true)

    try {
      const response = await authorization(accessCode)

      if (mounted.current) {
        await UserSettings.setAdminName(response.data.user.nome) 
        await UserSettings.setJustification(justification)
        navigation.navigate('Picture')
      }
    } catch (error) {
      if (mounted.current)  {
        handleApiError(error)
        setLoading(false)
      }
    }

    if (mounted.current) setLoading(false)
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
            keyboardType='number-pad'
            onChangeText={handleAccessCode}
            value={accessCode}
            secureTextEntry
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

      <AuthorizationButton
        text='AUTORIZAR'
        color='#354C4C'
        onPress={handleAuthorization}
        disabled={loading}
        loading={loading}
      />
    </Container>
  )
}
