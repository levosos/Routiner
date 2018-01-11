import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as Blocks from '../../blocks';

@Component({
  selector: 'app-add-block-learn-song',
  templateUrl: './add-block-learn-song.form.html',
  styleUrls: ['./add-block-learn-song.form.css']
})
export class AddBlockLearnSongForm {
  @Input()
  public form: FormGroup;

  public static create(block?: Blocks.LearnSong): FormGroup {
    const title: string = block ? block.title : '';
    const artist: string = block ? block.artist : '';
    const level: number = block ? block.level : 0;

    return new FormGroup({
      title: new FormControl(title, [
        Validators.required
      ]),
      artist: new FormControl(artist, [
        Validators.required
      ]),
      level: new FormControl(level, [
        Validators.required,
        Validators.min(0),
        Validators.max(5)
      ])
    });
  }
}
