import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { DataSharingService } from 'src/app/shared/services/dataSharingService';
declare const UnityLoader: any;

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit, AfterViewInit, OnDestroy {
  private myFirstGameInstance;
  myFirstGameScripts = [
    '../../assets/games/MyFirstGame/TemplateData/UnityProgress.js',
    '../../assets/games/MyFirstGame/Build/UnityLoader.js'
  ];

  constructor(
    private dataSharingService: DataSharingService
  ) {
    this.dataSharingService.isIngame.next(true);
    this.loadScripts(this.myFirstGameScripts);
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.myFirstGameInstance = UnityLoader.instantiate("gameContainer", "assets/games/MyFirstGame/Build/MyFirstGame.json");
  }

  ngOnDestroy(): void {
    this.dataSharingService.isIngame.next(false);
  }

  loadScripts(scripts: string[]) {
    for (let i = 0; i < scripts.length; i++) {
      const node = document.createElement('script');
      node.src = scripts[i];
      node.type = 'text/javascript';
      document.getElementsByTagName('head')[0].appendChild(node);
    }
  }

  EnableFullscreen() {
    this.myFirstGameInstance.SetFullscreen(1);
  }

  public SendMsgToUnity(message) {
    this.myFirstGameInstance.SendMessage("JSUnityBridge", "HandleMessageFromJS", message);
  }

  public HandleUnityMessage(element) {
    var message = element.target.attributes['data-message'].value

    // Do stuff with message
    console.log(message);
    window.alert(message);
  }

}
