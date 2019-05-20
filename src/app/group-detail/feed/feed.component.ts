import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FeedService } from '../shared/feed.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit, OnDestroy {
  private gid;
  multipleFeeds = [];
  private feedsSub: Subscription;

  constructor(private feedService: FeedService, private route: ActivatedRoute) { }

  ngOnInit() {
    
    this.route.parent.paramMap.subscribe((paramMap: Params) => {
      this.gid = paramMap.get('gid');
    });

    const groupId = this.gid;
    this.feedsSub = this.feedService.getMultipleFeeds(groupId)
      .subscribe((feedData: { message: string, feeds: any }) => {
        this.multipleFeeds = feedData.feeds;
        // console.log(feedData.feeds);
      });
  }

  ngOnDestroy() {
    this.feedsSub.unsubscribe();
  }

}
