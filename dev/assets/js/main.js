$(document).ready( function(){
    check_height ()
    $(window).resize(function(){
        check_height()
    })

    $('.p-memberApplicate__list li > h4').click(function(){
        $(this).parent().find('p').slideToggle()
    })

    $('.c-header__navBar').click(function(){
        $('.c-header').toggleClass('is-active')
    })

    $('.l-child-page__spBar').click(function(){
        $('.l-child-page__aside').toggleClass('is-active')
    })
    AOS.init();
})

function check_height () {
    $('.c-page-menu img').matchHeight();
    $('.c-page-menu span').matchHeight({
        byRow: false,
    });
    $('.p-top1__item--line-1 .c-box__image').matchHeight({
        byRow: false,
    })
    $('.p-top1__item--line-2 .c-box__image').matchHeight({
        byRow: false,
    })
    $('.p-top1__item--line-1 .c-box p').matchHeight({
        byRow: false,
    })
    $('.p-top1__item--line-2 .c-box p').matchHeight({
        byRow: false,
    })
}