import { GradeLevel } from '../GradeLevel';
import { CombiDistribution } from './CombiDistribution';
import { Move } from './Move';
import ResultProvider from '../ResultProvider';
import { ModeSwitchMove } from './ModeSwitchMove';
import { FinishMove } from './FinishMove';
import { NumberCol } from '../../modules/result/NumberCol';

export class LevelSlicer implements ResultProvider {
  readonly size: number;
  readonly level: GradeLevel;
  readonly distributions: CombiDistribution[];
  readonly courseSizes: number[][];
  readonly maxSizes: number[];
  private cfgString: string;
  readonly moveRandom: boolean;
  private reduceGroups: boolean = false;
  private finished: boolean = false;
  private moveList: Move[];
  private moveTolerance: number;
  private moveSlowly: boolean;
  private oversizeWeighther: (cur: number, max: number) => number;

  public static solve(
    aSize: number,
    aLevel: GradeLevel,
    initializer: string,
    move: string,
    speed: string,
    moveTolerance: number,
    groupRestrict: string,
    groupTolerance: number,
    sizeWeighting: string,
    iterations: number
  ): LevelSlicer {
    var best: LevelSlicer;
    var contacts: number;
    var count: number = 0;

    best = new LevelSlicer(
      aSize,
      aLevel,
      initializer,
      move,
      speed,
      moveTolerance,
      groupRestrict,
      groupTolerance,
      sizeWeighting
    );
    best.optimize();
    contacts = best.getContacts();
    do {
      var current: LevelSlicer;
      var currentContacts: number;

      count++;
      current = new LevelSlicer(
        aSize,
        aLevel,
        initializer,
        move,
        speed,
        moveTolerance,
        groupRestrict,
        groupTolerance,
        sizeWeighting
      );
      current.optimize();
      currentContacts = current.getContacts();
      if (currentContacts < contacts) {
        best = current;
        contacts = currentContacts;
      }
    } while (count < iterations);
    return best;
  }

  constructor(
    aSize: number,
    aLevel: GradeLevel,
    initializer: string,
    move: string,
    speed: string,
    moveTolerance: number,
    groupRestrict: string,
    groupTolerance: number,
    sizeWeighting: string
  ) {
    if (aSize < 2) {
      throw new Error('size must be at least 2');
    }
    // init fields
    this.size = aSize;
    this.level = aLevel;
    this.courseSizes = new Array(this.level.getCourses().length);
    for (let i = 0; i < this.courseSizes.length; i++) {
      this.courseSizes[i] = new Array(this.size).fill(0);
    }
    this.distributions = [];
    this.distributions = this.level
      .getCombinations()
      .map((combi) => new CombiDistribution(combi, this));
    this.distributions.forEach((dist) =>
      dist.fillConnected(this.distributions)
    );
    // init groups
    this.cfgString = 'Groups: ' + this.size + '; ';
    this.cfgString += 'Initial Groups: ' + initializer + '; ';
    if (initializer === 'random') {
      this.initRandomlyDistributed();
    } else {
      this.initAllIntoFirstSlice();
    }
    // init max sizes
    this.reduceGroups = true;
    this.cfgString = this.cfgString + 'Group size: ';
    this.maxSizes = new Array(this.courseSizes.length);
    if (groupRestrict === 'max') {
      var max = this.level
        .getCourses()
        .reduce((res, course) => Math.max(res, course.getMemberCount()), 0);
      max = Math.ceil(max / this.size) + groupTolerance;
      this.maxSizes.fill(max);
      this.cfgString += 'max ' + max + '; ';
    } else if (groupRestrict === 'each') {
      this.level.getCourses().forEach((course) => {
        this.maxSizes[course.getIndex()] =
          Math.ceil(course.getMemberCount() / this.size) + groupTolerance;
      });
      this.cfgString += 'by course with tolerance ' + groupTolerance + '; ';
    } else {
      this.reduceGroups = false;
      this.maxSizes.fill(this.level.getMembers().length);
      this.cfgString += 'unrestricted; ';
    }
    switch (sizeWeighting) {
      case 'prefSmall':
        this.oversizeWeighther = this.prefSmallOversizeWeighther;
        break;
      case 'prefBig':
        this.oversizeWeighther = this.prefBigOversizeWeighther;
        break;
      case 'squared':
        this.oversizeWeighther = this.squaredOversizeWeighther;
        break;
      case 'equal':
      default: 
        this.oversizeWeighther = this.equalOversizeWeighther;
    }
    // init move policy
    this.moveList = [];
    this.moveSlowly = 'slow' === speed;
    this.cfgString += this.moveSlowly
      ? 'Move speed: slow; '
      : 'Move speed: fast; ';
    this.moveRandom = 'random' === move;
    this.cfgString += this.moveRandom
      ? 'Move: select random; '
      : 'Move: use first best; ';
    this.moveTolerance = moveTolerance / 100;
    this.cfgString += 'Move tolerance: ' + moveTolerance + '; ';
  }

