import Link from 'next/link'

export const Breadcrumbs = (props) => {

	return (
		<>
			<div className="breadcrumbs">
				<div className="breadcrumbs__container container">
					<ul className="breadcrumbs__list">
						<li className="breadcrumbs__item"><Link href="/en/">Home</Link></li>
						<li className="breadcrumbs__item">{ props.value }</li>
					</ul>
				</div>
			</div>
		</>
	)
}