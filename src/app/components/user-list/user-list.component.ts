import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FlexLayoutModule } from "@angular/flex-layout";
import { UserService } from 'src/app/services/user.service';
import { UserEditAddComponent } from '../user-edit-add/user-edit-add.component';
import { CoreService } from 'src/app/core/core.service';
import { User } from 'src/app/modal/user';
import * as _ from 'lodash';

@Component({
  selector: 'app-user-list',
  standalone: true,
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    MatButtonModule,
    MatSnackBarModule,
    MatDialogModule,
    FlexLayoutModule
  ]
})
export class UserListComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  userList: User[] = [];

  constructor(
    private dialog: MatDialog,
    private userService: UserService,
    private coreService: CoreService
  ) {
    userService.updateHeaderTitle('Users');
  }

  ngOnInit(): void {
    this.getUserList();
  }

  addUserForm(): void {
    const dialogRef = this.dialog.open(UserEditAddComponent);

    dialogRef.afterClosed().subscribe({
      next: (user) => {
        if (user) {
          /** uncomment when integrate API call */
          // this.getUserList();

          /** comment when integrate API call */
          const maxId = _.maxBy(this.userList, function(user) { return user.id; })?.id || 0;
          user.id = maxId + 1;
          this.userList.unshift(user);
          this.setUserData(this.userList);
        }
      },
    });
  }

  displayedColumns: string[] = [
    'id',
    'firstName',
    'lastName',
    'email',
    // 'dob',
    'gender',
    'education',
    'edit',
    'delete',
  ];

  dataSource!: MatTableDataSource<any>;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getUserList(): void {
    this.userService.getUserDetails().subscribe({
      next: (res) => {
        this.userList = res;
        this.setUserData(res);
      },
      error: (err: any) => {},
    });
  }

  setUserData(userData: User[]): void {
    this.dataSource = new MatTableDataSource(userData);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  deleteUser(id: number, index: number) {
    let snackBarRef = this.coreService.openConfirmationActionSnackBar({
      message: 'Are you sure want to delete user?',
      okBtnTxt: 'Yes',
      cancelBtnTxt: 'No'
    });
    snackBarRef.onAction().subscribe(() => {
      /** uncomment when integrate API call */
      // this.userService.deleteUser(id).subscribe({
      //   next: (res) => {
      //     this.snackbar.openSnackBar('User Deleted', 'done');
      //     this.getUserList();
      //   },
      //   error: (err) => {
      //     console.log(err);
      //   },
      // });

      /** comment when integrate API call */
      this.coreService.openSnackBar('User Deleted', 'done');
      this.userList.splice(index, 1);
      this.setUserData(this.userList);
    });
  }

  editUserForm(data: any, index: number): void {
    const dialogRef = this.dialog.open(UserEditAddComponent, {
      data,
    });
    dialogRef.afterClosed().subscribe({
      next: (user) => {
        if (user) {
          /** uncomment when integrate API call */
          // this.getUserList();

          /** comment when integrate API call */
          this.userList.splice(index, 1);
          user.id = data.id;
          this.userList.splice(index, 0, user);
          this.setUserData(this.userList);
        }
      },
    });
  }
}