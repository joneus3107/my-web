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

(function () {
  var $window = $(window);
  var $header = $('#header');
  var $main = $('#main');
  var $headerTopWrap = $('#js-header-top-wrap');
  var $headerTop = $('#js-header-top');
  var $headerGlobalMenu = $('#js-header-globalmenu');
  var $headerSubMenu = $('#js-header-submenu');
  var className = {
    fixed: 'is-fixed'
  };
  var prevScroll = $window.scrollTop();
  var prevWindowWidth = $(window).width();
  var isPinned = false;

  if($window.width() > 768){
    var isSpView = function () {
      return window.matchMedia('(max-width: 767px)').matches;
    };
  
    var updateHeader = function () {
      var status = {
        up: 0,
        down: 1
      };
      var direction;
      var headerTop = 0;
  
      if ($window.scrollTop() <= 0) {
        isPinned = false;
      }
      else if ($window.scrollTop() >= 0 && prevScroll > $window.scrollTop()) {
        direction = status.up;
      }
      else if ($window.scrollTop() >= 0 && prevScroll < $window.scrollTop()) {
        direction = status.down;
      }
  
      if (0 <= $window.scrollTop() && $window.scrollTop() < $headerTopWrap.outerHeight() && isPinned === false) {
        headerTop = -1 * $(window).scrollTop();
      }
      else {
        if (direction === status.up) {
          headerTop = Math.min(0, parseInt($header.css('top'), 10) - $(window).scrollTop() + prevScroll);
          isPinned = true;
          console.log(5);
        }
        else if (direction === status.down) {
          headerTop = Math.max(-1 * $headerTopWrap.outerHeight(), parseInt($header.css('top'), 10) - $(window).scrollTop() + prevScroll);
          console.log(headerTop);
        }
      }
      $header.css({
        top: headerTop
      });
  
      prevScroll = $window.scrollTop();
    };
  
    var onResize = function () {
      if (prevWindowWidth !== $(window).width()) {
        prevWindowWidth = $(window).width();
        updateHeader();
      }
    };
  
    $window.on('resize', onResize.bind(this));
    $window.on('load scroll', updateHeader.bind(this));
  } else {
    $header.css({
      top: 0
    });
  }

}());
