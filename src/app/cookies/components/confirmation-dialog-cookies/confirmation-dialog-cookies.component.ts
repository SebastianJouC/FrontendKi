import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-dialog-cookies',
  imports: [CommonModule,  MatDialogModule, MatButtonModule],
  templateUrl: './confirmation-dialog-cookies.component.html',
  styleUrl: './confirmation-dialog-cookies.component.css'
})
export class ConfirmationDialogCookiesComponent {
  readonly dialogRef = inject(MatDialogRef<ConfirmationDialogCookiesComponent>);

  onCancel():void {
    this.dialogRef.close(false);
    console.log("cancel");

  }

  onConfirm():void {
    this.dialogRef.close(true);
    console.log("confirm");
  }
}
