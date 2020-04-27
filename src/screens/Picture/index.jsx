import React, { useState, useEffect, useRef } from 'react'
import { Camera } from 'expo-camera'
import { Ionicons, MaterialIcons } from '@expo/vector-icons'
import { StatusBar, Alert, ActivityIndicator } from 'react-native'

import * as UserSettings from '../../storage/UserSettings'
import { getFormattedDate } from '../../utils/date'
import { uploadImage, register } from '../../services/user.service'
import {
  Container,
  Title,
  CameraContent,
  ButtonsContainer,
  FlipButton,
  TakePictureButton,
  ConfirmButton,
  CenterItemsContainer,
  ResultContainer,
  Image,
  UserName,
} from './styles'

export default function Picture({ navigation }) {
  const DESIRED_RATIO = '16:9'
  
  const mounted = useRef(false)
  const camera = useRef(null)

  const [user, setUser] = useState({})
  const [photo, setPhoto] = useState(null)
  const [loading, setLoading] = useState(null)
  const [isCameraReady, setIsCameraReady] = useState(false)
  const [hasPermission, setHasPermission] = useState(null)
  const [type, setType] = useState(Camera.Constants.Type.front)
  const [isTakingPicture, setIsTakingPicture] = useState(false)
  const [ratio, setRatio] = useState(DESIRED_RATIO)

  useEffect(() => {
    mounted.current = true;

    (async () => {
      const { status } = await Camera.requestPermissionsAsync()
      const userData = await UserSettings.getUserData()
      setUser(userData)
      setHasPermission(status === 'granted')
    })()

    StatusBar.setBarStyle('light-content')

    return () => {
      mounted.current = false
      StatusBar.setBarStyle('dark-content')
    }
  }, [])

  useEffect(() => {
    (async () => {
      if (isCameraReady) {
        const ratios = await camera.current.getSupportedRatiosAsync()
        const correctRatio = ratios.find((ratio) => ratio === DESIRED_RATIO) || ratios[ratios.length - 1]

        setRatio(correctRatio)
      }
    })()
  }, [isCameraReady])

  async function sendImage(registerId, date, hour) {
    if (!loading) setLoading(true)

    try {
      const imageData = { uri: photo.uri, name: 'user-image', type: 'image/jpg' }
      await uploadImage(imageData, registerId)

      if (mounted.current) {
        await UserSettings.clear()

        const formattedDate = getFormattedDate(date)
        const alertText = 
          `Registro realizado com sucesso\n\nData: ${formattedDate}\nHora: ${hour}`
  
        Alert.alert(
          'Sucesso',
          alertText,
          [{
            text: 'CONFIRMAR',
            onPress: () =>
              navigation.navigate('Checkin', { resetAccessCode: true })
          }],
          { cancelable: false },
        )
      }
    } catch (error) {
      if (mounted.current) {
        Alert.alert(
          'Erro',
          'Erro ao enviar a foto. Por favor, verifique sua conexão com a internet e tente novamente',
          [{ text: 'ENTENDI', onPress: () => {} }],
          { cancelable: false },
        )
      }

      setLoading(false)
    }
  } 

  function handleFlip() {
    setType(
      type === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back
    )
  }

  async function handleTakePicture() {
    if (isCameraReady && camera.current !== null) {
      setIsTakingPicture(true)
      
      const response = await camera.current.takePictureAsync({
        quality: 0.1,
        base64: true
      })

      if (mounted.current) {
        setIsTakingPicture(false)
        setPhoto(response)
      }
    }
  }

  async function handleConfirm() {
    if (photo === null) {
      return Alert.alert(
        'Foto não encontrada',
        'Tire uma foto do seu rosto',
        [{ text: 'ENTENDI', onPress: () => {} }],
        { cancelable: false },
      )
    }

    setLoading(true)
    
    try {
      const justification = await UserSettings.getJustification()
      const adminName = await UserSettings.getAdminName()

      const response = await register({
        userId: user.id,
        adminName,
        justification,
        register: user.registro
      })

      if (mounted.current) {
        const { id, data, hora } = response.data.register
        sendImage(id, data, hora)
      }
    } catch (error) {
      if (mounted.current) {
        setLoading(false)

        Alert.alert(
          'Erro',
          'Erro ao registrar. Por favor, verifique sua conexão com a internet e tente novamente',
          [{ text: 'ENTENDI', onPress: () => {} }],
          { cancelable: false },
        )
      }
    }
  }

  if (hasPermission === null) {
    return (
      <CenterItemsContainer>
        <ActivityIndicator size='large' color='#354C4C'/>
      </CenterItemsContainer>    
    )
  }

  if (hasPermission === false) {
    return (
      <CenterItemsContainer>
        <Title>Habilite a permissão de câmera</Title>
      </CenterItemsContainer>
    )
  }

  return (
    <Container>
      <Camera
        ref={camera}
        style={{ flex: 1 }}
        ratio={ratio}
        type={type}
        onCameraReady={() => setIsCameraReady(true)}
      >
        <CameraContent>
          {photo !== null && (
            <ResultContainer>
              <Image source={{ uri: photo.uri }} />
              <UserName>{user ? user.nome : ''}</UserName>
            </ResultContainer>
          )}

          <ButtonsContainer>
            <FlipButton onPress={handleFlip} disabled={isTakingPicture || loading}>
              <Ionicons name="md-reverse-camera" size={32} color="white" />
            </FlipButton>

            <TakePictureButton onPress={handleTakePicture} disabled={isTakingPicture || loading}>
              {loading 
                ? <ActivityIndicator size='large' color='#FFF'/>
                : <MaterialIcons name="camera" size={64} color="white" />
              }
            </TakePictureButton>

            <ConfirmButton onPress={handleConfirm} disabled={isTakingPicture || loading}>
              <Ionicons name="md-send" size={32} color="white" />
            </ConfirmButton>
          </ButtonsContainer>
        </CameraContent>
      </Camera>
    </Container>
  )
}
