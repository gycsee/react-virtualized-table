import React from 'react';
import { CellMeasurer, CellMeasurerCache, Column, Table as VTable } from 'react-virtualized';

import styles from './Table.module.css';

const Table = ({
  list,
  width,
}) => {
  const _cache = React.useRef(new CellMeasurerCache({
    fixedWidth: true,
    minHeight: 25,
  }));

  React.useEffect(() => {
    if (_cache.current) {
      _cache.current.clearAll();
    }
  }, [width])

  const _columnCellRenderer = ({dataKey, parent, rowIndex}) => {
    const datum = list.get(rowIndex % list.size);
    const content = rowIndex % 5 === 0 ? '' : datum.randomLong;

    return (
      <CellMeasurer
        cache={_cache.current}
        columnIndex={0}
        key={dataKey}
        parent={parent}
        rowIndex={rowIndex}>
        <div
          className={styles.tableColumn}
          style={{
            whiteSpace: 'normal',
          }}>
          {content}
        </div>
      </CellMeasurer>
    );
  };

  const _rowGetter = ({index}) => {
    return list.get(index % list.size);
  };

  return (
    <VTable
      deferredMeasurementCache={_cache.current}
      headerHeight={20}
      height={400}
      overscanRowCount={2}
      rowClassName={styles.tableRow}
      rowHeight={_cache.current.rowHeight}
      rowGetter={_rowGetter}
      rowCount={1000}
      width={width}>
      <Column
        className={styles.tableColumn}
        dataKey="name"
        label="Name"
        width={125}
      />
      <Column
        className={styles.tableColumn}
        dataKey="color"
        label="Color"
        width={75}
      />
      <Column
        width={width - 200}
        dataKey="random"
        label="Dynamic text"
        cellRenderer={_columnCellRenderer}
      />
    </VTable>
  );
}

export default Table;
