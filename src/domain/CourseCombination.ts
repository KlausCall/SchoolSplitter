import { Column } from '../modules/result/Column';
import { NumberCol } from '../modules/result/NumberCol';
import { StringCol } from '../modules/result/StringCol';
import { Course } from './Course';
import { Pupil } from './Pupil';

export class CourseCombination {
  readonly no: number;
  readonly name: string;
  private courseList: Course[];
  private members: Pupil[];
  private combiSize: number;

  // holds all course combinations sharing at least one course
  private connectedCombis?: CourseCombination[];

  constructor(theNo: number, name: string, courses: Course[]) {
    this.no = theNo;
    this.name = name;
    this.courseList = courses;
    this.members = [];
    this.combiSize = 0;
    var self = this;
    this.courseList.forEach((course) => course?.addCombination(self));
  }

  /**
   * initializes connected combis.
   * may only be called once after all combis are created!
   */
  public initConnectedCombis() {
    var otherCombis = new Set<CourseCombination>();
    var allMembers = new Set<Pupil>();
    this.courseList.forEach((course) => {
      if (course != null) {
        course.getCombinations().forEach((combi) => otherCombis.add(combi));
        course.getMembers().forEach((pupil) => allMembers.add(pupil));
      }
    });
    otherCombis.delete(this);
    this.connectedCombis = Array.from(otherCombis);
    this.combiSize = allMembers.size;
  }

  public getIndex() {
    return this.no;
  }

  public addMember(member: Pupil) {
    this.members.push(member);
  }

  public getCourses(): Course[] {
    return this.courseList;
  }

  public getConnectedCombis(): CourseCombination[] {
    return this.connectedCombis!;
  }

  public getMember(i: number) {
    return this.members[i];
  }

  public getMembers() {
    return this.members;
  }

  public getMemberCount(): number {
    return this.members.length;
  }

  public getCombiSize(): number {
    return this.combiSize;
  }

  public getContacts(): number {
    return this.members.length * (this.combiSize - 1);
  }

  /*
   *  output support
   */
  public asLO() {
    var lo: any = {
      no: this.no + 1,
      count: this.members.length,
      combiSize: this.combiSize,
      contacts: this.getContacts(),
      crossCombis: this.connectedCombis?.length,
    };
    this.courseList.forEach((course, i) => {
      lo['block-' + (i + 1)] = course == null ? '--' : course.getName();
    });
    return lo;
  }

  public static loCols(blockCount: number) {
    var res : Column<any>[];
    res =  [
      new NumberCol("no", "Nr.", "Nummer der Kombination"),
      new NumberCol("count", "# Schüler", "Anzahl Schüler mit\ndieser Kursbelegung"),
      new NumberCol("combiSize", "Größe", "Anzahl Schüler in allen\nKursen  dieser Kombination"),
      new NumberCol("contacts", "# Kontakte", "Anzahl Kontaktpaare\nin dieser Komination"),
      new NumberCol("crossCombis", "# verb. Komb.", "Anzahl Kombinationen die min.\neinen gemeinsamen Kurs haben"),
    ];
    for (let i = 1; i <= blockCount; i ++) {
      res.push(new StringCol(`block-${i}`, `Block ${i}`, `Im ${i}-ten Block belegter Kurs`));
    }
    return res;
  }

}
