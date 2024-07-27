import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit, Pipe, PipeTransform, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { UserService } from 'src/app/services/user.service';
import { DialogRef } from '@angular/cdk/dialog';
import { MatSnackBarModule, MatSnackBarRef } from '@angular/material/snack-bar';
import { CoreService } from 'src/app/core/core.service';
import { MatInputModule } from '@angular/material/input';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-user-edit-add',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatRadioModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    FlexLayoutModule
  ],
  templateUrl: './user-edit-add.component.html',
  styleUrls: ['./user-edit-add.component.css'],
})
export class UserEditAddComponent implements OnInit {
  userFrom: FormGroup = new FormGroup({});

  EducationList: string[] = [
    'Diploma',
    'Intermediate',
    'Graduate',
    'Post Graduate',
  ];

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private dialogRef: MatDialogRef<UserEditAddComponent>,
    private snackbar: CoreService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.userFrom = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      // dob: [''],
      gender: [''],
      education: [''],
    });

    this.userFrom.patchValue(this.data);
  }

  onFormSubmit() {
    if (this.userFrom.valid) {
      if (this.data) {
        /** uncomment when integrate API call */
        // this.userService
        //   .updateUser(this.data.id, this.userFrom.value)
        //   .subscribe({
        //     next: (value) => {
        // this.snackbar.openSnackBar('User Updated Successfully', 'done');
        //       this.dialogRef.close(true);
        //     },
        //     error: (err) => {
        //       console.log(err);
        //     },
        //   });
        

        /** comment when integrate API call */
        this.snackbar.openSnackBar('User Updated Successfully', 'done');
        this.dialogRef.close(this.userFrom.value);

      } else {
        /** uncomment when integrate API call */
        // this.userService.addUser(this.userFrom.value).subscribe({
        //   next: (val: any) => {
        //     this.snackbar.openSnackBar('User Added Successfully', 'done');
        //     this.dialogRef.close(true);
        //   },
        //   error: (err: any) => {
        //     console.log(err);
        //   },
        // });

        /** comment when integrate API call */
        this.snackbar.openSnackBar('User Added Successfully', 'done');
        this.dialogRef.close(this.userFrom.value);
      }
    }
  }
}
