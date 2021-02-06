class Game{
    constructor(){
        this.sky = new Sky()
        this.land = new Land(-100)
        this.bird = new Bird()
        this.pipeProducer = new PipePareProducer(-100)
        this.timer = null
        this.tick = 16 //移动的时间间隔毫秒
        this.gameOver = false
    }
    // 开始游戏
    start(){
        if(this.timer){
            return
        }
        // 如何游戏结束就刷新页面
        if(this.gameOver){
            window.location.reload()
        }
        //生成柱子
        this.pipeProducer.startProduce()
        this.timer = setInterval(()=>{
            const duration = this.tick / 1000
            this.sky.move(duration)
            this.land.move(duration)
            this.bird.move(duration)
            this.bird.startSwing()
            this.pipeProducer.pairs.forEach(pair => {
                pair.move(duration)
            })
            if(this.isGameOver()){
                this.stop()
                this.gameOver = true
            }
        },this.tick)
    }
    //判断两个矩形是否碰撞
    isHit(rec1,rec2){
        var centerX1 = rec1.left + rec1.width / 2
        var centerY1 = rec1.top + rec1.height / 2
        var centerX2 = rec2.left + rec2.width / 2
        var centerY2 = rec2.top + rec2.height / 2
        var disX = Math.abs(centerX1 - centerX2);
        var disY = Math.abs(centerY1 - centerY2);
        if(disX < (rec1.width + rec2.width) / 2 && 
            disY < (rec1.height + rec2.height) / 2 ){
            return true
        }
        return false
    }
   
    isGameOver() {
        if (this.bird.top === this.bird.maxY) {
            alert('Game Over')
            //鸟碰到了大地
            return true;
        }
        for (let i = 0; i < this.pipeProducer.pairs.length; i++) {
            const pair = this.pipeProducer.pairs[i];
            //看柱子对pair是否跟bird进行了碰撞
            if (this.isHit(this.bird, pair.upPipe) || this.isHit(this.bird, pair.downPipe)) {
                alert('Game Over')
                return true;
            }
        }
        return false;
    }

    // 游戏停止
    stop(){
        clearInterval(this.timer)
        this.pipeProducer.stopProduce()
        this.bird.stopSwing()
        this.timer = null
        
    }
    // 键盘事件
    regEvetn(){
        window.onkeydown = (e)=>{
            if(e.key === 'Enter'){
                if(this.timer){
                    this.stop()
                }
                else{
                    this.start()
                }
            }
            else if(e.key === ' '){
                this.bird.jump()
            }
        }
    }
}   
var g = new Game()
    g.regEvetn()