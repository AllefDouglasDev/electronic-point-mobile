import React from 'react'

import { Touchable, Text } from './styles'

export default function Button({
  text,
  color = 'red',
  textColor = 'white',
  loading = false,
  ...props
}) {
  return (
    <Touchable color={color} {...props}>
      <Text color={textColor}>{loading ? 'CARREGANDO...' : text}</Text>
    </Touchable>
  )
}
