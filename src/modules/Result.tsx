import ResultProvider from "../domain/ResultProvider";
import ResultTable from "./ResultTable";

const Result: React.FC<{holder: ResultProvider[]}> = ({holder}) => {

  if (holder.length ===0)  {
    return null;
  }
  var provider = holder[0];
  return(
    <>
      <ResultTable list={provider.pupilTable()} title="Schüler" ></ResultTable>
      <ResultTable list={provider.courseTable()} title="Kurse" ></ResultTable>
      <ResultTable list={provider.combiTable()} title="Kursbelegung" ></ResultTable>
    </>
  )

}

export default Result;