import React from 'react'
import { ActivityIndicator } from 'react-native'

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
      {loading 
        ? <ActivityIndicator size="small" color="#FFF"/>
        : <Text color={textColor}>{text}</Text>
      }
    </Touchable>
  )
}
