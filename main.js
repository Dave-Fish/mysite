console.log("main");

canvas = document.querySelector('canvas');

var context, controller, user, loop;

context = document.querySelector("canvas").getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight*0.95;

window.addEventListener('resize',function(event){
    canvas.width = window.innerWidth-5;
    canvas.height = window.innerHeight-5;
})


var maxRadius = (canvas.width + canvas.height)/10;

var mouse = {
    x: undefined,
    y: undefined
}

window.addEventListener('mousemove',function(event){
    mouse.x = event.x;
    mouse.y = event.y;

    if (mouse.x <= 10 || mouse.y <= 10
        || mouse.x >= canvas.width-10 || mouse.y >= canvas.height-10){
        mouse.x = undefined;
        mouse.y = undefined;
    }
})


var hue = Math.floor(Math.random()*360);
var hueadd = Math.floor(Math.random()*99)+300;
console.log(hue);
var saturation = "100%";
var lightness = "57%";;

function Circle(x, y, dx, dy, radius, hue, colourInc){
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.minRadius = this.radius;
    this.colourInc = colourInc;
    this.hue = Math.floor(hue);

    colour = 'hsl('+this.hue+','+saturation+','+lightness+')'


    this.draw = function(){
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI*2, false);
        var gradient = context.createRadialGradient(this.x, this.y, this.radius/1.75, this.x, this.y, this.radius);
        gradient.addColorStop(0, 'rgba(0,0,0,0.75)');
        gradient.addColorStop(0.45, colour);
        gradient.addColorStop(0.5, 'rgba(255,255,255,1)');
        gradient.addColorStop(0.55, colour);
        gradient.addColorStop(1, 'rgba(0,0,0,0)');

        context.fillStyle = gradient;
        context.fill();
    }

    this.update = function(){
        if (this.x > canvas.width || this.x < 0){
            this.dx = -this.dx;
        }

        if (this.y > canvas.height || this.y < 0){
            this.dy = -this.dy;
        }

        this.x += this.dx;
        this.y += this.dy;

        hue += this.colourInc;
        if (hue >= 400 || hue <= 230){
            this.colourInc = -this.colourInc;
        }
        
        colour = 'hsl('+hue+','+saturation+','+lightness+')';

        // interactivity
        maxDistance = (canvas.width + canvas.height)/20;

        if(mouse.x - this.x < maxDistance && mouse.x - this.x > -maxDistance &&
            mouse.y - this.y < maxDistance && mouse.y - this.y > -maxDistance){
                if (this.radius < maxRadius){
                    this.radius+=1;
                }
                
        } else if (this.radius > this.minRadius){
            this.radius-=1;
        }

        this.draw();
    }
}

var circleArray = [];
var circleCount = 42;

for (i=0; i<circleCount; i++){
    var radius = (Math.random()*70)+10;
    var x = Math.random() * (canvas.width - radius*2) + radius;
    var y = Math.random() * (canvas.height - radius*2) + radius;
    var dx = ((Math.random() - 0.5));
    var dy = ((Math.random() - 0.5));

    
    if (i%5!=0){
        var hue = Math.random() * 60 + 300; // rainbow
    }else{
        var hue = 323;
    }
    

    circleArray.push(new Circle(x, y, dx, dy, radius, hue, Math.random()/10+0.2));
}

function animate(){
    requestAnimationFrame(animate);
    context.fillStyle = "#111";
    context.fillRect(0, 0, canvas.width, canvas.height);
    for(i=0; i<circleArray.length; i++){
        circleArray[i].update();
    }
}

animate();