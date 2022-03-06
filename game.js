class player {
    constructor(size = 50, image = null) {
        this.life = 10
        this.hit = 0
        this.posX = 100
        this.posY = height - size/3
        this.size = size/2
        this.miss = 0
        this.image = image
    }

    show() {
        if (this.posX >= width - size) {
            this.posX = width - size
        }
        if (this.posX <= size) {
            this.posX = size
        }
        if(this.image === null){
            fill('red')
            ellipse(this.posX, this.posY, this.size);
        }else{
            imageMode(CENTER);
            image(this.image,this.posX, this.posY,this.size,this.size)
        }
    }
}
class bullet {
    constructor(posX, posY, size) {
        this.posX = posX
        this.posY = posY
        this.speed = 10
        this.size = size
    }

    show() {

        //stroke([255,0,0,50]); // Change the color
        //strokeWeight(10)
        fill([255,103,0,50])
        ellipse(this.posX, this.posY, this.size/4);
        fill([255,77,0,,50])
        ellipse(this.posX, this.posY, this.size/6);
        fill([255,0,0])
        ellipse(this.posX, this.posY, this.size/8);
        //point(this.posX, this.posY)
        this.posY -= this.speed
    }

    top() {
        return this.posY <= 0
    }
}

class enemy {
    constructor(posX,posY,size,image = null) {
        this.posX = posX
        this.posY = posY
        this.size = size
        this.distance
        this.image = image
        this.destX = this.posX
        this.destY = this.posY
        this.kamikazee = false
        this.speed = random(5,20)
    }

    show() {
        if(!this.kamikazee){
            if( Math.abs(this.destX - this.posX) < 2 && Math.abs(this.destY - this.posY) < 2){
                this.destX += random(-20,20)
                this.destY += random(-20,20)
            }else{
                if(this.posX > this.destX) this.posX--
                if(this.posY > this.destY) this.posY--
                if(this.posX < this.destX) this.posX++
                if(this.posY < this.destY) this.posY++
            }
        }else{
            this.posY += this.speed
        }
        if(this.image === null){
            noStroke()
            fill('red')
            rect(this.posX, this.posY, this.size);
        }else{
            imageMode(CENTER);
            image(this.image, this.posX, this.posY,this.size,this.size/2);
        }
    }

    hit(bulletsArr){
        if(dist(bulletsArr.posX,bulletsArr.posY,this.posX,this.posY) < (this.size / 2)){
            return true
        }
        return false
    }

    playerHit(player){
        return dist(player.posX,player.posY,this.posX,this.posY) < this.size
    }

    bottom(height) {
        return this.posY >= height
    }
}