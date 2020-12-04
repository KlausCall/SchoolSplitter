import { Course } from './Course';
import { CourseBlock } from './CourseBlock';
import { CourseCombination } from './CourseCombination';
import { Pupil } from './Pupil';

export class GradeLevel {
  private pupilList: Pupil[];
  private courseList: Course[];
  private combinationList: CourseCombination[];
  private blockList: CourseBlock[];

  constructor(data: string[][]) {
    this.pupilList = [];
    this.courseList = [];
    this.combinationList = [];
    this.blockList = [];

    this.initFromData(data);
  }

  private initFromData(data: string[][]) {
    var pupilCourses: Course[][];
    var currentCourses: Course[];
    var courseMap: Map<string, Course>;
    courseMap = new Map();
    pupilCourses = [];
    data
      .slice(1)
      .forEach((fields) => {
        if (fields.length > 2) {
          const pupil = new Pupil(this.pupilList.length, fields[0], fields[1]);
          this.pupilList.push(pupil);
          currentCourses = [];
          pupilCourses.push(currentCourses);
          fields.slice(2).forEach((courseName) => {
            if (courseName.length > 0) {
              const course = this.getCourse(courseMap, courseName);
              course.addMember(pupil);
              currentCourses.push(course);
            }
          });
        }
      });
    this.initBlocks();
    this.sortCoursesByBlock(pupilCourses);
    this.initCourseCombinations(pupilCourses);
  }

  private sortCoursesByBlock(pupilCourses: Course[][]) {
    for (let i = 0; i < pupilCourses.length; i++) {
      const courseList = pupilCourses[i];
      var orderedList: Course[] = new Array(this.blockList.length).fill(null);
      for (let j = 0; j < courseList.length; j++) {
        const course = courseList[j];
        orderedList[course.getBlock().getIndex()] = course;
      }
      pupilCourses[i] = orderedList;
    }
  }

  private initCourseCombinations(pupilCourses: Course[][]) {
    var combiMap = new Map<string, CourseCombination>();
    var combiName: string;
    var combi: CourseCombination;
    for (let i = 0; i < pupilCourses.length; i++) {
      const courses = pupilCourses[i];
      combiName = this.nameForCourseList(courses);
      if (combiMap.has(combiName)) {
        combi = combiMap.get(combiName)!;
      } else {
        combi = new CourseCombination(
          this.combinationList.length,
          combiName,
          courses
        );
        combiMap.set(combiName, combi);
        this.combinationList.push(combi);
      }
      this.pupilList[i].setCourseCombination(combi);
      combi.addMember(this.pupilList[i]);
    }
    this.combinationList.forEach((combi) => combi.initConnectedCombis());
  }

  private nameForCourseList(courses: Course[]): string {
    return courses.reduce(
      (res, entry) =>
        res.concat(entry == null ? '--' : entry.getName()).concat(';'),
      ''
    );
  }

  /**
   * calculate blocks of courses running at the same time
   * within one block a pupil can only be member of one course.
   */
  private initBlocks() {
    var indices: number[];
    var seenPupil: Pupil[];
    var blockCourses: Course[];
    var blockNo: number = 0;
    const courses = Array.from(this.courseList);
    courses.sort((a, b) => b.getMemberCount() - a.getMemberCount());

    while (courses.length !== 0) {
      indices = [0];
      blockCourses = [courses[0]];
      seenPupil = courses[0].getMembers();
      for (let i = 1; i < courses.length; i++) {
        const next = courses[i];
        if (!next.getMembers().some((p) => seenPupil.includes(p))) {
          blockCourses.push(next);
          indices.push(i);
          seenPupil = seenPupil.concat(next.getMembers());
          if (seenPupil.length === this.pupilList.length) break;
        }
      }
      // remove used courses
      for (let i = indices.length - 1; i >= 0; i--) {
        courses.splice(indices[i], 1);
      }
      // build block
      this.blockList.push(new CourseBlock(blockNo, blockCourses));
      blockNo++;
    }
  }

  public getMembers() {
    return this.pupilList;
  }

  public getCourses() {
    return this.courseList;
  }

  public getBlocks(): CourseBlock[] {
    return this.blockList;
  }

  public getCombinations(): CourseCombination[] {
    return this.combinationList;
  }

  private getCourse(courseMap: Map<string, Course>, name: string): Course {
    if (courseMap.has(name)) {
      return courseMap.get(name)!;
    } else {
      const course = new Course(this.courseList.length, name);
      this.courseList.push(course);
      courseMap.set(name, course);
      return course;
    }
  }

  public getContacts(): number {
    return this.combinationList.reduce(
      (sum, combi) => sum + combi.getContacts(),
      0
    );
  }
  /*
   *  output support
   */

  public displayString() {
    return `Pupils: ${this.pupilList.length}; Courses: ${
      this.courseList.length
    }; Blocks: ${this.blockList.length}; Combinations: ${
      this.combinationList.length
    }; Contacts: ${this.getContacts()}`;
  }

  public print() {
    console.log('PUPILS');
    console.table(this.pupilTable());
    console.log('COURSE COMBINATIONS');
    console.table(this.combiTable());
    console.log('COURSES');
    console.table(this.courseTable());
    console.log('CONTACTS : ' + this.getContacts());
  }

  public pupilTable() {
    return this.pupilList.map((each) => each.asLO());
  }

  public courseTable() {
    return this.courseList.map((each) => each.asLO());
  }

  public combiTable() {
    return this.combinationList.map((each) => each.asLO());
  }
}
