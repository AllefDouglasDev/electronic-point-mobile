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
          headerStyle: {
            backgroundColor: '#354C4C',
          },
          headerTintColor: '#fff',
        }}
      />

      <Stack.Screen
        name="AdminCheckin"
        component={AdminCheckin}
        options={{
          title: 'Autorização',
          headerStyle: {
            backgroundColor: '#354C4C',
          },
          headerTintColor: '#fff',
        }}
      />      
      
      <Stack.Screen
        name="Picture"
        component={Picture}
        options={{
          title: 'Foto',
          headerTintColor: 'white',
          headerTransparent: true,
        }}
      />

   </Stack.Navigator>
  )
}