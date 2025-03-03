'use client'
// import { NavLink } from 'react-router-dom';

import Image from 'next/image'
import Link from 'next/link'

import './Footer.css';
import logo from "./../../assets/img/logo.svg";
import imgPDF from './../../assets/img/pdf-logo.svg';
import xtwitter from './../../assets/img/x-twitter.svg';


export const Footer = () => {
	function getCurrentYear() {
		return new Date().getFullYear()
	}
	return (
		<>
			<footer className="footer">
				<div className="footer__flex container">

					<div className="footer__logo logo">
						<Link href="/" className="logo__link">
							<Image src={ logo } alt="Лого сайта mbcash" className="logo__img" width="265" height="45" />
						</Link>
						<br />
						<Image src={ imgPDF } alt="" width="20" className='logo__pdf-img' />
						&nbsp;
						{/* <Link
							href="/files/Onboarding_manual_EN.pdf"
							style="text-decoration: underline;color: #fa5e00;"
							target="_blank"
							onClick={() => {ym(95071208,'reachGoal','click-pdf-app');}}
						> </Link> */}
							<Link href="/files/MB_Cash_Registration_EN.pdf"
								className="footer__orange-link"
								target="_blank"
								onClick={()=>{ym(95071208,'reachGoal','click-pdf-mbc')}}
							>Learn more about<br /> Mostbet Cash</Link>
					</div>

					<div className="footer__share share">
						<figure className="share__block">
							<ul className="share__list">
								<li className="share__item">
									<Link
										href="https://twitter.com/MBC_worldwide"
										target="_blank"
										rel="noopener noreferrer"
										onClick={() => {
											ym(95071208,'reachGoal','click-twitter')
											rstat('event', 'share_twitter_icon_click', { 'cls': 'sample element click', 'href': 'https://twitter.com/MBC_worldwide'})
											rstat4('event', 'share_twitter_icon_click', { 'cls': 'sample element click', 'href': 'https://twitter.com/MBC_worldwide'})
										}}
									>
										<Image src={ xtwitter } className='share__icon-xtwitter' alt="" width="30" />
									</Link>
								</li>

							</ul>
						</figure>
					</div>
					<div className="footer__copy">Copyright © 2009-{getCurrentYear()} «Mostbet». All rights reserved and protected by law. Mostbet uses cookies to enhance your website experience. By staying on the website, you agree to the use of these cookies.</div>

					<div className="footer__age-rate"><span className="icon-circle icon">18+</span></div>

				</div>
			</footer>
		</>
	)
}