export const Popup = () => {

	return (
		<div id="popup-thank" aria-hidden="true" className="popup popup-thank">
			<div className="popup__wrapper">
				<div className="popup__content popup__bg-border">
					<button data-close type="button" className="popup__close icon-close icon">
						<svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg"> <circle cx="17" cy="17" r="17" fill="url(#paint0_linear_120_5339)"/> <path d="M21.2784 19.9774L19.5451 21.7106L12.6536 14.8191L14.3868 13.0858L21.2784 19.9774ZM21.5062 14.75L14.1866 22.0697L12.3014 20.1845L19.6211 12.8649L21.5062 14.75Z" fill="white"/> <defs> <linearGradient id="paint0_linear_120_5339" x1="17" y1="0" x2="17" y2="34" gradientUnits="userSpaceOnUse"> <stop stopColor="#FF7A00"/> <stop offset="1" stopColor="#D63300"/> </linearGradient> </defs> </svg>
					</button>
					<div className="popup__flex">

						<h3 className="popup__title">تفقد بريدك الإلكتروني!</h3>
						<div className="popup__sub-title">لقد أرسلنا إليك طلباً للحصول على مستندات لاستكمال تسجيلك.</div>
						<span className="popup__icon icon-star icon"></span>

					</div>
				</div>
			</div>
		</div>
	)
}
