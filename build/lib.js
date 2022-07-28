const { build } = require("esbuild");
const { dtsPlugin } = require("esbuild-plugin-d.ts");

async function runBuild() {
    const result = await build({
        // 当前项目根目录
        absWorkingDir: process.cwd(),
        entryPoints: ['./src/index.ts'],
        bundle: true,
        format: "esm",
        sourcemap: true,
        splitting: true, // 是否开启自动拆包
        
        metafile: true, // 是否生成打包的元信息文件
        //outfile: './dist/index.js',
        outdir: "dist",
        loader: {
            '.ts': 'ts'
        },
        plugins: [dtsPlugin()],
        external: ['lodash'],
    })
    console.log(result)
}

(function(){
    runBuild();
})()
