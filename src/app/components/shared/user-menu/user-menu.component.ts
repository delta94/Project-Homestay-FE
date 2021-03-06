import {Component, OnInit} from '@angular/core';
import {IUser} from '../../../model/iuser';
import {Router} from '@angular/router';
import {UserProfileService} from '../../../services/user-profile.service';

// tslint:disable-next-line:typedef
declare function convertStringToArray(str);


@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.css']
})
export class UserMenuComponent implements OnInit {
  username: string;
  user: IUser;
  roles: string[] = [];

  constructor(private router: Router,
              private userProfileService: UserProfileService) {
  }

  ngOnInit(): void {
    this.username = localStorage.getItem('currentUser');
    if (this.username) {
      this.userProfileService.getUserCurrent().subscribe(
        next => this.user = next,
      );
    }
    this.roles = convertStringToArray(localStorage.getItem('roles'));
  }

  logout(): void {
    localStorage.clear();
    this.router.navigateByUrl('/login');
  }

}
