import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { GroupService } from 'src/app/shared/group.service';

@Injectable({
  providedIn: 'root'
})
export class AboutService {

  groupCategories = [
    { name: 'General' }
  ];

  constructor(private http: HttpClient, private groupService: GroupService) { }

  updateGroupCategory(categories, groupId) {

    this.http.put( environment.nodeUrl + "/api/group/updateGroupCategory/" + groupId, categories)
      .subscribe(res => {
        console.log(res);
      });

    console.log(categories);
  }

}
