"use client"
import { ApolloProvider } from "@apollo/client";
import client from "@/Utils/Graphql/apollo-client";
import Mainpage from "@/Components/MainPage/Mainpage";

export default function Home() {

  return (
    <ApolloProvider client={client}>
      <div>
        <Mainpage />
      </div>
    </ApolloProvider>
  );
}
