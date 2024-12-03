import { _decorator, Component, EventKeyboard, Input, input, KeyCode, Label, Node } from 'cc';
import { AudioMgr } from './AudioMgr';
const { ccclass, property } = _decorator;

@ccclass('Main')
export class Main extends Component {
    @property(Node)
    btnAd:Node = null!;

    @property(Label)
    lbScore:Label = null!;

    adInstance:any = null!;

    userScore:number = 0;
    addSorce:number = 4;

    start() {
        AudioMgr.inst.play('Audio/Bg/game_music');
        this.adInstance = (window as any)['adInstance'];
        this.showInitilizeAD();
        this.btnAd.on(Node.EventType.TOUCH_END,this.onTouchEnd,this);

        this.updateLb();

        input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this)
    }

    updateLb():void{
      this.lbScore.string = `金币:${this.userScore}`;
    }

    showInitilizeAD():void{
        if(!this.adInstance)return;

        AudioMgr.inst.pause();
        this.adInstance.interstitialAd({
            beforeAd(){
              console.log('Prepare for the ad. Mute and pause the game flow.');
            },
            afterAd(){
              console.log('Ad show normally,ad has been closed, Resume the game and un-mute the sound.');
              AudioMgr.inst.resume();
            },
            error(err:any){
              console.log(`开屏广告错误:${err}`);
            }
          });
    }

    
    onTouchEnd():void{
        if(!this.adInstance)
            return
        const self = this;
        AudioMgr.inst.pause();
        this.adInstance.rewardAd({
            beforeAd(){
              console.log('The ad starts playing, and the game should pause.');
            },
            adDismissed(){
              console.log('Player dismissed the ad before completion.');
              AudioMgr.inst.resume();
            },
            adViewed(){
              console.log('Ad was viewed and closed.');
              self.userScore += self.addSorce;
              self.updateLb();
              AudioMgr.inst.resume();
            },
            error(err:any) {
                console.log(`激励广告错误:${err}`);
            }
          });
    }

    onKeyDown (event: EventKeyboard) {
      switch(event.keyCode) {
          case KeyCode.ARROW_UP:
              console.log('Press a key');
              break;
      }
  }


    update(deltaTime: number) {
        
    }
}


