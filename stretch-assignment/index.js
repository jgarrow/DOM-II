window.addEventListener('load', event => {
    const red = document.querySelector('.block--red');
    const blue = document.querySelector('.block--blue');
    const green = document.querySelector('.block--green');
    const pink = document.querySelector('.block--pink');
    const gray = document.querySelector('.block--gray');
    const blocks = document.querySelector('.blocks');
    const ships_array = [...document.querySelectorAll('.block')];

    function moveShipToTop(array, prevPosition, newPosition) {
        if (prevPosition > newPosition) {
            // remove prevPosition element (hold in dummy variable)
            // unshift dummy variable to front of array
            let tempVar = array[prevPosition];
            array.splice(prevPosition, 1);
            array.unshift(tempVar);
        }
    }

    ships_array.forEach(ship => {
        ship.addEventListener('click', event => {
            const currentPosition = ships_array.indexOf(event.target)
            console.log(ships_array);
            moveShipToTop(ships_array, currentPosition, 0);
            console.log(ships_array);
            blocks.innerHTML = '';
            ships_array.forEach(ship => blocks.appendChild(ship))
        })

        // https://www.kirupa.com/html5/press_and_hold.htm
        ship.addEventListener('mousedown', event => {
            console.log('here');
            function updateShipPosition() {
                let currentPosition = 0;
                currentPosition += 5;

                event.target.style.left = currentPosition + 'px';
            }
            window.setInterval(updateShipPosition(), 100);
        })
    })
})