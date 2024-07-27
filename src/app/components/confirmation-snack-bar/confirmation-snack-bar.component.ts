import { Component, Inject, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_SNACK_BAR_DATA, MatSnackBarModule, MatSnackBarRef } from '@angular/material/snack-bar';

@Component({
  selector: 'app-confirmation-snack-bar',
  templateUrl: './confirmation-snack-bar.component.html',
  styleUrls: ['./confirmation-snack-bar.component.css'],
  standalone: true,
  imports: [MatButtonModule, MatSnackBarModule]
})
export class ConfirmationSnackBarComponent {
  snackBarRef = inject(MatSnackBarRef);
  constructor(
    @Inject(MAT_SNACK_BAR_DATA) public data: any
  ) { }  
}
