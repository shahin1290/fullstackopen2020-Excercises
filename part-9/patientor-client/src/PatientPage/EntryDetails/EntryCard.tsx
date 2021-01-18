import React from 'react';
import { Table } from 'semantic-ui-react';

const EntryCard = (props: { children: React.ReactNode }) => {
  return (
    <Table celled>
      <Table.Body>
        <Table.Row>
          <Table.Cell>{props.children}</Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  );
};

export default EntryCard;
