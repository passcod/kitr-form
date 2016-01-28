'use strict'
import { createRenderer } from 'react-addons-test-utils'

export function testRender (ctx, cb) {
  const shallow = createRenderer()
  shallow.render(ctx)
  cb(shallow.getRenderOutput())
}
