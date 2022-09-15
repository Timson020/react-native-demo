import React from 'react'
import { View } from 'react-native'
import { GCanvasView } from '@flyskywhy/react-native-gcanvas'
import PIXI from '../../lib/pi.ts'
import { Asset } from 'expo-asset'

const source = require('../../assets/background-1.jpeg')

export default function PixiPage() {
	let canvas = null
	let gl = null
	let app = null
	let stage = null
	let fileSource = null
	let isReady = true

	const onContextCreate = async (canvas) => {
		canvas = canvas
		gl = canvas.getContext('webgl', { stencil: true })
		app = new PIXI.Application({ context: gl, devicePixelRatio: 2, backgroundColor: '0x7ed321' })
		fileSource = Asset.fromModule(source)
		if (!fileSource.downloaded) fileSource = await fileSource.downloadAsync()
		const sprite = PIXI.Sprite.from(fileSource.localUri)
		sprite.width = 320
		sprite.height = 470
		sprite.x = 0
		sprite.y = 0
		app.stage.addChild(sprite)
	}
	return (
		<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
			<GCanvasView style={{ width: 320, height: 470 }} onCanvasCreate={onContextCreate} onIsReady={value => isReady = value} />
		</View>
	)
}
