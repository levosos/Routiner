import { Component } from '@angular/core';
import { BlocksService } from '../../services/blocks/blocks.service';

@Component({
  templateUrl: './routine.component.html'
})
export class RoutineComponent {

  constructor(public blocks: BlocksService) {
  }
}
