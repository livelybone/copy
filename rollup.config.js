import fs from 'fs'
import path from 'path'
import license from 'rollup-plugin-license'
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
    license({
      banner: `Bundle of <%= pkg.name %>
               Generated: <%= moment().format('YYYY-MM-DD') %>
               Version: <%= pkg.version %>
               License: <%= pkg.license %>
               Author: <%= pkg.author %>`,
    }),
  ],
  context: 'this',
})

export default [
  { name: 'index', filename: './src/index.js', formats: ['es'], needUglify: false },
  ...getEntries()
].map(conf)
