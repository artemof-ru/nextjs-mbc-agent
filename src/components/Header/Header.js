'use client'
import Image from 'next/image'
import Link from 'next/link'

import { useEffect } from 'react'

// import { WOW } from 'wowjs';
import 'wowjs/css/libs/animate.css';
import { menuInit, headerScroll, langInit, useDynamicAdapt } from './../../utils/Functions';

import { Navbar } from '../Navbar/Navbar';


import './Header.css';
import logo from "./../../assets/img/logo.svg";


export const Header = () => {
	useEffect(()=>{
		// const wow = new WOW({
		// 	mobile: false
		// })
		// wow.init();
		menuInit();
		// langInit();
		headerScroll();
		useDynamicAdapt();
	})


	const activeLink = 'menu__link active';
	const normalLink = 'menu__link';

	return (
		<header className="header" >
			<div className="header__flex container">

				<div className="header__logo logo">
					<Link href="/" className="logo__link">
						<Image src={ logo } alt="Лого сайта mbcash" className="logo__img" width="265" height="45" />
					</Link>
				</div>

				{/* <?php $lang="en"; include $_SERVER['DOCUMENT_ROOT'] . '/include/header-lang.php'; ?> */}

				<Link
					href="#order"
					onClick={() => {ym(95071208,'reachGoal','kassir-1'); ym(95071208,'reachGoal','kassir-sum'); rstat('event', 'becomeCashier_btn_click', { 'text': 'Become cashier', 'cls': 'sample element click', 'href': '/index.php#order', 'position': '1',}); rstat4('event', 'becomeCashier_btn_click', { 'text': 'Become cashier', 'cls': 'sample element click', 'href': '/index.php#order', 'position': '1',}); rstat('event', 'kassir-sum');}}
					className="header__send-btn btn-orange btn"
				>Become Cashier</Link>

				<div className="header__menu menu">
					<div className="menu__burger burger">
						<button type="button" className="burger__btn _js-burger-btn" aria-label="button open menu"> <span></span> </button>
					</div>
					<Navbar />
				</div>

			</div>
		</header>
	)
}
