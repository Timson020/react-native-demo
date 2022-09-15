import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'

export default function IndexPage() {
	const navigator = useNavigation()
	const push = (uri) => {
		navigator.push(uri)
	}

	return (
		<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 20 }}>
			<Item title='pixi' uri='pixi' onTap={push} />
			<Item title='three_base' uri='three_base' onTap={push} />
			<Item title='three_obj' uri='three_obj' onTap={push} />
		</View>
	)
}

function Item(props) {
	const { title, uri, onTap } = props
	return (
		<View style={{ width: '100%', marginBottom: 20, backgroundColor: 'white', paddingHorizontal: 10, paddingVertical: 10, borderRadius: 8 }}>
			<TouchableOpacity onPress={() => onTap(uri)}>
				<Text style={{ color: 'black', fontSize: 16 }}>{title}</Text>
			</TouchableOpacity>
		</View>
	)
}
