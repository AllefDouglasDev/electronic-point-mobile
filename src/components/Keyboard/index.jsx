import React from 'react'
import { Ionicons, AntDesign } from '@expo/vector-icons'

import {
  Container,
  DigitButtonRow,
  DigitButton,
  DigitNumber,
} from './styles'

export default function Keyboard({ onPress, ...props }) {
  return (
    <Container {...props}>
      <DigitButtonRow>
        <DigitButton onPress={() => onPress(1)}>
          <DigitNumber>1</DigitNumber>
        </DigitButton>

        <DigitButton onPress={() => onPress(2)}>
          <DigitNumber>2</DigitNumber>
        </DigitButton>

        <DigitButton onPress={() => onPress(3)}>
          <DigitNumber>3</DigitNumber>
        </DigitButton>
      </DigitButtonRow>

      <DigitButtonRow>
        <DigitButton onPress={() => onPress(4)}>
          <DigitNumber>4</DigitNumber>
        </DigitButton>

        <DigitButton onPress={() => onPress(5)}>
          <DigitNumber>5</DigitNumber>
        </DigitButton>

        <DigitButton onPress={() => onPress(6)}>
          <DigitNumber>6</DigitNumber>
        </DigitButton>
      </DigitButtonRow>

      <DigitButtonRow>
        <DigitButton onPress={() => onPress(7)}>
          <DigitNumber>7</DigitNumber>
        </DigitButton>

        <DigitButton onPress={() => onPress(8)}>
          <DigitNumber>8</DigitNumber>
        </DigitButton>

        <DigitButton onPress={() => onPress(9)}>
          <DigitNumber>9</DigitNumber>
        </DigitButton>
      </DigitButtonRow>

      <DigitButtonRow>
        <DigitButton onPress={() => onPress('clean')}>
          <AntDesign name="closecircle" size={25} color="#646464" />
        </DigitButton>

        <DigitButton onPress={() => onPress(0)}>
          <DigitNumber>0</DigitNumber>
        </DigitButton>

        <DigitButton onPress={() => onPress('back')}>
          <Ionicons name="ios-backspace" size={28} color="#646464" />
        </DigitButton>
      </DigitButtonRow>
    </Container>
  )
}
