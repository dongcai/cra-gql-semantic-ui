import React, { Component } from "react";
import { withApollo } from "react-apollo";
import gql from "graphql-tag";

import RateTable from "./RateTable";
import Buttons from "./Buttons";

const getRates = gql`
  query rates($currency: String!, $offset: Int, $limit: Int) {
    getRates(currency: $currency, offset: $offset, limit: $limit) {
      rates {
        currency
        rate
        name
      }
      totalCount
    }
  }
`;

class ExchangeRates extends Component {
  state = {
    pageId: 0,
    pageSize: 10,
    limit: 100,
    offset: 0,
    data: [],
    totalCount: 0
  };

  getRatesQuery = (offset = 0) => {
    const { client } = this.props;
    client
      .query({
        query: getRates,
        variables: {
          currency: "USD",
          offset,
          limit: this.state.limit
        }
      })
      .then(({ loading, error, data }) => {
        if (!loading && !error && data) {
          this.setState(preState => {
            const newData = preState.data.concat(data.getRates.rates);
            return {
              data: newData,
              totalCount: data.getRates.totalCount,
              offset
            };
          });
        }
      });
  };

  componentDidMount() {
    this.getRatesQuery(this.state.offset);
  }

  componentDidUpdate(prevProps, prevState) {
    console.log(this.state);
    if (
      this.state.pageId !== prevState.pageId &&
      this.state.pageId ===
        (this.state.offset + this.state.limit) / this.state.pageSize - 1
    ) {
      const newOffset = this.state.offset + this.state.limit;
      this.getRatesQuery(newOffset);
    }
  }
  next = () => {
    this.setState(preState => {
      return { pageId: preState.pageId + 1 };
    });
  };

  prev = () => {
    this.setState(preState => {
      return { pageId: preState.pageId - 1 };
    });
  };

  render() {
    if (!this.state.data.length) {
      return <p>Loading ... </p>;
    }

    return (
      <>
        <RateTable
          data={this.state.data.slice(
            this.state.pageId * this.state.pageSize,
            this.state.pageId * this.state.pageSize + this.state.pageSize
          )}
        />
        <Buttons
          totalCount={this.state.data.totalCount}
          goNext={this.next}
          goPrev={this.prev}
          {...this.state}
        />
      </>
    );
  }
}

export default withApollo(ExchangeRates);
