import { RouterProvider } from "react-router-dom";
import { ApolloProvider } from "@apollo/client";
import router from "./router";
import { AuthProvider } from "./providers/AuthProvider";
import client from "./client";

function App() {
  return (
    <ApolloProvider client={client}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </ApolloProvider>
  );
}

export default App;
