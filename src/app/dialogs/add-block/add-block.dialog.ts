import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup } from '@angular/forms';
import { AddBlockTechniqueForm } from '../../forms/add-block-technique/add-block-technique.form';
import { AddBlockLearnSongForm } from '../../forms/add-block-learn-song/add-block-learn-song.form';
import { BlocksService } from '../../services/blocks/blocks.service';
import { ErrorableComponent } from '../../components/errorable/errorable.component';
import * as Blocks from '../../blocks';

@Component({
  templateUrl: './add-block.dialog.html'
})
export class AddBlockDialog extends ErrorableComponent {
  public Blocks = Blocks;
  public type: Blocks.Type;
  public form: FormGroup;

  constructor(
    private reference: MatDialogRef<AddBlockDialog>,
    private blocks: BlocksService,
    @Inject(MAT_DIALOG_DATA) private data?: Blocks.Block
  ) {
    super();

    if (data) {
      this.update(data.type, data);
    }
  }

  public onSelect(type: Blocks.Type) {
    this.update(type);
  }

  public onCancel(): void {
    this.reference.close(undefined);
  }

  public onSubmit(): void {
    this.reference.close({ 'type': this.type, ...this.form.value });
  }

  private update(type: Blocks.Type, block?: Blocks.Block) {
    this.type = type;

    if (this.type === Blocks.Type.Technique) {
      this.form = AddBlockTechniqueForm.create(block as Blocks.Technique);
    } else if (this.type === Blocks.Type.LearnSong) {
      this.form = AddBlockLearnSongForm.create(block as Blocks.LearnSong);
    } else {
      throw Error('Unsupported option');
    }
  }
}
