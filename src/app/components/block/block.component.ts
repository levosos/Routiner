import { Component, Input } from '@angular/core';
import * as Documents from '../../documents';

@Component({
  selector: 'app-block',
  templateUrl: './block.component.html'
})
export class BlockComponent {
  @Input()
  public block: Documents.Block;
}
