import {Resolvers, UserRole, JobType} from "../../types/resolvers_types"

const resolvers: Resolvers = {
    User: {
        appliedJobs: async (user, args, context) => {
            const jobs = await context.prisma.job.findMany({
                where: {
                    applicants: {some: {id: user.id}},
                }
            }) || []

            return jobs
        },
        ownedJobs: async (user, args, context) => {
            if (!context.auth.user?.isAdmin) {
                return []
            }
            const jobs = await context.prisma.job.findMany({
                where: {
                    applicants: {some: {id: user.id}},
                }
            }) || []

            return jobs
        }
    },
    Query: {
        me: async (root, args, context) => {
           if(!context.auth.user){
            return null
           }
           const user = await context.prisma.user.findUnique({
            where: {id: context.auth.user.id},
           })
           if (!user){
            return null
           }
           return {
            ...user,
            role: user.role as UserRole,
           }
        }
    },
    Mutation: {
        signup: async (root, args, context) => {
            const {email, password, name, role} = args.input;

            // create user in db
            const user = await context.prisma.user.create({
                data: {
                    email,
                    name,
                    // hash the password in real case
                    password,
                    role
                }
            })

            context.auth.login({
                id: user.id,
                isAdmin: user.role === UserRole.Admin
            })

            return {
                ...user,
                role: user.role as UserRole,
            }
        },
        login: async (root, args, context ) => {
            const {email: loginEmail, password: loginPassword} = args.input;

            // find the user
            const user = await context.prisma.user.findUnique({
                where: {email: loginEmail}
            });

            if (!user || user.password !== loginPassword) {
                throw new Error('Invalid credentials');
            }

            context.auth.login({
                id: user.id,
                isAdmin: user.role === UserRole.Admin
            });

            return {
                ...user,
                role: user.role as UserRole,
            };
        },
        logout: async (root, args, context ) => {
            context.auth.logout();
            return true;
        }
    }
}

export default resolvers