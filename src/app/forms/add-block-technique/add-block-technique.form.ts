import { Component, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-block-technique',
  templateUrl: './add-block-technique.form.html',
  styleUrls: ['./add-block-technique.form.css']
})
export class AddBlockTechniqueForm {
  @Input()
  public form: FormGroup;

  public static create(): FormGroup {
    return new FormGroup({
      description: new FormControl('', [
        Validators.required
      ]),
      bpm: new FormControl(80, [
        Validators.required,
        Validators.min(1),
        Validators.max(250),
      ])
    });
  }
}
