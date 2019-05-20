import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ResourceService } from '../../shared/resource.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-resource-show',
  templateUrl: './resource-show.component.html',
  styleUrls: ['./resource-show.component.scss']
})
export class ResourceShowComponent implements OnInit {

  rid: string;
  resourceSubs: Subscription;

  singleResource = [];
  resourceTitle;
  resourceCreatorDisplayName;
  resourceCreatorPhotoURL;
  resourceCreatedOn;
  resourceDesc

  // resourceItem = [
  //   { fileIcon: 'insert_drive_file', fileUrl: "https://drive.google.com/file/d/1RwyDfkU64T6v9xOMHk0k7ZAtadiIKgwr/view?usp=drive_web", fileName: 'The Business model Canvas', fileType: 'Video' },
  //   { fileIcon: 'insert_drive_file', fileUrl: "https://drive.google.com/file/d/1RwyDfkU64T6v9xOMHk0k7ZAtadiIKgwr/view?usp=drive_web", fileName: 'Dmdw serve.pdf', fileType: 'PDF' },
  //   { fileIcon: 'insert_drive_file', fileUrl: "https://drive.google.com/file/d/1RwyDfkU64T6v9xOMHk0k7ZAtadiIKgwr/view?usp=drive_web", fileName: 'The collection.jpg', fileType: 'Image' },
  //   { fileIcon: 'insert_drive_file', fileUrl: "https://drive.google.com/file/d/1RwyDfkU64T6v9xOMHk0k7ZAtadiIKgwr/view?usp=drive_web", fileName: 'https://www.worldofbusiness.com/', fileType: 'Link' },
  // ]

  resourceItem;

  constructor(private route: ActivatedRoute, private resourceService: ResourceService) { }

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      this.rid = paramMap.get('rid');
    });

    this.getResource();
  }

  private getResource() {
    const resourceId = this.rid;
    this.resourceSubs = this.resourceService.getSingleResource(resourceId)
      .subscribe((resourceData: { message: string, resource: any }) => {
        // this.singleResource = resourceData.resource;
        this.resourceTitle = resourceData.resource.resourceTitle;
        this.resourceCreatorDisplayName = resourceData.resource.resourceCreator.displayName;
        this.resourceCreatorPhotoURL = resourceData.resource.resourceCreator.photoURL;
        this.resourceCreatedOn = resourceData.resource.resourceCreatedOn;
        this.resourceDesc = resourceData.resource.resourceDesc;
        this.resourceItem = resourceData.resource.resourceItem;
        // console.log(resourceData.resource);
        
      });
  }

  deleteResource() {
    this.resourceService.deleteResource(this.rid);
  }


}
