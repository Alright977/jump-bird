const skyDom = document.querySelector('.sky')
const skyDomstyle = getComputedStyle(skyDom)  //这个方法可以拿到这个dom对象的样式
const skyWidth = parseFloat(skyDomstyle.width)      //必须取整数或者浮点数，不然这个变量没法进行计算
const skyHeight = parseFloat(skyDomstyle.height)
class Sky extends Rectangle{
    constructor(){
        super(skyWidth,skyHeight,0,0,-50,0,skyDom)
    }

    onMove(){
        if(this.left <= -skyWidth / 2) {
            this.left = 0; 
        }
    }
    
}
