import {Resolvers} from "../../types/resolvers_types"

const resolvers: Resolvers = {
    Query: {
        me: (root, args, context) => {
           return {
            id: "1"
           }
        }
    }
}

export default resolvers