import { ok, deepStrictEqual } from 'assert'
import { Request, Response } from 'express'
import { mockReq, mockRes } from 'sinon-express-mock'

import { helloWorldHTTP } from '../helloWorld'

it('helloWorldHttp: should print hello world', () => {
    // Mock ExpressJS 'req' and 'res' parameters
    const reqPartial: Partial<Request> = {
        body: {},
        method: 'GET'
    }
    const req = mockReq(reqPartial)
    const res = mockRes()

    // Call tested function
    helloWorldHTTP(req, res)

    // Verify behavior of tested function
    ok(res.json.calledOnce)
    deepStrictEqual(res.json.firstCall.args, [{ result: 'Hello World!' }])
})

it('helloWorldHttp: should print echo from body', () => {
    // Mock ExpressJS 'req' and 'res' parameters
    const reqPartial: Partial<Request> = {
        body: {
            echo: 'Test1'
        },
        method: 'POST'
    }
    const req = mockReq(reqPartial)
    const res = mockRes()

    // Call tested function
    helloWorldHTTP(req as Request, res as Response)

    // Verify behavior of tested function
    ok(res.json.calledOnce)
    deepStrictEqual(res.json.firstCall.args, [{ echo: 'Test1' }])
})
