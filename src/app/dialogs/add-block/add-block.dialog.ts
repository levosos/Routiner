import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { FormGroup } from '@angular/forms';
import { BlockTechniqueForm } from '../../forms/block-technique/block-technique.form';
import { BlockLearnSongForm } from '../../forms/block-learn-song/block-learn-song.form';
import * as Blocks from '../../blocks';

@Component({
  templateUrl: './add-block.dialog.html'
})
export class AddBlockDialog {
  public Blocks = Blocks;
  public type: Blocks.Type;
  public form: FormGroup;

  constructor(private reference: MatDialogRef<AddBlockDialog>) {
  }

  public onSelect(type: Blocks.Type) {
    this.type = type;

    if (this.type === Blocks.Type.Technique) {
      this.form = BlockTechniqueForm.create();
    } else if (this.type === Blocks.Type.LearnSong) {
      this.form = BlockLearnSongForm.create();
    } else {
      throw Error('Unsupported option');
    }
  }

  public onCancel(): void {
    this.reference.close(undefined);
  }

  public onSubmit(): void {
    this.reference.close({ 'type': this.type, ...this.form.value } as Blocks.Block);
  }
}
