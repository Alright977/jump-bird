const LandDom = document.querySelector('.land')
const LandDomstyle = getComputedStyle(LandDom)  //这个方法可以拿到这个dom对象的样式
const LandWidth = parseFloat(LandDomstyle.width)      //必须取整数或者浮点数，不然这个变量没法进行计算
const LandHeight = parseFloat(LandDomstyle.height)
const LandTop = parseFloat(LandDomstyle.top)
class Land extends Rectangle{
    constructor(LandSpeed){
        super(LandWidth,LandHeight,0,488,LandSpeed,0,LandDom)
    }

    onMove(){
        if(this.left <= -LandWidth / 2) {
            this.left = 0; 
        }
    }
    
}