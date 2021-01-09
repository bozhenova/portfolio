const express = require('express');
const next = require('next');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const data = {
  portfolios: [
    {
      _id: 'rf3f3f3',
      title: 'Job in USA',
      content: 'It was very nice experience',
      jobTitle: 'Chef',
      daysOfExperience: 100,
      isCurrentlyEmployed: false,
    },
    {
      _id: 'rf3fefef3f3',
      title: 'Job in Barcelona',
      content: 'It was very sunny',
      jobTitle: 'Developer',
      isCurrentlyEmployed: true,
    },
    {
      _id: 'rf3f3k0k0f3',
      title: 'Job in London',
      content: 'It was very rainy',
      jobTitle: 'Frontend-developer',
      daysOfExperience: 365,
      isCurrentlyEmployed: false,
    },
  ],
};

app.prepare().then(() => {
  const server = express();

  const schema = buildSchema(`
    type Portfolio {
      _id: ID
      title: String
      content: String!
      jobTitle: String
      daysOfExperience: Int
      isCurrentlyEmployed: Boolean
  }

    type Query {
      hello: String
      portfolio: Portfolio
      portfolios: [Portfolio]
  }
  `);

  const root = {
    hello: () => 'Hello',
    portfolio: () => {
      return data.portfolios[0];
    },
    portfolios: () => {
      return data.portfolios;
    },
  };

  server.use(
    '/graphql',
    graphqlHTTP({
      schema,
      rootValue: root,
      graphiql: true,
    })
  );

  server.all('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
