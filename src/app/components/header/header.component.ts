import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    RouterModule
  ]
})
export class HeaderComponent implements OnInit, OnDestroy {

  selectedRoute = 'Users';
  headerTitleSub = new Subscription();
  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.headerTitleSub = this.userService.updateHeaderTitleSub.subscribe(
      (data) => {
        this.selectedRoute = data; 
      }
    )
  }

  ngOnDestroy(): void {
    this.headerTitleSub?.unsubscribe();
  }
}
