import React from 'react';
import { List } from 'immutable';
import { AutoSizer } from 'react-virtualized';

import Table from './Table';
import { generateRandomList } from './utils';
import './App.css';

const list = List(generateRandomList());

function App() {
  return (
    <div className="App">
      <AutoSizer disableHeight>
        {({ width }) => (
          <Table
            list={list}
            width={width}
          />
        )}
      </AutoSizer>
    </div>
  );
}

export default App;
