'use client'
import { Form } from './../../components/Form/Form'
import Image from 'next/image'

import { Breadcrumbs } from './../../components/Breadcrumbs/Breadcrumbs';
import screenOne from './../../assets/img/screen/en/1-4.jpg';

export default function Page() {

	return (
		<>
			<Breadcrumbs value="SIGN UP" />

			<section className="sign">
				<div className='sign__container container'>
					<h2 className="sign__title title">SIGN UP</h2>
					<div className="sign__block">
						<div className="sign__content">
							<h3 className="sign__h3-title">Signing up as a Mostbet cashier is an easy and simple procedure.</h3>
							<blockquote className="sign__quote quote">You must provide your personal details and then you'll be able to use a variety of benefits, including compelling deposit commissions and withdrawals.</blockquote>
							<p className="sign__sup-title">The Mostbet Company is one of the world leaders in the betting area that offers individuals a special opportunity to become cashiers in an online bookmaker company.</p>
						</div>
						<div className="sign__image">
							<div className="_phone-mockup">
								<Image  src={ screenOne } alt="image" width="225" height="474" />
							</div>
						</div>
					</div>

				</div>
			</section>

			<div className="two">
				<div className='two__container container'>
					<h2 className="two__left-title title">WHAT DOES THE MOSTBET cashier DO?</h2>
					<div className="two__left-content">A Mostbet cashier is an individual who runs the betting cashier app. The cashiers act as a guide for placing bets and can be characterised as brokers working on behalf of the company. The main aim of the online bookmaker cashier is to find players, accept deposits and process payouts.</div>
					<h2 className="two__right-title title">MOSTBET SERVICE</h2>
					<div className="two__right-content">
						Since players use Mostbet services through a cashier, the cashier, who represents the bookmaker company, receives a generous reward. Thus, cashiers receive compensation from Mostbet for their guide role between the bookmaker and clients.
						<div className="two__border">To prepare for this role, Mostbet's tuition and Support Service provide the required training and information to help cashiers successfully grow and manage their cashier activities.</div>
					</div>
				</div>
			</div>

			<section className="test">
				<div className='test__container container'>
					<h2 className="test__title title">REQUIREMENTS TO BECOME A <br />MOSTBET CASHIER</h2>
					<div className="test__sub-title">To become a Mostbet cashier, it is crucial to meet certain requirements. Here's a list of signing up requirements for individuals who are willing to become Mostbet cashiers:</div>
					<ul className="test__list">
						<li className="test__item">Cashier must be 18 years or older</li>
						<li className="test__item">Cashier must have a smartphone with a stable Internet connection</li>
						<li className="test__item">Cashier must complete the short form, specifying their First Name, Last Name, phone number, email and Telegram nickname</li>
						<li className="test__item">After sending the form, your personal manager will contact you and tell you about the next steps</li>
						<li className="test__item">Cashier must provide their personal details, for example, national ID number / passport / driver's licence number</li>
						<li className="test__item">Cashier must take a selfie with their document as well</li>
						<li className="test__item">Your personal manager verifies your documents and proceeds to the next stage</li>
						<li className="test__item">After successful verification, the cashier will be added to the Telegram group and provided with the login information and the cashier's wallet number for making a prepayment in the MobCash app.</li>
						<li className="test__item">Cashier must install the Mostbet Cash app to their device and log in using the provided information.</li>
						<li className="test__item">The default password for the Mostbet Cash account is to be changed and must not be shared with anyone.</li>
						<li className="test__item">Then the cashier's wallet number is requested for withdrawal.</li>
						<li className="test__item">You can replenish your cashier's account by making a deposit in USD or local currency.</li>
					</ul>
				</div>
			</section>

			<section className="commission">
				<div className='commission__container container'>
					<h2 className="commission__title title">BENEFITS AND COMMISSIONS OF THE MOSTBET CASHIER</h2>
					<div className="commission__sub-title">Working as a Mostbet cashier provides a number of benefits. Despite the commission benefits, the cashiers have the following privileges and opportunities:</div>
					<div className="commission__flex">
						<div className="commission__border">As mentioned before, working with Mostbet involves a number of compelling features. Cashiers receive a 5-10% commission for each deposit made and a 2-4% commission for withdrawals.</div>
						<div className="commission__border">A cashier's commission depends on the income and location as well, that's why there's no fixed amount. However, cashiers are given a well-structured reward for their services provided.</div>
					</div>
				</div>
			</section>

			<section className="how">
				<div className='how__container container'>
					<h2 className="how__title title">HOW TO SIGN UP AS A CASHIER AT MOSTBET?</h2>
					<div className="how__sub-title">The signing up process as a Mostbet cashier is quite simple and understandable. Open the <a className="orange-link" href="https://mbc-agent.com" target="_blank">mbc-agent.com</a> website, then go to the signing up form or contact a Mоstbet Cash Manager manager via Telegram: <a className="orange-link" href="https://t.me/mbcagen_bot" onClick={() => { cnv_pixel();ym(95071208,'reachGoal','tlg-start'); rstat('event', 'tlg-start'); }} >@MBC AGENTS EN</a>. You must provide the following details:</div>
					<ul className="how__list">
						<li className="how__item">First Name</li>
						<li className="how__item">Last Name</li>
						<li className="how__item">Email</li>
						<li className="how__item">Phone number</li>
						<li className="how__item">Telegram nickname or link</li>
					</ul>
					<div className="how__sup-title">After completing the signing up form, the manager will contact you in Telegram and provide further instructions.</div>
				</div>
			</section>

			<Form />
		</>
	)
}