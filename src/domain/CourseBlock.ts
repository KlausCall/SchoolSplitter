import { Course } from './Course';

export class CourseBlock {
  readonly no: number;
  private courseList: Course[];
  constructor(theNo: number, courseList: Course[]) {
    this.no = theNo;
    this.courseList = courseList;
    const self = this;
    courseList.forEach((c) => c.setBlock(self));
  }
  public getIndex() {
    return this.no;
  }
}
