
import { React, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ScrollToTop from './utils/ScrollToTop';


import { WOW } from 'wowjs';
import 'wowjs/css/libs/animate.css';
import { Swiper } from 'swiper';
import 'swiper/css';

import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';

import { Home } from './pages/Home';
import { Application } from './pages/Application';
import { Contacts } from './pages/Contacts';
import { Faq } from './pages/Faq';
import { Registration } from './pages/Registration';


function App() {
	
	useEffect(() => {

		
		const wow = new WOW({
			mobile: false
		})
		wow.init();
	
		const galleryList = document.querySelectorAll('.gallery__list.swiper')
		if(galleryList.length) {
			console.log('SWIPER')
			for (const gallery of galleryList) {
				let gallerySlider;
				const breakpoint = window.matchMedia('(min-width: 1200px)');

				const enableGallerySlider = () => {
					gallerySlider = new Swiper(gallery, {
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

		}
	
	}, [])



	return (
		<div className="wrapper">
			<Router>
				<ScrollToTop />
				<Header />
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/registration' element={<Registration />} />
					<Route path='/app' element={<Application />} />
					<Route path='/faq' element={<Faq />} />
					<Route path='/contacts' element={<Contacts />} />
				</Routes>
				{/* <Home /> */}
				{/* <Application /> */}
				{/* <Contacts /> */}
				{/* <Faq /> */}
				{/* <Registration /> */}
				<Footer />
			</Router>
		</div>
	);
}

export default App;
