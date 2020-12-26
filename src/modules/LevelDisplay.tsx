import { GradeLevel } from "../domain/GradeLevel";

const LevelDisplay: React.FC<{ level?: GradeLevel }> = ({ level }) => {

    if (!level) {
      return (
        <ul className="list-group list-group-horizontal-md">
          <li className="list-group-item">Keine Daten Laden</li>
        </ul>
      );
    }

    return (
      <ul className="list-group list-group-horizontal-lg">
        <li className="list-group-item flex-fill d-flex justify-content-between align-items-center">Daten geladen:</li>
        <li className="list-group-item flex-fill d-flex justify-content-between align-items-center">
          Schüler
          <span className="badge badge-primary badge-pill">{level.getMembers().length}</span>
        </li>
        <li className="list-group-item flex-fill d-flex justify-content-between align-items-center">
          Kurse
          <span className="badge badge-primary badge-pill">{level.getCourses().length}</span>
        </li>
        <li className="list-group-item flex-fill d-flex justify-content-between align-items-center">
          Blöcke
          <span className="badge badge-primary badge-pill">{level.getBlocks().length}</span>
        </li>
        <li className="list-group-item flex-fill d-flex justify-content-between align-items-center">
          Kurs-Kombinationen
    <span className="badge badge-primary badge-pill">{level.getCombinations().length}</span>
        </li>
        <li className="list-group-item flex-fill d-flex justify-content-between align-items-center">
          Kontakte
          <span className="badge badge-primary badge-pill">{level.getContacts()}</span>
        </li>
      </ul>
)

  }

export default LevelDisplay;