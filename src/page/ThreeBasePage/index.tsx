import React from 'react'
import { SafeAreaView, StatusBar, View, Text, StyleSheet, useColorScheme } from 'react-native'
import { ExpoWebGLRenderingContext, GLView } from 'expo-gl'
import { Renderer } from 'expo-three'
import OrbitControlsView from 'expo-three-orbit-controls'
import { Scene, Camera, PerspectiveCamera, AmbientLight, PointLight, SpotLight, Fog, GridHelper, TextureLoader, Mesh, BoxBufferGeometry, MeshStandardMaterial } from 'three'

class IconMesh extends Mesh {
	constructor() {
		const _materials = [
			new MeshStandardMaterial({ color: '#ff6b02' }),
			new MeshStandardMaterial({ color: '#dd422f' }),
			new MeshStandardMaterial({ color: '#ffffff' }),
			new MeshStandardMaterial({ color: '#fdcd02' }),
			new MeshStandardMaterial({ color: '#019d53' }),
		]
    super(new BoxBufferGeometry(1.0, 1.0, 1.0), _materials )
  }
}

export default function ThreeBasePage() {
	const [ camera, setCamera ] = React.useState<Camera | null>(null)
	const isDarkMode = useColorScheme() === 'dark'
	const backgroundStyle = { backgroundColor: isDarkMode ? 'black' : '#ebecf0' }
	let timeout = null

	React.useEffect(() => {
		return () => clearTimeout(timeout)
	}, [])

	function onContextCreate(gl: ExpoWebGLRenderingContext) {
		const { drawingBufferWidth: width, drawingBufferHeight: height } = gl
		const sceneColor = 0x6ad6f0
		// fixed bugger
		gl.canvas = { width, height }

		// Create a WebGLRenderer without a DOM element
		const renderer = new Renderer({ gl })
		const camera = new PerspectiveCamera( 70, width / height, 0.01, 1000)
		const ambientLight = new AmbientLight(0x101010)
		const pointLight = new PointLight(0xffffff, 2, 1000, 1)
		const spotLight = new SpotLight(0xffffff, 0.5)
		const scene = new Scene()
		const cube = new IconMesh()

		setCamera(camera)

		renderer.setSize(width, height)
		renderer.setClearColor(sceneColor)

		camera.position.set(2, 5, 5)

		scene.fog = new Fog(sceneColor, 1, 10000)
		scene.add(new GridHelper(10, 10))

		scene.add(ambientLight)

		pointLight.position.set(0, 200, 200)
		scene.add(pointLight)

		spotLight.position.set(0, 500, 100)
		spotLight.lookAt(scene.position)
		scene.add(spotLight)

		scene.add(cube)

		camera.lookAt(cube.position)

		function update() {
			cube.rotation.y += 0.015
			cube.rotation.x += 0.015
			cube.rotation.z += 0.015
		}

		// Setup an animation loop
		function render() {
			timeout = requestAnimationFrame(render)
			update()
			renderer.render(scene, camera)
			gl.flushEXP()
			gl.endFrameEXP()
		}
		render()
	}

	return (
		<OrbitControlsView style={{ width: '100%', height: '100%' }} camera={camera}>
			<GLView style={{ width: '100%', height: '100%' }} onContextCreate={onContextCreate} />
		</OrbitControlsView>
	)
}

const styles = StyleSheet.create({
	container: {
		width: '100%',
		height: '100%',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#ebecf0'
	}
})

