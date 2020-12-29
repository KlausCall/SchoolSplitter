import { LevelSlicer } from "../domain/solve/LevelSlicer";

export const SolutionDisplay: React.FC<{ slicer?: LevelSlicer }> = ({ slicer }) => {

    if (!slicer) {
      return (
        <ul className="list-group list-group-horizontal-md mt-2">
          <li className="list-group-item px-2 py-1">Keine Lösung berechnet</li>
        </ul>
      );
    }

    return (
      <ul className="list-group list-group-horizontal-lg mt-2">
        <li className="list-group-item flex-fill d-flex justify-content-between align-items-center px-2 py-1">berechnete Lösung:</li>
        <li className="list-group-item flex-fill d-flex justify-content-between align-items-center px-2 py-1">
          Gruppen
          <span className="badge badge-primary badge-pill">{slicer.getSize()}</span>
        </li>
        <li className="list-group-item flex-fill d-flex justify-content-between align-items-center px-2 py-1">
          Gruppen Übergröße
          <span className="badge badge-primary badge-pill">{slicer.getOversize()}</span>
        </li>
        <li className="list-group-item flex-fill d-flex justify-content-between align-items-center px-2 py-1">
          Schritte
          <span className="badge badge-primary badge-pill">{slicer.getMoveCount()}</span>
        </li>
        <li className="list-group-item flex-fill d-flex justify-content-between align-items-center px-2 py-1">
          Berechnung abgeschlossen
          <span className="badge badge-primary badge-pill">{slicer.isFinished() ? 'Ja': 'Nein'}</span>
        </li>
        <li className="list-group-item flex-fill d-flex justify-content-between align-items-center px-2 py-1">
          Kontakte
          <span className="badge badge-primary badge-pill">{slicer.getContacts()}</span>
        </li>
      </ul>
)

  }
