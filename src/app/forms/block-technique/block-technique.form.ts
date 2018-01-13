import { Component, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as Blocks from '../../blocks';

@Component({
  selector: 'app-block-technique-form',
  templateUrl: './block-technique.form.html',
  styleUrls: ['./block-technique.form.css']
})
export class BlockTechniqueForm {
  @Input()
  public form: FormGroup;

  public static create(block?: Blocks.Technique): FormGroup {
    const description: string = block ? block.description : '';
    const bpm: number = block ? block.bpm : 80;

    return new FormGroup({
      description: new FormControl(description, [
        Validators.required
      ]),
      bpm: new FormControl(bpm, [
        Validators.required,
        Validators.min(1),
        Validators.max(250),
      ])
    });
  }
}
