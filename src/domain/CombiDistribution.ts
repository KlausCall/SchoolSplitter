import { CourseCombination } from './CourseCombination';
import { LevelSlicer } from './LevelSlicer';
import { Move } from './Move';

export class CombiDistribution {
  readonly no: number;
  readonly size: number;
  readonly slicer: LevelSlicer;
  readonly combi: CourseCombination;
  readonly courseIndices: number[];
  readonly memberCounts: number[];
  readonly combiSizes: number[];
  readonly connectedDistris: CombiDistribution[];

  constructor(aCombi: CourseCombination, aSlicer: LevelSlicer) {
    this.combi = aCombi;
    this.slicer = aSlicer;
    this.no = this.combi.getIndex();
    this.size = aSlicer.getSize();
    this.memberCounts = new Array(this.size).fill(0);
    this.combiSizes = new Array(this.size).fill(0);
    this.courseIndices = [];
    this.combi.getCourses().forEach((course) => {
      if (course != null) {
        this.courseIndices.push(course.getIndex());
      }
    });
    // wll be filled after complete creation of distris
    this.connectedDistris = [];
  }

  /**
   * called only once after creation of all instances.
   *
   * @param allDistris all created instances in slicer.
   */
  public fillConnected(allDistris: CombiDistribution[]) {
    this.combi.getConnectedCombis().forEach((connected) => {
      this.connectedDistris.push(allDistris[connected.getIndex()]);
    });
  }

  public getIndex() {
    return this.no;
  }

  public getContacts(slice?: number): number {
    if (slice === undefined) {
      return this.memberCounts.reduce(
        (sum, _, i) => sum + this.getContacts(i),
        0
      );
    } else {
      return this.memberCounts[slice] * (this.combiSizes[slice] - 1);
    }
  }

  public getMemberCounts() {
    return this.memberCounts;
  }

  public getMemberCount(slice?: number): number {
    if (slice === undefined) {
      return this.memberCounts.reduce(
        (sum, _, i) => sum + this.getMemberCount(i),
        0
      );
    } else {
      return this.memberCounts[slice];
    }
  }

  public getCombination() {
    return this.combi;
  }

  /**
   * optimization workhorse.
   * find moves for optimization.
   *
   * @param minProgress minimal progess in contacts
   * @param maxSize maximal membe count of groups
   */
  public findMoves(
    minProgress: number,
    onlyOversizedCourses: boolean,
    resultList: Move[]
  ) {
    var courseSizes: number[][];
    var maxSizes: number[];
    var sources: number[];
    var targets: number[];
    var sourceAdvantages: number[];
    var targetPenaltys: number[];

    courseSizes = this.slicer.getCourseSizes();
    maxSizes = this.slicer.getMaxSizes();
    // find allowed sources
    sources = this.memberCounts
      .map((_, i) => i)
      .filter((i) => this.memberCounts[i] > 0);
    if (onlyOversizedCourses) {
      sources = sources.filter((slice) => {
        return this.courseIndices.some(
          (courseIdx) => courseSizes[courseIdx][slice] > maxSizes[courseIdx]
        );
      });
    }
    if (sources.length === 0) {
      return;
    }

    // find allowed targets with size of all courses less than maxSize
    targets = this.memberCounts
      .map((_, i) => i)
      .filter((slice) => {
        return this.courseIndices.every(
          (courseIdx) => courseSizes[courseIdx][slice] < maxSizes[courseIdx]
        );
      });

    // fast exit if no move possible
    if (
      sources.length === 0 ||
      targets.length === 0 ||
      (sources.length === 1 &&
        targets.length === 1 &&
        sources[0] === targets[0])
    ) {
      return;
    }

    // calculate expected changes of contacts
    sourceAdvantages = sources.map((i) => this.advantageOnRemoveFrom(i));
    targetPenaltys = targets.map((i) => this.penaltyOnAddTo(i));

    // find valid moves
    sources.forEach((from, fromIdx) => {
      targets.forEach((to, toIdx) => {
        if (
          from !== to &&
          sourceAdvantages[fromIdx] - targetPenaltys[toIdx] >= minProgress
        ) {
          resultList.push(
            new Move(
              this.getIndex(),
              from,
              to,
              sourceAdvantages[fromIdx] - targetPenaltys[toIdx]
            )
          );
        }
      });
    });
  }

  /**
   * calculate the shrink in contacts if removing one pupil from slice
   * @param slice index of slice to remove pupil from
   */
  private advantageOnRemoveFrom(slice: number): number {
    // change in own combi caused by members and size change
    var res = this.memberCounts[slice] + this.combiSizes[slice] - 2;
    // in connected combis only the size changes by one
    return this.connectedDistris.reduce(
      (sum, other) => sum + other.memberCounts[slice],
      res
    );
  }

  /**
   * calculate the growth in contacts if adding one pupil to slice
   * @param slice index of slice to remove pupil from
   */
  private penaltyOnAddTo(slice: number): number {
    // change in own combi caused by members and size change
    var res = this.memberCounts[slice] + this.combiSizes[slice];
    // in connected combis only the size changes by one
    return this.connectedDistris.reduce(
      (sum, other) => sum + other.memberCounts[slice],
      res
    );
  }

  public doMove(move: Move) {
    this.removeMemberFromSlice(1, move.from);
    this.addMemberToSlice(1, move.to);
  }

  public addMemberToSlice(count: number, slice: number) {
    this.memberCounts[slice] += count;
    this.combiSizes[slice] += count;
    this.connectedDistris.forEach((dist) => (dist.combiSizes[slice] += count));
    var cs = this.slicer.getCourseSizes();
    this.courseIndices.forEach((i) => (cs[i][slice] += count));
  }

  public removeMemberFromSlice(count: number, slice: number) {
    this.memberCounts[slice] -= count;
    this.combiSizes[slice] -= count;
    this.connectedDistris.forEach((dist) => (dist.combiSizes[slice] -= count));
    var cs = this.slicer.getCourseSizes();
    this.courseIndices.forEach((i) => (cs[i][slice] -= count));
  }

  /*
   *  output support
   */
  public asLO() {
    var lo: any = this.combi.asLO();
    for (let i = 0; i < this.size; i++) {
      lo['Count-' + i] = this.memberCounts[i];
      lo['CombiSize-' + i] = this.combiSizes[i];
      lo['Contacts-' + i] = this.getContacts(i);
    }
    return lo;
  }

  public setPupilsGroups(pupilsTable: any[]) {
    var pos = 0;
    this.memberCounts.forEach((count, i) => {
      var max = pos + count;
      while (pos < max) {
        pupilsTable[this.combi.getMember(pos).getIndex()].group = i;
        pos++;
      }
    });
  }
}
