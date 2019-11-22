// Your code goes here
// 'keydown' easter egg -- press "f, u, n, b, s" keys down at same time to trigger animation with Fun Bus image
// 'keyup' -- if one (or more) "f, u, n, b, s" keys are released before they're all pressed at the, don't trigger the easter egg animation. They all need to be pressed at the same time
// 'animationend' -- make the easter egg image disappear when the animation is done
// 'click' modal popup for pics to open and close it; stopPropagation() to prevent other images from opening the modal while one is already open; preventDefault() for nav links
// 'load' -- animate bounce the Fun Bus logo; initialize all other event listeners
// 'dblclick' bus image -- trigger same animation as easter egg
// 'focus' -- give an underline styling to nav links
// 'blur' -- revert 'focus' styling
// 'mouseenter' -- change background and font colors and text content of sign up buttons
// 'mouseleave -- changes styling and text content back to what it was before the 'mouseenter' event

// animate Fun Bus logo heading upon loading site
window.addEventListener('load', event => {
    const logo = document.querySelector('.logo-heading');
    logo.classList.add('logoAnimate');

    const adv_img_container = document.querySelector('#adventure-img-container');
    const fun_img_container = document.querySelector('#fun-img-container');
    const banner_img_container = document.querySelector('#banner-img-container');
    const destination_img_container = document.querySelector('#destination-img-container');
    const adv_image = document.querySelector('#adventure-img');
    const fun_image = document.querySelector('#fun-img');
    const banner_image = document.querySelector('#banner-img');
    const destination_image = document.querySelector('#destination-img');

    // Trigger easter egg animation when keys that spell out 'fun bus' are all pressed
    // 'f' --> event.key = f; event.code = KeyF
    // 'u' --> event.key = u; event.code = KeyU
    // 'n' --> event.key = n; event.code = KeyN
    // 'b' --> event.key = b; event.code = KeyB
    // 's' --> event.key = s; event.code = KeyS

    // Used for reference -- https://therelentlessfrontend.com/2012/11/13/detect-multiple-key-press-in-javascript-for-your-website/
    // used a method on an empty object to create a closure so that the easterEggCodes can't otherwise be accessed or changed (although in this case, that isn't much of a concern since this is all inside of a 'load' eventListener)
    const keypressObject = {};
    keypressObject.registerKeyPress = function() {
        const easterEggCodes = {
            KeyF: false,
            KeyU: false,
            KeyN: false,
            KeyB: false,
            KeyS: false,
        }

        window.addEventListener('keydown', event => {
            if (event.code in easterEggCodes) {
                easterEggCodes[event.code] = true;

                // makes it so all necessary keys needed to be pressed at the same time to trigger the animation
                window.addEventListener('keyup', e => {
                    if (e.code in easterEggCodes) {
                        easterEggCodes[e.code] = false;
                    }
                })

                if (easterEggCodes.KeyF && easterEggCodes.KeyU && easterEggCodes.KeyN && easterEggCodes.KeyB && easterEggCodes.KeyS) {
                    const easter_egg = document.querySelector('.easter-egg-container');
                    easter_egg.classList.add('visible');

                    easter_egg.addEventListener('animationend', event => {
                        if (event.animationName === 'easterEggLeft') {
                            easter_egg.classList.remove('visible');
                        }
                    })
                }
            }
        })
    };

    keypressObject.registerKeyPress();

    // Trigger easter egg animation when logo is double clicked
    window.addEventListener('dblclick', event => {
        const logo = document.querySelector('.logo-heading');
        if (logo === event.target) {
            const easter_egg = document.querySelector('.easter-egg-container');
            easter_egg.classList.add('visible');

            easter_egg.addEventListener('animationend', event => {
                if (event.animationName === 'easterEggLeft') {
                    easter_egg.classList.remove('visible');
                }
            })
        }
    })

    // Trigger modal image popup
    const images_array = document.querySelectorAll('img');
    images_array.forEach(image => {
        if (!(image.classList.contains('modal-img')) && !(image.classList.contains('easter-egg'))) {
            image.addEventListener('click', event => {
                const modal_img = document.querySelector('.modal-img');
                const source = image.getAttribute('src');
                modal_img.setAttribute('src', source);
                const alt = image.getAttribute('alt');
                modal_img.setAttribute('alt', alt);
                const modal_bg = document.querySelector('.modal');
                modal_bg.classList.add('visible');

                // close modal popup when you click outside of the image
                modal_bg.addEventListener('click', function closeModal(e) {
                    let isClickInside = modal_img.contains(e.target);
                    e.stopPropagation();

                    if (!isClickInside) {
                        modal_bg.classList.remove('visible');
                        window.removeEventListener('click', closeModal);
                    }
                })
            })
        }
    })

    const links_array = document.querySelectorAll('a')
    links_array.forEach(link => {
        // Prevents nav links from refreshing the page
        link.addEventListener('click', event => {
            if (link === event.target) {
                event.preventDefault();
            }
        })

        // gives blue underline to nav link that has 'focus', takes it away from the ones that don't
        link.addEventListener('focus', event => {
            event.target.style.textDecoration = 'underline';
            event.target.style.textDecorationColor = '#17A2B8';
        })

        link.addEventListener('blur', event => {
            event.target.style.textDecoration = 'none';
        })
    })

    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.textContent = 'Excursion full!';
            button.style.backgroundColor = 'papayawhip';
            button.style.color = '#17A2B8';

            button.addEventListener('mouseleave', () => {
                button.textContent = 'Sign Me Up!';
                button.style.backgroundColor = '#17A2B8';
                button.style.color = '#FFFFFF';
            })
        })
    })
})