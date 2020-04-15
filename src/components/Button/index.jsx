import React from 'react'

import { Touchable, Text } from './styles'

export default function Button({
  text,
  color = 'red',
  textColor = 'white',
  ...props
}) {
  return (
    <Touchable color={color} {...props}>
      <Text color={textColor}>{text}</Text>
    </Touchable>
  )
}
