class Rectangle{
    constructor(width,height,left,top,xspeed,yspeed,dom){
        this.width = width
        this.height = height
        this.left = left
        this.top = top
        this.xspeed = xspeed
        this.yspeed = yspeed
        this.dom = dom
        this.render()
    }
    
    render(){     //把这些矩形进行渲染
        this.dom.style.width = this.width + 'px'
        this.dom.style.height = this.height + 'px'
        this.dom.style.left = this.left + 'px'
        this.dom.style.top = this.top + 'px'
    }
    move(duration){        //算出这些矩形移动距离
        const disX = this.xspeed * duration
        const disY = this.yspeed * duration
        this.left = this.left + disX
        this.top = this.top + disY
       
        if(this.onMove){       //判断你子类有没有这个方法，如果字类有，直接帮你调用
            this.onMove()
        }
       
        this.render()  //赋值完后进行一个重新渲染
    }
}