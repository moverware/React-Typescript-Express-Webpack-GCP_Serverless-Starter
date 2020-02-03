import * as path from 'path'
import * as express from 'express'
import * as webpack from 'webpack'
import * as webpack_dev_middleware from 'webpack-dev-middleware'
import * as webpack_hot_middleware from 'webpack-hot-middleware'
import config from './webpack.config'

const app = express()
const dev = process.env.PROD === 'false'

app.get('/', (req: express.Request, res: express.Response) => {
    res.sendFile(path.resolve(__dirname, 'frontEnd', 'index.html'))
})

if (dev) {
    const compiler = webpack(config)
    app.use(
        webpack_dev_middleware(compiler, {
            publicPath: config.output.publicPath,
            stats: { colors: true }
        })
    )

    app.use(webpack_hot_middleware(compiler))
}

app.use(express.static(path.resolve(__dirname, 'frontEnd')))

export { app as serveReactHTTP }
