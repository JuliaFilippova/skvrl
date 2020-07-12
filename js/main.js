window.addEventListener('DOMContentLoaded', () => {
    // hamburger menu
    function burgerMenu(selector) {
        var menu = document.querySelector(selector),
            buttonMenu = document.querySelector('.burger-menu__btn');

        buttonMenu.addEventListener('click', (e) => {
            if (e.target) {
                e.preventDefault();
            }
            menu.classList.toggle('burger-menu__active');
            document.body.classList.toggle('overflow-hidden');
        });

        document.querySelector('.menu-mobile').onclick = (e) => {
            if (e.target.classList.contains('menu-mobile')) {
                menu.classList.remove('burger-menu__active');
                document.body.classList.remove('overflow-hidden');
            }
        }
    }
    burgerMenu('.burger-menu');

    // отложенная загрузка
    window.onload = function () {

        // menu mobile
        var slinky = $('.js-menu').slinky({
            title: true,
            speed: 900,
        });

        // загружаем карту, только после всей загрузки стр, и если она есть на странице
        setTimeout(function () {
            if (document.getElementById('map')) {
                document.getElementById('map')
                    .src = 'https://yandex.ru/map-widget/v1/?um=constructor%3A516cf7cf913fa7a322bcd6b19b2bf82b4a28e3cc60cceec965c5b0bbd6e20a6c&amp;source=constructor';
            }
        }, 50);

        // лайтбокс галерея загружаем если есть на странице
        if (document.getElementById('lightgallery')) {
            document.getElementById('lightgallery')
                lightGallery(document.getElementById('lightgallery'));
        }
        if (document.getElementById('lightgalleryCard')) {
            document.getElementById('lightgalleryCard')
                lightGallery(document.getElementById('lightgalleryCard'));
        }
    };

    // маска для ввода телефона
    document.querySelectorAll('.phone-mask').forEach(item => {
        IMask(item, {
            mask: '+{7} (000) 000-00-00'
        });
    })

    // плавная прокрутка до якоря
    // собираем все якоря; устанавливаем время анимации и количество кадров
    const anchors = [].slice.call(document.querySelectorAll('a[data-scroll]')),
        animationTime = 500,
        framesCount = 50;
    anchors.forEach(function (item) {
        // каждому якорю присваиваем обработчик события
        item.addEventListener('click', function (e) {
            e.preventDefault();

            // для каждого якоря берем соответствующий ему элемент и определяем его координату Y
            let coordY = document.querySelector(item.getAttribute('href')).getBoundingClientRect().top + window.pageYOffset;
            // запускаем интервал, в котором
            let scroller = setInterval(function () {
                // считаем на сколько скроллить за 1 такт
                let scrollBy = coordY / framesCount;
                // если к-во пикселей для скролла за 1 такт больше расстояния до элемента
                // и дно страницы не достигнуто
                if (scrollBy > window.pageYOffset - coordY && window.innerHeight + window.pageYOffset < document.body.offsetHeight) {
                    // то скроллим на к-во пикселей, которое соответствует одному такту
                    window.scrollBy(0, scrollBy);
                } else {
                    // иначе добираемся до элемента и выходим из интервала
                    window.scrollTo(0, coordY);
                    clearInterval(scroller);
                }
                // время интервала равняется частному от времени анимации и к-ва кадров
            }, animationTime / framesCount);
        });
    });

})