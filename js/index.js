
$(document).ready(function(){
	
	setTimeout(function(){$('html').addClass('is-ready');}, 400);
	
});

Splitting();



if (window.matchMedia("(min-width:850px)").matches) {
	
	setTimeout(() => {
		
		gsap.registerPlugin(ScrollTrigger);
		ScrollTrigger.defaults({markers: false});
		
		const pageContainer = document.querySelector(".smooth-scroll");
		const scroller = new LocomotiveScroll({
		  el: pageContainer,
		  smooth: true,
		  inertia:.6,
		  tablet: { smooth: true },
		  smartphone: { smooth: true }
		});

		scroller.on("scroll", ScrollTrigger.update);

		ScrollTrigger.scrollerProxy(".smooth-scroll", {
		  scrollTop(value) {
			return arguments.length
			  ? scroller.scrollTo(value, 0, 0)
			  : scroller.scroll.instance.scroll.y;
		  },
		  getBoundingClientRect() {
			return {
			  left: 0,
			  top: 0,
			  width: window.innerWidth,
			  height: window.innerHeight
			};
		  },
		});

		var changeBG = document.querySelector('body');

		ScrollTrigger.create({
		trigger: "#brown",
		scroller: pageContainer,
		start: "-20% top",
		end: "bottom bottom",
		scrub: 1,
		duration: 1,

		onEnter: () => myfunction(),
		onLeaveBack: () => myfunction(),

		});

		function myfunction() {
			
			changeBG.classList.toggle('brown');
			
		};
			
		
		var removeBG = document.querySelector('body');

		ScrollTrigger.create({
		trigger: "#white",
		scroller: pageContainer,
		start: "-30% top",
		end: "bottom bottom",
		scrub: 1,
		duration: 1,

		onEnter: () => myfunctionb(),
		onLeaveBack: () => myfunctionb(),

		});

		function myfunctionb() {
			
			removeBG.classList.toggle('white');
			
		};
		
	
		
		const effexts28Titles = [...document.querySelectorAll('.font-title[data-splitting][data-effect-blur]')];
		const effexts29Titles = [...document.querySelectorAll('.font-title[data-splitting][data-effect-bounce]')];
		

		effexts29Titles.forEach(title => {
        
        const words = title.querySelectorAll('.word');
        
			for (const [pos,word] of words.entries()) {
				
				const chars = word.querySelectorAll('.char');
				
				gsap.fromTo(chars, {
					'will-change': 'transform', 
					transformOrigin: `${pos%2 ? 0 : 100}% ${pos%2 ? 100 : 0}%`,
					scale: 0
				}, 
				{
					ease: 'power4',
					scale: 1,
					stagger:  {
						each: 0.03,
						from: pos%2 ? 'end' : 'start'
					},
					scrollTrigger: {
						trigger: word,
						scroller: pageContainer,
						start: 'top bottom-=10%',
						end: 'top top',
						scrub: true,
					}
				});
			}
			
		});
		
		effexts28Titles.forEach(title => {
        
        const words = title.querySelectorAll('.word');
        
			for (const word of words) {

				const chars = word.querySelectorAll('.char');
				const charsTotal = chars.length;
				
				gsap.fromTo(chars, {
					'will-change': 'transform, filter', 
					transformOrigin: '50% 100%',
					scale: position => {
						const factor = position < Math.ceil(charsTotal/2) ? position : Math.ceil(charsTotal/2) - Math.abs(Math.floor(charsTotal/2) - position) - 1;
						return gsap.utils.mapRange(0, Math.ceil(charsTotal/2), 0.5, 2.1, factor);
					},
					y: position => {
						const factor = position < Math.ceil(charsTotal/2) ? position : Math.ceil(charsTotal/2) - Math.abs(Math.floor(charsTotal/2) - position) - 1;
						return gsap.utils.mapRange(0, Math.ceil(charsTotal/2), 0, 60, factor);
					},
					rotation: position => {
						const factor = position < Math.ceil(charsTotal/2) ? position : Math.ceil(charsTotal/2) - Math.abs(Math.floor(charsTotal/2) - position) - 1;
						return position < charsTotal/2 ? gsap.utils.mapRange(0, Math.ceil(charsTotal/2), -4, 0, factor) : gsap.utils.mapRange(0, Math.ceil(charsTotal/2), 0, 4, factor);
					},
					filter: 'blur(12px) opacity(0)',
				}, 
				{
					ease: 'power2.inOut',
					y: 0,
					rotation: 0,
					scale: 1,
					filter: 'blur(0px) opacity(1)',
					scrollTrigger: {
						scroller: pageContainer,
						trigger: word,
						start: 'top bottom+=50%',
						end: 'top top+=30%',
						scrub: true,
					},
					stagger: {
						amount: 0.15,
						from: 'center'
					}
				});

			}

		});
		
		
	}, 600)

} else {

	$(window).scroll(function(){
		if ($(this).scrollTop() > 50) {
		   $('.overlay-bar').addClass('scroll');
		} else {
		   $('.overlay-bar').removeClass('scroll');
		}
	});
	
	
}



