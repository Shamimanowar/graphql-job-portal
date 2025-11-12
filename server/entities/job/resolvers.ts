import { JobType, Resolvers } from "../../types/resolvers_types"


const resolvers: Resolvers = {
    Query: {
        searchJobs: async (root, args, context) => {
            const {query} = args.input;
            const jobs = await context.prisma.job.findMany({
                where: {
                    OR: [
                        {title: {contains: query}},
                        {location: {contains: query}},
                    ]
                },
            }) || []

            return jobs
        }
    },
    Mutation: {}
}

export default resolvers