import fs from 'fs'
import path from 'path'
import { uglify } from 'rollup-plugin-uglify'

const formats = ['es', 'umd']

function getEntries() {
  const reg = /^(?!utils)\w+\.js$/
  return fs.readdirSync(path.resolve(__dirname, './src'))
    .filter(filename => reg.test(filename) && !fs.statSync(path.resolve(__dirname, './src', filename)).isDirectory())
    .map(filename => ({
      name: filename.replace(/\.js$/, ''),
      filename: path.resolve(__dirname, './src', filename),
      formats: formats.filter(f => f !== 'es'),
    }))
}

const conf = entry => ({
  input: entry.filename,
  output: entry.formats.map(format => ({
    file: `./lib/${format}/${entry.name}.js`,
    format,
    name: 'index' === entry.name ? 'Copy' : entry.name,
  })),
  plugins: [
    (entry.needUglify !== false && uglify()),
  ],
  context: 'this',
})

export default [
  { name: 'index', filename: './src/index.js', formats: ['es'], needUglify: false },
  ...getEntries()
].map(conf)
