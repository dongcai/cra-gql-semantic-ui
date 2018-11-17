import React, { Component } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";

export default class ExchangeRates extends Component {
  render() {
    return (
      <Query
        query={gql`
          {
            rates(currency: "USD") {
              currency
              rate
            }
          }
        `}
        variables={{
          offset: 0,
          limit: 10
        }}
      >
        {({ loading, error, data }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <p>Error :(</p>;

          return data.rates.map(({ currency, rate }) => (
            <div key={currency}>
              <p>{`${currency}: ${rate}`}</p>
            </div>
          ));
        }}
      </Query>
    );
  }
}
