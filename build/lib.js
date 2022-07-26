const { build, buildSync, serve } = require("esbuild");

async function runBuild() {
    const result = await build({
        // 当前项目根目录
        absWorkingDir: process.cwd(),
        entryPoints: ['./src/index.ts'],
        bundle: true,
        format: "esm",
        sourcemap: true,
        outfile: './dist/index.js',
        loader: {
            '.ts': 'ts'
        },
    })
    console.log(result)
}
runBuild();
