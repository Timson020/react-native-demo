import React from 'react'
import { Image, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

// page
import IndexPage from './page/Index'
import PixiPage from './page/PixiPage'
import BasePage from './page/BasePage'
import ThreeBasePage from './page/ThreeBasePage'
import ThreeObjPage from './page/ThreeObjPage'

const Stack = createNativeStackNavigator()

export default function Navigator() {
	return (
		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Group>
					<Stack.Screen name='index' component={IndexPage} />
					<Stack.Screen name='pixi' component={PixiPage} />
					<Stack.Screen name='base' component={BasePage} />
					<Stack.Screen name='three_base' component={ThreeBasePage} />
					<Stack.Screen name='three_obj' component={ThreeObjPage} />
				</Stack.Group>
			</Stack.Navigator>
		</NavigationContainer>
	)
}
