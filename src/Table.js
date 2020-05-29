import React from 'react';
import { CellMeasurer, CellMeasurerCache, Column, Table as VTable, Grid } from 'react-virtualized';
import classnames from 'classnames';

import styles from './Table.module.css';

const Table = ({
  list,
  height,
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

  const _innerCellRenderer = data => ({columnIndex, key, rowIndex, style, ...rest}) => {
    return (
      <div key={key} className={classnames(styles.cell, { [styles.lastCell]: rowIndex === data.length - 1 })} style={{ height: style.height }}>
        {data[rowIndex][columnIndex]}
      </div>
    );
  }

  const _columnCellRenderer = ({dataKey, parent, rowIndex, ...rest}) => {
    const datum = list.get(rowIndex % list.size);
    const content = datum[dataKey];
    if (Array.isArray(content)) {
      return (
        <CellMeasurer
          cache={_cache.current}
          columnIndex={0}
          key={dataKey}
          parent={parent}
          rowIndex={rowIndex}>
          <Grid
            className={styles.CellGrid}
            cellRenderer={_innerCellRenderer(content.map(item => [item]))}
            columnCount={1}
            autoContainerWidth={true}
            columnWidth={200}
            height={30 * content.length}
            rowCount={content.length}
            rowHeight={30}
            width={200}
          />
        </CellMeasurer>
      );
    } else {
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
    }
  };

  const _rowGetter = ({index}) => {
    return list.get(index % list.size);
  };

  return (
    <VTable
      deferredMeasurementCache={_cache.current}
      headerHeight={40}
      height={height}
      overscanRowCount={2}
      rowClassName={styles.tableRow}
      rowHeight={_cache.current.rowHeight}
      rowGetter={_rowGetter}
      rowCount={1000}
      width={width}>
      <Column
        dataKey="name"
        label="Name"
        width={125}
      />
      <Column
        dataKey="color"
        label="Color"
        width={125}
      />
      <Column
        width={200}
        dataKey="category"
        label="展示项"
        headerClassName={styles.tableGridColumn}
        className={styles.tableGridColumn}
        cellRenderer={_columnCellRenderer}
      />
      <Column
        width={200}
        dataKey="date1"
        label="yyyy/mm"
        headerClassName={styles.tableGridColumn}
        className={styles.tableGridColumn}
        cellRenderer={_columnCellRenderer}
      />
      <Column
        width={200}
        dataKey="date2"
        label="yyyy/mm"
        headerClassName={styles.tableGridColumn}
        className={styles.tableGridColumn}
        cellRenderer={_columnCellRenderer}
      />
      <Column
        width={200}
        dataKey="date3"
        label="yyyy/mm"
        headerClassName={styles.tableGridColumn}
        className={styles.tableGridColumn}
        cellRenderer={_columnCellRenderer}
      />
      <Column
        width={200}
        dataKey="date4"
        label="yyyy/mm"
        headerClassName={styles.tableGridColumn}
        className={styles.tableGridColumn}
        cellRenderer={_columnCellRenderer}
      />
      <Column
        width={200}
        dataKey="date5"
        label="yyyy/mm"
        headerClassName={styles.tableGridColumn}
        className={styles.tableGridColumn}
        cellRenderer={_columnCellRenderer}
      />
    </VTable>
  );
}

export default Table;
