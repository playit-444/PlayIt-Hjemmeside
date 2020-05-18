import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  closeResult = '';
  @ViewChild('loginContent') loginContent:TemplateRef<any>;


  constructor(private modalService: NgbModal, private route: ActivatedRoute, private customerService: UserService) {}

  open(content) {
    console.log(content);
    
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  ngOnInit(): void {

    this.route
      .queryParams
      .subscribe(params => {
        let urlParmToken = params['token'];
        
        if (urlParmToken != null) {
          this.customerService.Verify(urlParmToken)
            .subscribe(success => {
              console.log("############### WORKS");
              this.modalService.open(this.loginContent);
            },
              err => {
                console.log(err);
              });
        }
      });
  }
}
