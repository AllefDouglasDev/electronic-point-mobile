import React from 'react'

import {
  Container,
  Form,
  TextInput,
  CheckinButton,
  AdminCheckinButton
} from './styles'

export default function Checkin({ navigation }) {

  function handleCheckin() {
    navigation.navigate('Picture')
  }

  function handleAdminCheckin() {
    navigation.navigate('AdminCheckin')
  }

  return (
    <Container>
      <Form>
        <TextInput placeholder='Informe seu ID' />
        <CheckinButton text='Registrar' onPress={handleCheckin}/>

        <AdminCheckinButton
          text='Registrar como administrador'
          color='white'
          textColor='#5fc9f8'
          onPress={handleAdminCheckin}
        />
      </Form>
    </Container>
  )
}
