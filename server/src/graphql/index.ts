import path from "path";
import { loadFilesSync } from "@graphql-tools/load-files";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { mergeResolvers } from "@graphql-tools/merge";

const typeDefs = loadFilesSync(path.join(__dirname, "./**/*.gql"));

const resolverFiles = loadFilesSync(path.join(__dirname, "./**/*.resolver.*"));
const resolvers = mergeResolvers(resolverFiles);

const schema = makeExecutableSchema({ typeDefs, resolvers });

export default schema;
