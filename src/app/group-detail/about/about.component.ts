import { Component, OnInit, OnDestroy } from '@angular/core';
import { GroupService } from 'src/app/shared/group.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Params } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';

import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material';
import { AboutService } from '../shared/about.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit, OnDestroy {

  // group;
  // private groupsSub: Subscription;
  gid;
  userId = localStorage.getItem('userId');

  private groupSubs: Subscription;
  groupName: string;
  groupCode: string;
  creatorId: string;
  creatorDisplayName: string;
  creatorEmail: string;
  creatorPhotoURL: string;
  createdOn;
  membersDisplayName;


  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  groupCategories: object[] = [];

  constructor(private groupService: GroupService, private route: ActivatedRoute, public afAuth: AngularFireAuth, private aboutService: AboutService) { }

  ngOnInit() {
    this.route.parent.paramMap.subscribe((paramsMap: Params) => {
      this.gid = paramsMap.get('gid');
    })
    this.groupSubs = this.groupService.getSingleGroups(this.gid).subscribe((result) => {
      // console.log(result.group);
      this.groupName = result.group.groupName;
      this.groupCode = result.group.groupCode;
      this.creatorDisplayName = result.group.creator.displayName;
      this.creatorEmail = result.group.creator.email;
      this.creatorPhotoURL = result.group.creator.photoURL;
      this.creatorId = result.group.creator._id;
      this.createdOn = result.group.createdOn;
      this.membersDisplayName = result.group.members;
      this.groupCategories = result.group.groupCategory;
      // console.log(this.membersDisplayName);
      // console.log(this.userId);
      // console.log(this.creatorId);
      console.log(this.groupCategories);
    });

  }





  add(event: MatChipInputEvent) {
    const input = event.input;
    const value = event.value;
    // Add our fruit
    if ((value || '').trim()) {
      if(!this.groupCategories) { this.groupCategories = []; };
      
      console.log(typeof this.groupCategories);
      this.groupCategories.push({ name: value.trim() });
      this.updateGroupCategory(this.groupCategories);
    }
    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(category) {
    const index = this.groupCategories.indexOf(category);
    if (index >= 0) {
      this.groupCategories.splice(index, 1);
    }
    this.updateGroupCategory(this.groupCategories);
  }

  updateGroupCategory(groupCat) {
    this.aboutService.updateGroupCategory(groupCat, this.gid);
    // console.log(groupCat);
  }

  makeAdmin() {
    
  }

  removeAdmin() {

  }




  leaveGroup() {
    const groupId = this.gid;
    this.groupService.leaveJoinedGroup(groupId, this.userId);
  }

  deleteGroup() {
    this.groupService.deleteGroup(this.gid);
  }

  ngOnDestroy() {
    this.groupSubs.unsubscribe();
  }


}
