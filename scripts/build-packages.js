import { resolve } from 'path'
import { build } from 'esbuild'

/** argv 读取命令行参数 */
const [target, format] = [argv._[0] || 'reactivity', argv.f || 'esm']


const pkg = await import(resolve(__dirname, `../packages/${target}/package.json`), { assert: { type: 'json' } })
console.log(pkg.default.buildOptions.name, '1')

const outFilePath = resolve(__dirname, `../packages/${target}/dist/${target}.${format}.ts`)
console.log(outFilePath, format)

build({
  entryPoints: [resolve(__dirname, `../packages/${target}/src/index.ts`)],
  outfile: outFilePath,
  bundle: true,
  sourcemap: true,
  format,
  globalName: pkg.default.buildOptions.name,
  platform: format === 'cjs' ? 'node' : 'browser', //代码使用平台
  // watch: { //监控文件变化
  //   onRebuild (err) {
  //     if (!err) console.log('rebuild~~~')
  //   }
  // }
})
// .then(() => {
//   console.log('watching')
// })