  private initAllIntoFirstSlice() {
    this.distributions.forEach((dist) => {
      dist.addMemberToSlice(dist.getCombination().getMemberCount(), 0);
    });
  }

  private initRandomlyDistributed() {
    var indices = this.level
      .getMembers()
      .map((pupil) => pupil.getCourseCombination().getIndex());
    var slice = 0;
    while (indices.length > 0) {
      var pos = Math.floor(Math.random() * indices.length);
      this.distributions[indices[pos]].addMemberToSlice(1, slice);
      indices.splice(pos, 1);
      slice = (slice + 1) % this.size;
    }
  }

  private equalOversizeWeighther(cur: number, max: number): number {
    return cur <= max ? 0 : cur - max;
  }

  private prefSmallOversizeWeighther(cur: number, max: number): number {
    return cur <= max ? 0 : (cur - max) / max;
  }

  private prefBigOversizeWeighther(cur: number, max: number): number {
    return cur <= max ? 0 : (cur - max) * max;
  }

  private squaredOversizeWeighther(cur: number, max: number): number {
    return cur <= max ? 0 : (cur - max) ** 2;
  }

  // calc weight of growth by one
  public weightSizeGrowth(cur: number, max: number): number {
    return this.oversizeWeighther(cur + 1, max) - this.oversizeWeighther(cur, max);
  }

  public optimize() {
    while (!this.finished) {
      this.doMove();
    }
  }

  /**
   * optimization workhouse
   */
  public doMove() {
    var candidateMoves: Move[];

    // calculate candidates
    candidateMoves = [];
    if (this.reduceGroups) {
      this.distributions.forEach((dist) => {
        dist.findGroupSizeMoves(candidateMoves);
      });
      if (candidateMoves.length === 0) {
        this.reduceGroups = false;
        this.moveList.push(new ModeSwitchMove());
        return;
      }
    } else {
      this.distributions.forEach((dist) => {
        dist.findContactMoves(candidateMoves);
      });
      if (candidateMoves.length === 0) {
        this.finished = true;
        this.moveList.push(new FinishMove());
        return;
      }
    }

    // sort candidates
    candidateMoves.sort((a, b) => b.progress - a.progress);
    // select candidate
    var move;
    if (this.reduceGroups) {
      // always use best move
      move = candidateMoves[0];
    } else {
      var idx: number; 
      if (this.moveRandom) {
        idx = Math.floor(
          Math.random() * candidateMoves.length * this.moveTolerance
        );
      } else {
        idx = 0;
      }
      // take first or last move
      if (this.moveSlowly) {
        move = candidateMoves[candidateMoves.length - 1 - idx];
      } else {
        move = candidateMoves[idx];
      }
    }
    
    // execute move
    this.distributions[move.combination].doMove(move);
    this.moveList.push(move);
    // console.log("MOVED: " +JSON.stringify(move));
  }

