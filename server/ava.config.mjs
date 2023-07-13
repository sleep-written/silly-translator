export default {
    files: [
        './src/**/*.test.ts',
        './src/**/*.test.mts',
    ],
    extensions: {
        ts: 'module',
        mts: 'module',
    },
    nodeArguments: [
        "--loader=@bleed-believer/path-alias",
        '--no-warnings'
    ]
}