'use client'
import Image from "next/image";
import Link from 'next/link'

import { Form } from './../components/Form/Form'

import first from './../assets/img/bd/first.png';
import second from './../assets/img/bd/2nd.png';
import screenOne from './../assets/img/screen/en/1-4.jpg';
import screenTwo from './../assets/img/screen/en/2.jpg';
import screenThree from './../assets/img/screen/en/13.jpg';
import screenFour from './../assets/img/bd/3rd.png';
function ym() {}
function rstat() {}
function rstat4() {}

export default function Home () {

	return (
		<>
			<main id="main" className="main">
				<div className="main__flex container">
					<div className="main__text-block">
						<h1 className="main__title wow slideInLeft">START EARNING WITH THE <span className="wow bounce" data-wow-delay="0.9s">MOSTBET CASHIER</span> app</h1>
						<ol className="main__list">
							<li className="main__item wow slideInLeft" data-wow-delay="0.4s"><span className="number">1.</span>Use the Mostbet Cashier app to replenish your gaming account!</li>
							<li className="main__item wow slideInLeft" data-wow-delay="0.6s"><span className="number">2.</span>Make a funds transfer</li>
							<li className="main__item wow slideInLeft" data-wow-delay="0.8s"><span className="number">3.</span>Withdraw your winnings</li>
						</ol>
						<div className="main__sup-title wow slideInLeft" data-wow-delay="1s">The MOBCASH app from Mostbet will make your transaction safe and secure.</div>
					</div>
					<div className="main__image-block wow fadeInRight" data-wow-delay="0.5s">
						<Image  src={ first } alt="image" width="276" height="241" />
					</div>
					<div className="main__bottom-block wow fadeInUp" data-wow-delay="1.4s">
						<Link
							href="#order"
							onClick={() => {
								ym(95071208,'reachGoal','kassir-2')
								ym(95071208,'reachGoal','kassir-sum')
								rstat('event', 'becomeCashier_btn_click', { 'text': 'Become cashier', 'cls': 'sample element click', 'href': '/index.php#order', 'position': '2',})
								rstat4('event', 'becomeCashier_btn_click', { 'text': 'Become cashier', 'cls': 'sample element click', 'href': '/index.php#order', 'position': '2'})
								rstat('event', 'kassir-sum')
							}}
							className="main__btn btn-orange btn"
						>Become a cashier</Link>
						<Link href="/mbc.apk"
							onClick={() =>{
								cnv_pixel();
								ym(95071208,'reachGoal','dl-apk2');
								ym(95071208,'reachGoal','dl-link-sum');
								rstat('event', 'downloadAPK_btn_click', { 'text': 'Download APK', 'cls': 'sample element click', 'href': '/1.6.0.apk', 'position': '2',});
								rstat4('event', 'downloadAPK_btn_click', { 'text': 'Download APK', 'cls': 'sample element click', 'href': '/1.6.0.apk', 'position': '2',});
								rstat4('event', 'dl-link-sum');
							}}
							className="main__btn btn-orange-border btn"
							target="_blank"
						>Download APK</Link>
						<div className="main__text">Join us as a Mostbet Cash cashier and <br />start earning!</div>
					</div>
				</div>
			</main>

			<section className="about">
				<div className='about__container container'>
					<h2 className="about__title title">ABOUT MOSTBET</h2>
					<p className="about__text">
						As an international bookmaker, Mostbet has proven its quality <b>in more than 93 countries</b> and continues growing further. <b>Since 2009</b>, the Company has gained popularity and experience, becoming a leader in the sports betting world. Mostbet provides the highest quality services and functionality to players worldwide <b>with over 14 years of experience</b>.
					</p>
				</div>
			</section>

			<section className="work">
				<div className='work__container container'>
					<h2 className="work__title title">WHY SHOULD YOU WORK WITH US</h2>
					<div className="work__content">
						<ul className="work__list">
							<li className="work__item wow slideInLeft" data-wow-delay="0.2s"><span
									className="icon-ok"></span>Mostbet is an international betting company operating in more than 93
								countries.</li>
							<li className="work__item wow slideInRight" data-wow-delay="0.2s"><span className="icon-ok"></span>Our
								high-quality services and convenient features are available to millions of clients worldwide.</li>

							<li className="work__item wow slideInLeft" data-wow-delay="0.6s"><span className="icon-ok"></span>We are
								a proven and reliable platform for sports betting with 14 years of experience.</li>
							<li className="work__item wow slideInRight" data-wow-delay="0.6s"><span className="icon-ok"></span>We
								offer beneficial commissions for our cashiers and provide 24/7 client support.</li>
						</ul>
						<div className="work__image wow fadeInUp" data-wow-delay="0.5s">
							<Image loading="lazy" src={ second } alt="image" width="296" height="496" />
						</div>
					</div>
				</div>
			</section>

			<section className="steps">
				<div className='steps__container container'>
					<h2 className="steps__title title">HOW TO BECOME A MOSTBET cashier</h2>
					<div className="steps__sub-title">Join us right now and start earning with a strong and reliable international
						company.</div>
					<h3 className="steps__list-title">A few simple steps to start earning money:</h3>
					<ol className="steps__list">
						<li className="steps__item"><span className="number">1.</span>Fill out the short form to sign up as a
							cashier</li>
						<li className="steps__item"><span className="number">2.</span>Wait for the personal manager's response</li>
						<li className="steps__item"><span className="number">3.</span>Download the MobCash app</li>
						<li className="steps__item"><span className="number">4.</span>Log in to the MobCash app</li>
						<li className="steps__item"><span className="number">5.</span>Make a deposit (prepayment)</li>
						<li className="steps__item"><span className="number">6.</span>Start earning money!</li>
					</ol>
					<Link href="#order"
						onClick={() => {
							ym(95071208,'reachGoal','kassir-3');
							ym(95071208,'reachGoal','kassir-sum');
							rstat('event', 'becomeCashier_btn_click', { 'text': 'Become cashier', 'cls': 'sample element click', 'href': '/index.php#order', 'position': '3',});
							rstat4('event', 'becomeCashier_btn_click', { 'text': 'Become cashier', 'cls': 'sample element click', 'href': '/index.php#order', 'position': '3',});
							rstat('event', 'kassir-sum');
						}}
						className="steps__btn btn-orange btn"
					>BECOME A CASHIER</Link>
				</div>
			</section>

			<section className="stages">
				<div className='stages__container container'>
					<h2 className="stages__title title">MobCash App</h2>
					<div className="stages__content">
						<ol className="stages__list">
							<li className="stages__item wow slideInLeft" data-wow-delay="0.2s">
								<span className="number">1.</span>
								<span className="stages__text">
									<b>Fill out the form and receive <br />your application login information</b>
								</span>
							</li>
							<li className="stages__item wow slideInLeft" data-wow-delay="0.4s">
								<span className="number">2.</span>
								<span className="stages__text">
									<b>Make Prepayment</b>
									Make a prepayment into Agent account and receive in Mostbet Cash App. Minimum prepayment amount
									is 30 USD.
								</span>
							</li>
							<li className="stages__item wow slideInRight" data-wow-delay="0.6s">
								<span className="number">3.</span>
								<span className="stages__text">
									<b>Give Deposits and Withdrawals</b>
									Give deposits and withdrawals to players from Mostbet Agent App; Minimum Deposit is 1 USD, and
									Withdraw is 1 USD.
								</span>
							</li>
							<li className="stages__item wow slideInRight" data-wow-delay="0.8s">
								<span className="number">4.</span>
								<span className="stages__text">
									<b>Earn Commission</b>
									Get Commission on the deposit of players from 1,5 USD on Deposit and 0,6 USD on Withdraw. The
									more they play, the more you earn
								</span>
							</li>
						</ol>
						<div className="stages__image wow fadeInUp" data-wow-delay="0.5s">
							<div className="_phone-mockup">
								<picture>
									<Image src={ screenOne } alt="image" width="225" height="474" />
								</picture>
							</div>
						</div>
					</div>
				</div>
			</section>

			<section className="features">
				<div className='features__container container'>
					<h2 className="features__title title">THE MOSTBET MOBCASH APP FEATURES</h2>
					<div className="features__flex">
						<div className="features__image">
							<div className="_phone-mockup">
								<picture>
									<Image src={ screenTwo } alt="image" width="225" height="474" />
								</picture>
							</div>
							<div className="features__title-image">Mostbet Cash App Player Deposit </div>
						</div>
						<div className="features__image">
							<div className="_phone-mockup">
								<picture>
									<Image src={ screenThree } alt="image" width="225" height="474" />
								</picture>
							</div>
							<div className="features__title-image">Mobcash App Transaction History Interfrace</div>
						</div>
						<ul className="features__list">
							<li className="features__item"><span className="icon-ok"></span>Depositing and Withdrawal: make a
								deposit and provide withdrawal of funds to the Mostbet players via the MobCash app.</li>
							<li className="features__item"><span className="icon-ok"></span>Start Your Own Business: a chance to
								start your own business for USD 100 only, making the first step towards a successful career.</li>
							<li className="features__item"><span className="icon-ok"></span>Transaction History: check the history
								of all your financial transactions directly in the MostbetCash app.</li>
							<li className="features__item"><span className="icon-ok"></span>Invite your friends and make income from
								their transactions.</li>
							<li className="features__item"><span className="icon-ok"></span>Personal Offers: receive special offers
								customised to your behavior and preferences by analyzing users' information.</li>
							<li className="features__item"><span className="icon-ok"></span>Regular commissions: cashiers receive
								commissions every Monday ensuring a stable weekly income.</li>
							<li className="features__item"><span className="icon-ok"></span>Beneficial Terms: enjoy a higher
								commission and cashback which makes cooperation with us even more profitable.</li>
							<li className="features__item"><span className="icon-ok"></span>Local Payment Methods: deposit via local
								payment methods to make the financial transaction process as convenient as possible.</li>
						</ul>
					</div>
				</div>
			</section>

			<section className="block">
				<div className='block__container container'>
					<h2 className="block__title title">For cashiers from MOSTBET</h2>
					<div className="block__flex">
						<ol className="block__list">
							<li className="block__item"><span className="number">1.</span>MOSTBET guarantees its cashiers the
								opportunity to earn a cashier commission for each deposit and withdrawal of players' funds</li>
							<li className="block__item"><span className="number">2.</span>Imagine you have 10 friends who are
								wishing to place bets but having issues with making a deposit via bank transfer or other payment
								methods.</li>
							<li className="block__item"><span className="number">3.</span>In this case you can accept friends' money
								and deposit their balances using our app.</li>
							<li className="block__item"><span className="number">4.</span>Each time your friends make deposits, you
								get a cashier commission!</li>
							<li className="block__item"><span className="number">5.</span>This is a simple and profitable way to
								earn money provided by Mostbet for its MobCash cashiers.</li>
						</ol>
						<div className="block__image">
							<span className="block__circle-image"></span>
							<picture>
								{/* <source srcset="../assets/img/bd/3rd.webp" type="image/webp" media="(min-width: 768px)"> */}
								{/* <source srcset="../assets/img/bd/3rd.webp" type="image/webp"> */}
								{/* <source srcset="../assets/img/bd/3rd.png" type="image/png" media="(min-width: 768px)" width="543" height="542"> */}
								{/* <source srcset="../assets/img/bd/3rd.png" type="image/png"> */}
								<Image loading="lazy" src={ screenFour } alt="image" width="339" height="324" />
							</picture>
						</div>
					</div>
				</div>
			</section>

			<Form />

		</>
	)
}
