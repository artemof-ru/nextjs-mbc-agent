// Подключение списка активных модулей
// import { flsModules } from "./modules.js";
export const LOGGING = false;
/* Проверка поддержки webp, добавление класса webp или no-webp для HTML */
export function isWebp() {
	// Проверка поддержки webp
	function testWebP(callback) {
		let webP = new Image();
		webP.onload = webP.onerror = function () {
			callback(webP.height == 2);
		};
		webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
	}
	// Добавление класса _webp или _no-webp для HTML
	testWebP(function (support) {
		let className = support === true ? 'webp' : 'no-webp';
		document.documentElement.classList.add(className);
	});
}
/* Проверка мобильного браузера */
export let isMobile = { Android: function () { return navigator.userAgent.match(/Android/i); }, BlackBerry: function () { return navigator.userAgent.match(/BlackBerry/i); }, iOS: function () { return navigator.userAgent.match(/iPhone|iPad|iPod/i); }, Opera: function () { return navigator.userAgent.match(/Opera Mini/i); }, Windows: function () { return navigator.userAgent.match(/IEMobile/i); }, any: function () { return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows()); } };
/* Добавление класса touch для HTML если браузер мобильный */
export function addTouchClass() {
	// Добавление класса _touch для HTML если браузер мобильный
	if (isMobile.any()) document.documentElement.classList.add('touch');
}
// Добавление loaded для HTML после полной загрузки страницы
export function addLoadedClass() {
	window.addEventListener("load", function () {
		setTimeout(function () {
			document.documentElement.classList.add('loaded');
		}, 0);
	});
}
// Получение хеша в адресе сайта
export function getHash() {
	if (window.location.hash) { return window.location.hash.replace('#', ''); }
}
// Указание хеша в адресе сайта
export function setHash(hash) {
	hash = hash ? `#${hash}` : window.location.href.split('#')[0];
	window.history.pushState('', '', hash);
}
// Учет плавающей панели на мобильных устройствах при 100vh
export function fullVHfix() {
	const fullScreens = document.querySelectorAll('[data-fullscreen]');
	if (fullScreens.length && isMobile.any()) {
		window.addEventListener('resize', fixHeight);
		function fixHeight() {
			let vh = window.innerHeight * 0.01;
			document.documentElement.style.setProperty('--vh', `${vh}px`);
		}
		fixHeight();
	}
}

	/* Динамический адаптив ================================= */
export function useDynamicAdapt(type = 'max') {
		const className = '_dynamic_adapt_'
		const attrName = 'data-da'

		/** @type {dNode[]} */
		const dNodes = getDNodes()

		/** @type {dMediaQuery[]} */
		const dMediaQueries = getDMediaQueries(dNodes)

		dMediaQueries.forEach((dMediaQuery) => {
		const matchMedia = window.matchMedia(dMediaQuery.query)
		// массив объектов с подходящим брейкпоинтом
		const filteredDNodes = dNodes.filter(({ breakpoint }) => breakpoint === dMediaQuery.breakpoint)
		const mediaHandler = getMediaHandler(matchMedia, filteredDNodes)
		matchMedia.addEventListener('change', mediaHandler)

		mediaHandler()
	})

	function getDNodes() {
		const result = []
		const elements = [...document.querySelectorAll(`[${attrName}]`)]

		elements.forEach((element) => {
			const attr = element.getAttribute(attrName)
			const [toSelector, breakpoint, order] = attr.split(',').map((val) => val.trim())

			const to = document.querySelector(toSelector)

			if (to) {
			result.push({
				parent: element.parentElement,
				element,
				to,
				breakpoint: breakpoint ?? '767',
				order: order !== undefined ? (isNumber(order) ? Number(order) : order) : 'last',
				index: -1,
			})
			}
		})

		return sortDNodes(result)
		}

		/**
		 * @param {dNode} items
		 * @returns {dMediaQuery[]}
		 */
		function getDMediaQueries(items) {
		const uniqItems = [...new Set(items.map(({ breakpoint }) => `(${type}-width: ${breakpoint}px),${breakpoint}`))]

		return uniqItems.map((item) => {
			const [query, breakpoint] = item.split(',')

			return { query, breakpoint }
		})
	}

	/**
	 * @param {MediaQueryList} matchMedia
	 * @param {dNodes} items
	 */
	function getMediaHandler(matchMedia, items) {
		return function mediaHandler() {
			if (matchMedia.matches) {
			items.forEach((item) => {
				moveTo(item)
			})

			items.reverse()
			} else {
			items.forEach((item) => {
				if (item.element.classList.contains(className)) {
				moveBack(item)
				}
			})

			items.reverse()
			}
		}
	}

	/**
	 * @param {dNode} dNode
	 */
	function moveTo(dNode) {
		const { to, element, order } = dNode
		dNode.index = getIndexInParent(dNode.element, dNode.element.parentElement)
		element.classList.add(className)

		if (order === 'last' || order >= to.children.length) {
			to.append(element)

			return
		}

		if (order === 'first') {
			to.prepend(element)

			return
		}

		to.children[order].before(element)
		}

		/**
		 * @param {dNode} dNode
		 */
		function moveBack(dNode) {
		const { parent, element, index } = dNode
		element.classList.remove(className)

		if (index >= 0 && parent.children[index]) {
			parent.children[index].before(element)
		} else {
			parent.append(element)
		}
	}

	/**
	 * @param {HTMLElement} element
	 * @param {HTMLElement} parent
	 */
	function getIndexInParent(element, parent) {
		return [...parent.children].indexOf(element)
	}

	/**
	 * Функция сортировки массива по breakpoint и order
	 * по возрастанию для type = min
	 * по убыванию для type = max
	 *
	 * @param {dNode[]} items
	 */
	function sortDNodes(items) {
		const isMin = type === 'min' ? 1 : 0

		return [...items].sort((a, b) => {
			if (a.breakpoint === b.breakpoint) {
			if (a.order === b.order) {
				return 0
			}

			if (a.order === 'first' || b.order === 'last') {
				return -1 * isMin
			}

			if (a.order === 'last' || b.order === 'first') {
				return 1 * isMin
			}

			return 0
			}

			return (a.breakpoint - b.breakpoint) * isMin
		})
		}

		function isNumber(value) {
		return !isNaN(value)
		}
	}
	/* ================================= END Динамический адаптив ================================= */

