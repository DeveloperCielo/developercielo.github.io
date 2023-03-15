$(function () {
  $('.language-buttons').each(function () {
    const parent = $(this).parent();

    parent.addClass('selectable');

    if (parent.hasClass('language-tabs')) {
      parent.attr('data-languages', `${langsArray.join('*')}*`);

      return true;
    }

    /**
     * @type {string[]} localArray
     */
    const localArray = JSON.parse(JSON.stringify(langsArray));

    langsArray.forEach((v) => {
      if (parent.find(`.language-${v}`).length === 0) {
        $(this).find(`[data-language-name="${v}"]`).remove();
        localArray.splice(localArray.indexOf(v), 1);

        if ($(this).children().length === 1) {
          parent.removeClass('selectable');
          parent.addClass('locked');
        }
      }
    });

    // Just to separate Java from JavaScript, I have add a * to separate the languages
    let attr = localArray.join('*');
    attr += '*';

    $(this).children(`[data-language-name="${localArray[0]}"]`).addClass('active');

    const language = parent.find(`.language-${localArray[0]}`);
    language.addClass('show');

    if ($(window).width() <= 1660) {
      language.show();
    }

    parent.attr('data-languages', attr);
  });

  window.isOpen = $(window).width() >= 1660;

  setupLanguages(langsArray);
});

$('.hide-btn').click(function () {
  $('.content-container').toggleClass('no-dark-box');
  $('.dark-box').toggle();

  $('.overlay').removeClass('opened');
  $('.code-fullscreen').removeClass('opened');

  window.isOpen = !$('.content-container').hasClass('no-dark-box');

  if (!window.isOpen) {
    $('.locked .show').show();
    $(`.selectable:not([data-languages*="${window.language}*"]) .show`).show();
  }
});
