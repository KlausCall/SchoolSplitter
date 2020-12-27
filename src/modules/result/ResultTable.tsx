import React from 'react';

const ResultTable: React.FC<{
  list?: any[];
  title: String;
  selections: number[];
  setSelection: any;
}> = ({ list, title, selections, setSelection }) => {
  const selectedRows = selections;
  const updateSelectedRow = setSelection;

  if (!list || list.length === 0) {
    return null;
  }
  var keys = Object.keys(list[0]);
  var csv = '';
  csv = keys.reduce((res, k) => res + k + ';', csv) + '\r\n';
  csv = list.reduce((resO, obj) => {
    return keys.reduce((res, k) => res + obj[k] + ';', resO) + '\r\n';
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
              {keys.map((k) => (
                <th><div data-toggle="tooltip" data-placement="bottom" title="Hooray!">{k}</div></th>
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
                  {keys.map((k) => (
                    <td>{obj[k]}</td>
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
