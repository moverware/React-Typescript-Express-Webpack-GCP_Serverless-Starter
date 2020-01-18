import { Request, Response } from 'express'

export const helloWorldHTTP = (req: Request, res: Response) => {
    switch (req.method) {
        case 'GET':
            res.type('application/json')
                .json({ result: 'Hello World!' })
                .status(200)
                .end()
            break
        case 'POST':
            res.type('application/json')
                .json({ echo: req.body.echo })
                .status(200)
                .end()
            break
        default:
            res.send(404).end()
    }
}
