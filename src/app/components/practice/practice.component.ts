import { Component } from '@angular/core';
import { FirestoreService } from '../../services/firestore/firestore.service';
import * as Blocks from '../../blocks';
import * as Documents from '../../documents';

@Component({
  templateUrl: './practice.component.html'
})
export class PracticeComponent {
  private block: Blocks.Block;

  constructor(firestore: FirestoreService) {
    firestore.routine$.subscribe(routine => {
      routine.phases$.subscribe(phases => {
        const phase: Documents.Phase = phases[0];
        phase.blocks$.subscribe(blocks => {
          this.block = blocks[0].data;
        });
      });
    });
  }
}
