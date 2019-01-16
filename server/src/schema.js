// Welcome to Launchpad!
// Log in to edit and save pads, run queries in GraphiQL on the right.
// Click "Download" above to get a zip with a standalone Node.js server.
// See docs and examples at https://github.com/apollographql/awesome-launchpad

// graphql-tools combines a schema string with resolvers.
import { makeExecutableSchema } from 'graphql-tools';
import fetch from 'node-fetch'
import _ from 'lodash'

// Construct a schema, using GraphQL schema language
const typeDefs = `
  type Query {
    getRates(currency: String!, offset: Int, limit: Int): RatesResult
  }

	type RatesResult {
    rates: [ExchangeRate]
    totalCount: Int
  }

	type ExchangeRate {
		currency: String
		rate: String
		name: String
	}
`;

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    getRates: async (root, { currency, offset=0, limit = 10 }) => {
      try {
        const results = await fetch(`https://api.coinbase.com/v2/exchange-rates?currency=${currency}`)
      	const exchangeRates = await results.json()
        const allData = _.map(exchangeRates.data.rates, (rate, currency) => ({ currency, rate }))
        console.log(allData.length);
        return {
          rates: allData.slice(offset, offset+limit),
          totalCount: allData.length
        }
      } catch(e) {
        console.error(e)
      }
    }
  },
  ExchangeRate: {
    name: async ({ currency }) => {
      try {
        const results = await fetch('https://api.coinbase.com/v2/currencies')
        const currencyData = await results.json()

        const currencyInfo = currencyData.data.find(c => c.id.toUpperCase() === currency)
        return currencyInfo ? currencyInfo.name : null
      } catch(e) {
        console.error(e)
      }
    }
  }
};

// Required: Export the GraphQL.js schema object as "schema"
export const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});
