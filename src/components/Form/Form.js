'use client'
import { useEffect } from 'react';
import Popup from '../../utils/Popup';
export function Form() {
	useEffect(() => {
		let popup = new Popup({});
	})
	return (
		<section id="order" className="order">
			<div className='order__container container'>

				<h2 className="order__title title wow fadeInUp">FILL THE BELOW FORM <br />TO BECOME CASHIER</h2>
				<form id="first-form" data-ajax action="/sendmail.php"  method="POST" className="order__form form wow fadeInUp" name="order" onSubmit={() => {cnv_pixel();}}>
					<div className="order__fields form__fields">
						<label className="form__group">
							<span className="form__icon"> <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none"> <path fillRule="evenodd" clipRule="evenodd" d="M10 20C4.477 20 0 15.523 0 10C0 4.477 4.477 0 10 0C15.523 0 20 4.477 20 10C20 15.523 15.523 20 10 20ZM14.794 16.394C13.699 14.941 11.96 14 10 14C8.04 14 6.304 14.943 5.209 16.396C6.546 17.399 8.201 18 10 18C11.801 18 13.457 17.398 14.794 16.394ZM13 9C13 7.343 11.657 6 10 6C8.343 6 7 7.343 7 9C7 10.656 8.343 11.999 9.999 12H10C10 12 10 12 10.001 12C11.657 11.999 13 10.656 13 9ZM10 2C5.582 2 2 5.582 2 10C2 11.894 2.661 13.631 3.761 15.002C4.541 14.027 5.549 13.251 6.697 12.727C5.664 11.811 5 10.489 5 9C5 6.238 7.238 4 10 4C12.761 4 15 6.238 15 9C15 10.489 14.336 11.812 13.302 12.728C14.451 13.252 15.45 14.037 16.23 15.013C17.335 13.641 18 11.899 18 10C18 5.582 14.418 2 10 2Z" fill="white" /> </svg> </span>
							<input data-required autoComplete="off" type="text" name="first-name" placeholder="First Name*" className="form__input" />
						</label>
						<label className="form__group">
							<span className="form__icon"> <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none"> <path fillRule="evenodd" clipRule="evenodd" d="M10 20C4.477 20 0 15.523 0 10C0 4.477 4.477 0 10 0C15.523 0 20 4.477 20 10C20 15.523 15.523 20 10 20ZM14.794 16.394C13.699 14.941 11.96 14 10 14C8.04 14 6.304 14.943 5.209 16.396C6.546 17.399 8.201 18 10 18C11.801 18 13.457 17.398 14.794 16.394ZM13 9C13 7.343 11.657 6 10 6C8.343 6 7 7.343 7 9C7 10.656 8.343 11.999 9.999 12H10C10 12 10 12 10.001 12C11.657 11.999 13 10.656 13 9ZM10 2C5.582 2 2 5.582 2 10C2 11.894 2.661 13.631 3.761 15.002C4.541 14.027 5.549 13.251 6.697 12.727C5.664 11.811 5 10.489 5 9C5 6.238 7.238 4 10 4C12.761 4 15 6.238 15 9C15 10.489 14.336 11.812 13.302 12.728C14.451 13.252 15.45 14.037 16.23 15.013C17.335 13.641 18 11.899 18 10C18 5.582 14.418 2 10 2Z" fill="white" /> </svg> </span>
							<input data-required autoComplete="off" type="text" name="last-name" placeholder="Last Name*" className="form__input" />
						</label>
						<label className="form__group">
							<span className="form__icon"> <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none"> <path fillRule="evenodd" clipRule="evenodd" d="M16.25 18.5H3.75C1.67875 18.5 0 16.8692 0 14.8571V5.14286C0 3.13079 1.67875 1.5 3.75 1.5H16.25C18.3212 1.5 20 3.13079 20 5.14286V14.8571C20 16.8692 18.3212 18.5 16.25 18.5ZM3.75 16.0714H16.25C16.94 16.0714 17.5 15.5274 17.5 14.8571V6.63644L12.6538 11.3442C11.1775 12.7783 8.7825 12.7783 7.30625 11.3442L2.5 6.67528V14.8571C2.5 15.5274 3.05875 16.0714 3.75 16.0714ZM3.75 3.92857C3.59875 3.92857 3.4575 3.96378 3.32375 4.01113L9.08875 9.61142C9.58125 10.0898 10.3787 10.0898 10.8712 9.61142L16.6438 4.00506C16.5175 3.96377 16.3888 3.92857 16.25 3.92857H3.75Z" fill="white" /> </svg> </span>
							<input data-required="email" autoComplete="off" type="email" name="email" placeholder="Email*" className="form__input" />
						</label>
						<div className="form__phone">
							<input data-required id="phone" type="tel" name="phone" placeholder="Phone number*" className="form__input" />
						</div>
						<label className="form__group">
							<span className="form__icon"> <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none"> <path d="M10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18ZM10 20C4.47715 20 0 15.5228 0 10C0 4.47715 4.47715 0 10 0C15.5228 0 20 4.47715 20 10C20 15.5228 15.5228 20 10 20ZM6.89014 11.1708L4.3921 10.3911C3.85219 10.2255 3.84898 9.854 4.51299 9.5871L14.246 5.82754C14.8105 5.59644 15.1315 5.88842 14.9485 6.61641L13.2907 14.4377C13.1753 14.9941 12.8397 15.1266 12.3749 14.8698L9.82401 12.9823L8.63511 14.1297C8.51291 14.2476 8.41351 14.3489 8.22631 14.3743C8.03901 14.3996 7.88465 14.3442 7.77238 14.0337L6.90279 11.1628L6.89014 11.1708Z" fill="white" /> </svg> </span>
							<input autoComplete="off" inputMode="email" type="text" name="telegram" placeholder="@Telegram" className="form__input" />
						</label>
						<input type="hidden" value="" name="check" />
						<button type="submit" className="form__submit btn-orange btn">Send</button>
					</div>
				</form>

			</div>
		</section>
	)
}