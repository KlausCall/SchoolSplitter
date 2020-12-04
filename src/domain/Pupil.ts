import { CourseCombination } from './CourseCombination';

export class Pupil {
  readonly no: number;
  readonly firstname: string;
  readonly lastname: string;
  private courseCombination!: CourseCombination;

  constructor(theNo: number, lastname: string, firstname: string) {
    this.no = theNo;
    this.firstname = firstname;
    this.lastname = lastname;
  }

  public setCourseCombination(combi: CourseCombination) {
    this.courseCombination = combi;
  }

  public getCourseCombination() {
    return this.courseCombination;
  }

  public getIndex() {
    return this.no;
  }

  /*
   *  output support
   */
  public asLO() {
    var lo: any = {
      no: this.no,
      lastname: this.lastname,
      firstname: this.firstname,
      combi: this.courseCombination.getIndex(),
      group: "--"
    };
    this.courseCombination.getCourses().forEach((course, i) => {
      lo['block-' + i] = course == null ? '--' : course.getName();
    });
    return lo;
  }
}
