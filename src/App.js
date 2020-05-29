import React from 'react';
import { List } from 'immutable';
import { AutoSizer } from 'react-virtualized';

import Table from './Table';
import { generateRandomList } from './utils';

const list = List(generateRandomList());

function App() {
  return (
    <AutoSizer >
      {({ width, height }) => (
        <Table
          list={list}
          width={width}
          height={height}
        />
      )}
    </AutoSizer>
  );
}

export default App;