  public undoLastMove() {
    if (this.moveList.length > 0) {
      const move = this.moveList.pop();
      move!.revert(this);
    }
  }

  public revertMove(move: Move) {
    var revMove = new Move(move.combination, move.to, move.from, - move.progress);
    this.distributions[revMove.combination].doMove(revMove);
  }

  public revertFinish() {
    this.finished = false;
  }

  public revertModeSwitch() {
    this.reduceGroups = true;
  }

  public getSize() {
    return this.size;
  }

  public getCourseSizes() {
    return this.courseSizes;
  }

  public getMaxSizes() {
    return this.maxSizes;
  }

  public getMoveCount() {
    return this.moveList.length;
  }

  public isFinished() {
    return this.finished;
  }

  public getOversizeSum() {
    return this.courseSizes.reduce((sum, groupSizes, i) => {
      return groupSizes.reduce(
        (res, siz) => res + Math.max(0, siz - this.maxSizes[i]),
        sum
      );
    }, 0);
  }

  public getOversizeMax() {
    return this.courseSizes.reduce((max, groupSizes, i) => {
      return groupSizes.reduce(
        (res, siz) => Math.max(res, siz - this.maxSizes[i]),
        max
      );
    }, 0);
  }

  public getContacts(slice?: number): number {
    return this.distributions.reduce(
      (sum, dist) => sum + dist.getContacts(slice),
      0
    );
  }

  public getMemberCount(slice?: number): number {
    return this.distributions.reduce(
      (sum, dist) => sum + dist.getMemberCount(slice),
      0
    );
  }

  /*
   *  output support
   */
  public configString() {
    return this.cfgString;
  }

  public getLevel() {
    return this.level;
  }

  public statusString() {
    return `Groups: ${this.size}; Contacts: ${this.getContacts()}; Moves: ${
      this.moveList.length
    }; Finished: ${this.finished}; Fixing sizes: ${
      this.reduceGroups
    }; Oversize sum: ${this.getOversizeSum()}; Oversize max: ${this.getOversizeMax()}`;
  }

  public print() {
    console.log('PUPILS');
    console.table(this.pupilTable());
    console.log('DISTRIBUTIONS');
    console.table(this.combiTable());
    console.log('COURSES');
    console.table(this.courseTable());
    console.log('CONTACTS : ' + this.getContacts());
  }

  public courseTable() {
    var res: Object[] = [];
    this.level.getCourses().forEach((course) => {
      var lo = course.asLO();
      for (let i = 0; i < this.size; i++) {
        lo['group-' + (i + 1)] = this.courseSizes[course.getIndex()][i];
      }
      res.push(lo);
    });
    return res;
  }

  public courseCols() {
    var res = this.level.courseCols();
    for (let i = 1; i <= this.size; i ++) {
      res.push(new NumberCol(`group-${i}`, `G.${i} # Schüler`, `Anzahl Schüler des\nKurs in Gruppe ${i}`));
   }
    return res;
  }

  public combiTable() {
    var res: Object[] = [];
    this.distributions.forEach((dist) => res.push(dist.asLO()));
    // var sum: any = { no: 'Summe' };
    // for (let i = 0; i < this.size; i++) {
    //   sum['Count-' + i] = this.getMemberCount(i);
    //   sum['CombiSize-' + i] = '--';
    //   sum['Contacts-' + i] = this.getContacts(i);
    // }
    // res.push(sum);
    return res;
  }

  public combiCols() {
    return CombiDistribution.loCols(this.level.getBlocks().length , this.size);
  }

  public pupilTable() {
    var table: any[] = this.level.pupilTable();
    this.distributions.forEach((dist) => dist.setPupilsGroups(table));
    return table;
  }

  public pupilCols() {
    return this.level.pupilCols();
  }
}
