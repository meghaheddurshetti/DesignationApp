import { Component, OnInit } from '@angular/core';
import { Designation } from './designation';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({

  selector: 'app-designationdisplay',
  templateUrl: './designationdisplay.component.html',
  styleUrls: ['./designationdisplay.component.css']
})
export class DesignationdisplayComponent implements OnInit {
  updatedItem:number;
  title='Designations';
  closeResult: string;
  selectedDesignationOption:string;
  constructor(private modalService: NgbModal) { }
  // id: string='';
  name: string = '';
  msg = 'Are You Sure!';
  description:string = '';
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
    if (value != "") {
      this.arrDesig = this.arrDesig.filter(x => x.name.indexOf(value) != -1);
    }
  }

  // modal
  open(content, passedTtitle, name) {
    this.selectedDesignationOption = passedTtitle;
    this.name = '';
    this.description = '';
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  // modal
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }


  // Edit modal popup
  openEdit(content, passedTtitle, i) {
    this.selectedDesignationOption = passedTtitle;
    console.log(i);
    this.name = this.arrDesig[i].name;
    this.description = this.arrDesig[i].description;
    console.log('updating');

    this.updatedItem = i;

    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }



  // delete
  onDesigDelete(desig) {
    if (confirm(this.msg) === true) {
      this.arrDesig.splice(this.arrDesig.indexOf(desig), 1);
    }

  }


  onFormSubmit() {
    if (this.selectedDesignationOption=='Add') {
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

          this.name = '';
          this.description = '';
        }
      }

    }
    this.modalService.dismissAll();
    // this.ngOnInit();
  }
}
