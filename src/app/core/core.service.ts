import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmationSnackBarComponent } from '../components/confirmation-snack-bar/confirmation-snack-bar.component';

@Injectable({
  providedIn: 'root',
})
export class CoreService {
  constructor(private snackBar: MatSnackBar) {}

  openSnackBar(message: string, action: string = 'ok') {
    this.snackBar.open(message, action, {
      duration: 5000,
      verticalPosition: 'top',
    });
  }

  openConfirmationActionSnackBar(dataConfig: any) {
    return this.snackBar.openFromComponent(ConfirmationSnackBarComponent, {
      panelClass: 'confirmation-snack-bar',
      duration: 10000,
      verticalPosition: 'top',
      data: {
        message: dataConfig.message || 'Are you sure you want to delete?',
        okBtnTxt: dataConfig.okBtnTxt || 'Ok',
        cancelBtnTxt: dataConfig.cancelBtnTxt || 'Cancel',
      }
    });
  }
  
}
