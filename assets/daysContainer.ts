import { _decorator, Component, instantiate, Node, Prefab } from 'cc';
import { day } from './day';
const { ccclass, property } = _decorator;

@ccclass('daysContainer')
export class daysContainer extends Component {

    @property({type:Prefab , visible:true, serializable: true})
        day:Node|null = null;


        public daysDetail = [{
            isLock: true,
            Day: "Day 1",
            Coins: "6",
        }, {
            isLock: true,
            Day: "Day 2",
            Coins: "7",
        }, {
            isLock: true,
            Day: "Day 3",
            Coins: "8",
        }, {
            isLock: true,
            Day: "Day 4",
            Coins: "9",
        }, {
            isLock: true,
            Day: "Day 5",
            Coins: "9",
        }, {
            isLock: true,
            Day: "Day 6",
            Coins: "9",
        }, {
            isLock: true,
            Day: "Day 7",
            Coins: "9",
        }, {
            isLock: true,
            Day: "Day 8",
            Coins: "9",
        }, {
            isLock: true,
            Day: "Day 9",
            Coins: "9",
        }];

    // store days
    daysArray = [];

    //Counting day
    public static dayCount = 1;

    public countingGrid = 1;


    start() {
        

        this.showDays();
    }

    showDays(){
        for (let index = 0; index < this.daysDetail.length; index++) {
            let Day: Node = <Node>instantiate(this.day);
            let dayScript = Day.getComponent(day);
           
            if(localStorage.getItem("day")){
                daysContainer.dayCount = Number(localStorage.getItem("day"));
            }
            if(index < daysContainer.dayCount){
                
                dayScript.doOpen();
            }
            let num = 0;
            if(localStorage.getItem("collected")){
                num = Number(localStorage.getItem("collected"));
            }
            if(index < num){
                dayScript.doCollected() 
            }
            if(localStorage.getItem("countingGrid")){
                this.countingGrid = Number(localStorage.getItem("countingGrid"));
            }
            this.daysDetail[index].Day = `Day ${this.countingGrid + index}`;
            dayScript.setUpDayBonus(this.daysDetail[index]);
            this.daysArray[index] = Day;
            this.node.getChildByName("container").addChild(Day);
        }
            // this.daysArray[index] = Day;
    }

    collect(){
        this.daysArray[daysContainer.dayCount-1].getComponent(day).doCollected();
        localStorage.setItem("collected",String(daysContainer.dayCount))
        if(daysContainer.dayCount<9)
            daysContainer.dayCount++;
        localStorage.setItem("day",String(daysContainer.dayCount));
        if(Number(localStorage.getItem("collected")) == 9){
            this.resetData();
        
          
            
        }
        this.openNext();
    }

    resetData(){
        this.countingGrid = this.countingGrid + 9;
        localStorage.setItem("countingGrid",String(this.countingGrid));
        daysContainer.dayCount = 1
        localStorage.setItem("day",String(daysContainer.dayCount));
        localStorage.setItem("collected",String(daysContainer.dayCount-1))
        this.daysArray.map((element,index)=>{
            this.daysDetail[index].Day = `Day ${this.countingGrid + index}`;
            element.getComponent(day).setUpDayBonus(this.daysDetail[index]);
            element.getComponent(day).doClose();
            element.getComponent(day).notCollected();
        })
    }

    
    openNext(){
        this.daysArray[daysContainer.dayCount-1].getComponent(day).doOpen()
    }


    update(deltaTime: number) {
        
    }
}


