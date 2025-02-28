'use client'
import Image from 'next/image'
import { useEffect } from 'react';
import { Swiper } from 'swiper';
// import 'swiper/css';
import './Slider.scss';

import screenThree from './../../assets/img/screen/en/5-7.jpg';
import screenFour from './../../assets/img/screen/en/6-8.jpg';
import screenFive from './../../assets/img/screen/en/9.jpg';
import screenSix from './../../assets/img/screen/en/10.jpg';
import screenSeven from './../../assets/img/screen/en/11.jpg';
import screenEight from './../../assets/img/screen/en/12.jpg';
import screenNine from './../../assets/img/screen/en/13.jpg';

export function Slider() {

	useEffect(() => {
		const slider = document.querySelector('.gallery__list.swiper--image')

		if (slider) {
			let gallerySlider;
			const breakpoint = window.matchMedia('(min-width: 1200px)');

			const enableGallerySlider = () => {
				gallerySlider = new Swiper(slider, {
					slidesPerView: 2,
					spaceBetween: 15,
					breakpoints: {
						576: {
							slidesPerView: 2,
							spaceBetween: 20,
						},
						768: {
							slidesPerView: 3,
							spaceBetween: 50,
						},
						992: {
							slidesPerView: 3,
							spaceBetween: 50,
						}
					}
				})
			}


			const checkinScreenResolution = (isDesktop) => {
				!isDesktop
					? enableGallerySlider()
					: gallerySlider && gallerySlider.destroy(true, true)
			}
			checkinScreenResolution(breakpoint.matches)
			breakpoint.addEventListener('change', function(e) {checkinScreenResolution(e.matches)})
		}
	}, [])

	return (
		<ul className="gallery__list swiper swiper--image">
			<div className="swiper-wrapper">
				<li className="gallery__item swiper-slide">
					<div className="_phone-mockup">
						<Image  src={ screenThree } alt="image" width="271" height="574" />
					</div>
					<div className="gallery__sub-title">Mobcash App Login Screen</div>
				</li>
				<li className="gallery__item swiper-slide">
					<div className="_phone-mockup">
						<Image  src={ screenFour } alt="image" width="271" height="574" />
					</div>
					<div className="gallery__sub-title">Mobcash App Overview</div>
				</li>
				<li className="gallery__item swiper-slide">
					<div className="_phone-mockup">
						<Image  src={ screenFive } alt="image" width="271" height="574" />
					</div>
					<div className="gallery__sub-title">Mobcash App Profile View</div>
				</li>
				<li className="gallery__item swiper-slide">
					<div className="_phone-mockup">
						<Image  src={ screenSix } alt="image" width="271" height="574" />
					</div>
					<div className="gallery__sub-title">Mobcash App Player deposit interfrace</div>
				</li>
				<li className="gallery__item swiper-slide">
					<div className="_phone-mockup">
						<Image  src={ screenSeven } alt="image" width="271" height="574" />
					</div>
					<div className="gallery__sub-title">Mobcash App Withdraw Screen interface</div>
				</li>
				<li className="gallery__item swiper-slide">
					<div className="_phone-mockup">
						<Image  src={ screenEight } alt="image" width="271" height="574" />
					</div>
					<div className="gallery__sub-title">Mobcash AppTopup Interface</div>
				</li>
				<li className="gallery__item swiper-slide">
					<div className="_phone-mockup">
						<Image  src={ screenNine } alt="image" width="271" height="574" />
					</div>
					<div className="gallery__sub-title">Mobcash App Transaction History Interfrace</div>
				</li>
			</div>
		</ul>
	)
}