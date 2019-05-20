import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Location } from '@angular/common';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class ResourceService {

  constructor(private http: HttpClient, private _location: Location, private snackBar: MatSnackBar) { }

  private openSnackBar(message: string) {
    this.snackBar.open(message, 'OK', { duration: 2000 });
  }

  // -----------
  // RESOURCE
  // -----------
  // Create Resource
  createResource(resource) {
    this.http.post<{ message: string }>( environment.nodeUrl + "/api/resource", resource )
      .subscribe((res) => {
        // console.log(res);
        this.openSnackBar(res.message);
        if(res) {
          this._location.back();
        }
      });
  }

  // Read Multiple Resources for specfic Group ID
  getMultipleResources(groupId) {
    return this.http.get<{ message: string, resources: any }>( environment.nodeUrl + "/api/resource/group/" + groupId);
  }

  // Read Single Resource
  getSingleResource(feedId) {
    return this.http.get<{ message: string, resource: any }>( environment.nodeUrl + "/api/resource/" + feedId);
  }

  // Delete Resource
  deleteResource(resourceId) {
    this.http.delete<{ message: string }>( environment.nodeUrl + "/api/resource/" + resourceId)
      .subscribe(res => {
        console.log(res);
        if(res) {
          this.openSnackBar(res.message);
          this._location.back();
        }
      });
  }


}
