import React, { useState, useEffect, useRef } from 'react'
import { Camera } from 'expo-camera'
import { StatusBar, Alert, PixelRatio } from 'react-native'
import { Ionicons, MaterialIcons } from '@expo/vector-icons'

import { uploadImage } from '../../services/user.service'
import { base64toBlob } from '../../utils/image'
import {
  Container,
  Title,
  CameraContent,
  Image,
  ButtonsContainer,
  FlipButton,
  TakePictureButton,
  ConfirmButton,
} from './styles'

export default function Picture({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null)
  const [type, setType] = useState(Camera.Constants.Type.front)
  const [isCameraRedy, setIsCameraReady] = useState(false)
  const [isTakingPicture, setIsTakingPicture] = useState(false)
  const [photo, setPhoto] = useState(null)

  const camera = useRef(null)

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync()
      setHasPermission(status === 'granted')
    })()

    StatusBar.setBarStyle('light-content')

    return () => {
      StatusBar.setBarStyle('dark-content')
    }
  }, [])

  function handleFlip() {
    setType(
      type === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back
    )
  }

  async function handleTakePicture() {
    if (isCameraRedy && camera.current !== null) {
      setIsTakingPicture(true)
      
      const response = await camera.current.takePictureAsync({
        quality: 0.1,
        base64: true
      })
      
      setIsTakingPicture(false)
      setPhoto(response)
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

    try {
      const imageData = { uri: photo.uri, name: 'user-image', type: 'image/jpg' }
      await uploadImage(imageData, 2)
      navigation.navigate('Checkin')
    } catch (error) {
      Alert.alert(
        'Erro',
        'Erro ao enviar a foto. Por favor, verifique sua conexão com a internet e tente novamente',
        [{ text: 'ENTENDI', onPress: () => {} }],
        { cancelable: false },
      )
    }
  }

  if (hasPermission === null) {
    return <Container />
  }

  if (hasPermission === false) {
    return (
      <Container>
        <Title>Habilite a permissão de câmera</Title>
      </Container>
    )
  }

  return (
    <Container>
      <Camera
        ref={ref => camera.current = ref}
        style={{ flex: 1 }}
        ratio={'5:3'}
        type={type}
        onCameraReady={() => setIsCameraReady(true)}
      >
        <CameraContent>
          {photo !== null && (
            <Image source={{ uri: photo.uri }} />
          )}

          <ButtonsContainer>
            <FlipButton onPress={handleFlip}>
              <Ionicons name="md-reverse-camera" size={32} color="white" />
            </FlipButton>

            <TakePictureButton onPress={handleTakePicture} disabled={isTakingPicture}>
              <MaterialIcons name="camera" size={64} color="white" />
            </TakePictureButton>

            <ConfirmButton onPress={handleConfirm} disabled={isTakingPicture}>
              <Ionicons name="ios-send" size={32} color="white" />
            </ConfirmButton>
          </ButtonsContainer>
        </CameraContent>
      </Camera>
    </Container>
  )
}
