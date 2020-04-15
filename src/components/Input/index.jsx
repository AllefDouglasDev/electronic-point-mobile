import React from 'react'

import { Container, TextInput } from './styles'

export default function Input({ style, ...props }) {
  return (
    <Container style={style}>
      <TextInput {...props} />
    </Container>
  )
}
