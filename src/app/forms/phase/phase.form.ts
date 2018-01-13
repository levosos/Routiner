import { Component, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as Blocks from '../../blocks';

@Component({
  selector: 'app-phase-form',
  templateUrl: './phase.form.html',
  styleUrls: ['./phase.form.css']
})
export class PhaseForm {
  @Input()
  public form: FormGroup;

  public static create(phase?: Blocks.Phase): FormGroup {
    const title: string = phase ? phase.title : '';
    const minutes: number = phase ? phase.minutes : 15;

    return new FormGroup({
      title: new FormControl(title, [
        Validators.required
      ]),
      minutes: new FormControl(minutes, [
        Validators.required,
        Validators.min(1),
        Validators.max(120),
      ])
    });
  }
}
