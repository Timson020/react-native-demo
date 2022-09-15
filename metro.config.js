/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */

module.exports = {
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
  },
	resolver: {
		extensions: [ 'js', 'jsx', 'ts', 'tsx', 'db', 'mp3', 'ttf', 'obj', 'png', 'jpg', 'jpeg' ],
		assetExts: ['fbx', 'abc', 'mtl', 'obj', 'png', 'jpg', 'jpeg']
	}
};
