import '@flyskywhy/react-native-browser-polyfill'

import * as PixiInstance from 'pixi.js'
import { Platform } from 'react-native'
import { Asset } from 'expo-asset'
// import * as filters from 'pixi-filters'

global.PIXI = global.PIXI || PixiInstance
let PIXI = global.PIXI
// PIXI.filters = {...(PIXI.filters || {}), ...filters}

const isAsset = input => {
	return (input && typeof input.width === 'number' && typeof input.height === 'number' && typeof input.localUri === 'string')
}

class ExpoPIXIApplication extends PIXI.Application {
	constructor({ width, height, devicePixelRatio = 1, backgroundColor, context, ...props }) {
		if (!context) throw new Error('react-native-pixi: new Application({ context: null }): context must be a valid WebGL context.')

		if (Platform.OS !== 'web') {
			// Shim stencil buffer attribute
			const getAttributes = context.getContextAttributes || (() => ({}))
			context.getContextAttributes = () => {
				const contextAttributes = getAttributes()
				return { ...contextAttributes, stencil: true }
			}
		}

		// "this" also called "app" in pixi
		// app.renderer.width === width * resolution , seems pixi will use resolution just like
		// ctx.scale(resolution, resolution) in canvas.getContext('2d') , since pixi default
		// is canvas.getContext('webgl'), so estimate pixi will use resolution in gl.viewport()
		super({
			context,
			resolution: 1,
			width: width || context.drawingBufferWidth / devicePixelRatio,
			height: height || context.drawingBufferHeight / devicePixelRatio,
			backgroundColor,
			...props
		})
	}
}

if (!(PIXI.Application instanceof ExpoPIXIApplication)) {
	const { HTMLImageElement } = global

	// 通过expo-asset 获取 资源
	const textureFromExpoAsync = async resource => {
		let asset = resource
		if (Platform.OS !== 'web') {
			asset = await Asset.fromModule(resource)
			if (!asset.downloaded) asset = await asset.downloadAsync()
			asset = new HTMLImageElement(asset)
		}
		return PIXI.Texture.from(asset)
	}

	// 
	const spriteFromExpoAsync = async resource => {
		const texture = await textureFromExpoAsync(resource)
		return PIXI.Sprite.from(texture)
	}

	// 原方法
	const originalSpriteFrom = PIXI.Sprite.from
	const originalTextureFrom = PIXI.Texture.from

	const _option = {
		Texture: {
			...PIXI.Texture,
			from: (...props) => {
				if (Platform.OS === 'web') return originalTextureFrom(...props)
				// native
				if (props.length && props[0]) {
					let asset = props[0]
					if (isAsset(asset)) {
						if (asset instanceof HTMLImageElement) return originalTextureFrom(asset)
						return originalTextureFrom(new HTMLImageElement(asset))
					} else if (typeof asset === 'string' || typeof asset === 'number') {
						console.warn(`PIXI.Texture.from(asset: ${typeof asset}) is not supported. Returning a Promise!`)
						return textureFromExpoAsync(asset)
					}
				}
				return originalTextureFrom(...props)
			},
			fromExpoAsync: textureFromExpoAsync
		},
		Sprite: {
			...PIXI.Sprite,
			fromExpoAsync: spriteFromExpoAsync,
			from: (...props) => {
				if (Platform.OS === 'web') {
					return originalSpriteFrom(...props)
				}
				if (props.length && props[0]) {
					let asset = props[0]
					if (isAsset(asset)) {
						const image = new HTMLImageElement(asset)
						return originalSpriteFrom(image)
					} else if (typeof asset === 'string' || typeof asset === 'number') {
						console.warn(`PIXI.Sprite.from(asset: ${typeof asset}) is not supported. Returning a Promise!`)
						return spriteFromExpoAsync(asset)
					}
				}
				return originalSpriteFrom(...props)
			}
		}
	}

	PIXI = {
		...PIXI,
		Application: ExpoPIXIApplication
	}
}

export default PIXI

