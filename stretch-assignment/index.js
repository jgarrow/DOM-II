window.addEventListener('load', event => {
    const blocks = document.querySelector('.blocks');
    const ships_array = [...document.querySelectorAll('.block')];
    const position_from_top_array = [0, 120, 240, 360, 480];
    const engineOn = "radial-gradient(ellipse 9px 18px at 38% 82%, orange 0%, orange 99%, transparent 100%), radial-gradient(ellipse 9px 18px at 60% 82%, orange 0%, orange 99%, transparent 100%)";
    // const stars = "rgba(255,255,255,0.0)";
    const travelLimit = 400; // limit in pixels

    // Option 1 for twinkling stars -- makes it really laggy
    // used for reference: https://codepen.io/KyleShaver/pen/jARzzZ?editors=0110
    // for (let i = 0; i < 200; i++) {
    //     let star = document.createElement('div');
    //     star.classList.add('star');
    //     star.style = 'animation: twinkle '+((Math.random()*5) + 5)+'s linear '+((Math.random()*5) + 5)+'s infinite; top: '+Math.random()*window.innerHeight+'px; left: '+Math.random()*window.innerWidth+'px;';
    //     document.querySelector('.atmosphereContainer').append(star);
    // }

    // Option 2 for twinkling stars using HTML canvas -- also makes it a bit laggy (but not as laggy as option 1), but let's you have more control over the background colors 
    // https://codepen.io/Jenbo/pen/pgmZwB?editors=1010
    // function Star(x,y,r,color){
    //     this.x = x;
    //     this.y = y;
    //     this.r = r;
    //     this.rChange = 0.015;
    //     this.color = color;
    // }
    
    // Star.prototype = {
    //     constructor: Star,
    //     render: function(){
    //       context.beginPath();
    //       context.arc(this.x, this.y, this.r, 0, 2*Math.PI, false);
    //       context.shadowBlur = 8; 
    //       context.shadowColor = "white";
    //       context.fillStyle = this.color;
    //       context.fill();
    //     },
    //     update: function(){
          
    //        if (this.r > 2 || this.r < .8){
    //            this.rChange = - this.rChange;
    //        }
    //        this.r += this.rChange;
    //     }
    // }
    
    // var canvas = document.getElementById("canvas");
    // var context = canvas.getContext("2d");
    
    // var C_WIDTH = canvas.width = document.body.offsetWidth;
    // var C_HEIGHT = canvas.height = document.body.offsetHeight;
    
    // function randomColor(){
    //         var arrColors = ["ffffff", "ffecd3" , "bfcfff"];
    //         return "#"+arrColors[Math.floor((Math.random()*3))];
    // }
            
    // var arrStars = [];
    // for(i = 0; i < 400; i++){
    //     var randX = Math.floor((Math.random()*C_WIDTH)+1);
    //     var randY = Math.floor((Math.random()*C_HEIGHT)+1);
    //     var randR = Math.random() * 1.7 + .5;
        
    //     var star = new Star(randX, randY, randR, randomColor());
    //     arrStars.push(star);
    // }
    // function update(){
    //   for(i = 0; i < arrStars.length; i ++){
    //     arrStars[i].update();
    //   }
    // }
    // function animate(){
    //     update();
    //     context.clearRect(0,0,C_WIDTH,C_HEIGHT);
    //     for(var i = 0; i < arrStars.length; i++){
    //       arrStars[i].render();
    //     }
    //     requestAnimationFrame(animate);
    // }
    // animate();

    // Option 3 for twinkling stars -- no JavaScript, best performance, but background color has to be all black
    // http://www.script-tutorials.com/night-sky-with-twinkling-stars/


    // Rocket Ship movement
    blocks.style.position = 'relative'; // lets the blocks inside of it have absolute positioning relative to this div

    // initialize ship positions
    for (let j = 0; j < ships_array.length; j++) {
        ships_array[j].style.position = 'absolute';
        ships_array[j].style.top = position_from_top_array[j] + 'px';
        ships_array[j].style.left = '0px';
    }

    ships_array.forEach(ship => {
        function updateShipPositionRight(element) {
            let currentPosition = Number(element.style.left.slice(0, element.style.left.length - 2));
            element.style.transition = 'all 0.5s ease';
            currentPosition += 10;
            element.style.transform = 'rotate(90deg)';
            const style = getComputedStyle(element);
            let background = style.background;
            background = background.replace('border-box rgba(0, 0, 0, 0)', 'border-box');
            background = background.replace(', rgba(0, 0, 0, 0) linear', ', linear');
            background += `, ${engineOn}`
            element.style.background = background;
            element.style.left = currentPosition + 'px';
        }

        function updateShipPositionLeft(element) {
            let currentPosition = Number(element.style.left.slice(0, element.style.left.length - 2));
            element.style.transition = 'all 0.5s ease';
            currentPosition -= 10;
          element.style.transform = 'rotate(-90deg)';
          element.style.left = currentPosition + 'px';
        }

        let isMouseUp = true;
        ship.onmouseup = function() {
            isMouseUp = true;
        }

        ship.onmousedown = function() {
            isMouseUp = false;
        }

        ship.addEventListener('mousedown', event => {
            const timer = setInterval(() => {
                let posInt = Number(event.target.style.left.slice(0, event.target.style.left.length - 2));
                if (posInt < travelLimit && !isMouseUp) {
                    updateShipPositionRight(event.target)
                } else {
                    console.log('Ship max distance reached! Please turn around.');
                }
            }, 100);

            ship.addEventListener('mouseup', (e) => {
                clearInterval(timer);
                const timer2 = setInterval(() => {
                    let posInt2 = Number(e.target.style.left.slice(0, e.target.style.left.length - 2));
                    if (posInt2 > 0) {
                        updateShipPositionLeft(e.target);

                        if (!isMouseUp) {
                            e.target.style.removeProperty('background');
                            clearInterval(timer2);
                        }
                    } else {
                        e.target.style.transform = 'rotate(0deg)';
                        e.target.style.removeProperty('background');
                        console.log('I should be stopped');
                        clearInterval(timer2);
                    }
                }, 100);
                e.stopPropagation();
            })
        })

        ship.addEventListener('click', event => {
            let posNumber = Number(event.target.style.left.slice(0, event.target.style.left.length - 2));
            // only moves to top when blocks are in original positions (ie aren't moving horizontally)
            if (posNumber === 0) {
                ships_array.forEach(block => {
                    // move blocks above target down
                    if (event.target.style.top > block.style.top) {
                        const posNum = Number(block.style.top.slice(0, block.style.top.length - 2));
                        block.style.transition = 'all 0.5s ease';
                        block.style.top = (posNum +  position_from_top_array[1]) + 'px';
                    }
                })
                // move target block to top
                event.target.style.transition = 'all 0.5s ease';
                const style = getComputedStyle(event.target);
                let background = style.background;
                background = background.replace('border-box rgba(0, 0, 0, 0)', 'border-box');
                background = background.replace(', rgba(0, 0, 0, 0) linear', ', linear');
                background += `, ${engineOn}`
                event.target.style.background = background;
                event.target.style.top = position_from_top_array[0] + 'px';
            }
        })
    })
})