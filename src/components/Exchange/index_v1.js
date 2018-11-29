import React, { Component } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";

import RateTable from "./RateTable";
import Buttons from "./Buttons";

export default class ExchangeRates extends Component {
  state={
    pageId: 0,
    pageSize: 10,
    limit: 100,
    offset: 0
  };

  static getDerivedStateFromProps(props, state){
    if(state.pageId === (state.offset + state.limit) / state.pageSize){
      return Object.assign(state, {
        limit : state.limit + state.limit,
      })
    }
    return null;
  }

  next = () =>{
    this.setState(preState=>{
      return {pageId: preState.pageId+1}
    })
  };

  prev = () =>{
    this.setState(preState=>{
      return {pageId: preState.pageId-1}
    })
  };

  render() {
    return (
      <Query
        query={gql`
          query rates($currency: String!, $offset: Int, $limit: Int) {
            getRates(currency: $currency, offset: $offset, limit: $limit) {
              rates{
                currency
                rate
                name
              }
              totalCount
            }
          }
        `}
        variables={{
          currency: 'USD',
          // offset: this.state.pageId * this.state.pageSize,
          offset: this.state.offset,
          limit: this.state.limit,
        }}
      >
        {({ loading, error, data }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <p>Error :(</p>;
          console.log(data);
          return [

          <RateTable data={data.getRates.rates.slice(
            this.state.pageId*this.state.pageSize,
            this.state.pageId*this.state.pageSize + this.state.pageSize
          )}/>,
          <Buttons  totalCount={data.getRates.totalCount}
                    goNext={this.next}
                    goPrev={this.prev}
                    {...this.state}
                     />
                  ]
        }}
      </Query>
    );
  }
}
