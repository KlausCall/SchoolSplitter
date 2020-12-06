import React, { useState } from 'react';

const ResultTable: React.FC<{list?: any[]}> = ({list}) => {
  const [selectedRow, setSelectedRow] = useState(-1);

  if (!list || list.length === 0) {return null};
  var keys = Object.keys(list[0])
  var csv = "";
  csv = keys.reduce((res, k) => res + k + ";", csv) + "\r\n";
  csv  = list.reduce((resO, obj) => {
      return keys.reduce((res, k) => res + obj[k] +";" , resO) + "\r\n";
  }, csv )
  String.toString()
  var dataURL = "data:text/csv;charset=UTF-8," + encodeURIComponent(csv);; 
  return (
    <div>
      <div>
        <a className="btn btn-primary" href={dataURL} download="result.csv">CSV herunterladen</a>
      </div>
      <table className="table table-bordered table-sm">
        <thead className="thead-light">
          <tr>
            {keys.map(k => <th>{k}</th>)}
          </tr>
        </thead>
        <tbody>
          {list.map((obj, i) => {
            return (
            <tr className={selectedRow === i ? 'table-info' : ''}
                onClick={ (ev) => setSelectedRow(i)}
            >
              {keys.map(k => <td>{obj[k]}</td>)}
            </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ResultTable;
