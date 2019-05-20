import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { environment } from 'src/environments/environment';
import { Group } from './group.model';
import { PickerService } from '../group-detail/shared/picker.service';

declare var gapi: any;

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  constructor(private http: HttpClient, private router: Router, private snackBar: MatSnackBar, private pickerService: PickerService) { }

  private openSnackBar(message: string) {
    this.snackBar.open(message, 'OK', { duration: 2000 });
  }

  createGroup(groupName: string, creator: string) {
    const group: Group = { groupName: groupName, creator: creator, createdOn: new Date() };
    return this.http.post<{ message: string, group: any }>( environment.nodeUrl + "/api/group", group)
      .subscribe((res) => {
        // console.log(res);
        this.openSnackBar("Group Created - " + res.group.groupName);
        this.updateGroupDriveFolderId(res.group); 
      });
  }

  joinGroup(groupCode: string, userId: string) {
    const updatingGroupMembers = { groupCode: groupCode, userId: userId };
    return this.http.put<{ message: string, groupData: any }>( environment.nodeUrl + "/api/group/join", updatingGroupMembers)
      .subscribe(res => {
        console.log(res);
        this.openSnackBar(res.message + " - " + res.groupData.groupName );
        this.updateGroupDriveFolderId(res.groupData);        
      });
  }

  // Update Group Drive FolderId
  updateGroupDriveFolderId(groupData) {
    const groupName = "HandshakeGroup - " + groupData.groupName;
    let fileMetadata = {
      'name': groupName,
      'mimeType': 'application/vnd.google-apps.folder'
    };

    gapi.client.drive.files.create({
      resource: fileMetadata
    }).then((file) => {
      if(file) {
        // const folderId = file.result.id
        // console.log('Folder Id: ', folderId);
        const folderDetail = { groupId: groupData._id, userId: localStorage.getItem('userId'), folderId: file.result.id };
        console.log(folderDetail);



        let permissions = [ { 'type': 'anyone', 'role': 'reader' } ];
        gapi.client.drive.permissions.create({
          resource: permissions,
          fileId: file.result.id
        }).then((res) => {
          if(res) {
            console.log(res);
          }
        });



        return this.http.put( environment.nodeUrl + "/api/group/updateGroupDriveFolderId", folderDetail)
          .subscribe(res => {
            console.log(res);
          });

      }
    });



  }

  updateGroupDrivePermission() {

  }



  leaveJoinedGroup(groupId: string, userId: string) {
    const updatingGroupMembers = { groupId: groupId, userId: userId };
    return this.http.put<{ message: string }>( environment.nodeUrl + "/api/group/leaveJoined", updatingGroupMembers)
      .subscribe(res => {
        // console.log(res);
        if(res) {
          this.router.navigate(['/group']);
          this.openSnackBar(res.message);
        }
      });
  }


  // ################
  // Get Single Group
  getSingleGroups(groupId) {
    return this.http.get<{ message: string, group: any }>( environment.nodeUrl + "/api/group/" + groupId);
  }

  // ################
  // Get Single Group
  getSingleGroupOfUserIdObject(groupId, userId) {
    return this.http.get<{ message: string, groupMemberObject: any }>( environment.nodeUrl + "/api/group/" + groupId + "/" + userId);
  }


  // ###########
  // Delete Single Group
  deleteGroup(groupId) {
    this.http.delete<{ message: string }>( environment.nodeUrl + "/api/group/" + groupId)
    .subscribe(res => {
      // console.log(res);
      if(res) {
        this.router.navigate(['/group']);
        this.openSnackBar(res.message);
      }
    })
  }


}
