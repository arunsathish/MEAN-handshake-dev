import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FeedService } from 'src/app/group-detail/shared/feed.service';
import { Subscription } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';

export interface FeedCommentEditData {
  feedCommentId: string
}

@Component({
  selector: 'app-feed-comment-edit-dialog',
  templateUrl: './feed-comment-edit-dialog.component.html',
  styleUrls: ['./feed-comment-edit-dialog.component.scss']
})
export class FeedCommentEditDialogComponent implements OnInit, OnDestroy {

  feedCommentEditForm: FormGroup;
  feed;
  feedComment;
  private feedCommentSubs: Subscription;

  constructor(private feedService: FeedService, @Inject(MAT_DIALOG_DATA) private data: FeedCommentEditData, private feedCommentEditDialogRef: MatDialogRef<FeedCommentEditDialogComponent>) { }

  ngOnInit() {
    this.feedCommentEditForm = new FormGroup({ 'feedCommentContent': new FormControl("", { validators: [ Validators.minLength(4)] }), });

    this.feedCommentSubs = this.feedService.getSingleFeedComment(this.data.feedCommentId)
    .subscribe((response) => {
      // console.log(response);
      this.feed = response.feedComment[0];
      this.feedCommentEditForm.setValue({ feedCommentContent: response.feedComment[0].feedCommentContent });
    });

  }

  onSaveFeedCommentEdit() {
    // console.log(this.feedCommentEditForm.value);
    this.feedCommentEditForm.value.feedCommentUpdatedOn = new Date;
    const feedCommentId = this.feed._id;
    const feedCommentEdited = this.feedCommentEditForm.value;
    this.feedService.updateFeedCommentContent(feedCommentId, feedCommentEdited);
    this.feedCommentEditDialogRef.close();
  }


  ngOnDestroy() {
    this.feedCommentSubs.unsubscribe();
  }

}
