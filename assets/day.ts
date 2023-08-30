import { _decorator, Component, Label, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('day')
export class day extends Component {
    @property({ type: Node }) DayCount: Node | null = null;
    @property({type:Node}) open = null;
    @property({type:Node}) close = null;
    @property({type:Node}) collected = null;
    start() {

    }

    setUpDayBonus(Details) {
        // if (this.Lock) this.Lock.active = Details.isLock;
        // if (this.Reward) this.Reward.interactable = !Details.isLock;
        if (this.DayCount ) {
            
            let DayCountComponent = this.DayCount.getComponent(Label);
            if (  DayCountComponent) {
                console.log("setting day count",Details.Day);
                
                DayCountComponent.string = Details.Day;
              
            }
        }
    }

    

    doOpen(){
        this.open.active = true;
        this.close.active = false;
    }

    doClose(){
        this.open.active = false;
        this.close.active = true;
    }

    doCollected(){
        this.collected.active = true;
    }
    notCollected(){
        this.collected.active = false;
    }

    update(deltaTime: number) {
        
    }
}


