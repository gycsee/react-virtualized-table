import React from 'react';
import { List } from 'immutable';
import { AutoSizer } from 'react-virtualized';

import Table from './Table';
import { generateRandomList } from './utils';

const list = List(generateRandomList());

function App() {
  return (
    <AutoSizer disableHeight>
      {({ width }) => (
        <div style={{ width }}>
          <Table
            list={list}
            width={width}
          />
        </div>
      )}
    </AutoSizer>
  );
}

export default App;
