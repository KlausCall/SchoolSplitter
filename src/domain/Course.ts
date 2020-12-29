import { CourseBlock } from './CourseBlock';
import { Pupil } from './Pupil';
import { CourseCombination } from './CourseCombination';
import { NumberCol } from '../modules/result/NumberCol';
import { StringCol } from '../modules/result/StringCol';

export class Course {
  readonly no: number;
  readonly name: string;
  private block?: CourseBlock;
  private members: Pupil[];
  private combinations: CourseCombination[];

  constructor(theNo: number, name: string) {
    this.no = theNo;
    this.name = name;
    this.members = [];
    this.combinations = [];
  }

  public addMember(member: Pupil) {
    this.members.push(member);
  }

  public addCombination(combi: CourseCombination) {
    this.combinations.push(combi);
  }

  public getIndex() {
    return this.no;
  }

  public setBlock(aBlock: CourseBlock) {
    this.block = aBlock;
  }

  public getBlock(): CourseBlock {
    if (this.block) {
      return this.block;
    } else {
      throw new Error('Block not set.');
    }
  }

  public getMemberCount(): number {
    return this.members.length;
  }

  public getMembers() {
    return this.members;
  }

  public getName() {
    return this.name;
  }

  public getCombinations() {
    return this.combinations;
  }

  public hasCommonPupil(other: Course): boolean {
    return this.members.some((p) => other.members.includes(p));
  }

  /*
   *  output support
   */
  public asLO() {
    var lo: any = {
      no: this.no + 1,
      name: this.name,
      block: this.block ? this.block.getIndex() + 1 : null,
      members: this.members.length,
      combis: this.combinations.length,
    };
    return lo;
  }

  public static loCols() {
    return [
      new NumberCol("no", "Nr.", "Kursnummer"),
      new StringCol("name", "Name", "Name des Kurs"),
      new NumberCol("block", "Block", "Blocknummer des Kurs"),
      new NumberCol("members", "# Schüler", "Anzahl Schüler im Kurs"),
      new NumberCol("combis", "# Kombi.", "Anzahl Kombinationen die\ndiesen Kurs enthalten."),
    ];
  }

}
