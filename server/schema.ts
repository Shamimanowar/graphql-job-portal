import "graphql-import-node";
import { makeExecutableSchema } from "@graphql-tools/schema";

import {
    resolvers as userResolvers,
    typeDefs as userTypeDefs,
} from "./entities/user"

import {
    resolvers as jobResolvers,
    typeDefs as jobTypeDefs
} from "./entities/job"

import {
    resolvers as companyResolvers,
    typeDefs as companyTypeDefs
} from "./entities/companies"

const schema = makeExecutableSchema({
    typeDefs: [userTypeDefs, jobTypeDefs, companyTypeDefs],
    resolvers: [userResolvers, jobResolvers, companyResolvers]
})

export default schema;