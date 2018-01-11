import { Component, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as Blocks from '../../blocks';

@Component({
  selector: 'app-add-block-technique',
  templateUrl: './add-block-technique.form.html',
  styleUrls: ['./add-block-technique.form.css']
})
export class AddBlockTechniqueForm {
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
