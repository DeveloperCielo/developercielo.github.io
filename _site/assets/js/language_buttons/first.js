$('div.highlighter-rouge').prepend(`<a class="fa expand-btn" title="${toggleCode}"><i class="fa fa-expand" aria-hidden=true></i></a>`);

$('div.highlighter-rouge').each(function () {
  if (!$(this).parent().hasClass('language-group')) {
    $(this).first().next('div.highlighter-rouge').andSelf()
      .wrapAll('<div class="code-fullscreen"><div class="language-group"></div></div>');
  }
});

if ($(window).width() >= 1660) {
  $('.content-container:not(.no-dark-box) div.highlighter-rouge').each(function () {
    const outerHeight = $(this).outerHeight();

    $(this).parent().parent().next('table')
      .wrapAll(`<div class="table-wrap" style="min-height:${outerHeight}px;"></div>`);
  });
}

$('.expand-btn').click(function () {
  $('.overlay').toggleClass('opened');
  $(this).parent().parent().parent()
    .toggleClass('opened');
  $(this).children('i.fa').toggleClass('fa-compress');
});

$('.language-group').prepend(`<div class="language-buttons">${langs}</div>`);
