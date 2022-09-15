import React from 'react'
import { GCanvasView } from '@flyskywhy/react-native-gcanvas'
import PIXI from '../../lib/pi.ts'
import { Asset } from 'expo-asset'

// for game, 1 is more better than PixelRatio.get() to code with physical pixels
const devicePixelRatio = 1

export default () => (
  <GCanvasView
    style={{flex: 1, height: '100%'}}
    onCanvasCreate={async (canvas) => {
      let context = canvas.getContext('webgl');
      const app = new PIXI.Application({
        context,
        devicePixelRatio,
        backgroundColor: '0x7ed321',
      });
      const imageHttpSrc = 'https://gw.alicdn.com/tfs/TB1KwRTlh6I8KJjy0FgXXXXzVXa-225-75.png'
      // `await Asset.fromModule` needs `expo-file-system`, and `expo-file-system` needs `react-native-unimodules` ,
      // the installation of `react-native-unimodules` can ref to this commit [expo -> react-native: add react-native-unimodules]
      // (https://github.com/flyskywhy/snakeRN/commit/90983816de3ad2a4da47ffa0f6d1659c2688be3e)
      let imageRequireAsset = await Asset.fromModule(
        require('@flyskywhy/react-native-gcanvas/tools/build_website/assets/logo-gcanvas.png'),
      );
      let spriteHttpLoader;
      let spriteRequireLoader;

      // ref to [Pixi教程](https://github.com/Zainking/learningPixi)
      PIXI.loader.add(imageHttpSrc);
      PIXI.loader.add(imageRequireAsset.uri).load(setup);

      function setup(loader, resources) {
        spriteHttpLoader = new PIXI.Sprite(
          PIXI.loader.resources[imageHttpSrc].texture,
        );

        app.stage.addChild(spriteHttpLoader);
        spriteHttpLoader.y = 700;

        spriteRequireLoader = new PIXI.Sprite(
          PIXI.loader.resources[imageRequireAsset.uri].texture,
        );
        app.stage.addChild(spriteRequireLoader);

        spriteRequireLoader.x = 500;
        spriteRequireLoader.y = 700;

        app.ticker.add((delta) => gameLoop(delta));
      }

      function gameLoop(delta) {
        spriteHttpLoader.y -= 1;
      }
    }}
    devicePixelRatio={devicePixelRatio}
  />
)
