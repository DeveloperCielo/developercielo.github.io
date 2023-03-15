$(function () {
  let openedHeader = null;

  $('#toc').tocify({
    selectors,
    hashGenerator: 'pretty',
    ignoreSelector: '.no-toc',
    scrollTo: 100,
    smoothScroll: false,
    showEffect: 'none',
  }).data('toc-tocify');

  $('ul').prev('li').addClass('has-subitens');

  $(window).scroll(function () {
    if ($('li.active').closest('.tocify-header') !== openedHeader) {
      $('li.is-open').removeClass('is-open');

      openedHeader = $('li.active').closest('.tocify-header');
    }

    openedHeader.find('ul:visible').prev('li').addClass('is-open');
  });

  $('.hamburger').click(function () {
    $('body').toggleClass('sidebar-closed');
  });

  $('.code-menu').click(function () {
    $('body').toggleClass('code-menu-closed');
  });

  prettyPrint();

  let first = true;

  function setTocHeight() {
    const sideAbout = $('.sidebar-about').outerHeight();
    const fixedFooter = $('.fixed-footer').outerHeight();
    const footerIconHeight = first ? 14 : 0;
    const calc = sideAbout + fixedFooter + footerIconHeight;

    $('#toc').css('height', `calc(100vh - ${calc}px)`);
  }

  setTocHeight();
  first = false;

  $(window).resize(setTocHeight);
});
