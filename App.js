import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

import Nav from './src/nav.tsx'

const App = () => {
	return (
		<SafeAreaView style={{ width: '100%', height: '100%' }}>
			<Nav />
		</SafeAreaView>
	)
}

export default App

