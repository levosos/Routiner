import { Component } from '@angular/core';
import { RoutineService } from '../../services/routine/routine.service';
import * as Blocks from '../../blocks';
import * as Documents from '../../documents';

@Component({
  templateUrl: './practice.component.html'
})
export class PracticeComponent {
  private block: Blocks.Block;

  constructor(routine: RoutineService) {
    routine.routine$.subscribe(r => {
      r.phases$.subscribe(phases => {
        const phase: Documents.Phase = phases[0];
        phase.blocks$.subscribe(blocks => {
          this.block = blocks[0].data;
        });
      });
    });
  }
}
