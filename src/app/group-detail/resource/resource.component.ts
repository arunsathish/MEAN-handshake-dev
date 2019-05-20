import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ResourceService } from '../shared/resource.service';
import { ActivatedRoute, Params } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-resource',
  templateUrl: './resource.component.html',
  styleUrls: ['./resource.component.scss']
})
export class ResourceComponent implements OnInit, OnDestroy {

  private gid;
  multipleResources = [];
  private resourcesSub: Subscription;

  // resources = [
  //   { rid: 403, rtitle: 'six original and distinct spitz breeds', rdesc: 'The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan A small.', rupdated: new Date('26 June 2018'), rauthor: 'Rahul' },
  //   { rid: 404, rtitle: 'ed do eiusmod tempor incididunt ut', rdesc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', rupdated: new Date('26 June 2018'), rauthor: 'Sahil Pandit' },
  //   { rid: 405, rtitle: 'ullamco laboris nisi ut aliquip ex', rdesc: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', rupdated: new Date('26 June 2018'), rauthor: 'Dilip Kumar' },
  //   { rid: 406, rtitle: 'velit esse cillum dolore eu', rdesc: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.', rupdated: new Date('26 June 2018'), rauthor: 'Sandeep Shekar' },
  //   { rid: 407, rtitle: 'sunt in culpa qui officia deserunt', rdesc: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', rupdated: new Date('26 June 2018'), rauthor: 'Sahil Pandit' },
  // ];

  constructor(private resourceService: ResourceService, private route: ActivatedRoute, private _sanitizer: DomSanitizer) { }

  ngOnInit() {
    
    this.route.parent.paramMap.subscribe((paramMap: Params) => {
      this.gid = paramMap.get('gid');
    });

    const groupId = this.gid;
    this.resourcesSub = this.resourceService.getMultipleResources(groupId)
      .subscribe((resourceData: { message: string, resources: any }) => {
        this.multipleResources = resourceData.resources;
        // console.log(this.multipleResources);
      });
  }

  ngOnDestroy() {
    this.resourcesSub.unsubscribe();
  }

}
