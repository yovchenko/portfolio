import bodymovin from "bodymovin"; 
let animData = {
    wrapper: document.getElementById('animationWindow'),
    animType: 'svg',
    loop: true,
    prerender: true,
    autoplay: true,
    path: 'https://yovchenko.github.io/JSON-animation/animation.json'
};
export let anim = bodymovin.loadAnimation(animData);
anim.setSpeed(3.4);
anim.pause();