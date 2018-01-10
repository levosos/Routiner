import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { FormGroup } from '@angular/forms';
import { AddBlockTechniqueForm } from '../../forms/add-block-technique/add-block-technique.form';
import { AddBlockLearnSongForm } from '../../forms/add-block-learn-song/add-block-learn-song.form';
import { BlocksService } from '../../services/blocks/blocks.service';
import { ErrorableComponent } from '../../components/errorable/errorable.component';
import * as Blocks from '../../blocks';

@Component({
  templateUrl: './add-block.dialog.html',
  styleUrls: ['./add-block.dialog.css']
})
export class AddBlockDialog extends ErrorableComponent {
  public Blocks = Blocks;
  public type: Blocks.Type;
  public form: FormGroup;

  constructor(private reference: MatDialogRef<AddBlockDialog>, private blocks: BlocksService) {
    super();
  }

  public onSelect(type: Blocks.Type) {
    this.type = type;

    if (this.type === Blocks.Type.Technique) {
      this.form = AddBlockTechniqueForm.create();
    } else if (this.type === Blocks.Type.LearnSong) {
      this.form = AddBlockLearnSongForm.create();
    } else {
      throw Error('Unsupported option');
    }
  }

  public onCancel(): void {
    this.reference.close(undefined);
  }

  public onSubmit(): void {
    this.reference.close({ 'type': this.type, ...this.form.value });
  }
}
