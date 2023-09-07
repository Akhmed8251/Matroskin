document.addEventListener("DOMContentLoaded", () => {
    const menuIcon = document.querySelector(".menu__icon")
    const menu = document.querySelector(".menu")
    menuIcon.addEventListener("click", () => {
        document.body.classList.toggle("no-scroll")
        menu.classList.toggle("active")
    })

    const menuItemsWithSubmenu = document.querySelectorAll(".has-submenu")
    menuItemsWithSubmenu.forEach(menuItem => {
        menuItem.addEventListener("click", () => {
            menuItem.classList.toggle("open")

            let submenu = menuItem.querySelector(".submenu") 
            if (menuItem.classList.contains("open")) {
                submenu.style.maxHeight = submenu.scrollHeight + 'px';
            } else {
                submenu.style.maxHeight = null;
            }
        })
    })    

    let tabs = document.querySelectorAll('.tab')
    tabs.forEach(tab => {
        tab.addEventListener('click', function(e) {
            e.preventDefault()
            for (let sibling of e.target.parentNode.children) {
                sibling.classList.remove('tab--active')
            }
            for (let sibling of e.target.closest('.tabs-wrapper').parentNode.children) {
                if (sibling.classList.contains('tabs-container')) {
                    sibling.querySelectorAll('.tabs-content').forEach(content => {
                        content.classList.remove('tabs-content--active')
                    });
                }
            }
            e.target.classList.add('tab--active')
            document.querySelector(e.target.getAttribute('href')).classList.add('tabs-content--active')
        })
    })

    const popularGoodsSlider = new Swiper(".popular-goods__slider", {
        spaceBetween: 20,
        navigation: {
            nextEl: ".popular-goods .swiper-arrow--next",
            prevEl: ".popular-goods .swiper-arrow--prev"
        },
        breakpoints: {
            320: {
                slidesPerView: 1.75
            },
            360: {
                slidesPerView: 2.2
            },
            576: {
                slidesPerView: 3,
                spaceBetween: 10
            },
            993: {
                slidesPerView: 4
            }
        }
    })

    const counters = document.querySelectorAll(".counter")
    counters.forEach(counter => {
        const counterAdd = counter.querySelector(".counter__add")
        const counterSubstract = counter.querySelector(".counter__substract")
        const counterCount = counter.querySelector(".counter__count")

        counterAdd.addEventListener("click", () => {
            counterCount.textContent = parseInt(counterCount.textContent) + 1    
        })
        counterSubstract.addEventListener("click", () => {
            counterCount.textContent = parseInt(counterCount.textContent) > 1 ? parseInt(counterCount.textContent) - 1 : 1    
        })
    })

    const favoriteBtns = document.querySelectorAll(".goods-slide__favorite")
    favoriteBtns.forEach(favBtn => {
        favBtn.addEventListener("click", () => {
            favBtn.classList.toggle("active")
        })
    })

    const stocksSlider = new Swiper(".stocks__slider", {
        spaceBetween: 20,
        navigation: {
            nextEl: ".swiper-arrow--next",
            prevEl: ".swiper-arrow--prev"
        },
        breakpoints: {
            375: {
                slidesPerView: 2
            },
            576: {
                slidesPerView: 1
            },
            769: {
                slidesPerView: 2
            },
            1025: {
                slidesPerView: 3
            },
            1201: {
                slidesPerView: 2
            }
        }
    })

    // let map;

    // main();
    // async function main() {
    //     // Промис `ymaps3.ready` будет зарезолвлен, когда загрузятся все компоненты API
    //     await ymaps3.ready;

    //     // Создание карты
    //     map = new ymaps3.YMap(document.getElementById('map'), {
    //         location: {
    //             // Координаты центра карты
    //             // Порядок по умолчанию: «долгота, широта»
    //             center: [55.205247, 25.077816],

    //             // Уровень масштабирования
    //             // Допустимые значения: от 0 (весь мир) до 21.
    //             zoom: 10
    //         }
    //     });

    //     // Добавляем слой для отображения схематической карты
    //     map.addChild(new ymaps3.YMapDefaultSchemeLayer());
    // }
    ymaps.ready(function () {
        var myMap = new ymaps.Map('map', {
                center: [60.9391, 76.5926],
                zoom: 13
            }, {
                searchControlProvider: 'yandex#search'
            })
    
            let myPlacemarkOmsk = new ymaps.Placemark([60.937557, 76.563295], {
                iconLayout: "default#image",
                iconImageHref: "../img/placemark.svg",
                iconImageSize: [36, 44],
                iconImageOffset: [0, 0]
            })
    
            let myPlacemarkSouz = new ymaps.Placemark([60.936617, 76.622736], {
                iconLayout: "default#image",
                iconImageHref: "../img/placemark.svg",
                iconImageSize: [36, 44],
                iconImageOffset: [0, 0]
            })

            let myPlacemarkNorthStreet = new ymaps.Placemark([60.949609, 76.610187], {
                iconLayout: "default#image",
                iconImageHref: "../img/placemark.svg",
                iconImageSize: [36, 44],
                iconImageOffset: [0, 0]
            })
    
        myMap.geoObjects
            .add(myPlacemarkOmsk)
            .add(myPlacemarkSouz)
            .add(myPlacemarkNorthStreet);
    });

    const newsSlider = new Swiper(".news__slider", {     
        spaceBetween: 20,
        navigation: {
            nextEl: ".swiper-arrow--next",
            prevEl: ".swiper-arrow--prev"
        },
        breakpoints: {
            320: {
                slidesPerView: 1.5
            },
            576: {
                slidesPerView: 2.55
            },
            769: {
                slidesPerView: 3
            },
            1025: {
                slidesPerView: 4
            }
        }
    })

    IMask(
        document.querySelector('.registration__input'),
        {
          mask: '+7 000 000-00-00'
        }
    )
})