import * as Supertest from 'supertest'
import * as express from 'express'
import { deepStrictEqual } from 'assert'
import * as bodyParser from 'body-parser'

import { helloWorldHTTP } from '../helloWorld'

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.all('/', helloWorldHTTP)

const supertest = Supertest(app)

it('helloWorldHttp: should send hello world json', async () => {
    await supertest
        .get('/')
        .expect(200)
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(response => {
            deepStrictEqual(
                response.text,
                JSON.stringify({ result: 'Hello World!' })
            )
        })
})

it('helloWorldHttp: should send echo back json', async () => {
    await supertest
        .post('/')
        .send({ echo: 'test1' })
        .expect(200)
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(response => {
            deepStrictEqual(response.text, JSON.stringify({ echo: 'test1' }))
        })
})
