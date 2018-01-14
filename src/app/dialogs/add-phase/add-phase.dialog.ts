import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { FormGroup } from '@angular/forms';
import { PhaseForm } from '../../forms/phase/phase.form';
import * as Blocks from '../../blocks';

@Component({
  templateUrl: './add-phase.dialog.html'
})
export class AddPhaseDialog {
    public form: FormGroup;

    constructor(private reference: MatDialogRef<AddPhaseDialog>) {
        this.form = PhaseForm.create();
    }

    public onCancel(): void {
        this.reference.close(undefined);
    }

    public onSubmit(): void {
        this.reference.close(this.form.value as Partial<Blocks.Phase>);
    }
}
