import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './material.module';

import { SafePipeModule } from 'safe-pipe';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { GroupListComponent } from './group-list/group-list.component';

import { environment } from '../environments/environment';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GroupDetailComponent } from './group-detail/group-detail.component';
import { FeedComponent } from './group-detail/feed/feed.component';
import { ResourceComponent } from './group-detail/resource/resource.component';
import { GoalComponent } from './group-detail/goal/goal.component';
import { AboutComponent } from './group-detail/about/about.component';
import { FeedCreateComponent } from './group-detail/feed/feed-create/feed-create.component';
import { FeedShowComponent } from './group-detail/feed/feed-show/feed-show.component';
import { ResourceCreateComponent, UploadLinkAddressDialog } from './group-detail/resource/resource-create/resource-create.component';
import { ResourceShowComponent } from './group-detail/resource/resource-show/resource-show.component';
import { GroupCreateDialogComponent } from './group-list/group-create-dialog/group-create-dialog.component';
import { GroupJoinDialogComponent } from './group-list/group-join-dialog/group-join-dialog.component';
import { FeedCommentEditDialogComponent } from './group-detail/feed/feed-show/feed-comment-edit-dialog/feed-comment-edit-dialog.component';
import { ServiceWorkerModule } from '@angular/service-worker';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    GroupListComponent,
    GroupDetailComponent,
    FeedComponent,
    ResourceComponent,
    GoalComponent,
    AboutComponent,
    FeedCreateComponent,
    FeedShowComponent,
    ResourceCreateComponent,
    ResourceShowComponent,
    GroupCreateDialogComponent,
    GroupJoinDialogComponent,
    FeedCommentEditDialogComponent,
    UploadLinkAddressDialog
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    HttpClientModule,
    SafePipeModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [ GroupJoinDialogComponent, GroupCreateDialogComponent, FeedCommentEditDialogComponent, UploadLinkAddressDialog]
})
export class AppModule { }
