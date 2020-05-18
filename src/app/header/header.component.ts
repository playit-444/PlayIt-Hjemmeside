import {CookieService} from 'ngx-cookie-service';
import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ActivatedRoute} from '@angular/router';
import {UserService} from '../services/user.service';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  closeResult = '';
  @ViewChild('loginContent') loginContent: TemplateRef<any>;
  verified = false;
  loggedIn: boolean;


  constructor(
    private modalService: NgbModal,
    private route: ActivatedRoute,
    private userService: UserService,
    public cookieService: CookieService,
    private toastr: ToastrService,
    private router: Router
  ) {
  }

  open(content) {
    this.modalService.open(content);
  }

  ngOnInit(): void {
    this.route
      .queryParams
      .subscribe(params => {
        const urlParmToken = params['token'];

        if (urlParmToken != null) {
          this.userService.Verify(urlParmToken)
            .subscribe(success => {
                this.toastr.success('Du er nu blevet verificeret! du kan nu logge ind', 'Succes!');
                this.verified = true;
                this.modalService.open(this.loginContent);
              },
              err => {
                this.toastr.error(err.error, 'Der skete en fejl!');
                console.log(err);
              });
        }
      });
  }

  logout() {
    this.cookieService.delete('session-token');
    
    //this.router.navigateByUrl('tableSelection');
  }
}
