import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import AdminCheckin from './screens/AdminCheckin'
import Checkin from './screens/Checkin'
import Picture from './screens/Picture'

const Stack = createStackNavigator()

export default function Navigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Checkin"
        component={Checkin}
        options={{
          title: 'Registro de ponto',
          headerTransparent: true,
        }}
      />
      <Stack.Screen name="AdminCheckin" component={AdminCheckin} />
      <Stack.Screen
        name="Picture"
        component={Picture}
        options={{
          title: 'Foto',
          headerTintColor: 'white',
          headerTransparent: true
        }}
      />

   </Stack.Navigator>
  )
}