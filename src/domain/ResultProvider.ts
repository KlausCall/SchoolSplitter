import { GradeLevel } from "./GradeLevel";

interface ResultProvider {
  pupilTable(): any[];
  courseTable(): any[];
  combiTable(): any[];
  getLevel(): GradeLevel;
}

export default ResultProvider;
