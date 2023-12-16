let highestZ=1;


class Paper{

   holdingPaper = false;

   prevMouseX=0;
   prevMouseY=0;

   mouseX =0;
   mouseY =0;
   mouseTouchX=0;
   mouseTouchY =0;
   velocityX=0;
   velocityY =0;
   rotation=Math.random()* 60 -150;
   currentPaperX =0;
   currentPaperY =0;
   rotating = false;
    init(paper){
    
    document.addEventListener('mousemove',(e)=>{
      if(!this.rotating) { 
        this.mouseX = e.clientX;
        this.mouseY = e.clientY;

        this.velocityX = this.mouseX - this.prevMouseX;
        this.prevMouseY = this.mouseY - this.prevMouseY;
    }
      const dirX = e.clientX - this.mouseTouchX;
      const dirY = e.clientY - this.mouseTouchY;
      const dirLength = Math.sqrt(dirX*dirX+dirY*dirY);
      const dirNormalizedX = dirX / dirLength;
      const dirNormalizedY = dirY / dirLength;

      const angle = Math.atan2(dirNormalizedY, dirNormalizedX);
      let degrees = 180 * angle / Math.PI;
      degrees = (360 + Math.round(degrees)) % 360;
      if(this.rotating) {
        this.rotation = degrees;
      }
        if (this.holdingPaper){
            this.currentPaperX +=this.velocityX;
            this.currentPaperY += this.velocityY;

            this.prevMouseX = this.mouseX;
            this.prevMouseY = this.mouseY;

            paper.style.transform = `translatex(${this.currentPaperX}px) translateY(${this.currentPaperY}px) rotateZ(${this.rotation}deg)`;
        }
    })

    paper.addEventListener('mousedown',(e)=>{
        
        this.holdingPaper = true;
    
        paper.style.zIndex = highestZ;
        highestZ+= 1;
    
        if(e.button ==0){
            this.prevMouseX = this.mouseX;
            this.prevMouseY = this.mouseX;
            this.prevMouseX = this.mouseX;
            this.prevMouseY = this.mouseY;
        }
        if(e.button === 2) {
            this.rotating = true;
          }
        });


    window.addEventListener('mouseup',(e)=>{
        this.holdingPaper = false;
        this.rotating = false;
     });
    }
}
const papers=Array.from(document.querySelectorAll('.paper'));
papers.forEach(paper =>{
    const p = new Paper();
    p.init(paper);
});