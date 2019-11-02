window.addEventListener('load', event => {
    const blocks = document.querySelector('.blocks');
    const ships_array = [...document.querySelectorAll('.block')];
    const position_from_top_array = [0, 120, 240, 360, 480];
    const engineOn = "radial-gradient(ellipse 9px 18px at 38% 82%, orange 0%, orange 99%, transparent 100%), radial-gradient(ellipse 9px 18px at 60% 82%, orange 0%, orange 99%, transparent 100%)";
    const stars = "rgba(255,255,255,0.0)";
    const travelLimit = 400; // limit in pixels

    // for twinkling stars -- makes it kinda laggy, though
    // used for reference: https://codepen.io/KyleShaver/pen/jARzzZ?editors=0110
    for (let i = 0; i < 100; i++) {
        let star = document.createElement('div');
        star.classList.add('star');
        star.style = 'animation: twinkle '+((Math.random()*5) + 5)+'s linear '+((Math.random()*5) + 5)+'s infinite; top: '+Math.random()*window.innerHeight+'px; left: '+Math.random()*window.innerWidth+'px;';
        document.querySelector('.atmosphereContainer').append(star);
      }


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