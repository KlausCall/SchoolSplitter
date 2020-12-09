import { useState } from 'react';
import ResultProvider from '../domain/ResultProvider';
import ResultTable from './ResultTable';

const Result: React.FC<{ holder: ResultProvider[] }> = ({ holder }) => {
  const [selPupils, setSelPupils] = useState<number[]>([]);
  const [selCourses, setSelCourses] = useState<number[]>([]);
  const [selCombis, setSelCombis] = useState<number[]>([]);

  if (holder.length === 0) {
    return null;
  }
  var provider = holder[0];

  const updatePupilSelection = (row: number) => {
    setSelPupils([row]);
    var combi = provider.getLevel().getMembers()[row].getCourseCombination();
    setSelCombis([combi.getIndex()]);
    setSelCourses(
      combi
        .getCourses()
        .filter((c) => c != null)
        .map((c) => c.getIndex())
    );
  };

  function updateCourseSelection(row: number) {
    setSelCourses([row]);
    var course = provider.getLevel().getCourses()[row];
    setSelCombis(course.getCombinations().map((c) => c.getIndex()));
    setSelPupils(course.getMembers().map((p) => p.getIndex()));
  }

  function updateCombiSelection(row: number) {
    setSelCombis([row]);
    var allCombis = provider.getLevel().getCombinations();
    if (row >= allCombis.length) {
      setSelPupils([]);
      setSelCourses([]);
    } else {
      var combi = allCombis[row];
      setSelPupils(combi.getMembers().map((p) => p.getIndex()));
      setSelCourses(
        combi
          .getCourses()
          .filter((c) => c != null)
          .map((c) => c.getIndex())
      );
    }
  }

  return (
    <>
      <ResultTable
        list={provider.pupilTable()}
        title="Schüler"
        selections={selPupils}
        setSelection={updatePupilSelection}
      ></ResultTable>
      <ResultTable
        list={provider.courseTable()}
        title="Kurse"
        selections={selCourses}
        setSelection={updateCourseSelection}
      ></ResultTable>
      <ResultTable
        list={provider.combiTable()}
        title="Kursbelegung"
        selections={selCombis}
        setSelection={updateCombiSelection}
      ></ResultTable>
    </>
  );
};

export default Result;
