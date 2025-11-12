import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
    schema: "./server/**/*.graphql",
    generates: {
        "./server/types/resolvers_types.ts": {
            plugins: [{ "typescript": {} }, { "typescript-resolvers": {} }],
            config: {
                contextType: "../context#Context",
                defaultMapper: "Partial<{T}>",
                mappers: {
                    Job: "@prisma/client#Job as PrismaJob",
                    // JobType: "@prisma/client#JobType as PrismaJobType",
                }
            }
        }
    }
}

export default config