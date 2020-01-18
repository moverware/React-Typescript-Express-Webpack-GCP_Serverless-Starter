import * as Supertest from 'supertest'
import { deepStrictEqual } from 'assert'
import * as dotenv from 'dotenv'

dotenv.config()

const supertest = Supertest(process.env.GCP_SERVERLESS_URL)

it('helloWorldHttp: should send hello world json', async () => {
    await supertest
        .get('/helloWorldHTTP')
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
        .post('/helloWorldHTTP')
        .send({ echo: 'test1' })
        .expect(200)
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(response => {
            deepStrictEqual(response.text, JSON.stringify({ echo: 'test1' }))
        })
})
