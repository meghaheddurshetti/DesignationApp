import { Component, OnInit } from '@angular/core';
import { Designation } from './designation';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { NgbModalBackdrop } from '@ng-bootstrap/ng-bootstrap/modal/modal-backdrop';

@Component({

  selector: 'app-designationdisplay',
  templateUrl: './designationdisplay.component.html',
  styleUrls: ['./designationdisplay.component.css']
})
export class DesignationdisplayComponent implements OnInit {
  // inject modalService
  constructor(private modalService: NgbModal) { }
  updatedItem: number;
  title = 'Designations';
  closeResult: string;
  selectedDesignationOption: string;
  name: string;
  msg = 'Are You Sure!';
  description:string;

  arrDesig: Designation[ ] = [
  new Designation('Software Engineer', 'Software Engineer'),
  new Designation('System AdminiStator', 'System AdminiStator'),
  new Designation('Sr. Software', 'Senior Software Engineer')
 ];
  editId:number;
  editName:string;
  editDescription:string;

  ngOnInit() {
  }


  onSearch(value) {

    console.log(value);
    if (value != '') {
      this.arrDesig = this.arrDesig.filter(x => x.name.startsWith(value));
    }
    this.ngOnInit();
  }

  // Add modal
  openAdd(content, passedTitle) {
    this.selectedDesignationOption = passedTitle;
    this.name = '';
    this.description = '';
    this.modalService.open(content);
  }

  // Edit modal popup
  openEdit(content, passedTitle, i) {
    console.log(content);
    this.selectedDesignationOption = passedTitle;
    // console.log(i);
    this.name = this.arrDesig[i].name;
    this.description = this.arrDesig[i].description;
    // console.log('updating');
    this.updatedItem = i;
    this.modalService.open(content);
  }


  // delete
  onDesigDelete(desig) {
    console.log(desig);
    if (confirm(this.msg) === true) {
      this.arrDesig.splice(this.arrDesig.indexOf(desig), 1);
    }

  }

  onFormSubmit() {
    if (this.selectedDesignationOption == 'Add') {
      console.log(this.name);
      this.arrDesig.push(new Designation(this.name, this.description));
    } else {
      let data = this.updatedItem;
      // console.log(data);
      // alert(this.arrDesig.length);
      for (let i = 0; i < this.arrDesig.length; i++) {
        if (i == data) {
          this.arrDesig[i].name = this.name;
          this.arrDesig[i].description = this.description ;
          console.log(this.arrDesig);

          // To initialize the fields with empty data
          this.name = '';
          this.description = '';
        }
      }
    }
    this.modalService.dismissAll();
  }
}
