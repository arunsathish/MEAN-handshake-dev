import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Location } from '@angular/common';
import { environment } from 'src/environments/environment';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class FeedService {

  constructor(private http: HttpClient, private _location: Location, private snackBar: MatSnackBar) { }

  private openSnackBar(message: string) {
    this.snackBar.open(message, 'OK', { duration: 2000 });
  }

  // -----------
  // FEED
  // -----------
  // Create Feed
  createFeed(feed) {
    this.http.post<{ message: string }>( environment.nodeUrl + "/api/feed", feed.value)
      .subscribe((res) => {
        // console.log(res);
        this.openSnackBar(res.message);
        if(res) {
          this._location.back();
        }
      });
  }

  // Read Multiple Feed for specfic Group ID
  getMultipleFeeds(groupId) {
    return this.http.get<{ message: string, feeds: any }>( environment.nodeUrl + "/api/feed/group/" + groupId);
  }

  // Read Single Feed
  getSingleFeeds(feedId) {
    return this.http.get<{ message: string, feed: any }>( environment.nodeUrl + "/api/feed/" + feedId);
  }

  // Update Feed
  updateFeed(feedId, feed) {
    this.http.put( environment.nodeUrl + "/api/feed/" + feedId, feed)
      .subscribe(response => {
        // console.log(response);
        this._location.back();
      });
  }

  // Delete Feed
  deleteFeed(feedId) {
    this.http.delete( environment.nodeUrl + "/api/feed/" + feedId)
      .subscribe(res => {
        console.log(res);
        if(res) {
          this._location.back();
        }
      })
  }


  // -------------
  // FEED COMMENT
  // -------------
  // Create Feed Comment
  createFeedComment(feed) {
    console.log(feed);
    this.http.post<{ message: string }>( environment.nodeUrl + "/api/feed/feedComment", feed)
      .subscribe((res) => {
        // console.log(res);
        this.openSnackBar(res.message)
      })
  }

  // Read Single Feed Comment by FeedCommentID
  getSingleFeedComment(feedCommentId) {
    return this.http.get<{ message: string, feedComment: any }>( environment.nodeUrl + "/api/feed/feedComment/" + feedCommentId);
  }

  // Update Feed Comment Content
  updateFeedCommentContent(feedCommentId, feedComment) {
    return this.http.put( environment.nodeUrl + "/api/feed/feedComment/" + feedCommentId, feedComment)
      .subscribe((response) => {
        console.log(response);
      });
  }

  // Delete Feed Comment
  deleteFeedComment(feedId, feedCommentId) {
    return this.http.delete( environment.nodeUrl + "/api/feed/" + feedId + "/feedComment/" + feedCommentId)
      .subscribe((response) => {
        console.log(response);
      });
  }



}