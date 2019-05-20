import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

export interface GroupDialog {
  groupCode: string;
}

@Component({
  selector: 'app-group-join-dialog',
  templateUrl: './group-join-dialog.component.html',
  styleUrls: ['./group-join-dialog.component.scss']
})
export class GroupJoinDialogComponent implements OnInit {

  groupCode: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: GroupDialog) { }

  ngOnInit() {
    this.data = {
      groupCode: this.groupCode
    }
  }

}
