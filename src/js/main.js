import Swiper from 'swiper';
import * as bootstrap from 'bootstrap';
import { Navigation } from 'swiper/modules';
import 'swiper/css';

const swiperEnterprise = document.querySelector('.swiper-enterprise');
if (swiperEnterprise) {
    const prevEl = document.getElementById('entSelectLeft');
    const nextEl = document.getElementById('entSelectRight');

    if (!prevEl || !nextEl) {
        console.warn('Navigation elements not found');
    }

    new Swiper('.swiper-enterprise', {
        direction: 'horizontal',
        slidesPerView: 3,
        spaceBetween: 20,
        modules: [Navigation],
        loop: true,
        navigation: {
            prevEl: prevEl || null,
            nextEl: nextEl || null,
        },
        breakpoints: {
            320: {
                slidesPerView: 1,
                spaceBetween: 20
            },
            640: {
                slidesPerView: 2,
                spaceBetween: 20
            },
            920: {
                slidesPerView: 3,
                spaceBetween: 60
            }
        }
    });
}

const swiperBrand = document.querySelector('.swiper-brand');
if (swiperBrand) {
    const swiper = new Swiper('.swiper-brand', {
        direction: 'horizontal',
        slidesPerView: 5,
        centeredSlides: true,
        spaceBetween: 60,
        loop: true,
        breakpoints: {
            320: {
                slidesPerView: 2,
                spaceBetween: 20
            },
            640: {
                slidesPerView: 3,
                spaceBetween: 20
            },
            768: {
                slidesPerView: 4,
                spaceBetween: 30
            },
            920: {
                slidesPerView: 5,
                spaceBetween: 60
            }
        }
    });

    function updateSlidesOpacity() {
        const activeIndex = swiper.activeIndex;

        swiper.slides.forEach((slideEl, idx) => {
            const diff = idx - activeIndex;
            let opacity = 0;

            if (diff === 0 || diff === 1) {
                opacity = 1; // Центральные
            } else if (diff === -1 || diff === 2) {
                opacity = 0.8; // Ближе к центру
            } else if (diff === -2 || diff === 3) {
                opacity = 0.3; // Крайние
            }

            slideEl.style.opacity = opacity.toString();
        });
    }

    updateSlidesOpacity();
    swiper.on('slideChange', updateSlidesOpacity);
}