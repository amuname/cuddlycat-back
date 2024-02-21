// import { All, Controller, Next, Req, Res } from '@nestjs/common';
// // import * as proxy from 'express-http-proxy';
// import { Request, Response, NextFunction } from 'express';
// import { expressMiddleware } from '@apollo/server/express4';
// import { ApolloServer } from '@apollo/server';
// // import { buildSchema } from 'graphql';

// // const graphQLURL = 'http://localhost:3001';

// const server = new ApolloServer<any>({
//   typeDefs: undefined,
// });

// @Controller('api')
// export class ApiProxyController {
//   @All('*')
//   proxyToAdminGraphQL(
//     @Req() req: Request,
//     @Res() res: Response,
//     @Next() next: NextFunction,
//   ) {
//     const middleware = expressMiddleware(server);
//     return middleware(req, res, next);
//     // const handleProxy = proxy(graphQLURL);
//     // return handleProxy(req, res, next);
//   }
// }
