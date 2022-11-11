import 'reflect-metadata';
import './data-source';
import * as Express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { ResgisterResolver } from './modules/user/register';

const bootstrap = async () => {
  const schema = await buildSchema({
    resolvers: [ResgisterResolver],
  });

  const apolloServer = new ApolloServer({
    schema,
  });

  const app = Express();

  await apolloServer.start();

  apolloServer.applyMiddleware({ app });

  app.listen(3000, () => {
    console.log('Server started running on port 3000');
  });
};

bootstrap();
