
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
		
	
		
		// Simplified animations for better performance
		const effexts28Titles = [...document.querySelectorAll('.font-title[data-splitting][data-effect-blur]')];
		const effexts29Titles = [...document.querySelectorAll('.font-title[data-splitting][data-effect-bounce]')];
		
		effexts29Titles.forEach(title => {
        const words = title.querySelectorAll('.word');
        
			words.forEach((word, index) => {
				const chars = word.querySelectorAll('.char');
				
				// Simple staggered fade-in
				gsap.fromTo(chars, {
					opacity: 0,
					y: 20
				}, 
				{
					opacity: 1,
					y: 0,
					duration: 0.6,
					stagger: 0.05,
					ease: 'power2.out',
					scrollTrigger: {
						trigger: word,
						scroller: pageContainer,
						start: 'top bottom-=10%',
						end: 'top top',
						scrub: false, // Changed to false for better performance
					}
				});
			});
		});
		
		effexts28Titles.forEach(title => {
        const words = title.querySelectorAll('.word');
        
			words.forEach(word => {
				const chars = word.querySelectorAll('.char');
				
				// Simple blur to focus animation
				gsap.fromTo(chars, {
					opacity: 0,
					filter: 'blur(5px)',
					y: 15
				}, 
				{
					opacity: 1,
					filter: 'blur(0px)',
					y: 0,
					duration: 0.8,
					stagger: 0.03,
					ease: 'power2.out',
					scrollTrigger: {
						scroller: pageContainer,
						trigger: word,
						start: 'top bottom+=20%',
						end: 'top top+=20%',
						scrub: false, // Changed to false for better performance
					}
				});
			});
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



