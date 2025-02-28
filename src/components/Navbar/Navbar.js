'use client';
// import { useRouter } from 'next/navigation';
import Link from 'next/link';

export const Navbar = () => {
	// const { pathname } = useRouter();
	// const navigation = [
	// 	{ id: 1, title: 'Mostbet Cashier', path: '/' },
	// 	{ id: 2, title: 'Registration', path: '/registration' },
	// 	{ id: 3, title: 'Mobcash App', path: '/app' },
	// 	{ id: 4, title: 'FAQ', path: '/faq' },
	// 	{ id: 5, title: 'Contact Us', path: '/contacts' },
	// ]

	return (
		<nav className="menu__body" data-da=".header__flex,1200,last">
			<ul className="menu__list">
				{/* {navigation.map(({id, title, path})=>{
					<li className="menu__item">
						{id}
						<Link
							key={id}
							href={path}
							// className={({isActive}) => isActive ? activeLink : normalLink }
						>{title}</Link>
					</li>
				})} */}
				<li className="menu__item">
					<Link
						href='/'
						// className={({isActive}) => isActive ? activeLink : normalLink }
					>Mostbet Cashier</Link>
				</li>
				<li className="menu__item">
					<Link
						href='/registration'
						// className={({isActive}) => isActive ? activeLink : normalLink }
					>Registration</Link>
				</li>
				<li className="menu__item">
					<Link
						href='/app'
						// className={({isActive}) => isActive ? activeLink : normalLink }
					>Mobcash App</Link>
				</li>
				<li className="menu__item">
					<Link
						href='/faq'
						// className={({isActive}) => isActive ? activeLink : normalLink }
					>FAQ</Link>
				</li>
				<li className="menu__item">
					<Link
						href='/contacts'
						// className={({isActive}) => isActive ? activeLink : normalLink }
					>Contact Us</Link>
				</li>
				<li className="menu__item">
					<Link
						href="https://mbc-agent.com/mbc.apk"
						onClick={() => {
							cnv_pixel();
							ym(95071208,'reachGoal','kassir-1');
							ym(95071208,'reachGoal','dl-apk1');
							ym(95071208,'reachGoal','dl-link-sum');
							rstat('event', 'downloadAPK_btn_click', { 'text': 'Download APK', 'cls': 'sample element click', 'href': '/1.6.0.apk', 'position': '1',});
							rstat4('event', 'downloadAPK_btn_click', { 'text': 'Download APK', 'cls': 'sample element click', 'href': '/1.6.0.apk', 'position': '1',});
							rstat('event', 'dl-link-sum');
						}}
						target="_blank"
						className="menu__link menu__link-download"
					>Download APK</Link>
				</li>
			</ul>
		</nav>

	)
}