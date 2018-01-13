import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup } from '@angular/forms';
import { PhaseForm } from '../../forms/phase/phase.form';
import * as Blocks from '../../blocks';

@Component({
  templateUrl: './edit-phase.dialog.html'
})
export class EditPhaseDialog {
    public form: FormGroup;

    constructor(
        private reference: MatDialogRef<EditPhaseDialog>,
        @Inject(MAT_DIALOG_DATA) private data: Blocks.Phase
    ) {
        this.form = PhaseForm.create(data);
    }

    public onCancel(): void {
        this.reference.close(undefined);
    }

    public onSubmit(): void {
        this.reference.close(this.form.value as Blocks.Phase);
    }
}
