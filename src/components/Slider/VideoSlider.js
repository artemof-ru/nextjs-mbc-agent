'use client'
import Image from 'next/image'
import { useEffect } from 'react';
import { Swiper } from 'swiper';
// import 'swiper/css';
import './Slider.scss';


export function VideoSlider() {

	useEffect(() => {
		const slider = document.querySelector('.gallery__list.swiper--video')
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
		<ul className="gallery__list swiper swiper--video">
			<div className="swiper-wrapper">
				<li className="gallery__item swiper-slide">
					<video width="271" height="482" controls="controls" poster="https://mbc-agent.com/video/1.jpg" onClick={() => { ym(95071208,'reachGoal','click-video-instructions') }} >
						<source src="https://mbc-agent.com/video/first-login.mp4" type='video/mp4; codecs="avc1.42E01E, mp4a.40.2"' />
					</video>
					<div className="gallery__sub-title">First login</div>
				</li>
				<li className="gallery__item swiper-slide">
					<video width="271" height="482" controls="controls" poster="https://mbc-agent.com/video/2.jpg" onClick={() => { ym(95071208,'reachGoal','click-video-instructions') }} >
						<source src="https://mbc-agent.com/video/account-dep.mp4" type='video/mp4; codecs="avc1.42E01E, mp4a.40.2"' />
					</video>
					<div className="gallery__sub-title">How to make a deposit</div>
				</li>
				<li className="gallery__item swiper-slide">
					<video width="271" height="482" controls="controls" poster="https://mbc-agent.com/video/3-2.jpg" onClick={() => { ym(95071208,'reachGoal','click-video-instructions') }} >
						<source src="https://mbc-agent.com/video/deposit-crypto.mp4" type='video/mp4; codecs="avc1.42E01E, mp4a.40.2"' />
					</video>
					<div className="gallery__sub-title">How to make a deposit in cryptocurrency</div>
				</li>
				<li className="gallery__item swiper-slide">
					<video width="271" height="482" controls="controls" poster="https://mbc-agent.com/video/4.jpg" onClick={() => { ym(95071208,'reachGoal','click-video-instructions') }} >
						<source src="https://mbc-agent.com/video/player-dep.mp4" type='video/mp4; codecs="avc1.42E01E, mp4a.40.2"' />
					</video>
					<div className="gallery__sub-title">How to make a deposit to the player's account</div>
				</li>
				<li className="gallery__item swiper-slide">
					<video width="271" height="482" controls="controls" poster="https://mbc-agent.com/video/5.jpg" onClick={() => { ym(95071208,'reachGoal','click-video-instructions') }} >
						<source src="https://mbc-agent.com/video/withdraw.mp4" type='video/mp4; codecs="avc1.42E01E, mp4a.40.2"' />
					</video>
					<div className="gallery__sub-title">How to withdraw money to a player</div>
				</li>
			</div>
		</ul>
	)
}