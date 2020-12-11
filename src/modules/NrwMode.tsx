import React from 'react';

interface Props {}

const NrwMode: React.FC<Props> = () => (
  <span>
    <button
      type="button"
      className="btn btn btn-outline-warning"
      data-toggle="modal"
      data-target="#nrwModalScrollable"
    >
      NRW - Modus
    </button>

    <div
      className="modal fade"
      id="nrwModalScrollable"
      role="dialog"
      aria-labelledby="nrwModalScrollableTitle"
      aria-hidden="true"
    >
      <div
        className="modal-dialog modal-dialog-scrollable modal-xl"
        role="document"
      >
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="nrwModalScrollableTitle">
              NRW - Modus (gültig ab 14.12.2020)
            </h5>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <br/>
            <h3 className="text-danger"><b>Keine Teilung durch die Schule !</b></h3>
            <br/>
            <hr/>
            <br/>
            <h4>Regelungen ab Klasse 8</h4>
            <br/>
            <ul>
              <li>
                Alle Schüler gehen in den Distanzunterricht.
              </li>
            </ul>
            <br/>
            <hr/>
            <br/>
            <h4>Regelungen bis Klasse 7</h4>
            <br/>
            <ul>
              <li>
                Es erfolgt keine Teilung durch die Schule.
              </li>
              <li>
                Präsenzpflicht in der Schule ist aufgehoben. Eltern entscheiden, ob ihre Kinder
                am Präsenzuterricht oder am Distanzunterricht teilnehemn.
              </li>
              <li>
                Lehrer dürfen parallel Präsenzunterricht und Distanzunterricht anbieten. 
              </li>
            </ul>
            <br/>
            <br/>
            <br/>
            <br/>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-dismiss="modal"
            >
              NRW Modus beenden
            </button>
          </div>
        </div>
      </div>
    </div>
  </span>
);

export default NrwMode;
