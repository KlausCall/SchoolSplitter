import React, { useState } from 'react';
import CSVReader from 'react-csv-reader';
import { GradeLevel } from '../domain/GradeLevel';
import { LevelSlicer } from '../domain/solve/LevelSlicer';
import ResultProvider from '../domain/ResultProvider';
import Result from './Result';

interface Props {}

const Input: React.FC<Props> = () => {
  const [gradeLevel, setGradeLevel] = useState<GradeLevel>();
  const [levelSlicer, setLevelSlicer] = useState<LevelSlicer>();
  const [slicerState, setSlicerState] = useState('');
  const [sliceCount, setSliceCount] = useState(2);
  const [initializer, setInitializer] = useState('first');
  const [groupRestrict, setGroupRestrict] = useState('each');
  const [groupTolerance, setGroupTolerance] = useState(1);
  const [move, setMove] = useState('random');
  const [speed, setSpeed] = useState('slow');
  const [relMoves, setRelMoves] = useState(30);
  const [iterations, setIterations] = useState(200);
  const [result, setResult] = useState<ResultProvider[]>([]);

  function updateResult(provider: ResultProvider) {
    if (provider) {
      setResult([provider]);
    } else {
      setResult([]);
    }
  }

  return (
    <main className="container-fluid">
      <h3>Eingabe</h3>
      <div className="mb-3">
        <label htmlFor="csvUpload" className="form-label">
          CSV Datei mit Daten auswählen:
        </label>
        <CSVReader
          inputId="csvUpload"
          cssInputClass="form-control"
          parserOptions={{}}
          onFileLoaded={(data) => {
            const level = new GradeLevel(data);
            setGradeLevel(level);
            setLevelSlicer(undefined);
            setSlicerState('');
            updateResult(level);
          }}
        />
        <p>{gradeLevel ? gradeLevel.displayString() : 'Bitte Daten laden.'}</p>
      </div>

      <h3>Berechnen</h3>
      <details>
        <summary>
          <h5 style={{ display: 'inline' }}>Konfiguration</h5>
        </summary>
        <form>
          <div className="form-row">
            <div className="form-group col-md-4">
              <label htmlFor="sliceInput" className="form-label">
                Gruppen Anzahl: <b>{sliceCount}</b>
              </label>
              <input
                className="form-control-range"
                type="range"
                step="1"
                id="sliceInput"
                min="2"
                max="10"
                onChange={(e) => setSliceCount(e.target.valueAsNumber)}
                value={sliceCount}
              />
            </div>
            <div className="form-group col-md-4">
              <label htmlFor="resrictSelect" className="form-label">
                Begrenzung Gruppen Größe:
              </label>
              <select
                id="resrictSelect"
                className="form-control"
                onChange={(e) => setGroupRestrict(e.target.value)}
                value={groupRestrict}
              >
                <option value="none">Keine Begrenzung</option>
                <option value="max">anhand größtem Kurs</option>
                <option value="each">je Kurs</option>
              </select>
            </div>
            <div className="form-group col-md-4">
              <label htmlFor="toleranceInput" className="form-label">
                Toleranz Gruppen Größe: <b>{groupTolerance}</b>
              </label>
              <input
                type="range"
                id="toleranceInput"
                className="form-control"
                min="0"
                max="10"
                step="1"
                onChange={(e) => setGroupTolerance(e.target.valueAsNumber)}
                value={groupTolerance}
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col-md-3">
              <label htmlFor="initializerSelect" className="form-label">
                Initialisierung:
              </label>
              <select
                id="initializerSelect"
                className="form-control"
                onChange={(e) => setInitializer(e.target.value)}
                value={initializer}
              >
                <option value="first">Alle in erster Gruppe</option>
                <option value="random">zufällig verteilt</option>
              </select>
            </div>
            <div className="form-group col-md-3">
              <label htmlFor="speedSelect" className="form-label">
                Optimierung:
              </label>
              <select
                id="speedSelect"
                onChange={(e) => setSpeed(e.target.value)}
                className="form-control"
                value={speed}
              >
                <option value="slow">Langsam</option>
                <option value="fast">Schnell</option>
              </select>
            </div>
            <div className="form-group col-md-3">
              <label htmlFor="moveSelect" className="form-label">
                Schrittauswahl:
              </label>
              <select
                id="moveSelect"
                className="form-control"
                onChange={(e) => setMove(e.target.value)}
                value={move}
              >
                <option value="first">Deterministisch</option>
                <option value="random">Zufällig</option>
              </select>
            </div>
            <div className="form-group col-md-3">
              <label htmlFor="relmovesInput" className="form-label">
                Schrittauswahl aus: <b>{relMoves} % </b>
              </label>
              <input
                type="range"
                id="relmovesInput"
                className="form-control-range"
                step="10"
                min="0"
                max="100"
                onChange={(e) => setRelMoves(e.target.valueAsNumber)}
                value={relMoves}
              />
            </div>
            <div className="form-group col-md-2">
              <button
                className="form-control btn btn-outline-secondary"
                disabled={!gradeLevel}
                onClick={(e) => {
                  e.preventDefault();
                  if (gradeLevel) {
                    var slicer = new LevelSlicer(
                      sliceCount,
                      gradeLevel,
                      initializer,
                      move,
                      speed,
                      relMoves,
                      groupRestrict,
                      groupTolerance
                    );
                    setLevelSlicer(slicer);
                    setSlicerState(slicer.statusString());
                    updateResult(slicer);
                  }
                }}
              >
                Neue Teilung Erzeugen
              </button>
            </div>
            <div className="form-group col-md-2">
              <button
                className="form-control btn btn-outline-secondary"
                disabled={!levelSlicer}
                onClick={(e) => {
                  e.preventDefault();
                  if (levelSlicer) {
                    levelSlicer.optimize();
                    setSlicerState(levelSlicer.statusString());
                    updateResult(levelSlicer);
                  }
                }}
              >
                Teilung Optimieren
              </button>
            </div>
            <div className="form-group col-md-2">
              <button
                className="form-control btn btn-outline-secondary"
                disabled={!levelSlicer}
                onClick={(e) => {
                  e.preventDefault();
                  if (levelSlicer) {
                    levelSlicer.doMove();
                    setSlicerState(levelSlicer.statusString());
                    updateResult(levelSlicer);
                  }
                }}
              >
                Einzelschritt ausführen
              </button>
            </div>
            <div className="form-group col-md-2">
              <button
                className="form-control btn btn-outline-secondary"
                disabled = {!levelSlicer}
                onClick={(e) => {
                  e.preventDefault();
                  if (levelSlicer) {
                    levelSlicer.undoLastMove();
                    setSlicerState(levelSlicer.statusString());
                    updateResult(levelSlicer);
                  }
                }}
              >
                letzten Schritt zurück
              </button>
            </div>
          </div>
          <p>
            {levelSlicer
              ? levelSlicer.configString()
              : 'Bitte Teilung erzeugen'}
          </p>
        </form>
      </details>
      <div>
        <div className="form-group row container-fluid">
          <button
            className="form-control col-sm-2 btn btn-primary"
            disabled={!gradeLevel}
            onClick={(e) => {
              e.preventDefault();
              if (gradeLevel) {
                var slicer = LevelSlicer.solve(
                  sliceCount,
                  gradeLevel,
                  initializer,
                  move,
                  speed,
                  relMoves,
                  groupRestrict,
                  groupTolerance,
                  iterations
                );
                setLevelSlicer(slicer);
                setSlicerState(slicer.statusString());
                updateResult(slicer);
              }
            }}
          >
            Lösung berechnen
          </button>
          <label htmlFor="iterInput" className="col-sm-2 col-form-label">
            Durchläufe:
          </label>
          <input
            type="number"
            id="iterInput"
            className="col-sm-2 form-control"
            step="50"
            min="50"
            max="1000"
            onChange={(e) => setIterations(e.target.valueAsNumber)}
            value={iterations}
          />
        </div>
        <p>{slicerState ? slicerState : 'no Solution calculated'}</p>
      </div>

      <h3>Ausgabe</h3>
      <Result holder={result} />
    </main>
  );
};
export default Input;