// Вспомогательные модули блокировки прокрутки и скочка ====================================================================================================================================================================================================================================================================================
export let bodyLockStatus = true;
export let bodyLockToggle = (delay, lp = true) => {
	console.log(`lp => `,lp)
	if (document.documentElement.classList.contains('lock')) {
		bodyUnlock(delay, lp);
	} else {
		bodyLock(delay, lp);
	}
}
export let bodyUnlock = (delay, lp = true) => {
	let body = document.querySelector("body");
	if (bodyLockStatus) {
		let lock_padding = document.querySelectorAll("[data-lp]");
		// setTimeout(() => {
			if(lp) {
				for (let index = 0; index < lock_padding.length; index++) {
					const el = lock_padding[index];
					el.style.paddingRight = '0px';
				}
			}

			body.style.paddingRight = '0px';
			document.documentElement.classList.remove("lock");
		// }, delay);
		bodyLockStatus = false;
		// setTimeout(function () {
			bodyLockStatus = true;
		// }, delay);
	}
}
export let bodyLock = (delay, lp = true) => {
	let body = document.querySelector("body");
	if (bodyLockStatus) {
		if(lp) {
			let lock_padding = document.querySelectorAll("[data-lp]");
			for (let index = 0; index < lock_padding.length; index++) {
				const el = lock_padding[index];
				el.style.paddingRight = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
			}
		}
		body.style.paddingRight = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
		document.documentElement.classList.add("lock");

		bodyLockStatus = false;
		// setTimeout(function () {
			bodyLockStatus = true;
		// }, delay);
	}
}

function checkOverflow(isOpenMenu) {
	let windowHeight = document.documentElement.clientHeight;
	let menuHeight = document.querySelector('.menu').getBoundingClientRect().height
	let headerHeight = document.querySelector('.header__head').getBoundingClientRect().height
	console.log(`isOpenMenu => `,isOpenMenu)
	if ( (menuHeight + headerHeight) > windowHeight) {
		if (!isOpenMenu) {
			document.querySelector('.header').style.overflowY = 'scroll';
		} else {
			document.querySelector('.header').style.overflowY = 'initial';
		}
		return true;
	} else {
		return false;
	}
}
// checkOverflow();

export function menuOpen() {
	bodyLock();
	document.documentElement.classList.add("_open-menu");
}
export function menuClose() {
	bodyUnlock();
	document.documentElement.classList.remove("_open-menu");
}

