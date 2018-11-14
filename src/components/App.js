import React, { Component } from "react";
import { Switch, Route, withRouter } from "react-router-dom";
import { ApolloProvider } from "react-apollo";
import ApolloClient from "apollo-boost";

import Header from "./Commons/Header";
import Home from "./Home";
import Exchange from "./Exchange";
import { Container } from "semantic-ui-react";
import "./App.css";

const client = new ApolloClient({
  uri: "https://w5xlvm3vzz.lp.gql.zone/graphql"
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div className="App">
          <Header />
          <Container style={{ paddingTop: "7em" }}>
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/exchange" component={Exchange} />
            </Switch>
          </Container>
        </div>
      </ApolloProvider>
    );
  }
}

export default withRouter(App);
