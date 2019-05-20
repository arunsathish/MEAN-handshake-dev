import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';

declare var gapi: any;
declare var google: any;

@Injectable({
  providedIn: 'root'
})
export class PickerService {

  pickerApiLoaded = this.auth.pickerApiLoaded;

  resourceItems: any[] = [];

  constructor(private auth: AuthService) { }



  // Upload
  openUploadPicker() {
    this.createUploadPicker();
  }
  createUploadPicker() {
    const oauthToken = localStorage.getItem('oauthToken');
    // const driveGroupFolderId = '1jv4Z5q3g0YgyPSTMCuEfpfv3WpRcpQPB';
    const driveGroupFolderId = localStorage.getItem('groupFolderId');
    if (this.pickerApiLoaded && oauthToken) {
      const picker = new google.picker.PickerBuilder().
        addView(new google.picker.DocsUploadView().setParent(driveGroupFolderId) ).
        setOAuthToken(oauthToken).
        setCallback(this.uploadPickerCallback).
        setTitle('HandShake Upload').
        build();
        picker.setVisible(true);
    }
  }
  uploadPickerCallback(data) {
    // console.log(data);

    if (data[google.picker.Response.ACTION] == google.picker.Action.PICKED) {
      let uploadedItems = data.docs.map(uploadItem => ({
        fileId: uploadItem.id,
        fileUrl: uploadItem.url,
        fileName: uploadItem.name,
        fileType: uploadItem.type,
      }));
      console.log(uploadedItems[0]);
      let oldItem = JSON.parse(localStorage.getItem('resourceItem')) || [];
      oldItem.push(uploadedItems[0]);
      localStorage.setItem('resourceItem', JSON.stringify(oldItem));

    }

  }



  // Drive Picker
  openDrivePicker() {
    this.createDrivePicker();
  }
  createDrivePicker() {
    const oauthToken = localStorage.getItem('oauthToken');
    if (this.pickerApiLoaded && oauthToken) {
      var view = new google.picker.View(google.picker.ViewId.DOCS);
      const picker = new google.picker.PickerBuilder().
        addView(view).
        setOAuthToken(oauthToken).
        setCallback(this.drivePickerCallback).
        setTitle('HandShake Drive').
        build();
        picker.setVisible(true);
    }
  }
  drivePickerCallback(data) {
    if (data.action == google.picker.Action.PICKED) {
      let selectedItems = data.docs.map(selectedItem => ({
        fileId: selectedItem.id,
        fileUrl: selectedItem.url,
        fileName: selectedItem.name,
        fileType: selectedItem.type,
      }));
      console.log(selectedItems[0]);
      let oldItem = JSON.parse(localStorage.getItem('resourceItem')) || [];
      oldItem.push(selectedItems[0]);
      localStorage.setItem('resourceItem', JSON.stringify(oldItem));
    }
  }

  // Youtube Picker
  openYoutubePicker() {
    this.creatYoutubePicker();
  }
  creatYoutubePicker() {
    const oauthToken = localStorage.getItem('oauthToken');
    if (this.pickerApiLoaded && oauthToken) {      
      const picker = new google.picker.PickerBuilder().
        addView(new google.picker.​VideoSearchView()).
        setOAuthToken(oauthToken).
        setCallback(this.youtubePickerCallback).
        setTitle('HandShake Youtube').
        build();
        picker.setVisible(true);
    }
  }
  youtubePickerCallback(data) {
    if (data.action == google.picker.Action.PICKED) {
      let youtubePickedItems = data.docs.map(youtubePickedItem => ({
        fileId: youtubePickedItem.id,
        fileUrl: youtubePickedItem.url,
        fileName: youtubePickedItem.name,
        fileType: youtubePickedItem.type,
      }));
      // console.log(youtubePickedItems);
      console.log(youtubePickedItems[0]);
      let oldItem = JSON.parse(localStorage.getItem('resourceItem')) || [];
      oldItem.push(youtubePickedItems[0]);
      localStorage.setItem('resourceItem', JSON.stringify(oldItem));
    }
  }

  getResourceItemsFromLocalstorage() {
    let resourceItem = JSON.parse(localStorage.getItem('resourceItem'));
    console.log(resourceItem);
    return resourceItem;
  }


}
