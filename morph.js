
const rend = document.querySelector('#animation2');

const anim = lottie.loadAnimation({
    container: rend,
    renderer: "svg",
    loop: false,
    autoplay: false,
    path: "data.json"
});

const anim_start = () => {
    anim.playSegments([0,25],true)
}
const anim_restart = () => {
    anim.playSegments([25,48],true)
}
const anim_back = () => {
    anim.playSegments([48,25],true)
}
const anim_toStart = () => {
    anim.playSegments([25,0],true)
}
let flag = false;

const tl1 = gsap.timeline({
    // onComplete: () => { console.log('onComplete'); },
    // onStart: () => { console.log('onStart'); },
    // onUpdate: () => { console.log('onUpdate'); },
    // onRepeat: () => { console.log('onRepeat'); },
    scrollTrigger: {
        trigger: ".article1",
        start: "top top",
        end: "bottom+=50% 50%",
        scrub: 1,
        pin: true,
        pinSpacing: false,
        markers: true,
        // onEnter: anim_start,
        // onLeave: ()=>{console.log('onLeave')},
        // onEnterBack: ()=>{console.log('onEnterBack')},
        // onLeaveBack: anim_toStart,
    }
});
tl1.from('.article1 h2',{
    y: '100px',
    opacity: '0',
    }
)
tl1.add( ()=>{
    if (flag) {
        anim_toStart()
        flag=false

    } else {
        anim_start()
        flag=true
    }
})
tl1.from('.article1 p',{
    y: '100px',
    opacity: '0',
})
tl1.to('.article1',{
    opacity: '0',
})


const tl2 = gsap.timeline({
    scrollTrigger: {
        trigger: ".article2",
        start: "top top",
        end: "center top",
        scrub: 1,
        pin: true,
        markers: true,
        onEnter: anim_restart,
        // onLeave: ()=>{console.log('onLeave')},
        // onEnterBack: ()=>{console.log('onEnterBack')},
        onLeaveBack: anim_back,
    }
});
tl2.from('.article2 h2',{
    y: '100px',
    opacity: '0',
    },
    '+0.1'
)
tl2.from('.article2 p',{
    y: '100px',
    opacity: '0',
})





// https://codepen.io/GreenSock/full/QWdjEbx
LottieScrollTrigger({
    target: "#animation",
    path: "data.json",
    speed: "fast",
    scrub: 0 
});


function LottieScrollTrigger(vars) {
    let playhead = {frame: 0};
    let target = gsap.utils.toArray(vars.target)[0];
    let speeds = {slow: "+=2000", medium: "+=1000", fast: "+=500"};
    let st = {
        trigger: target, 
        pin: true, 
        start: "top top", 
        end: speeds[vars.speed] || "+=1000", 
        scrub: 1,
        markers: true
    };
    let animation = lottie.loadAnimation({
        container: target,
        renderer: vars.renderer || "svg",
        loop: false,
        autoplay: false,
        path: vars.path
    });
    for (let p in vars) { 
        st[p] = vars[p];
    }
    animation.addEventListener("DOMLoaded", function() {
        gsap.to(playhead, {
            frame: animation.totalFrames - 1,
            ease: "none",
            onUpdate: () => animation.goToAndStop(playhead.frame, true),
            scrollTrigger: st
        });
        ScrollTrigger.sort();
        ScrollTrigger.refresh();
    });
    return animation;
}
