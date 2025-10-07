import { Component, OnInit } from '@angular/core';
import { LayoutProps } from './layoutprops';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, map } from 'rxjs';
import { AuthgoogleService } from '../../authgoogle.service';
import { Profile } from '../../landingpage/profile.model';

@Component({
  selector: 'app-layout',
  standalone: false,
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent implements OnInit {
  props: LayoutProps = { titulo: '', subtitulo: '' };
  profile: Profile | any;

  constructor(private router: Router,
    private activedRoute: ActivatedRoute,
    private authService: AuthgoogleService
  ) {

  }

  ngOnInit(): void {
    this.router.events.pipe(
      filter(() => this.activedRoute.firstChild != null),
      map(() => this.obterDetalhesRota())
    ).subscribe((props: LayoutProps) => this.props = props);
  }

  obterDetalhesRota(): LayoutProps {
    this.profile = this.authService.getLoggedProfile();
    let rotaFilha = this.activedRoute.firstChild;
    while (rotaFilha?.firstChild) {
      rotaFilha = rotaFilha.firstChild;
    }
    return rotaFilha?.snapshot.data as LayoutProps;
  }

  logout() {
    this.authService.logout();
  }
}
