import { Component, ViewChild } from '@angular/core';
import { RoutineService } from '../../services/routine/routine.service';
import { StopwatchComponent } from '../stopwatch/stopwatch.component';
import * as Blocks from '../../blocks';
import * as Documents from '../../documents';
import * as utils from '../../utils';

@Component({
  templateUrl: './practice.component.html'
})
export class PracticeComponent {
  public Blocks = Blocks;

  private phases?: utils.Iterator<Documents.Phase>;
  private blocks?: utils.Iterator<Documents.Block>;

  public get phase(): Blocks.Phase | null {
    if (!this.phases) {
      return null;
    }

    if (this.phases.done()) {
      return null;
    }

    return this.phases.current().data;
  }

  public get block(): Blocks.Block | null {
    if (!this.blocks) {
      return null;
    }

    if (this.blocks.done()) {
      return null;
    }

    return this.blocks.current().data;
  }

  @ViewChild('blockStopwatch') blockStopwatch: StopwatchComponent;

  constructor(service: RoutineService) {
    service.routine$.subscribe(async routine => {
      this.phases = this.blocks = null;

      if (routine) {
        const phases: Documents.Phase[] = await utils.snap(routine.phases$);
        this.phases = new utils.Iterator<Documents.Phase>(phases);

        await this.initBlocks();
      }
    });
  }

  private nextBlock(): void {
    this.blocks.next();
    this.blockStopwatch.reset();
  }

  private async nextPhase(): Promise<void> {
    this.phases.next();
    await this.initBlocks();
  }

  private async initBlocks(): Promise<void> {
    if (this.phases.done()) {
      return;
    }

    const phase: Documents.Phase = this.phases.current();
    const blocks: Documents.Block[] = await utils.snap(phase.blocks$);

    this.blocks = new utils.Iterator<Documents.Block>(blocks);
    this.blockStopwatch.reset();
  }
}
