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
$('.mena').click(function(e) {
    e.preventDefault();
    $("html, body").animate({
        scrollTop: $($(this).attr('href')).offset().top
    }, 2000);
});

/*

//гео, валидация
function getURLParameter(name) {return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20'))||null;} 
    function run_geo(geo_url){
        $.ajax({type: 'GET',url: geo_url,dataType: 'xml',
            success: function(xml) {$(xml).find('ip').each(function(){
            var city = $(this).find('city').text();
            var region = $(this).find('region').text();
            if(city!=region){var ipg = city+', '+region;}else{var ipg = city;}
            $('<input type="hidden" />').attr({name: 'location', class: 'location', value:ipg}).appendTo("form");
        });}});
    }
    $.get("http://ipinfo.io", function(response) {geo_url='http://ipgeobase.ru:7020/geo?ip='+response.ip; run_geo(geo_url);}, "jsonp");
    utm=[];$.each(["utm_source","utm_medium","utm_campaign","utm_term",'source_type','source','position_type','position','added','creative','matchtype'],function(i,v){$('<input type="hidden" />').attr({name: v, class: v, value: function(){if(getURLParameter(v) == undefined)return '-'; else return getURLParameter(v)}}).appendTo("form")});
    $('<input type="hidden" />').attr({name: 'url', value: document.location.href}).appendTo("form");
    $('<input type="hidden" />').attr({name: 'title', value: document.title}).appendTo("form");

$('input[name="name"]').blur(function() {if($(this).val().length < 2) {$(this).addClass('error-input');}});
$('input[name="name"]').focus(function() {$(this).removeClass('error-input');});

$('input[name="phone"]').mask('+7 (999) 999-99-99');
$('input[name="phone"]').blur(function() {if($(this).val().length != 18) {$(this).addClass('error-input');}});
$('input[name="phone"]').focus(function() {$(this).removeClass('error-input');});

function validateEmail(email) {var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;return re.test(email);};

$('input[name="email"]').blur(function() {if(!validateEmail($(this).val())) {$(this).addClass('error-input');}});
$('input[name="email"]').focus(function() {$(this).removeClass('error-input');});

//отправка формы
$('form').submit(function(e){
        e.preventDefault();
        $(this).find('input[type="text"]').trigger('blur');
        if(!$(this).find('input[type="text"]').hasClass('error-input')){
            var type=$(this).attr('method');
            var url=$(this).attr('action');
            var data=$(this).serialize();
            var track_event=$(this).find('input[name="event"]').val();
            $.ajax({type: type, url: url, data: data,
                success : function(){
                    $.arcticmodal('close');$('#sps').arcticmodal();
                    //submit_track_event(track_event);
                }
            }); 
        }else{

            var eror_pop_text = '';

            if ($(this).find('input[name="name"]').hasClass('error-input') && !$(this).find('input[name="phone"]').hasClass('error-input')) {
                eror_pop_text = 'Пожалуйста введите имя';
            } else

            if($(this).find('input[name="phone"]').hasClass('error-input') && !$(this).find('input[name="name"]').hasClass('error-input')){
                eror_pop_text = 'Пожалуйста введите телефон';
            }else

            if($(this).find('input[name="phone"]').hasClass('error-input') && $(this).find('input[name="name"]').hasClass('error-input')){
                eror_pop_text = 'Пожалуйста введите имя и телефон';
            }

            $('#form-error-text').html(eror_pop_text)
            $('#form-error-pop').arcticmodal();
        }
    });
*/

//слайдери


slider1 = $('#sld1').bxSlider({
    pager: true,
    pagerCustom: false,
    controls: false,
    auto: false,
    speed: 400
});
$('.sec1 .prev').click(function(e) {
    e.preventDefault();
    slider1.goToPrevSlide();
});
$('.sec1 .next').click(function(e) {
    e.preventDefault();
    slider1.goToNextSlide();
});
