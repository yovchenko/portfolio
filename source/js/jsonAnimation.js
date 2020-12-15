import bodymovin from "bodymovin";
let animData = {
    wrapper: document.getElementById('animationWindow'),
    animType: 'svg',
    loop: true,
    prerender: true,
    autoplay: true,
    path: 'https://raw.githubusercontent.com/yovchenko/JSON-animation/master/animation.JSON'
};
export let anim = bodymovin.loadAnimation(animData);
anim.setSpeed(3.0);
