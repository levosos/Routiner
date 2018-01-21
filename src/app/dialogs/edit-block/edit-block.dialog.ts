import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup } from '@angular/forms';
import { BlockTechniqueForm } from '../../forms/block-technique/block-technique.form';
import { BlockLearnSongForm } from '../../forms/block-learn-song/block-learn-song.form';
import * as Blocks from '../../blocks';

@Component({
  templateUrl: './edit-block.dialog.html'
})
export class EditBlockDialog {
    public Blocks = Blocks;
    public type: Blocks.Type;
    public form: FormGroup;

    constructor(
        private reference: MatDialogRef<EditBlockDialog>,
        @Inject(MAT_DIALOG_DATA) private data: Blocks.Block
    ) {
        this.type = data.type;

        if (this.type === Blocks.Type.Technique) {
            this.form = BlockTechniqueForm.create(data as Blocks.Technique);
        } else if (this.type === Blocks.Type.LearnSong) {
            this.form = BlockLearnSongForm.create(data as Blocks.LearnSong);
        } else {
            throw Error('Unsupported option');
        }
    }

  public onCancel(): void {
    this.reference.close(undefined);
  }

  public onSubmit(): void {
    this.reference.close(this.form.value as Partial<Blocks.Block>);
  }
}
