import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const httpLink = createHttpLink({
  uri: "http://ec2-3-138-118-78.us-east-2.compute.amazonaws.com:8080/graphql",
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists

  const user: { token: string } | undefined = JSON.parse(
    localStorage.getItem("user") || "{}"
  ) as { token: string } | undefined;
  let token = "";
  if (user && user.token) {
    token = user.token;
  }
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      Authorization: token ? `${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;
