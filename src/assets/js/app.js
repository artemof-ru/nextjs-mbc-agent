import { WOW } from 'wowjs';
import { Swiper } from 'swiper';

function rstat() {}
function rstat4() {}
function ym() {}
function gtag() {}

document.addEventListener('DOMContentLoaded', () => {
	let LOGGING = false;
	let addWindowScrollEvent = true;
	let bodyLockStatus = true;
	let select = null;
	let popup = null;

	/* Проверка поддержки webp, добавление класса webp или no-webp для HTML */
	function isWebp() {
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
	let isMobile = { Android: function () { return navigator.userAgent.match(/Android/i); }, BlackBerry: function () { return navigator.userAgent.match(/BlackBerry/i); }, iOS: function () { return navigator.userAgent.match(/iPhone|iPad|iPod/i); }, Opera: function () { return navigator.userAgent.match(/Opera Mini/i); }, Windows: function () { return navigator.userAgent.match(/IEMobile/i); }, any: function () { return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows()); } };
	/* Добавление класса touch для HTML если браузер мобильный */
	function addTouchClass() {
		// Добавление класса _touch для HTML если браузер мобильный
		if (isMobile.any()) document.documentElement.classList.add('touch');
	}
	// Добавление loaded для HTML после полной загрузки страницы
	function addLoadedClass() {
		window.addEventListener("load", function () {
			setTimeout(function () {
				document.documentElement.classList.add('loaded');
			}, 0);
		});
	}
	/* Динамический адаптив ================================= */
	function useDynamicAdapt(type = 'max') {
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
	// Вспомогательные модули плавного расскрытия и закрытия объекта ======================================================================================================================================================================
	let _slideUp = (target, duration = 500, showmore = 0) => {
		if (!target.classList.contains('_slide')) {
			target.classList.add('_slide');
			target.style.transitionProperty = 'height, margin, padding';
			target.style.transitionDuration = duration + 'ms';
			target.style.height = `${target.offsetHeight}px`;
			target.offsetHeight;
			target.style.overflow = 'hidden';
			target.style.height = showmore ? `${showmore}px` : `0px`;
			target.style.paddingTop = 0;
			target.style.paddingBottom = 0;
			target.style.marginTop = 0;
			target.style.marginBottom = 0;
			window.setTimeout(() => {
				target.hidden = !showmore ? true : false;
				!showmore ? target.style.removeProperty('height') : null;
				target.style.removeProperty('padding-top');
				target.style.removeProperty('padding-bottom');
				target.style.removeProperty('margin-top');
				target.style.removeProperty('margin-bottom');
				!showmore ? target.style.removeProperty('overflow') : null;
				target.style.removeProperty('transition-duration');
				target.style.removeProperty('transition-property');
				target.classList.remove('_slide');
				// Создаем событие
				document.dispatchEvent(new CustomEvent("slideUpDone", {
					detail: {
						target: target
					}
				}));
			}, duration);
		}
	}
	let _slideDown = (target, duration = 500, showmore = 0) => {
		if (!target.classList.contains('_slide')) {
			target.classList.add('_slide');
			target.hidden = target.hidden ? false : null;
			showmore ? target.style.removeProperty('height') : null;
			let height = target.offsetHeight;
			target.style.overflow = 'hidden';
			target.style.height = showmore ? `${showmore}px` : `0px`;
			target.style.paddingTop = 0;
			target.style.paddingBottom = 0;
			target.style.marginTop = 0;
			target.style.marginBottom = 0;
			target.offsetHeight;
			target.style.transitionProperty = "height, margin, padding";
			target.style.transitionDuration = duration + 'ms';
			target.style.height = height + 'px';
			target.style.removeProperty('padding-top');
			target.style.removeProperty('padding-bottom');
			target.style.removeProperty('margin-top');
			target.style.removeProperty('margin-bottom');
			window.setTimeout(() => {
				target.style.removeProperty('height');
				target.style.removeProperty('overflow');
				target.style.removeProperty('transition-duration');
				target.style.removeProperty('transition-property');
				target.classList.remove('_slide');
				// Создаем событие
				document.dispatchEvent(new CustomEvent("slideDownDone", {
					detail: {
						target: target
					}
				}));
			}, duration);
		}
	}
	let _slideToggle = (target, duration = 500) => {
		if (target.hidden) {
			return _slideDown(target, duration);
		} else {
			return _slideUp(target, duration);
		}
	}
	// Вспомогательные модули блокировки прокрутки и скочка ====================================================================================================================================================================================================================================================================================
	let bodyLockToggle = (delay = 0) => {
		if (document.documentElement.classList.contains('lock')) {
			bodyUnlock(delay);
			LOGGING && console.log('bodyUnlock')
		} else {
			bodyLock(delay);
			LOGGING && console.log('bodyLock')
		}
	}
	let bodyUnlock = (delay = 0) => {
		let body = document.querySelector("body");
		// document.querySelector('.header').style.paddingRight = '0px';
		if (bodyLockStatus) {
			let lock_padding = document.querySelectorAll("[data-lp]");
			setTimeout(() => {
				for (let index = 0; index < lock_padding.length; index++) {
					const el = lock_padding[index];
					el.style.paddingRight = '0px';
				}
				document.querySelector('.header').style.paddingRight = '0px';
				body.style.paddingRight = '0px';

				document.documentElement.classList.remove("lock");
			}, delay);
			bodyLockStatus = false;
			setTimeout(function () {
				bodyLockStatus = true;
			}, delay);
		}
	}
	let bodyLock = (delay = 0) => {
		let body = document.querySelector("body");
		if (bodyLockStatus) {
			let lock_padding = document.querySelectorAll("[data-lp]");
			for (let index = 0; index < lock_padding.length; index++) {
				const el = lock_padding[index];
				el.style.paddingRight = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
			}

			// const headerScroll = document.querySelector('.header._header-scroll');
			// if (headerScroll) headerScroll.style.paddingRight = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
			// const headerMobMenu = document.querySelector('._open-mobile-menu .header');
			// if (headerMobMenu) headerMobMenu.style.paddingRight = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';

			body.style.paddingRight = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';


			document.documentElement.classList.add("lock");

			bodyLockStatus = false;
			setTimeout(function () {
				bodyLockStatus = true;
			}, delay);
		}
	}
	// Уникализация массива ======================================================================================================================================================================
	function uniqArray(array) {
		return array.filter(function (item, index, self) {
			return self.indexOf(item) === index;
		});
	}
	// Получение хеша в адресе сайта ======================================================================================================================================================================
	function getHash() {
		if (location.hash) { return location.hash.replace('#', ''); }
	}
	// Указание хеша в адресе сайта ======================================================================================================================================================================
	function setHash(hash) {
		hash = hash ? `#${hash}` : window.location.href.split('#')[0];
		history.pushState('', '', hash);
	}

	/*  btn burger menu - open & close ================================= */
	const menuInit = () => {
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
				if (e.target.closest('.menu__link')) {
					if(document.documentElement.classList.contains('_open-menu')) document.documentElement.classList.remove("_open-menu");
					bodyUnlock(0);
				}
			});
		};
	}
	const menuOpen = () => {
		// bodyLock();
		document.documentElement.classList.add("_open-menu");
	}
	const menuClose = () => {
		// bodyUnlock();
		document.documentElement.classList.remove("_open-menu");
	}

	/* ================================= END btn burger menu - open & close ================================= */

	/* btn change lang ================================= */
	const langInit = () => {
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
	/* ================================= END btn change lang ================================= */


	/* header scroll ================================= */
	function headerScroll() {
		addWindowScrollEvent = true;
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
				!header.classList.contains('_header-scroll') ? header.classList.add('_header-scroll') : null;
				if (headerShow) {
					if (scrollTop > scrollDirection) {
						// downscroll code
						header.classList.contains('_header-show') ? header.classList.remove('_header-show') : null;
					} else {
						// upscroll code
						!header.classList.contains('_header-show') ? header.classList.add('_header-show') : null;
					}
					timer = setTimeout(() => {
						!header.classList.contains('_header-show') ? header.classList.add('_header-show') : null;
					}, headerShowTimer);
				}
			} else {
				header.classList.contains('_header-scroll') ? header.classList.remove('_header-scroll') : null;
				if (headerShow) {
					header.classList.contains('_header-show') ? header.classList.remove('_header-show') : null;
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
	/* ================================= END header scroll ================================= */



	/*  Popup ================================= */
	class Popup {
		constructor(options) {
			let config = {
				logging: LOGGING,
				init: true,
				// Для кнопок
				attributeOpenButton: 'data-popup', // Атрибут для кнопки, которая вызывает попап
				arrtibuteFormSubject: 'data-subject', // Тема отправки письма
				attributeCloseButton: 'data-close', // Атрибут для кнопки, которая закрывает попап
				// Для сторонних объектов
				fixElementSelector: '[data-lp]', // Атрибут для элементов с левым паддингом (которые fixed)
				// Для объекта попапа
				youtubeAttribute: 'data-popup-youtube', // Атрибут для кода youtube
				youtubePlaceAttribute: 'data-popup-youtube-place', // Атрибут для вставки ролика youtube
				setAutoplayYoutube: true,
				// Изменение классов
				classes: {
					popup: 'popup',
					// popupWrapper: 'popup__wrapper',
					popupContent: 'popup__content',
					popupActive: 'popup_show', // Добавляется для попапа, когда он открывается
					bodyActive: 'popup-show', // Добавляется для боди, когда попап открыт
				},
				focusCatch: true, // Фокус внутри попапа зациклен
				closeEsc: true, // Закрытие по ESC
				bodyLock: true, // Блокировка скролла
				hashSettings: {
					location: true, // Хэш в адресной строке
					goHash: true, // Переход по наличию в адресной строке
				},
				on: { // События
					beforeOpen: function () { },
					afterOpen: function () { },
					beforeClose: function () { },
					afterClose: function () { },
				},
			}
			this.youTubeCode;
			this.isOpen = false;
			// Текущее окно
			this.targetOpen = {
				selector: false,
				element: false,
			}
			// Предыдущее открытое
			this.previousOpen = {
				selector: false,
				element: false,
			}
			// Последнее закрытое
			this.lastClosed = {
				selector: false,
				element: false,
			}
			this._dataValue = false;
			this.hash = false;

			this._reopen = false;
			this._selectorOpen = false;

			this.lastFocusEl = false;
			this._focusEl = [
				'a[href]',
				'input:not([disabled]):not([type="hidden"]):not([aria-hidden])',
				'button:not([disabled]):not([aria-hidden])',
				'select:not([disabled]):not([aria-hidden])',
				'textarea:not([disabled]):not([aria-hidden])',
				'area[href]',
				'iframe',
				'object',
				'embed',
				'[contenteditable]',
				'[tabindex]:not([tabindex^="-"])'
			];
			//this.options = Object.assign(config, options);
			this.options = {
				...config,
				...options,
				classes: {
					...config.classes,
					...options?.classes,
				},
				hashSettings: {
					...config.hashSettings,
					...options?.hashSettings,
				},
				on: {
					...config.on,
					...options?.on,
				}
			}
			this.bodyLock = false;
			this.options.init ? this.initPopups() : null
		}
		initPopups() {
			this.popupLogging(`Проснулся`);
			this.eventsPopup();
		}
		eventsPopup() {
			// Клик на всем документе
			document.addEventListener("click", function (e) {
				// Клик по кнопке "открыть"
				const buttonOpen = e.target.closest(`[${this.options.attributeOpenButton}]`);
				if (buttonOpen) {
					e.preventDefault();
					this._dataValue = buttonOpen.getAttribute(this.options.attributeOpenButton) ?
						buttonOpen.getAttribute(this.options.attributeOpenButton) :
						'error';
					this.youTubeCode = buttonOpen.getAttribute(this.options.youtubeAttribute) ?
						buttonOpen.getAttribute(this.options.youtubeAttribute) :
						null;
					if (this._dataValue !== 'error') {
						if (!this.isOpen) this.lastFocusEl = buttonOpen;
						this.targetOpen.selector = `${this._dataValue}`;
						this._selectorOpen = true;
						this.open();
						return;

					} else this.popupLogging(`Ой ой, не заполнен атрибут у ${buttonOpen.classList}`);

					return;
				}
				// Закрытие на пустом месте (popup__wrapper) и кнопки закрытия (popup__close) для закрытия
				const buttonClose = e.target.closest(`[${this.options.attributeCloseButton}]`);
				// if (buttonClose || !e.target.closest(`.${this.options.classes.popupContent}`) && this.isOpen) {
				if (buttonClose && this.isOpen) {
					e.preventDefault();
					this.close();
					return;
				}
			}.bind(this));
			// Закрытие по ESC
			document.addEventListener("keydown", function (e) {
				if (this.options.closeEsc && e.which == 27 && e.code === 'Escape' && this.isOpen) {
					e.preventDefault();
					this.close();
					return;
				}
				if (this.options.focusCatch && e.which == 9 && this.isOpen) {
					this._focusCatch(e);
					return;
				}
			}.bind(this))

			// Открытие по хешу
			if (this.options.hashSettings.goHash) {
				// Проверка изменения адресной строки
				window.addEventListener('hashchange', function () {
					if (window.location.hash) {
						this._openToHash();
					} else {
						this.close(this.targetOpen.selector);
					}
				}.bind(this))

				window.addEventListener('load', function () {
					if (window.location.hash) {
						this._openToHash();
					}
				}.bind(this))
			}
		}
		open(selectorValue) {
			// author: artemof.ru
			if (bodyLockStatus) {
				// Если перед открытием попапа был режим lock
				this.bodyLock = document.documentElement.classList.contains('lock') && !this.isOpen ? true : false;

				// Если ввести значение селектора (селектор настраивается в options)
				if (selectorValue && typeof (selectorValue) === "string" && selectorValue.trim() !== "") {
					this.targetOpen.selector = selectorValue;
					this._selectorOpen = true;
				}
				if (this.isOpen) {
					this._reopen = true;
					this.close();
				}
				if (!this._selectorOpen) this.targetOpen.selector = this.lastClosed.selector;
				if (!this._reopen) this.previousActiveElement = document.activeElement;

				this.targetOpen.element = document.querySelector(this.targetOpen.selector);

				if (this.targetOpen.element) {
					// YouTube
					if (this.youTubeCode) {
						const codeVideo = this.youTubeCode;
						const urlVideo = `https://www.youtube.com/embed/${codeVideo}?rel=0&showinfo=0&autoplay=1`
						const iframe = document.createElement('iframe');
						iframe.setAttribute('allowfullscreen', '');

						const autoplay = this.options.setAutoplayYoutube ? 'autoplay;' : '';
						iframe.setAttribute('allow', `${autoplay}; encrypted-media`);

						iframe.setAttribute('src', urlVideo);

						if (!this.targetOpen.element.querySelector(`[${this.options.youtubePlaceAttribute}]`)) {
							const youtubePlace = this.targetOpen.element.querySelector('.popup__text').setAttribute(`${this.options.youtubePlaceAttribute}`, '');
						}
						this.targetOpen.element.querySelector(`[${this.options.youtubePlaceAttribute}]`).appendChild(iframe);
					}
					if (this.options.hashSettings.location) {
						// Получение хэша и его выставление
						this._getHash();
						this._setHash();
					}
					// До открытия
					this.options.on.beforeOpen(this);
					// Создаем свое событие после открытия попапа
					document.dispatchEvent(new CustomEvent("beforePopupOpen", {
						detail: {
							popup: this
						}
					}));

					this.targetOpen.element.classList.add(this.options.classes.popupActive);
					document.documentElement.classList.add(this.options.classes.bodyActive);

					if (!this._reopen) {
						!this.bodyLock ? bodyLock() : null;
					}
					else this._reopen = false;

					this.targetOpen.element.setAttribute('aria-hidden', 'false');

					// Запоминаю это открытое окно. Оно будет последним открытым
					this.previousOpen.selector = this.targetOpen.selector;
					this.previousOpen.element = this.targetOpen.element;

					this._selectorOpen = false;

					this.isOpen = true;

					setTimeout(() => {
						this._focusTrap();
					}, 50);

					// После открытия
					this.options.on.afterOpen(this);
					// Создаем свое событие после открытия попапа
					document.dispatchEvent(new CustomEvent("afterPopupOpen", {
						detail: {
							popup: this
						}
					}));
					this.popupLogging(`Открыл попап`);

				} else this.popupLogging(`Ой ой, такого попапа нет.Проверьте корректность ввода. `);
			}
		}
		close(selectorValue) {
			if (selectorValue && typeof (selectorValue) === "string" && selectorValue.trim() !== "") {
				this.previousOpen.selector = selectorValue;
			}
			if (!this.isOpen || !bodyLockStatus) {
				return;
			}
			// До закрытия
			this.options.on.beforeClose(this);
			// Создаем свое событие перед закрытием попапа
			document.dispatchEvent(new CustomEvent("beforePopupClose", {
				detail: {
					popup: this
				}
			}));

			// YouTube
			if (this.youTubeCode) {
				if (this.targetOpen.element.querySelector(`[${this.options.youtubePlaceAttribute}]`))
					this.targetOpen.element.querySelector(`[${this.options.youtubePlaceAttribute}]`).innerHTML = '';
			}
			this.previousOpen.element.classList.remove(this.options.classes.popupActive);
			// aria-hidden
			this.previousOpen.element.setAttribute('aria-hidden', 'true');
			if (!this._reopen) {
				document.documentElement.classList.remove(this.options.classes.bodyActive);
				!this.bodyLock ? bodyUnlock() : null;
				this.isOpen = false;
			}
			// Очищение адресной строки
			this._removeHash();
			if (this._selectorOpen) {
				this.lastClosed.selector = this.previousOpen.selector;
				this.lastClosed.element = this.previousOpen.element;

			}
			// После закрытия
			this.options.on.afterClose(this);
			// Создаем свое событие после закрытия попапа
			document.dispatchEvent(new CustomEvent("afterPopupClose", {
				detail: {
					popup: this
				}
			}));

			setTimeout(() => {
				this._focusTrap();
			}, 50);

			this.popupLogging(`Закрыл попап`);
		}
		// Получение хэша
		_getHash() {
			if (this.options.hashSettings.location) {
				this.hash = this.targetOpen.selector.includes('#') ?
					this.targetOpen.selector : this.targetOpen.selector.replace('.', '#')
			}
		}
		_openToHash() {
			let classInHash = document.querySelector(`.${window.location.hash.replace('#', '')}`) ? `.${window.location.hash.replace('#', '')}` :
				document.querySelector(`${window.location.hash}`) ? `${window.location.hash}` :
					null;

			const buttons = document.querySelector(`[${this.options.attributeOpenButton} = "${classInHash}"]`) ? document.querySelector(`[${this.options.attributeOpenButton} = "${classInHash}"]`) : document.querySelector(`[${this.options.attributeOpenButton} = "${classInHash.replace('.', "#")}"]`);
			if (buttons && classInHash) this.open(classInHash);
		}
		// Утсановка хэша
		_setHash() {
			history.pushState('', '', this.hash);
		}
		_removeHash() {
			history.pushState('', '', window.location.href.split('#')[0])
		}
		_focusCatch(e) {
			const focusable = this.targetOpen.element.querySelectorAll(this._focusEl);
			const focusArray = Array.prototype.slice.call(focusable);
			const focusedIndex = focusArray.indexOf(document.activeElement);

			if (e.shiftKey && focusedIndex === 0) {
				focusArray[focusArray.length - 1].focus();
				e.preventDefault();
			}
			if (!e.shiftKey && focusedIndex === focusArray.length - 1) {
				focusArray[0].focus();
				e.preventDefault();
			}
		}
		_focusTrap() {
			const focusable = this.previousOpen.element.querySelectorAll(this._focusEl);
			if (!this.isOpen && this.lastFocusEl) {
				this.lastFocusEl.focus();
			} else {
				focusable[0].focus();
			}
		}
		// Функция вывода в консоль
		popupLogging(message) {
			this.options.logging ? console.log(`[Попап]: ${message}`) : null;
		}
		addSubjectToFormSend () {
			LOGGING && console.log('asdfa', arrtibuteFormSubject);
		}
	}
	/* ================================= END Popup ==================================================================================================================================== */

	function getCookie(name) {
		let matches = document.cookie.match(new RegExp(
			"(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
		));
		return matches ? decodeURIComponent(matches[1]) : undefined;
	}
	// Добавление файлов в форму
	const files = document.querySelectorAll('.file');
	if (files.length) {
		files.forEach(file => {
			const fileInputHidden = file.querySelector('.file__hidden');
			const button = file.querySelector('.file__input');
			button.addEventListener('change', function (e) {
				fileInputHidden.focus();
				return false;
			})
			fileInputHidden.addEventListener('change', function(e) {
				if(this.files.length) {
					button.innerHTML = this.files[0].name;
					file.classList.add('_file-added')
				}else{
					button.innerHTML = fileInputHidden.placeholder;
					file.classList.remove('_file-added');
				}
			})
		})
	}
	// Валидация форм
	let rstatFormErrorArr = [];
	let formValidate = {
		getErrors(form) {
			let error = 0;
			let formRequiredItems = form.querySelectorAll('*[data-required]');
			if (formRequiredItems.length) {
				formRequiredItems.forEach(formRequiredItem => {
					this.removeError(formRequiredItem);
					if ((formRequiredItem.offsetParent !== null || formRequiredItem.tagName === "SELECT") && !formRequiredItem.disabled) {
						error += this.validateInput(formRequiredItem);
					}
				});
			}
			return error;
		},
		validateInput(formRequiredItem) {
			let error = 0;
			if (formRequiredItem.dataset.required === "email") {
				formRequiredItem.value = formRequiredItem.value.replace(" ", "");
				if (this.emailTest(formRequiredItem)) {
					this.addError(formRequiredItem);
					error++;
				} else {
					this.removeError(formRequiredItem);
				}
			} else if (formRequiredItem.type === "checkbox" && !formRequiredItem.checked) {
				this.addError(formRequiredItem);
				error++;
			} else {
				if (!formRequiredItem.value.trim()) {
					this.addError(formRequiredItem);
					error++;
				} else {
					this.removeError(formRequiredItem);
				}
			}
			return error;
		},
		addError(formRequiredItem) {
			rstatFormErrorArr.push(formRequiredItem.name)
			formRequiredItem.classList.add('_form-error');
			formRequiredItem.parentElement.classList.add('_form-error');
			let inputError = formRequiredItem.parentElement.querySelector('.form__error');
			if (inputError) formRequiredItem.parentElement.removeChild(inputError);
			if (formRequiredItem.dataset.error) {
				formRequiredItem.parentElement.insertAdjacentHTML('beforeend', `<div class="form__error">${formRequiredItem.dataset.error}</div>`);
			}
		},
		removeError(formRequiredItem) {
			formRequiredItem.classList.remove('_form-error');
			formRequiredItem.parentElement.classList.remove('_form-error');
			if (formRequiredItem.parentElement.querySelector('.form__error')) {
				formRequiredItem.parentElement.removeChild(formRequiredItem.parentElement.querySelector('.form__error'));
			}
		},
		formClean(form) {
			form.reset();
			setTimeout(() => {
				let inputs = form.querySelectorAll('input,textarea');
				for (let index = 0; index < inputs.length; index++) {
					const el = inputs[index];
					el.parentElement.classList.remove('_form-focus');
					el.classList.remove('_form-focus');
					formValidate.removeError(el);
				}
				let checkboxes = form.querySelectorAll('.checkbox__input');
				if (checkboxes.length > 0) {
					for (let index = 0; index < checkboxes.length; index++) {
						const checkbox = checkboxes[index];
						checkbox.checked = false;
					}
				}
				if (select) {
					let selects = form.querySelectorAll('.select');
					if (selects.length) {
						for (let index = 0; index < selects.length; index++) {
							const select = selects[index].querySelector('select');
							flsModules.select.selectBuild(select);
						}
					}
				}
				const files = document.querySelectorAll('.file');
				if (files.length) {
					files.forEach(file => {
						const fileInputHidden = file.querySelector('.file__hidden');
						const button = file.querySelector('.file__input');
						button.innerHTML = fileInputHidden.placeholder;
						file.classList.remove('_file-added');
					})
				}
			}, 0);
		},
		emailTest(formRequiredItem) {
			return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(formRequiredItem.value);
		}
	}
	// Отправляем события форм
	function eventStartInput() {
		ym && ym(95071208,'reachGoal','begin');
		gtag && gtag('event', 'input-begin');
		// rstat && rstat('event', 'mbcForm_start_input', {'form_type': 'landing',});
		// rstat4 && rstat4('event', 'mbcForm_start_input', {'form_type': 'landing',});
		LOGGING && console.log(`Сработали события (gtag, ym, rstat, rstat4) на ввод в форму`);
		this.removeEventListener("input", eventStartInput);
	}
	function eventClickSubmitForm() {
		rstat && rstat('event', 'mbcForm_submit', {'form_type': 'landing',});
		rstat4 && rstat4('event', 'mbcForm_submit', {'form_type': 'landing',});
	}
	function eventStartInputFirstName (){
		rstat && rstat('event', 'mbcForm_name_input', {'form_type': 'landing',});
		rstat4 && rstat4('event', 'mbcForm_name_input', {'form_type': 'landing',});
		this.removeEventListener("input", eventStartInputFirstName);
	}
	function eventStartInputLastName (){
		rstat && rstat('event', 'mbcForm_surname_input', {'form_type': 'landing',});
		rstat4 && rstat4('event', 'mbcForm_surname_input', {'form_type': 'landing',});
		this.removeEventListener("input", eventStartInputLastName);
	}
	function eventStartInputEmail (){
		rstat && rstat('event', 'mbcForm_email_input', {'form_type': 'landing',});
		rstat4 && rstat4('event', 'mbcForm_email_input', {'form_type': 'landing',});
		this.removeEventListener("input", eventStartInputEmail);
	}
	function eventStartInputPhone (){
		rstat && rstat('event', 'mbcForm_phone_input', {'form_type': 'landing',});
		rstat4 && rstat4('event', 'mbcForm_phone_input', {'form_type': 'landing',});
		this.removeEventListener("input", eventStartInputPhone);
	}
	function eventPhoneCodeSelect (data){
		rstat && rstat('event', 'mbcForm_phoneCode', { 'text':`+${data.dialCode}`, 'form_type': 'landing',})
		rstat4 && rstat4('event', 'mbcForm_phoneCode', { 'text':`+${data.dialCode}`, 'form_type': 'landing',})
	}
	function eventStartInputTelegram (){
		rstat && rstat('event', 'mbcForm_telegramName', {'form_type': 'landing',});
		rstat4 && rstat4('event', 'mbcForm_telegramName', {'form_type': 'landing',});
		this.removeEventListener("input", eventStartInputTelegram);
	}
	function eventStartInputPhotoFrontPage (){
		rstat && rstat('event', 'mbcForm_photoFrontPage', {'form_type': 'landing',});
		rstat4 && rstat4('event', 'mbcForm_photoFrontPage', {'form_type': 'landing',});
		this.removeEventListener("input", eventStartInputPhotoFrontPage);
	}
	function eventStartInputPhotoRegPage (){
		rstat && rstat('event', 'mbcForm_photoRegPage', {'form_type': 'landing',});
		rstat4 && rstat4('event', 'mbcForm_photoRegPage', {'form_type': 'landing',});
		this.removeEventListener("input", eventStartInputPhotoRegPage);
	}
	function eventStartInputSelfie (){
		rstat && rstat('event', 'mbcForm_selfie', {'form_type': 'landing',});
		rstat4 && rstat4('event', 'mbcForm_selfie', {'form_type': 'landing',});
		this.removeEventListener("input", eventStartInputSelfie);
	}
	function eventStartInputAddress (){
		rstat && rstat('event', 'mbcForm_address', {'form_type': 'landing',});
		rstat4 && rstat4('event', 'mbcForm_address', {'form_type': 'landing',});
		this.removeEventListener("input", eventStartInputAddress);
	}
	function eventStartInputDocumentNumber (){
		rstat && rstat('event', 'mbcForm_documentNumber', {'form_type': 'landing',});
		rstat4 && rstat4('event', 'mbcForm_documentNumber', {'form_type': 'landing',});
		this.removeEventListener("input", eventStartInputDocumentNumber);
	}
	function eventSuccessSubmitForm() {
		ym && ym(94867660, "reachGoal", "submit");
		gtag && gtag("event", "form-submit");
		rstat && rstat('event', 'mbcForm_success', {'form_type': 'landing',});
		rstat4 && rstat4('event', 'mbcForm_success', {'form_type': 'landing',});
		LOGGING && console.log(`Сработали события (gtag, ym, rstat, rstat4) отправки`);

		const url = window.location.pathname;
		if (url.indexOf('en-en') != -1) ym(95071208,'reachGoal','fire-ab-en');
	}
	function eventErrorSubmitForm(errorMessage = 'name') {
		rstat && rstat('event', 'mbcForm_error', {'form_errors':errorMessage, 'form_type': 'landing',});
		rstat4 && rstat4('event', 'mbcForm_error', {'form_errors':errorMessage, 'form_type': 'landing',});
	}

	function addFormData(formData, prop) {
		prop.forEach(prop => {
			if(localStorage.getItem(prop)) formData.append(prop ,localStorage.getItem(prop))
		});
	}
	function addUTM(formData) {
		let url = document.location.href;
		let index = url.indexOf('?utm');
		if(index > 0) {
			let utm = url.substr(index);
			localStorage.setItem('utm', utm);
		}
		// https://gist.github.com/hunty/9b5cfe419d3dbb28e131fd100ce51d77
		// https://formdesigner.ru/blog/form-substitution-depending-on-utm-label.html
	}
	function sendGoogleTabs (form, scriptURL) {
		const formData = new FormData(form)
		addFormData(formData, [ 'userID', 'first-name', 'last-name', 'email', 'phone', 'telegram', 'url', 'utm' ])

		// for(let [name, value] of formData) { console.log(`${name} = ${value}`); }
		// new userID
		const inputs = form.querySelectorAll('.form__input');
		for (const input of inputs) {
			if(input.name == 'address' || input.name == 'documentNumber' || input.name == 'photoFrontPage' || input.name == 'photoRegPage' || input.name == 'selfie') {
				localStorage.setItem('userID', +new Date())
				LOGGING && console.log(`new userID => `, localStorage.getItem('userID'))
				break;
			}
		}

		fetch(scriptURL, { method: 'POST', mode: 'no-cors', body: formData })
			.then( response => {
				LOGGING && console.log('Success! google tabs response =>', response)
				return response.json()
			} )
			.then( responseJSON => {LOGGING && console.log(`result responseJSON => `,responseJSON)} )
			.catch( error => console.error('Error! google tabs', error.message) )
	}
	/* Отправка форм */
	function formInit(options = { validate: true }) {
		const forms = document.forms;
		if (forms.length) {

			if(!localStorage.getItem('userID')) localStorage.setItem('userID', +new Date())

			for (const form of forms) {
				form.addEventListener('submit', function (e) {
					e.preventDefault()
					const form = e.target;
					formSubmitAction(form, e);
				});
				form.addEventListener('input', eventStartInput);
				form.addEventListener('reset', function (e) {
					const form = e.target;
					formValidate.formClean(form);
				});
				const inputs = form.querySelectorAll('input');
				for (const input of inputs) {
					if(input.name == 'first-name') input.addEventListener("input", eventStartInputFirstName);
					if(input.name == 'last-name') input.addEventListener("input", eventStartInputLastName);
					if(input.name == 'email') input.addEventListener("input", eventStartInputEmail);
					if(input.name == 'phone') input.addEventListener("input", eventStartInputPhone);
					if(input.name == 'telegram') input.addEventListener("input", eventStartInputTelegram);
					if(input.name == 'photoFrontPage') input.addEventListener("input", eventStartInputPhotoFrontPage);
					if(input.name == 'photoRegPage') input.addEventListener("input", eventStartInputPhotoRegPage);
					if(input.name == 'selfie') input.addEventListener("input", eventStartInputSelfie);
					if(input.name == 'address') input.addEventListener("input", eventStartInputAddress);
					if(input.name == 'documentNumber') input.addEventListener("input", eventStartInputDocumentNumber);


					// Change chars - ; ' "
					if(input.name != 'phone') {
						input.oninput = function() {
							this.value = this.value.replace(/[;'"]/g, '');
						};
					}
				}
			}
		}
		async function formSubmitAction(form, e) {
			eventClickSubmitForm();

			const error = !form.hasAttribute('data-no-validate') ? formValidate.getErrors(form) : 0;
			if (error === 0) {
				const formAction = form.getAttribute('action') ? form.getAttribute('action').trim() : '#';
				const formMethod = form.getAttribute('method') ? form.getAttribute('method').trim() : 'GET';
				const scriptURL = form.dataset.gapi ? form.dataset.gapi : '#';
				const formData = new FormData(form);

				const inputs = form.querySelectorAll('.form__input');
				for (const input of inputs) {
					// if(input.name == 'first-name') localStorage.setItem('firstName', input.value)
					// if(input.name == 'last-name') localStorage.setItem('lastName', input.value)
					// if(input.name == 'email') localStorage.setItem('email', input.value)
					// if(input.name == 'phone') localStorage.setItem('phone', input.value)
					// if(input.name == 'telegram') localStorage.setItem('telegram', input.value)
					// or
					localStorage.setItem(input.name, input.value)
				}
				addUTM(formData);
				addFormData(formData, [ 'userID', 'first-name', 'last-name', 'email', 'phone', 'telegram', 'url', 'utm' ])
				const ajax = form.hasAttribute('data-ajax');
				if (ajax) { // Если режим ajax
					e.preventDefault();
					form.querySelector('.form__submit').disabled = true

					rstat('getUid') && formData.append('rst-uid', rstat('getUid'));
					rstat4('getUid') && formData.append('rst4-uid', rstat4('getUid'));
					getCookie('_ym_uid') && formData.append('_ym_uid', getCookie('_ym_uid'));
					getCookie('_ga') && formData.append('_ga', getCookie('_ga'));

					form.classList.add('_sending');

					// if (form.dataset.gapi) sendGoogleTabs(form, scriptURL)

					const response = await fetch(formAction, {
						method: formMethod,
						body: formData
					});
					if (response.ok) {
						let responseResult = await response.json();
						form.classList.remove('_sending');
						form.querySelector('.form__submit').disabled = false;
						formSent(form, responseResult);
					} else {
						alert("Ошибка");
						form.classList.remove('_sending');
						form.querySelector('.form__submit').disabled = false;
					}
				} else if (form.hasAttribute('data-dev')) {	// Если режим разработки
					e.preventDefault();
					formSent(form);
				}
			} else {
				e.preventDefault();
				const formError = form.querySelector('._form-error');
				if (formError && form.hasAttribute('data-goto-error')) {
					gotoBlock(formError, true, 1000);
				}

				rstat('event', 'mbcForm_front_error', {
					'form_errors': rstatFormErrorArr,
					'form_type': 'landing'
				})
				rstat4('event', 'mbcForm_front_error', {
					'form_errors': rstatFormErrorArr,
					'form_type': 'landing'
				})
				rstatFormErrorArr = [];
			}
		}
		// Действия после отправки формы
		function formSent(form, responseResult = ``) {
			// Создаем событие отправки формы
			document.dispatchEvent(new CustomEvent("formSent", {
				detail: {
					form: form
				}
			}));

			LOGGING && console.log(`responseResult =>`,responseResult)
			if(form.name == 'order'){
				ym(95071208,'reachGoal','fire1')
				window.location.href = 'form-2.php';
			} else {
				ym(95071208,'reachGoal','fire2')
				setTimeout((() => {
					popup.open("#popup-thank");
				}), 100);
			}
			if (responseResult.send == true) {
				eventSuccessSubmitForm();
			} else {
				eventErrorSubmitForm(responseResult.message);
				alert(responseResult.message)
			}


			// setTimeout(() => {
			// 	popup.close();
			// }, 3000);
			// Очищаем форму
			formValidate.formClean(form);
			// Сообщаем в консоль
			formLogging(responseResult.message);
		}
		function formLogging(message) {
			LOGGING && console.log(`[Формы]: ${message}`);
		}
	}

	/* ================================= END FORM ================================= */




	/* scroll parallax ===================================================================================================================================================================== */
	/* Предмету, который будет двигаться за мышью указать атрибут data-prlx-mouse.
	// =========
	Если нужны дополнительные настройки - указать
	Атрибут											Значение по умолчанию
	-------------------------------------------------------------------------------------------------------------------
	data-prlx-cx="коэффициент_х"					100							значение больше - меньше процент сдвига
	data-prlx-cy="коэффициент_y"					100							значение больше - меньше процент сдвига
	data-prlx-dxr																		против оси X
	data-prlx-dyr																		против оси Y
	data-prlx-a="скорость_анимации"				50								больше значение - больше скорость

	// =========
	Если нужно считывать движение мыши в блоке-родителе - тому родителю указать атрибут data-prlx-mouse-wrapper

	Если в параллаксе картинка - расстянуть ее на >100%.
	Например:
		width: 130%;
		height: 130%;
		top: -15%;
		left: -15%;
	*/
	// class MousePRLX {
	// 	constructor(props, data = null) {
	// 		let defaultConfig = {
	// 			init: true,
	// 			logging: true,
	// 		}
	// 		this.config = Object.assign(defaultConfig, props);
	// 		{
	// 			const paralaxMouse = document.querySelectorAll('[data-prlx-mouse]');
	// 			if (paralaxMouse.length) {
	// 				this.paralaxMouseInit(paralaxMouse);
	// 				this.setLogging(`Проснулся, слежу за объектами: (${paralaxMouse.length})`);
	// 			} else {
	// 				this.setLogging('Нет ни одного объекта. Сплю...zzZZZzZZz...');
	// 			}
	// 		}
	// 	}
	// 	paralaxMouseInit(paralaxMouse) {
	// 		paralaxMouse.forEach(el => {
	// 			const paralaxMouseWrapper = el.closest('[data-prlx-mouse-wrapper]');

	// 			// Коэф. X
	// 			const paramСoefficientX = el.dataset.prlxCx ? +el.dataset.prlxCx : 100;
	// 			// Коэф. У
	// 			const paramСoefficientY = el.dataset.prlxCy ? +el.dataset.prlxCy : 100;
	// 			// Напр. Х
	// 			const directionX = el.hasAttribute('data-prlx-dxr') ? -1 : 1;
	// 			// Напр. У
	// 			const directionY = el.hasAttribute('data-prlx-dyr') ? -1 : 1;
	// 			// Скорость анимации
	// 			const paramAnimation = el.dataset.prlxA ? +el.dataset.prlxA : 50;


	// 			// Объявление переменных
	// 			let positionX = 0, positionY = 0;
	// 			let coordXprocent = 0, coordYprocent = 0;

	// 			setMouseParallaxStyle();

	// 			// Проверяю на наличие родителя, в котором будет считываться положение мыши
	// 			if (paralaxMouseWrapper) {
	// 				mouseMoveParalax(paralaxMouseWrapper);
	// 			} else {
	// 				mouseMoveParalax();
	// 			}

	// 			function setMouseParallaxStyle() {
	// 				const distX = coordXprocent - positionX;
	// 				const distY = coordYprocent - positionY;
	// 				positionX = positionX + (distX * paramAnimation / 1000);
	// 				positionY = positionY + (distY * paramAnimation / 1000);
	// 				el.style.cssText = `transform: translate3D(${directionX * positionX / (paramСoefficientX / 10)}%,${directionY * positionY / (paramСoefficientY / 10)}%,0);`;
	// 				requestAnimationFrame(setMouseParallaxStyle);
	// 			}
	// 			function mouseMoveParalax(wrapper = window) {
	// 				wrapper.addEventListener("mousemove", function (e) {
	// 					const offsetTop = el.getBoundingClientRect().top + window.scrollY;
	// 					if (offsetTop >= window.scrollY || (offsetTop + el.offsetHeight) >= window.scrollY) {
	// 						// Получение ширины и высоты блока
	// 						const parallaxWidth = window.innerWidth;
	// 						const parallaxHeight = window.innerHeight;
	// 						// Ноль по середине
	// 						const coordX = e.clientX - parallaxWidth / 2;
	// 						const coordY = e.clientY - parallaxHeight / 2;
	// 						// Получаем проценты
	// 						coordXprocent = coordX / parallaxWidth * 100;
	// 						coordYprocent = coordY / parallaxHeight * 100;
	// 					}
	// 				});
	// 			}
	// 		});
	// 	}
	// 	// Логгинг в консоль
	// 	setLogging(message) {
	// 		// this.config.logging ? console.log(`[PRLX Mouse]: ${message}`) : null;
	// 	}
	// }
	/* ================================= scroll parallax ==================================================================================================================================== */

	function asyncCSS(href) {
		var css = document.createElement('link');
		css.rel = "stylesheet";
		css.href = href;
		document.head.appendChild(css);
	}



		/*------------------------------------*\
			General Initializations
		\*------------------------------------*/


		if(isMobile.iOS()) document.documentElement.classList.add('iOS');
		// if(!isMobile.iOS()) new WOW().init();



		isWebp();

		useDynamicAdapt();

		headerScroll();

		menuInit();

		langInit();

		const wow = new WOW({
			mobile: false
		})
		wow.init();

		// select = new SelectConstructor({});
		popup = new Popup({});




		const phoneInput = document.getElementById('phone');


		// setTimeout(() => {
		// 	asyncCSS('/assets/css/bg-lights.css');
		// 	asyncCSS('/assets/css/bg-elements.css');


		// 	if (!isMobile.any()) new MousePRLX({});

		// }, 3000);

		if (phoneInput) {

			setTimeout(() => {
				window.intlTelInput(phoneInput ,{
					separateDialCode: true,
					initialCountry: "auto",
					preferredCountries: ["us", "bd", "np", "hi", "lk", "ma", "br", "eg"],
					strictMode: true,
					geoIpLookup: callback => {
						fetch("https://ipapi.co/json")
						.then(res => res.json())
						.then(data => callback(data.country_code))
						.catch(() => callback("us"));
					},

					// autoPlaceholder: 'aggressive',
					// formatOnDisplay: true,
					// customPlaceholder:function(selectedCountryPlaceholder,selectedCountryData){
					// 	console.log(`selectedCountryPlaceholder => `,selectedCountryPlaceholder)
					//     return ''+selectedCountryPlaceholder.replace(/[0-9]/g,'X');
					// },

					// utilsScript: "libs/intl-tel-input@18.2.1/utils.js",
					utilsScript: "/assets/libs/intl-tel-input@18.2.1/utils.js",
					// utilsScript: "https://cdn.jsdelivr.net/npm/intl-tel-input@18.2.1/build/js/utils.js",
					// autoPlaceholder: "off",
				});
				const iti = window.intlTelInputGlobals.getInstance(phoneInput);
				phoneInput.addEventListener("countrychange", function(e) {
					let selectedCountryData = iti.getSelectedCountryData();

					let newPlaceholder = intlTelInputUtils.getExampleNumber(selectedCountryData.iso2, true, intlTelInputUtils.numberFormat.INTERNATIONAL);

					if(selectedCountryData.iso2 == 'ru') {
						newPlaceholder = newPlaceholder.replace(/^8/,'');
						// console.log(`newPlaceholder => `,newPlaceholder)
					}

					iti.setNumber("");

					mask = newPlaceholder.replace(/[0-9]/g, "9");

					// console.log(`mask => `,mask)
					Inputmask({
						mask: mask,
						// placeholder: '+',
						showMaskOnHover: false,
						showMaskOnFocus: false,
					}).mask(phoneInput)

					eventPhoneCodeSelect(selectedCountryData)
				});
			}, 4e3);
		}

		const galleryList = document.querySelectorAll('.gallery__list.swiper')
		if(galleryList.length) {
			for (const gallery of galleryList) {
				let gallerySlider;
				const breakpoint = window.matchMedia('(min-width: 1200px)');

				const enableGallerySlider = () => {
					gallerySlider = new Swiper(gallery, {
						slidesPerView: 2,
						spaceBetween: 15,
						breakpoints: {
							576: {
								slidesPerView: 2,
								spaceBetween: 20,
							},
							768: {
								slidesPerView: 3,
								spaceBetween: 50,
							},
							992: {
								slidesPerView: 3,
								spaceBetween: 50,
							}
						}
					})
				}


				const checkinScreenResolution = (isDesktop) => {
					!isDesktop
						? enableGallerySlider()
						: gallerySlider && gallerySlider.destroy(true, true)
				}
				checkinScreenResolution(breakpoint.matches)
				breakpoint.addEventListener('change', function(e) {checkinScreenResolution(e.matches)})
			}

		}

		formInit();
		// popup.open('#popup-thank')

	})
