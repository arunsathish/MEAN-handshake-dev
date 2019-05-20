import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { FeedService } from '../../shared/feed.service';
import { Subscription } from 'rxjs';
import { Feed } from '../../shared/feed.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { FeedCommentEditDialogComponent } from './feed-comment-edit-dialog/feed-comment-edit-dialog.component';

@Component({
  selector: 'app-feed-show',
  templateUrl: './feed-show.component.html',
  styleUrls: ['./feed-show.component.scss']
})
export class FeedShowComponent implements OnInit, OnDestroy {

  feedCommentForm: FormGroup;
  
  fid: string;
  private feedSubs: Subscription;
  singleFeeds;

  feedTitle;
  feedCreatorDisplayName;
  feedCreatedOn;
  feedDesc;
  feedComment;
  private userId = localStorage.getItem('userId');


  constructor(private route: ActivatedRoute, private feedService: FeedService, private dialog: MatDialog) { }

  ngOnInit() {
    this.feedCommentForm = new FormGroup({
      'feedCommentContent': new FormControl("", { validators: [ Validators.minLength(4)] } ),
    });
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      this.fid = paramMap.get('fid');
    });
    this.getFeed();
  }

  private getFeed() {
    const feedId = this.fid;
    this.feedSubs = this.feedService.getSingleFeeds(feedId)
      .subscribe((feedData: { message: string, feed: any }) => {
        this.singleFeeds = feedData.feed;
        this.feedTitle = feedData.feed.feedTitle;
        this.feedCreatorDisplayName = feedData.feed.feedCreator.displayName;
        this.feedCreatedOn = feedData.feed.feedCreatedOn;
        this.feedDesc = feedData.feed.feedDesc;
        this.feedComment = feedData.feed.feedComment;
        // console.log(this.feedComment);
        // console.log(this.singleFeeds);
      });
  }

  deleteFeed() {
    // console.log(this.fid);
    this.feedService.deleteFeed(this.fid);
  }

  onSaveFeedComment() {
    if(this.feedCommentForm.invalid) { return; }

    this.feedCommentForm.value.fid = this.fid;
    this.feedCommentForm.value.feedCommentCreator = this.userId;
    this.feedCommentForm.value.feedCommentCreatedOn = new Date;
    this.feedCommentForm.value.feedCommentUpdatedOn = new Date;
    this.feedService.createFeedComment(this.feedCommentForm.value);
    setTimeout(() => { this.getFeed(); this.feedCommentForm.reset(); }, 1500);

  }

  openFeedCommentEditDialog(feedCommentId) {
    const feedCommentEditDialogRef = this.dialog.open(FeedCommentEditDialogComponent, { 
      autoFocus: false, width: '95%',
      data: { feedCommentId: feedCommentId }
    });
    feedCommentEditDialogRef.afterClosed().subscribe(res => { this.getFeed(); });
  }

  deletedFeedComment(feedCommentId) {
    this.feedService.deleteFeedComment(this.fid, feedCommentId);
    setTimeout(() => { this.getFeed(); }, 1500);
  }

  ngOnDestroy() {
    this.feedSubs.unsubscribe();
  }

}
