;
$(document).ready(function() {

    //карта
    ! function(e, t, n) {
        function r() {
            for (; u[0] && "loaded" == u[0][l];) o = u.shift(), o[f] = !a.parentNode.insertBefore(o, a)
        }
        for (var i, s, o, u = [], a = e.scripts[0], f = "onreadystatechange", l = "readyState"; i = n.shift();) s = e.createElement(t), "async" in a ? (s.async = !1, e.head.appendChild(s)) : a[l] ? (u.push(s), s[f] = r) : e.write("<" + t + ' src="' + i + '" defer></' + t + ">"), s.src = i
    }(document, "script", ["https://maps.googleapis.com/maps/api/js?key=AIzaSyAdzwz73OHrdVGjKVKow8ID8T31yNxiBSI", "js/map.js"]);

    // фіксоване меню
    $(window).scroll(function() {
        hfixed();
    });

    function hfixed() {
        if ($(window).scrollTop() > 196) {
            $('.header').addClass('h-fixed');
        } else {
            $('.header').removeClass('h-fixed');
        }
    };

    //скролл меню
    $('.mena, .log, .logo').click(function(e) {
        e.preventDefault();
        $("html, body").animate({
            scrollTop: $($(this).attr('href')).offset().top
        }, 2000);
    });


    //popap

    $('.btn_zz').click(function(e) {
        e.preventDefault();
        $('#pop').arcticmodal();
    });

    $('.table').click(function(e) {
        e.preventDefault();
        $('#sps').arcticmodal('close');
        $('#pop').arcticmodal();
    });
    $('.close').click(function() {
        $(this).parent().arcticmodal('close');
    });

    //
    $('#pop .chek a').click(function(e) {
        e.preventDefault();
        $('#pop .chek a').removeClass('active');
        $(this).addClass('active');
        if ($(this).hasClass('active')) {
            $('.smoke-valid').val($(this).data('event'));
        }
    });

    //гео, валидация
    function getURLParameter(name) {
        return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [, ""])[1].replace(/\+/g, '%20')) || null;
    }

    function run_geo(geo_url) {
        $.ajax({
            type: 'GET',
            url: geo_url,
            dataType: 'xml',
            success: function(xml) {
                $(xml).find('ip').each(function() {
                    var city = $(this).find('city').text();
                    var region = $(this).find('region').text();
                    if (city != region) {
                        var ipg = city + ', ' + region;
                    } else {
                        var ipg = city;
                    }
                    $('<input type="hidden" />').attr({
                        name: 'location',
                        class: 'location',
                        value: ipg
                    }).appendTo("form");
                });
            }
        });
    }
    $.get("http://ipinfo.io", function(response) {
        geo_url = 'http://ipgeobase.ru:7020/geo?ip=' + response.ip;
        run_geo(geo_url);
    }, "jsonp");
    utm = [];
    $.each(["utm_source", "utm_medium", "utm_campaign", "utm_term", 'source_type', 'source', 'position_type', 'position', 'added', 'creative', 'matchtype'], function(i, v) {
        $('<input type="hidden" />').attr({
            name: v,
            class: v,
            value: function() {
                if (getURLParameter(v) == undefined) return '-';
                else return getURLParameter(v)
            }
        }).appendTo("form")
    });
    $('<input type="hidden" />').attr({
        name: 'url',
        value: document.location.href
    }).appendTo("form");
    $('<input type="hidden" />').attr({
        name: 'title',
        value: document.title
    }).appendTo("form");

    $('input[name="name"]').blur(function() {
        if ($(this).val().length < 2) {
            $(this).addClass('error-input');
        }
    });
    $('input[name="name"]').focus(function() {
        $(this).removeClass('error-input');
    });

    $('input[name="phone"]').mask('+7 (999) 999-99-99');
    $('input[name="phone"]').blur(function() {
        if ($(this).val().length != 18) {
            $(this).addClass('error-input');
        }
    });
    $('input[name="phone"]').focus(function() {
        $(this).removeClass('error-input');
    });

    function validateEmail(email) {
        var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
        return re.test(email);
    };

    /*
    $('input[name="email"]').blur(function() {
        if (!validateEmail($(this).val())) {
            $(this).addClass('error-input');
        }
    });

    $('input[name="email"]').focus(function() {
        $(this).removeClass('error-input');
    });
    */

    //отправка формы
    $('form').submit(function(e) {
        e.preventDefault();
        $(this).find('input[type="text"]').trigger('blur');
        if (!$(this).find('input[type="text"]').hasClass('error-input') && $(this).find('input[name="email"]').hasClass('error-input')) {
            var type = $(this).attr('method');
            var url = $(this).attr('action');
            var data = $(this).serialize();
            var track_event = $(this).find('input[name="event"]').val();
            $.ajax({
                type: type,
                url: url,
                data: data,
                success: function() {
                    $.arcticmodal('close');
                    $('#sps').arcticmodal();
                    //submit_track_event(track_event);
                }
            });
        } else {

            var eror_pop_text = '';

            if ($(this).find('input[name="name"]').hasClass('error-input') && !$(this).find('input[name="phone"]').hasClass('error-input')) {
                eror_pop_text = 'Пожалуйста введите имя';
            } else

            if ($(this).find('input[name="phone"]').hasClass('error-input') && !$(this).find('input[name="name"]').hasClass('error-input')) {
                eror_pop_text = 'Пожалуйста введите телефон';
            } else

            if ($(this).find('input[name="phone"]').hasClass('error-input') && $(this).find('input[name="name"]').hasClass('error-input')) {
                eror_pop_text = 'Пожалуйста введите имя и телефон';
            }

            /*

            if ($(this).find('input[name="name"]').hasClass('error-input') && !$(this).find('input[name="phone"]').hasClass('error-input') && !$(this).find('input[name="email"]').hasClass('error-input')) {
                eror_pop_text = 'Пожалуйста введите имя';
            } else

            if ($(this).find('input[name="phone"]').hasClass('error-input') && !$(this).find('input[name="name"]').hasClass('error-input') && !$(this).find('input[name="email"]').hasClass('error-input')) {
                eror_pop_text = 'Пожалуйста введите телефон';
            } else

            if ($(this).find('input[name="email"]').hasClass('error-input') && !$(this).find('input[name="name"]').hasClass('error-input') && !$(this).find('input[name="phone"]').hasClass('error-input')) {
                eror_pop_text = 'Пожалуйста введите почту';
            } else

            if ($(this).find('input[name="phone"]').hasClass('error-input') && $(this).find('input[name="name"]').hasClass('error-input') && !$(this).find('input[name="email"]').hasClass('error-input')) {
                eror_pop_text = 'Пожалуйста введите имя и телефон';
            } else

            if ($(this).find('input[name="name"]').hasClass('error-input') && !$(this).find('input[name="phone"]').hasClass('error-input') && $(this).find('input[name="email"]').hasClass('error-input')) {
                eror_pop_text = 'Пожалуйста введите имя и почту';
            } else

            if ($(this).find('input[name="phone"]').hasClass('error-input') && !$(this).find('input[name="name"]').hasClass('error-input') && $(this).find('input[name="email"]').hasClass('error-input')) {
                eror_pop_text = 'Пожалуйста введите телефон и почту';
            } else

            if ($(this).find('input[name="phone"]').hasClass('error-input') && $(this).find('input[name="name"]').hasClass('error-input') && $(this).find('input[name="email"]').hasClass('error-input')) {
                eror_pop_text = 'Пожалуйста введите имя, телефон и почту';
            }

            */

            $('#form-error-text').html(eror_pop_text)
            $('#form-error-pop').arcticmodal();
        }
    });

    //слайдери

    slider1 = $('.sec1 .slidw .slider#sld1').bxSlider({
        infiniteLoop: true,
        controls: false,
        pager: false,
        speed: 500,
        pause: 10000,
        auto: true,
        minSlides: 1,
        maxSlides: 1,
        moveSlides: 1,
        onSlideNext: function($slideElement, oldIndex, newIndex) {
            $('.sec1 .slidw .slider#sld1 .slid').removeClass('active');
            $('.sec1 .slidw .slider#sld1 .slid[data-sld="' + newIndex + '"]').addClass('active');
        },
        onSlidePrev: function($slideElement, oldIndex, newIndex) {
            $('.sec1 .slidw .slider#sld1 .slid').removeClass('active');
            $('.sec1 .slidw .slider#sld1 .slid[data-sld="' + newIndex + '"]').addClass('active');
        },
        onSliderLoad: function() {
            $('.sec1 .slidw .slider#sld1 .slid.active.bx-clone').removeClass('active');
            $('.sec1').addClass('loaded-slider');
        }

    });
    $('.sec1 .prev').click(function(e) {
        e.preventDefault();
        slider1.goToPrevSlide();
    });
    $('.sec1 .next').click(function(e) {
        e.preventDefault();
        slider1.goToNextSlide();
    });

    slider2 = $('.sec2 .slidw.desk .slider#sld2d').bxSlider({
        infiniteLoop: true,
        controls: false,
        pager: false,
        speed: 500,
        pause: 6000,
        auto: true,
        minSlides: 1,
        maxSlides: 2,
        moveSlides: 1,
        slideWidth: 470,
        onSlideNext: function($slideElement, oldIndex, newIndex) {
            $('.sec2 .slidw.desk .slider#sld2d .slid').removeClass('active');
            $('.sec2 .slidw.desk .slider#sld2d .slid[data-sld="' + (oldIndex - 1) + '"]').removeClass('active');
            $('.sec2 .slidw.desk .slider#sld2d .slid[data-sld="' + newIndex + '"]').addClass('active');
            $('.sec2 .slidw.desk .slider#sld2d .slid[data-sld="' + (newIndex + 1) + '"]').addClass('active');
        },
        onSlidePrev: function($slideElement, oldIndex, newIndex) {
            $('.sec2 .slidw.desk .slider#sld2d .slid').removeClass('active');
            $('.sec2 .slidw.desk .slider#sld2d .slid[data-sld="' + oldIndex + '"]').addClass('active');
            $('.sec2 .slidw.desk .slider#sld2d .slid[data-sld="' + (oldIndex + 1) + '"]').removeClass('active');
            $('.sec2 .slidw.desk .slider#sld2d .slid[data-sld="' + newIndex + '"]').addClass('active');
        },
        onSliderLoad: function() {
            $('.sec2 .slidw.desk .slider#sld2d .slid.active.bx-clone').removeClass('active');
        }

    });

    $('.sec2 .prev').click(function(e) {
        e.preventDefault();
        slider2.goToPrevSlide();
    });

    $('.sec2 .next').click(function(e) {
        e.preventDefault();
        slider2.goToNextSlide();
    });

    slider2m = $('.sec2 .slidw.mobi .slider#sld2m').bxSlider({
        infiniteLoop: true,
        controls: false,
        pager: false,
        speed: 500,
        pause: 6000,
        auto: true,
        minSlides: 1,
        maxSlides: 1,
        moveSlides: 1,
        slideWidth: 470,
        onSlideNext: function($slideElement, oldIndex, newIndex) {
            $('.sec2 .slidw.mobi .slider#sld2m .slid').removeClass('active');
            $('.sec2 .slidw.mobi .slider#sld2m .slid[data-sld="' + newIndex + '"]').addClass('active');
        },
        onSlidePrev: function($slideElement, oldIndex, newIndex) {
            $('.sec2 .slidw.mobi .slider#sld2m .slid').removeClass('active');
            $('.sec2 .slidw.mobi .slider#sld2m .slid[data-sld="' + newIndex + '"]').addClass('active');
        },
        onSliderLoad: function() {
            $('.sec2 .slidw.mobi .slider#sld2m .slid.active.bx-clone').removeClass('active');
        }

    });

    $('.sec2 .prev').click(function(e) {
        e.preventDefault();
        slider2m.goToPrevSlide();
    });

    $('.sec2 .next').click(function(e) {
        e.preventDefault();
        slider2m.goToNextSlide();
    });


    /*
    slider3 = $('#sld3').bxSlider({
        infiniteLoop: true,
        pager: true,
        pagerCustom: '#pgc3',
        controls: false,
        auto: true,
        speed: 400
    });
    slider4 = $('#sld4').bxSlider({
        infiniteLoop: true,
        pager: true,
        pagerCustom: '#pgc4',
        controls: false,
        auto: true,
        speed: 400
    });
    slider5 = $('#sld5').bxSlider({
        infiniteLoop: true,
        pager: true,
        pagerCustom: '#pgc5',
        controls: false,
        auto: true,
        speed: 400
    });
    
    slider6 = $('#sld6').bxSlider({
        infiniteLoop: true,
        pager: true,
        pagerCustom: '#pgc6',
        pagerType: 'short',
        controls: false,
        auto: true,
        slideWidth: 720,
        speed: 400
    });
    */

    slider6 = $('.sec6 .slidw .slider#sld6').bxSlider({
        infiniteLoop: true,
        controls: false,
        pager: true,
        pagerCustom: '#pgc6',
        pagerType: 'short',
        speed: 500,
        pause: 10000,
        auto: true,
        minSlides: 1,
        maxSlides: 1,
        moveSlides: 1,
        slideWidth: 720,
        onSlideNext: function($slideElement, oldIndex, newIndex) {
            $('.sec6 .slidw .slider#sld6 .slid').removeClass('active');
            $('.sec6 .slidw .slider#sld6 .slid[data-sld="' + newIndex + '"]').addClass('active');
        },
        onSlidePrev: function($slideElement, oldIndex, newIndex) {
            $('.sec6 .slidw .slider#sld6 .slid').removeClass('active');
            $('.sec6 .slidw .slider#sld6 .slid[data-sld="' + newIndex + '"]').addClass('active');
        },
        onSliderLoad: function() {
            $('.sec6 .slidw .slider#sld6 .slid.active.bx-clone').removeClass('active');
            $('.sec6').addClass('loaded-slider');
        }

    });
    $('.sec6 .prev').click(function(e) {
        e.preventDefault();
        slider6.goToPrevSlide();
    });

    $('.sec6 .next').click(function(e) {
        e.preventDefault();
        slider6.goToNextSlide();
    });

    slider7 = $('.sec7 .slidw .slider#sld7').bxSlider({
        infiniteLoop: true,
        controls: false,
        pager: false,
        speed: 500,
        pause: 6000,
        auto: true,
        minSlides: 1,
        maxSlides: 1,
        moveSlides: 1,
        slideWidth: 940,
        onSlideNext: function($slideElement, oldIndex, newIndex) {
            $('.sec7 .slidw .slider#sld7 .slid').removeClass('active');
            $('.sec7 .slidw .slider#sld7 .slid[data-sld="' + newIndex + '"]').addClass('active');
        },
        onSlidePrev: function($slideElement, oldIndex, newIndex) {
            $('.sec7 .slidw .slider#sld7 .slid').removeClass('active');
            $('.sec7 .slidw .slider#sld7 .slid[data-sld="' + newIndex + '"]').addClass('active');
        },
        onSliderLoad: function() {
            $('.sec7 .slidw .slider#sld7 .slid.active.bx-clone').removeClass('active');
            $('.sec7').addClass('loaded-slider');
        }

    });

    $('.sec7 .prev').click(function(e) {
        e.preventDefault();
        slider7.goToPrevSlide();
    });

    $('.sec7 .next').click(function(e) {
        e.preventDefault();
        slider7.goToNextSlide();
    });

    $('#timet').timepicker({
        'minTime': '9:00am',
        'maxTime': '11:00pm'
    });
    $('#timet').on('changeTime', function() {
        $('.time-valid').val($(this).val());
    });
});
