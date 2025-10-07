import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Profile } from './profile.model';
import { AuthgoogleService } from '../authgoogle.service';

@Component({
  selector: 'app-landingpage',
  standalone: false,
  templateUrl: './landingpage.component.html',
  styleUrl: './landingpage.component.scss'
})
export class LandingpageComponent {

  profile: Profile | undefined;

  constructor(private router: Router, private authService: AuthgoogleService) {

  }

  navegar() {
    this.router.navigate(['/paginas/galeria']);
  }

  logarGoogle() {
    this.authService.login();
  }

  isLoggedIn() {
    const userLogged = this.authService.getLoggedProfile();    
    this.profile = userLogged;

    return !!this.profile;
  }
}
