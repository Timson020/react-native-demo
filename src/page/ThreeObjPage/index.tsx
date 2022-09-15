import React from 'react'
import * as THREE from 'three'
import ExpoFileSystem from 'expo-file-system'
import { GLView } from 'expo-gl'
import ExpoTHREE from 'expo-three'
import { Asset, useAssets } from 'expo-asset'
global.THREE = THREE
// import OrbitControlsView from 'expo-three-orbit-controls'
// import { AmbientLight, BoxBufferGeometry, Fog, GridHelper, Mesh, MeshStandardMaterial, PerspectiveCamera, PointLight, Scene, SpotLight, Camera } from 'three'

const model = {
	// 'obj': require('../../assets/3.obj'),
	// 'mtl': require('../../assets/3.mtl'),
	// 'fbx': require('../../assets/1.FBX'),
	// 'abc': require('../../assets/2.ABC'),
}

async function loadObj() {
	const localObj = new THREE.ObjectLoader()
	let mesh: object = null
	try {
		// const [ asset, error ] = useAssets([ model.obj, model.mtl ])
		// const [ obj, mtl ] = asset
		// const _res = await ExpoFileSystem.readAsStringAsync(obj.localUri)
		// localObj.parse(_res)

		// Asset.fromModule(model.obj).downloadAsync()
		// alert(ExpoFileSystem.documentDirectory)
		// ExpoFileSystem.downloadAsync(model.obj)
		// mesh = await ExpoTHREE.loadObjAsync(model.obj, null, name => console.info(name))
	} catch (error) {
		alert(error.toString())
	}
	
	// let asset = Asset.fromModule(require('../../../assets/3.obj'))
	// let localUri = ''
	// asset = await asset.downloadAsync()
	// alert(Expo)
	// localUri = await Expo.FileSystem.readAsStringAsync(asset.localUri)
	
}

export default function ThreeObjPage() {
	loadObj()
	function onContextCreate() { }

  return (
    <GLView style={{ flex: 1 }} onContextCreate={onContextCreate} key='gl' />
  )
}

