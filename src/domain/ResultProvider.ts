import { Column } from '../modules/result/Column';
import { GradeLevel } from './GradeLevel';

interface ResultProvider {
  pupilTable(): any[];
  pupilCols(): Column<any>[];
  courseTable(): any[];
  courseCols(): Column<any>[];
  combiTable(): any[];
  combiCols(): Column<any>[];
  getLevel(): GradeLevel;
}

export default ResultProvider;
