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
    Mutation: {
        createJob: async (root, args, context) => {
            if(!context.auth.user?.isAdmin) {
                throw new Error("Unauthorized!")
            }
            const {title, companyName, location, description, type, remote, salary} = args.input
            const job = await context.prisma.job.create({
                data: {
                    title,
                    location,
                    description,
                    type,
                    remote,
                    salary,
                    company: {
                        create: {
                            name: companyName,
                        }
                    },
                    owner: {
                        connect: {
                            id: context.auth.user.id
                        }
                    }
                }
            })

            return job
        },
    }
}

export default resolvers