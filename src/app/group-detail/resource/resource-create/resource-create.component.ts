import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { PickerService } from '../../shared/picker.service';
import { Observable, Subscription } from 'rxjs';
import { ResourceService } from '../../shared/resource.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { GroupService } from 'src/app/shared/group.service';

@Component({
  selector: 'app-resource-create',
  templateUrl: './resource-create.component.html',
  styleUrls: ['./resource-create.component.scss']
})
export class ResourceCreateComponent implements OnInit, OnDestroy {

  resourceCreateForm: FormGroup;
  groupId: string;
  resourceId: string;
  category = [];

  removable = true;
  selectable = true;
  // resourceItems = [
  //   { fileId: "", fileUrl: 'https://m.youtube.com/watch?v=IP0cUBgpY', fileName: "Raja Rani", fileType: "video" },
  //   { fileId: "", fileUrl: 'Dmdw serve.pdf', fileName: "Dmdw serve.pdf", fileType: "PDF" },
  //   { fileId: "", fileUrl: 'https://www.worldofbusiness.com/', fileName: "Modren Website", fileType: "website" },
  // ];

  resourceItems: any[] = [];
  linkAddress;

  constructor(private router: ActivatedRoute,
              public picker: PickerService,
              private resourceService: ResourceService,
              public uploadLinkAddressDialog: MatDialog,
              private groupService: GroupService
  ) { 
    // console.log(this.resourceItems);
  }

  ngOnInit() {
    this.resourceCreateForm = new FormGroup({
      'resourceTitle': new FormControl("", { validators: [ Validators.required ] }),
      'resourceDesc': new FormControl("", { validators: [ Validators.required ] }),
      'resourceCategory': new FormControl("", { validators: [ Validators.required ] })
    });

    this.router.paramMap.subscribe((paramMap: Params) => { 
      this.resourceId = paramMap.get('rid');
      this.groupId = paramMap.get('gid'); 
    });

    const userId = localStorage.getItem('userId');
    this.groupService.getSingleGroupOfUserIdObject(this.groupId, userId)
      .subscribe((result: any) => {
        const folderIdFromDb = result.groupMemberObject.members[0].groupFolderId;
        localStorage.setItem('groupFolderId', folderIdFromDb);
        // console.log(folderIdFromDb);
      });

    this.groupService.getSingleGroups(this.groupId)
    .subscribe((result: any) => {
      console.log(result);
      this.category = result.group.groupCategory;
    });
    // console.log(this.resourceItems);
  }

  openUploadLinkAddressDialog() {
    const dialogRef = this.uploadLinkAddressDialog.open(UploadLinkAddressDialog, {
      data: {linkAddress: this.linkAddress}
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if(result) {
        let uploadLinkAddressUrlResult = { fileId: "", fileUrl: 'https://'+result, fileName: result, fileType: "link" };  
        let oldItem = JSON.parse(localStorage.getItem('resourceItem')) || [];
        oldItem.push(uploadLinkAddressUrlResult);
        localStorage.setItem('resourceItem', JSON.stringify(oldItem));
      }
    });
  }

  getResource() {
    this.resourceItems = this.picker.getResourceItemsFromLocalstorage();
  }

  onSaveResource() {
    
    if(this.resourceCreateForm.invalid) { return; }
    this.resourceCreateForm.value.groupId = this.groupId;
    this.resourceCreateForm.value.resourceCreator = localStorage.getItem('userId');
    this.resourceCreateForm.value.resourceCreatedOn = new Date();
    this.resourceCreateForm.value.resourceUpdatedOn = new Date();
    this.resourceCreateForm.value.resourceItem = JSON.parse(localStorage.getItem('resourceItem'));
    // this.resourceCreateForm.value.id = this.resourceId;
    this.resourceService.createResource(this.resourceCreateForm.value);
    
    // console.log(this.resourceCreateForm.value);

  }


  remove(resourceItem): void {
    const index = this.resourceItems.indexOf(resourceItem);

    if (index >= 0) {
      this.resourceItems.splice(index, 1);
    }
  }

  ngOnDestroy() {
    // this.resourceItemsSub.unsubscribe();
    localStorage.removeItem('resourceItem');
    localStorage.removeItem('groupFolderId');
  }


}














@Component({
  selector: 'upload-link-address-dialog',
  template: `
  <h1 mat-dialog-title>URL Link Address</h1>
  <div mat-dialog-content>
    <mat-form-field>
      <input matInput type="url" [(ngModel)]="data.linkAddress">
    </mat-form-field>
  </div>
  <div mat-dialog-actions>
    <button mat-button (click)="onNoClick()">Cancel</button>
    <button mat-button [mat-dialog-close]="data.linkAddress" cdkFocusInitial>Ok</button>
  </div>

  `,
})
export class UploadLinkAddressDialog {

  constructor(
    public dialogRef: MatDialogRef<UploadLinkAddressDialog>,
    @Inject(MAT_DIALOG_DATA) public data) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}