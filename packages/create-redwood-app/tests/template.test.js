const assert = require('assert')
const fs = require('fs')
const test = require('node:test')
const path = require('path')

const TEMPLATE_PATH = path.resolve(__dirname, '../template')

test('web/src should contain App.tsx', () => {
  const indexContent = fs
    .readFileSync(path.join(TEMPLATE_PATH, 'web/src/App.tsx'))
    .toString()

  assert.match(indexContent, /const App = \(\) => \(/)
})
