import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-block-learn-song',
  templateUrl: './add-block-learn-song.form.html',
  styleUrls: ['./add-block-learn-song.form.css']
})
export class AddBlockLearnSongForm {
  @Input()
  public form: FormGroup;

  public static create(): FormGroup {
    return new FormGroup({
      title: new FormControl('', [
        Validators.required
      ]),
      artist: new FormControl('', [
        Validators.required
      ]),
      percentage: new FormControl(0, [
        Validators.required,
        Validators.min(0),
        Validators.max(100)
      ])
    });
  }
}
