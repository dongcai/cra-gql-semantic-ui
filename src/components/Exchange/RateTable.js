import React from "react";
import { Table } from "semantic-ui-react";

const RateTable = props => (
  <Table striped>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>Symbol</Table.HeaderCell>
        <Table.HeaderCell>Name</Table.HeaderCell>
        <Table.HeaderCell>Rate</Table.HeaderCell>
      </Table.Row>
    </Table.Header>
    <Table.Body>
      {props.data.map(({ currency, rate, name }) => (
        <Table.Row key={currency}>
          <Table.Cell>{currency}</Table.Cell>
          <Table.Cell>{name}</Table.Cell>
          <Table.Cell>{rate}</Table.Cell>
        </Table.Row>
      ))}
    </Table.Body>
  </Table>
);

export default RateTable;
