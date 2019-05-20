import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-group-detail',
  templateUrl: './group-detail.component.html',
  styleUrls: ['./group-detail.component.scss']
})
export class GroupDetailComponent implements OnInit {
  gid;
  gname;

  constructor(private route: ActivatedRoute, private authService: AuthService) { }

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: Params) => {
      this.gid = paramMap.get('gid');
      this.gname = paramMap.get('gname');
    })
  }

  signout() {
    this.authService.signOut();
  }

}
