import { gql } from 'mercurius-codegen';
import UserService from './service';

const userService = new UserService();

export const schema = gql`
  scalar Date

  type User {
    id: ID!
    name: String
    username: String
    email: String
    password: String
    refreshToken: String
    createdAt: Date
    updatedAt: Date
  }

  extend type Query {
    users: [User]
    user: User
  }
`;

export const resolvers = {
  Query: {
    user: async (_: any) => {
      return userService.findAll();
    },
    users: async (_: any) => {
      return [];
    },
  },
};
