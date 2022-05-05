import { gql } from 'mercurius-codegen';

export const schema = gql`
  type LoginResponse {
    token: String!
    refreshToken: String!
  }

  extend type Mutation {
    register(input: RegisterInput!): LoginResponse!
  }

  input RegisterInput {
    name: String!
    username: String!
    email: String!
    password: String!
  }

  extend type Query {
    example: String
  }
`;

export const resolvers = {
  Query: {
    example: () => 'example',
  },
  Mutation: {
    register: async (_, { input }, ctx) => {
      console.log(input.name);
      // console.log({ ctx });
      return {
        token: 'thetoken123',
        refreshToken: 'therefreshtoken456',
      };
    },
  },
};
