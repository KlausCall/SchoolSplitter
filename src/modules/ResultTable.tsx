import React from 'react';

const ResultTable: React.FC<{list?: any[]}> = ({list}) => {
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
      <table className="table table-responsive table-striped table-bordered table-sm">
        <thead className="thead-dark">
          <tr>
            {keys.map(k => <td>{k}</td>)}
          </tr>
        </thead>
        <tbody>
          {list.map(obj => {
            return (
            <tr>
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
