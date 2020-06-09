import {UserService} from '../user.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {TestBed} from '@angular/core/testing';
import {User} from '../../models/user';

describe('ValueService', () => {
  let httpMock: HttpTestingController;
  let userService: UserService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService]
    });
    userService = TestBed.get(UserService);
    httpMock = TestBed.get(HttpTestingController);
  });
  it('Login(User) should try to login and success', () => {
    const user: User = {
      userName: 'Mikkel',
      password: 'Qwerty!23456',
      ipv4: '192.168.1.1'
    };

    userService.Login(user).subscribe((res) => {
      expect(res.request.method).toEqual('POST');
      expect(res.data).toBe(true);
      httpMock.verify();
    });
  });

  it('Login(User) should try to login and fail', () => {
    const user: User = {
      userName: 'Test',
      password: 'Hej',
      ipv4: '192.168.1.1'
    };

    userService.Login(user).subscribe((res) => {
    }, (err) => {
      expect(err.request.method).toEqual('POST');
      expect()
      httpMock.verify();
    });
  });
});
