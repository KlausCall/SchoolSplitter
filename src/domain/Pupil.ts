import { NumberCol } from '../modules/result/NumberCol';
import { StringCol } from '../modules/result/StringCol';
import { CourseCombination } from './CourseCombination';

export class Pupil {
  readonly no: number;
  readonly firstname: string;
  readonly lastname: string;
  private courseCombination!: CourseCombination;

  constructor(theNo: number, firstname: string, lastname: string) {
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
      no: this.no + 1,
      firstname: this.firstname,
      lastname: this.lastname,
      combi: this.courseCombination.getIndex() + 1,
      group: 0,
    };
    this.courseCombination.getCourses().forEach((course, i) => {
      lo['block-' + (i + 1)] = course == null ? '--' : course.getName();
    });
    return lo;
  }

  public static loCols(blockCount: number) {
    var res =  [
      new NumberCol("no", "Nr.", "Nummer des Schülers"),
      new StringCol("firstname", "Vorname", "Vorname des Schülers"),
      new StringCol("lastname", "Nachname", "Nachname des Schülers"),
      new NumberCol("combi", "Kombi.", "Nummer der Kurs-Kombination\ndie der Schüler belegt hat"),
      new NumberCol("group", "Gruppe", "Nummer der Gruppe, der\nder Schüler zugeordnet wurde"),
    ];
    for (let i = 1; i <= blockCount; i ++) {
      res.push(new StringCol(`block-${i}`, `Block ${i}`, `Im ${i}-ten Block belegter Kurs`));
    }
    return res;
  }

}
