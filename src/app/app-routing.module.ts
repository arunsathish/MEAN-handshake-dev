import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { GroupListComponent } from './group-list/group-list.component';
import { GroupDetailComponent } from './group-detail/group-detail.component';
import { FeedComponent } from './group-detail/feed/feed.component';
import { ResourceComponent } from './group-detail/resource/resource.component';
import { GoalComponent } from './group-detail/goal/goal.component';
import { AboutComponent } from './group-detail/about/about.component';
import { FeedCreateComponent } from './group-detail/feed/feed-create/feed-create.component';
import { FeedShowComponent } from './group-detail/feed/feed-show/feed-show.component';
import { ResourceCreateComponent } from './group-detail/resource/resource-create/resource-create.component';
import { ResourceShowComponent } from './group-detail/resource/resource-show/resource-show.component';
import { AuthGuard } from './shared/auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'group', component: GroupListComponent, canActivate: [AuthGuard] },
  { path: 'group/:gid/:gname', component: GroupDetailComponent, canActivate: [AuthGuard], children: [
    { path: 'feed', component: FeedComponent },
    { path: 'resource', component: ResourceComponent },
    { path: 'goal', component: GoalComponent },
    { path: 'about', component: AboutComponent }
  ]},
  { path: 'group/:gid/:gname/feed/create', component: FeedCreateComponent, canActivate: [AuthGuard] },
  { path: 'group/:gid/:gname/feed/:fid/edit', component: FeedCreateComponent, canActivate: [AuthGuard] },
  { path: 'group/:gid/:gname/feed/:fid', component: FeedShowComponent, canActivate: [AuthGuard] },
  { path: 'group/:gid/:gname/resource/create', component: ResourceCreateComponent, canActivate: [AuthGuard] },
  { path: 'group/:gid/:gname/resource/:rid', component: ResourceShowComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
