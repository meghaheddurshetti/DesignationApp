import { Component, OnInit } from '@angular/core';
import { Designation } from './designation';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({

  selector: 'app-designationdisplay',
  templateUrl: './designationdisplay.component.html',
  styleUrls: ['./designationdisplay.component.css']
})
export class DesignationdisplayComponent implements OnInit {
  updatedItem;
  closeResult: string;
  selectedDesignationOption:string;
  constructor(private modalService: NgbModal) { }
  // id: string='';
  name: string = '';
  msg = 'Are You Sure!';
  description:string = '';
  arrDesig: Designation[ ] = [
  new Designation('Software Engineer', 'Software Engineer'),
  new Designation('Data Base AdminiStator', 'Handle the backend DB ports configauration'),
  new Designation('Sr. Software', 'Senior Software Engineer')
 ];
  editId:number;
  editName:string;
  editDescription:string;

  ngOnInit() {
  }

  // modal
  open(content) {
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
  openEdit(content, i) {
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



  onSubmitFormDesign() {
   /* if (this.id!=null) {

    }
    console.log()
    // console.log(f.value);
    console.log(f.value.name);
    this.id = f.value.id;
    this.name = f.value.name;
    this.description = f.value.description;
    // console.log(this.name);
    */
    this.arrDesig.push(new Designation(this.id, this.name, this.description));

  }





  EditItem(i) {
    console.log(i);
    this.name = this.arrDesig[i].name ;
    this.description = this.arrDesig[i].description ;
    this.updatedItem = i;

  }


  UpdateItem() {
    //console.log(f.value);
    let data = this.updatedItem;
    // console.log(data);
    // alert(this.arrDesig.length);
    for (let i = 0; i < this.arrDesig.length; i++) {
      if (i == data) {
        this.arrDesig[i].name = this.name;
        this.arrDesig[i].description = this.description ;
        console.log(this.arrDesig);

        this.name='';
        this.description='';
      }
    }

  }




}
