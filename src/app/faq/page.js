import { Breadcrumbs } from './../../components/Breadcrumbs/Breadcrumbs';
import Image from 'next/image'

import moto from './../../assets/img/bd/moto.png';

export default function Page() {
	return (
		<>
			<Breadcrumbs value="FAQ" />

			<section className="faq">
				<div className='faq__container container'>
					<h1 className="faq__title title">FAQ</h1>
					<ul className="faq__list">
						<li className="faq__item">
							<h2 className="faq__q">1. Should I undergo the verification procedure to sign up as a cashier?</h2>
							<div className="faq_a">We may request to go through the verification procedure during the cashier's signing up. This procedure will help secure your account in case you lose access to it.</div>
						</li>
						<li className="faq__item">
							<h2 className="faq__q">2. How to get a Mostbet cashier status and make a deposit?</h2>
							<div className="faq_a">
								<ul>
									<li>complete the form</li>
									<li>provide additional information to the Support manager (upon request)</li>
									<li>get a login and password to log in to the app</li>
									<li>download the app</li>
									<li>make a prepayment deposit via the Telegram bot, Support or supported payment methods inside the app</li>
									<li>earn money</li>
								</ul>
							</div>
						</li>
						<li className="faq__item">
							<h2 className="faq__q">3. How to download the Mostbet cashier app?</h2>
							<div className="faq_a">You can download the app from the top menu by pressing Download APK.</div>
						</li>
						<li className="faq__item">
							<h2 className="faq__q">4. What is the minimum prepayment amount for Mostbet cashiers?</h2>
							<div className="faq_a">The minimum prepayment is USD 100.</div>
						</li>
						<li className="faq__item">
							<h2 className="faq__q">5. How to make a deposit in the Mostbet Cash app?</h2>
							<div className="faq_a">You can make a deposit in the Mostbet Cash app via local payment methods: bKash, NAGAD, Rocket, or cryptocurrency.</div>
						</li>
						<li className="faq__item">
							<h2 className="faq__q">6. In which countries is Mostbet Cash cashier app available?</h2>
							<div className="faq_a">Currently, Mostbet provides a chance to become a Mobcash cashier in the following countries: Bangladesh, Pakistan, Nepal, India, Uzbekistan, Türkiye, Azerbaijan, Sri Lanka, Vietnam and other countries that use the USD currency.</div>
						</li>
						<li className="faq__item">
							<h2 className="faq__q">7. What commission percentage do cashiers receive?</h2>
							<div className="faq_a">Cashiers can receive 5-10% commissions of the deposit amount and 2% of withdrawals, however, the final percentage and amount the cashier earns depends on the country and other aspects.</div>
						</li>
					</ul>
					<div className="faq__image">
						<Image  src={ moto } alt="image" width="514" height="702" />
					</div>

				</div>
			</section>
		</>
	)
}