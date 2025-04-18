import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-help-dialog',
  templateUrl: './help-dialog.component.html',
  styleUrls: ['./help-dialog.component.css']
})
export class HelpDialogComponent {
 

  constructor(public dialogRef: MatDialogRef<HelpDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: { skills: string }){}
}
