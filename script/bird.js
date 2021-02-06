const birdDom = document.querySelector('.bird')
const birdDomstyle = getComputedStyle(birdDom)  //这个方法可以拿到这个dom对象的样式
const birdWidth = parseFloat(birdDomstyle.width)      //必须取整数或者浮点数，不然这个变量没法进行计算
const birdHeight = parseFloat(birdDomstyle.height)
const birdTop = parseFloat(birdDomstyle.top)
const birdLeft = parseFloat(birdDomstyle.left) 
const gameStyle = getComputedStyle(document.querySelector('.game'))
const gameHeight = parseFloat(gameStyle.height)
const gameWidth = parseFloat(gameStyle.width)
class Bird extends Rectangle{
    constructor(){
        super(birdWidth,birdHeight,birdTop,birdLeft,0,0,birdDom)
        //向下的一个加速度
        this.g = 1500
        //同继承父级的字类自己的变量可以取到
        this.maxY = gameHeight - LandHeight - birdHeight
        //小鸟的翅膀状态
        this.swingStatus = 1
        //翅膀煽动计数器
        this.timer = null
        this.render()
    }
    //开始煽动翅膀
    startSwing(){
        this.timer = setInterval(() =>{
            this.swingStatus = (this.swingStatus + 1) % 3 + 1
            if(this.swingStatus === 4){
                this.swingStatus = 1
            }
            this.render()
        },300)
    }
    //停止翅膀
    stopSwing(){
        clearInterval(this.timer)
        this.timer = null
    }

    //父类没有渲染翅膀 重写
    render(){
        //重用父类的渲染
        super.render()
        this.dom.className = `bird swing${this.swingStatus}`
    }
    //父级上面没有加速度，自己创建一个新的
    move(duration){
        super.move(duration)
        this.yspeed += this.g * duration
    }
    //控制bird小鸟的范围
    onMove(){
        if(this.top > this.maxY){
           this.top = this.maxY
        }
        else if(this.top < 0){
            this.top = 0
        }
    }

    //向上跳
    jump(){
        this.yspeed = -450
    }
}