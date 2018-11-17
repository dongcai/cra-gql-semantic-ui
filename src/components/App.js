import React, { Component } from "react";
import { Switch, Route, withRouter } from "react-router-dom";
import { ApolloProvider } from "react-apollo";
import ApolloClient from "apollo-boost";

import Header from "./Commons/Header";
import Home from "./Home";
import { Container } from "semantic-ui-react";
import "./App.css";

const client = new ApolloClient({
  uri: "https://j9p8rmqz3p.lp.gql.zone/graphql"
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div className="App">
          <Header />
          <Container style={{ paddingTop: "7em" }}>
            <Switch>
              <Route path="/" component={Home} />
            </Switch>
          </Container>
        </div>
      </ApolloProvider>
    );
  }
}

export default withRouter(App);
