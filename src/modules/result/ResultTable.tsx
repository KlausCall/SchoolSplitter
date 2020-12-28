import React from 'react';
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

  if (!list || list.length === 0) {
    return null;
  }
  var csv = '';
  csv = columns.reduce((res, col) => res + col.title + ';', csv) + '\r\n';
  csv = list.reduce((resO, obj) => {
    return columns.reduce((res, col) => res + col.value(obj) + ';', resO) + '\r\n';
  }, csv);
  String.toString();
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
              {columns.map((col) => (
                <th><div data-toggle="tooltip" data-placement="bottom" title={col.tip}>{col.title}</div></th>
              ))}
            </tr>
          </thead>
          <tbody>
            {list.map((obj, i) => {
              return (
                <tr
                  className={selectedRows?.includes(i) ? 'table-info' : ''}
                  onClick={(ev) => updateSelectedRow(i)}
                >
                  {columns.map((col) => (
                    <td>{col.value(obj)}</td>
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
