const gameDom = document.querySelector('.game')
class Pipe extends Rectangle{
    constructor(height,top,LandSpeed,dom){
        super(53,height,gameWidth,top,LandSpeed,0,dom)
    }
    onMove(){
        if(this.left < -this.width){
            //当柱子出去了就移除这个柱子
            this.dom.remove()
        }
    }
}

//创建一个随机数
function getRandom(min,max){
    return Math.floor(Math.random() * (max - min) + min)
}

class PipePare{
    constructor(LandSpeed){
        //柱子中间的空隙高度
        this.spaceHeight = 150
        //柱子的最小高度
        this.minHeight = 80
        this.maxHeight = LandTop - this.minHeight - this.spaceHeight
        const upHeight = getRandom(this.minHeight,this.maxHeight) 
        const upDom = document.createElement('div')
        upDom.className = 'pipe up'
        const downHeight = LandTop - upHeight - this.spaceHeight
        const downTop = LandTop - downHeight
        const downDom = document.createElement('div')
        downDom.className = 'pipe down'
        this.downPipe = new Pipe(downHeight,downTop,LandSpeed,downDom)
        this.upPipe = new Pipe(upHeight,0,LandSpeed,upDom)
        gameDom.appendChild(upDom)
        gameDom.appendChild(downDom)
    }
    //判断柱子触媒出视野
    get useLess(){
        return this.upPipe.left < -this.upPipe.width
    }

    move(duration){
        this.upPipe.move(duration)
        this.downPipe.move(duration)
    }
}

//不断的产生柱子
class PipePareProducer{
    constructor(LandSpeed){
        this.LandSpeed = LandSpeed
        this.pairs = []
        this.timer = null
        this.tick = 1300
    }
    startProduce(){
        if(this.timer){
            return;
        }
        this.timer = setInterval(() => {
            this.pairs.push(new PipePare(this.LandSpeed))
            //移除用不到的柱子
            for (let i = 0; i < this.pairs.length; i++) {
                var pair = this.pairs[i];
                if(pair.useLess){
                    this.pairs.splice(i,1)
                    i--
                }
            }
        },this.tick)
    }
    stopProduce(){
        clearInterval(this.timer)
        this.timer = null
    }
}