import { Component, OnInit, OnDestroy } from '@angular/core';
import { GroupService } from '../shared/group.service';
import { Subscription } from 'rxjs';
import { GroupCreateDialogComponent } from './group-create-dialog/group-create-dialog.component';
import { MatDialog } from '@angular/material';
import { GroupJoinDialogComponent } from './group-join-dialog/group-join-dialog.component';
import { AuthService } from '../shared/auth.service';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.scss']
})
export class GroupListComponent implements OnInit {
  

  group;
  userId = localStorage.getItem('userId');

  constructor(private groupService: GroupService, private dialog: MatDialog, private authService: AuthService, private userService: UserService) { }

  ngOnInit() {
    this.getUserGroup();
  }

  openGroupJoinDialog() {
    const joinGroupDialogRef = this.dialog.open(GroupJoinDialogComponent);

    joinGroupDialogRef.afterClosed().subscribe(result => {
      console.log('Create Group dialog closed ' + result);
      const groupCode = result;
      if(groupCode) {
        this.groupService.joinGroup(groupCode, this.userId);
        setTimeout(() => { this.getUserGroup(); }, 1500);
      }
    });
    

  }

  openGroupCreateDialog() {
    const dialogRef = this.dialog.open(GroupCreateDialogComponent, { autoFocus: false, width: "80%" });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Create Group dialog closed ' + result);
      const groupTitle = result;

      if(groupTitle) {
        this.groupService.createGroup(groupTitle, this.userId);
        setTimeout(() => { this.getUserGroup(); }, 1500);
      }

    });
  }

  signout() {
    this.authService.signOut();
  }

  private getUserGroup() {
    const userId = localStorage.getItem('userId');
    this.userService.getSingleUser(userId).subscribe((result) => {
      this.group = result.user.groups.map(groupData => {
        // this.group.numberOfMember = groupData.members.length;
        return {
          numberOfMember: groupData.members.length,
          ...groupData
        }
      });
      // console.log(this.group);
    });
  }

}
