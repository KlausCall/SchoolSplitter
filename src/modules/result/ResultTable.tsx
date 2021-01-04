import React, { useEffect, useState } from 'react';
import { Column } from './Column';

const ResultTable: React.FC<{
  list: any[];
  columns: Column<any>[]
  title: String;
  selections: number[];
  setSelection: any;
}> = ({ list, columns, title, selections, setSelection }) => {
  const selectedRows = selections;
  const updateSelectedRow = setSelection;
  const [sortColumn, setSortColumn] = useState<number>(0);
  const [sortedIndices, setSortedIndices] = useState<number[]>(list.map((_, i) => i));
 
  useEffect(()=>setSortedIndices(list.map((_, i) => i)),[list])
  if (!list || list.length === 0) {
    return null;
  }

  function doSort(colIdx: number) {
    var newOrder: number[];
    var col : Column<any>

    // ATTENTION: colIdx is 1-based !
    if ((-colIdx) === sortColumn) {
      setSortColumn(0);
      // unsort
      setSortedIndices(list.map((_, i) => i))
    } else if (colIdx === sortColumn) {
      setSortColumn(-colIdx);
      // sort descending
      newOrder = sortedIndices.map( i => i);
      col = columns[colIdx - 1];
      newOrder.sort((a,b) => col.compare(list[b], list[a]))
      setSortedIndices(newOrder);
    } else {
      setSortColumn(colIdx);
      // sort ascending
      newOrder = sortedIndices.map( i => i);
      col = columns[colIdx - 1];
      newOrder.sort((a,b) => col.compare(list[a], list[b]))
      setSortedIndices(newOrder);
    }

  }

  var csv = '';
  csv = columns.reduce((res, col) => res + col.title + ';', csv) + '\r\n';
  csv = list.reduce((resO, obj) => {
    return columns.reduce((res, col) => res + col.value(obj) + ';', resO) + '\r\n';
  }, csv);
  var dataURL = 'data:text/csv;charset=UTF-8,' + encodeURIComponent(csv);


  return (
    <div>
      <div>
        <h5 style={{ display: 'inline' }}>{title}</h5>
        <a
          className="btn btn-primary float-right"
          href={dataURL}
          download="result.csv"
        >
          CSV herunterladen
        </a>
      </div>
      <div className="table-responsive">
        <table className="table table-bordered table-sm">
          <thead className="thead-light">
            <tr>
              {columns.map((col, rawIdx) => {
                const  idx = rawIdx + 1;
                return <th 
                  key={`colhead_${idx}`}
                  onClick={ (e) => {
                    e.preventDefault();
                    doSort(idx);
                  }}>
                  <div data-toggle="tooltip" data-placement="bottom" title={col.tip}
                       className={'sortable ' + (idx === sortColumn ? 'sortasc' : (-idx) === sortColumn ? 'sortdesc' : '')}>
                    {col.title}
                  </div>
                </th>
              })}
            </tr>
          </thead>
          <tbody>
            {sortedIndices.map((i, rowi) => {
              var obj = list[i];
              return (
                <tr
                  className={selectedRows?.includes(i) ? 'table-info' : ''}
                  key={`row_${rowi}`}
                  onClick={(ev) => updateSelectedRow(i)}
                >
                  {columns.map((col, coli) => (
                    <td key={`field_${rowi}_${coli}`}>{col.value(obj)}</td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ResultTable;
