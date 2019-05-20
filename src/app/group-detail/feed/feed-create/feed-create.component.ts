import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FeedService } from '../../shared/feed.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Feed } from '../../shared/feed.model';
import { Subscription } from 'rxjs';
import { GroupService } from 'src/app/shared/group.service';

@Component({
  selector: 'app-feed-create',
  templateUrl: './feed-create.component.html',
  styleUrls: ['./feed-create.component.scss']
})
export class FeedCreateComponent implements OnInit {

  form: FormGroup;

  private gid;
  private fid;
  private mode = "create";
  category;
  feed: Feed;
  feedSubs: Subscription;

  constructor(private feedService: FeedService, private route: ActivatedRoute, private groupService: GroupService) { }

  ngOnInit() {

    this.form = new FormGroup({
      'feedType': new FormControl("", { validators: [ Validators.required ] }),
      'feedTitle': new FormControl("", { validators: [ Validators.required ] }),
      'feedDesc': new FormControl("", { validators: [ Validators.required ] }),
      'feedCategory': new FormControl("", { validators: [ Validators.required ] }),
    });

    this.route.paramMap.subscribe((paramMap: Params) => {
      this.gid = paramMap.get('gid');
      // console.log(this.gid);
    });

    this.route.paramMap.subscribe((paramMap: Params) => {
      if(paramMap.has("fid")) {
        this.mode = "edit";
        this.fid = paramMap.get('fid');
        this.feedSubs = this.feedService.getSingleFeeds(this.fid).subscribe(feedData => {
          this.feed = { id: feedData.feed._id, feedType: feedData.feed.feedType, feedTitle: feedData.feed.feedTitle, feedDesc: feedData.feed.feedDesc, feedCategory: feedData.feed.feedCategory };
          this.form.setValue({ 'feedType': this.feed.feedType, 'feedTitle': this.feed.feedTitle, 'feedDesc': this.feed.feedDesc, 'feedCategory': this.feed.feedCategory });
        });
      } else {
        this.mode = "create";
        this.fid = null;
      }
    });

    this.groupService.getSingleGroups(this.gid)
    .subscribe((result: any) => {
      console.log(result);
      this.category = result.group.groupCategory;
    });
  }

  onSaveFeed() {
    if(this.form.invalid) { return; }

    this.form.value.groupId = this.gid;
    this.form.value.feedCreator = localStorage.getItem('userId');
    this.form.value.feedCreatedOn = new Date();
    this.form.value.feedUpdatedOn = new Date();
    this.form.value.id = this.fid;
    // console.log(this.form.value);
    if(this.mode === 'create') {
      this.feedService.createFeed(this.form);
    } else {
      // console.log(this.form.value);
      this.feedService.updateFeed(this.fid, this.form.value);
    }
    // this.form.reset();
  }

}