//================================================================================================================================================================================================================================================================================================================
// Прочие полезные функции ================================================================================================================================================================================================================================================================================================================
//================================================================================================================================================================================================================================================================================================================
// FLS (Full Logging System)
export function FLS(message) {
	setTimeout(() => {
		if (window.FLS) {
			console.log(message);
		}
	}, 0);
}
// Получить цифры из строки
export function getDigFromString(item) {
	return parseInt(item.replace(/[^\d]/g, ''))
}
// Форматирование цифр типа 100 000 000
export function getDigFormat(item) {
	return item.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, "$1 ");
}
// Убрать класс из всех элементов массива
export function removeClasses(array, className) {
	for (var i = 0; i < array.length; i++) {
		array[i].classList.remove(className);
	}
}
// Уникализация массива
export function uniqArray(array) {
	return array.filter(function (item, index, self) {
		return self.indexOf(item) === index;
	});
}
// Функция получения индекса внутри родителя
export function indexInParent(parent, element) {
	const array = Array.prototype.slice.call(parent.children);
	return Array.prototype.indexOf.call(array, element);
};
// Обработа медиа запросов из атрибутов
export function dataMediaQueries(array, dataSetValue) {
	// Получение объектов с медиа запросами
	const media = Array.from(array).filter(function (item, index, self) {
		if (item.dataset[dataSetValue]) {
			return item.dataset[dataSetValue].split(",")[0];
		}
	});
	// Инициализация объектов с медиа запросами
	if (media.length) {
		const breakpointsArray = [];
		media.forEach(item => {
			const params = item.dataset[dataSetValue];
			const breakpoint = {};
			const paramsArray = params.split(",");
			breakpoint.value = paramsArray[0];
			breakpoint.type = paramsArray[1] ? paramsArray[1].trim() : "max";
			breakpoint.item = item;
			breakpointsArray.push(breakpoint);
		});
		// Получаем уникальные брейкпоинты
		let mdQueries = breakpointsArray.map(function (item) {
			return '(' + item.type + "-width: " + item.value + "px)," + item.value + ',' + item.type;
		});
		mdQueries = uniqArray(mdQueries);
		const mdQueriesArray = [];

		if (mdQueries.length) {
			// Работаем с каждым брейкпоинтом
			mdQueries.forEach(breakpoint => {
				const paramsArray = breakpoint.split(",");
				const mediaBreakpoint = paramsArray[1];
				const mediaType = paramsArray[2];
				const matchMedia = window.matchMedia(paramsArray[0]);
				// Объекты с нужными условиями
				const itemsArray = breakpointsArray.filter(function (item) {
					if (item.value === mediaBreakpoint && item.type === mediaType) {
						return true;
					}
				});
				mdQueriesArray.push({
					itemsArray,
					matchMedia
				})
			});
			return mdQueriesArray;
		}
	}
}
//================================================================================================================================================================================================================================================================================================================
export const langInit = () => {
    const lang = document.querySelector('.header__lang');
    const btnLang = lang.querySelector('._js-lang-button');
    if (btnLang) {
        document.addEventListener("click", function (e) {
            if (e.target.closest('._js-lang-button')) {
                document.documentElement.classList.toggle("_open-lang");
            } else {
                document.documentElement.classList.remove("_open-lang");
            }
        });
    }
    // change lang button

    const currentLang = lang.dataset.lang;
    const langOption = lang.querySelector(`.lang__option[lang=${currentLang}]`);
    const langIcon = langOption.querySelector('.lang__icon');
    btnLang.prepend(langIcon);
    langOption.remove();



    let url = window.location;
    let lastPath = url.pathname.split('/').pop();
    if(lastPath) {
        let langOptions = document.querySelectorAll('.lang__option');
        langOptions.forEach(option => {
            option.href += lastPath;
        });
    }
}
export const menuInit = () => {
    const btnBurger = document.querySelector('._js-burger-btn');
    if (btnBurger) {
        document.addEventListener("click", function (e) {
            if (bodyLockStatus && e.target.closest('._js-burger-btn')) {

                // let headerHeight = document.querySelector('.header__grid').offsetHeight;
                // document.querySelector('.header__menu').style.setProperty('--header-height', `${headerHeight}px`);


                document.documentElement.classList.toggle("_open-menu");
                bodyLockToggle(0);
                // _slideToggle(document.querySelector('.header__menu'));

            }
            if (e.target.closest('.menu__item a')) {
                if(document.documentElement.classList.contains('_open-menu')) document.documentElement.classList.remove("_open-menu");
                bodyUnlock(0);
            }
        });
    };
}

export function headerScroll() {
	const addWindowScrollEvent = true;
	const header = document.querySelector('header.header');
    const headerShow = header.hasAttribute('data-scroll-show');
    const headerShowTimer = header.dataset.scrollShow ? header.dataset.scrollShow : 500;
    const startPoint = header.dataset.scroll ? header.dataset.scroll : 1;
    let scrollDirection = 0;
    let timer;
    document.addEventListener("windowScroll", function (e) {
        const scrollTop = window.scrollY;
        clearTimeout(timer);
        if (scrollTop >= startPoint) {
            if(!header.classList.contains('_header-scroll')) header.classList.add('_header-scroll');
            if (headerShow) {
                if (scrollTop > scrollDirection) {
                    // downscroll code
                    if(header.classList.contains('_header-show')) header.classList.remove('_header-show');
                } else {
                    // upscroll code
                    if(!header.classList.contains('_header-show')) header.classList.add('_header-show');
                }
                timer = setTimeout(() => {
                    if(!header.classList.contains('_header-show')) header.classList.add('_header-show');
                }, headerShowTimer);
            }
        } else {
            if (header.classList.contains('_header-scroll')) header.classList.remove('_header-scroll');
            if (headerShow) {
                if(header.classList.contains('_header-show')) header.classList.remove('_header-show');
            }
        }
        scrollDirection = scrollTop <= 0 ? 0 : scrollTop;
    });
    // При подключении модуля обработчик события запустится автоматически
    setTimeout(() => {
    	if (addWindowScrollEvent) {
    		let windowScroll = new Event("windowScroll");
    		window.addEventListener("scroll", function (e) {
    			document.dispatchEvent(windowScroll);
    		});
    	}
    }, 0);
}