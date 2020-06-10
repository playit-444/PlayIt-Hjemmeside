import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {getTestBed, TestBed} from '@angular/core/testing';
import {GameService} from '../game.service';

// TODO NOT DONE
describe('GameService', () => {
  let httpMock: HttpTestingController;
  let gameService: GameService;
  let injector: TestBed;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [GameService]
    });
    injector = getTestBed();
    gameService = injector.get(GameService);
    httpMock = injector.get(HttpTestingController);
  });
  afterEach(() => {
    httpMock.verify();
  });
  it('Login(User) should try to login and success', () => {
    /*const user: User = {
      userName: 'Mikkel',
      password: 'Qwerty!23456',
      ipv4: '192.168.1.1'
    };*/

    gameService.GetGameTypes().subscribe((res) => {
      expect(res).toEqual('', 'should return expected results')
    });

    const req = httpMock.expectOne(`https://api.444.dk/api/GameType`);
    expect(req.request.method).toBe('GET');
    req.flush('');
  });
});
