import React, { useState, useEffect, useRef } from 'react'
import { Camera } from 'expo-camera'
import { StatusBar } from 'react-native'
import { Ionicons, MaterialIcons } from '@expo/vector-icons'

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

  function handleConfirm() {
    
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
