'use client';
import Image from 'next/image'
import Link from 'next/link'

import { Breadcrumbs } from './../../components/Breadcrumbs/Breadcrumbs';
import { Slider } from './../../components/Slider/Slider';
import { VideoSlider } from './../../components/Slider/VideoSlider';
import { Form } from './../../components/Form/Form';

import imgPDF from './../../assets/img/pdf-logo.svg';

import screenOne from './../../assets/img/screen/en/5-7.jpg';
import screenTwo from './../../assets/img/screen/en/6-8.jpg';

export default function Page() {

	return (
		<>
			<Breadcrumbs value="APP" />

			<section className="app">
				<div className='app__container container'>
					<h2 className="app__title title">Mostbet Cash App</h2>
					<div className="app__flex">
						<div className="app__content">
							<div className="app__sub-title">With Mostbet Cash app you can easily make deposits and withdraw funds from the player's account at Mostbet.</div>
							<div className="app__text">Mostbet provides an opportunity to create a cashier's account in local currency, if the cashier makes a prepayment of over USD 30. As a Mostbet cashier, you'll get access to the Mostbet Cash app – highlighted and clickable for downloading the APK</div>
							<a
								href="#order"
								onClick={() => {
									ym(95071208,'reachGoal','get-dl-link');
									ym(95071208,'reachGoal','dl-link-sum');
									rstat('event', 'getDownloadLink_btn_click', { 'text': 'Get download link', 'cls': 'sample element click', 'href': '/app.php#order',});
									rstat4('event', 'getDownloadLink_btn_click', { 'text': 'Get download link', 'cls': 'sample element click', 'href': '/app.php#order',});
									rstat('event', 'dl-link-sum');
								}}
								className="app__btn btn-orange btn"
							>Get Download Link</a>
							<br /><br />
							<Image src={ imgPDF } alt="" width="20" style={{filter: 'invert(100%) sepia(0%) saturate(6%) hue-rotate(172deg) brightness(104%) contrast(101%)', marginTop: '5px'}} />
							&nbsp;
							<Link
								href="https://mbc-agent.com/files/Onboarding_manual_EN.pdf"
								style={{textDecoration: 'underline', color: '#fa5e00'}}
								target="_blank"
								onClick={() => { ym(95071208,'reachGoal','click-pdf-app'); }}
							>Learn more about the Mostbet Cash app</Link>
						</div>
						<div className="app__image">
							<div className="_phone-mockup">
								<Image  src={ screenOne } alt="image" width="225" height="474" />
							</div>
						</div>
						<div className="app__image">
							<div className="_phone-mockup">
								<Image  src={ screenTwo } alt="image" width="225" height="474" />
							</div>
						</div>
					</div>

				</div>
			</section>

			<section className="specificity">
				<div className='specificity__container container'>
					<h2 className="specificity__title title">Mostbet Cash features</h2>
					<div className="specificity__flex">
						<div className="specificity__left">
							<div className="specificity__text">A unique mobile Mostbet Cash app, designed specifically to facilitate the process of making deposits, withdrawals, creating your own cashier network and earning money through Mostbet.</div>
							<div className="specificity__border">The app has a user-friendly design and supports multiple languages including English, Bengali, Hindi, Uzbek and more.</div>
						</div>
						<div className="specificity__line"></div>
						<div className="specificity__right">
							<h3 className="specificity__list-title">Your business is always at hand! With Mostbet Cash app you can:</h3>
							<ul className="specificity__list">
								<li className="specificity__item">Replenish your balance and make deposits to the players' accounts.</li>
								<li className="specificity__item">Withdraw funds from players' accounts and pay them in cash.</li>
								<li className="specificity__item">Create your own cash points network for a specific region.</li>
								<li className="specificity__item">Create new markets and start your business in other regions.</li>
								<li className="specificity__item">Monitor and download the history of transactions made via the app.</li>
								<li className="specificity__item">Involve new players and expand your client area.</li>
							</ul>
						</div>
					</div>
				</div>
			</section>

			<section className="control">
				<div className='control__container container'>
					<h2 className="control__title title">Your business is always under control with MobCash, and you can expand your markets and manage them wherever you are.</h2>
					<ul className="control__list">
						<li className="control__item">It's easy to make deposits to the players' accounts and withdraw funds.</li>
						<li className="control__item">Keep records of your finances with the transaction history.</li>
						<li className="control__item">Earn commission funds.</li>
					</ul>
					<a
						href="https://mbc-agent.com/mbc.apk"
						onClick={() => {
							cnv_pixel();
							ym(95071208,'reachGoal','dl-apk3');
							ym(95071208,'reachGoal','dl-link-sum');
							rstat('event', 'downloadAPK_btn_click', { 'text': 'Download APK', 'cls': 'sample element click', 'href': '/mbc.apk', 'position': '3',});
							rstat4('event', 'downloadAPK_btn_click', { 'text': 'Download APK', 'cls': 'sample element click', 'href': '/mbc.apk', 'position': '3',});
							rstat('event', 'dl-link-sum');
						}}
						target="_blank" className="control__btn btn-orange btn"
					>Download APK</a>
				</div>
			</section>

			<section className="gallery">
				<div className='gallery__container container'>
					<h2 className="gallery__title title">INSTALL THE APP</h2>
					<Slider />
				</div>
			</section>

			<section className="gallery gallery_videos">
				<div className='gallery__container container'>
					<h2 className="gallery__title title">Video instructions</h2>
					<VideoSlider />
				</div>
			</section>

			<Form />

		</>
	)
}