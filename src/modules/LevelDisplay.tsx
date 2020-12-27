import { GradeLevel } from "../domain/GradeLevel";

const LevelDisplay: React.FC<{ level?: GradeLevel }> = ({ level }) => {

    if (!level) {
      return (
        <ul className="list-group list-group-horizontal-md mt-2">
          <li className="list-group-item px-2 py-1">Keine Daten geladen</li>
        </ul>
      );
    }

    return (
      <ul className="list-group list-group-horizontal-lg mt-2">
        <li className="list-group-item flex-fill d-flex justify-content-between align-items-center px-2 py-1">Daten geladen:</li>
        <li className="list-group-item flex-fill d-flex justify-content-between align-items-center px-2 py-1">
          Schüler
          <span className="badge badge-primary badge-pill">{level.getMembers().length}</span>
        </li>
        <li className="list-group-item flex-fill d-flex justify-content-between align-items-center px-2 py-1">
          Kurse
          <span className="badge badge-primary badge-pill">{level.getCourses().length}</span>
        </li>
        <li className="list-group-item flex-fill d-flex justify-content-between align-items-center px-2 py-1">
          Blöcke
          <span className="badge badge-primary badge-pill">{level.getBlocks().length}</span>
        </li>
        <li className="list-group-item flex-fill d-flex justify-content-between align-items-center px-2 py-1">
          Kurs-Kombinationen
    <span className="badge badge-primary badge-pill">{level.getCombinations().length}</span>
        </li>
        <li className="list-group-item flex-fill d-flex justify-content-between align-items-center px-2 py-1">
          Kontakte
          <span className="badge badge-primary badge-pill">{level.getContacts()}</span>
        </li>
      </ul>
)

  }

export default LevelDisplay;