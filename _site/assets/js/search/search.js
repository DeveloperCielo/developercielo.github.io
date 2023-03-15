(function () {
  let content;
  let searchResults;
  const highlightOpts = {
    element: 'span',
    className: 'search-highlight',
  };

  const index = new lunr.Index();

  index.ref('id');
  index.field('title', {
    boost: 10,
  });
  index.field('body');
  index.pipeline.add(lunr.trimmer, lunr.stopWordFilter);

  $(populate);
  $(bind);

  function populate() {
    $(':header:not(.no-toc)').each(function () {
      const title = $(this);
      const body = title.nextUntil('h1, h2');

      index.add({
        id: title.prop('id'),
        title: title.text(),
        body: body.text(),
      });
    });
  }

  function bind() {
    content = $('.content-container .post');
    searchResults = $('.search-results');

    $('#input-search').on('keyup', search);
    $('#input-search').on('click', search);
  }

  function search(event) {
    unhighlight();
    searchResults.addClass('visible');

    // ESC clears the field
    if (event.keyCode === 27) this.value = '';

    if (this.value) {
      const results = index.search(this.value).filter(r => r.score > 0.0001);

      if (results.length) {
        searchResults.empty();

        $.each(results, (i, result) => {
          const refText = $(`#${result.ref}`).text();

          searchResults.append(`<li><a href='#${result.ref}'>${refText}</a></li>`);
        });

        highlight.call(this);
      } else {
        searchResults.html('<li></li>');

        $('.search-results li').text(`No Results Found for "${this.value}"`);
      }
    } else {
      unhighlight();
      searchResults.removeClass('visible');
    }

    $('.search-results a').click(() => {
      unhighlight();

      searchResults.removeClass('visible');
    });
  }

  function highlight() {
    if (this.value) content.highlight(this.value, highlightOpts);
  }

  function unhighlight() {
    content.unhighlight(highlightOpts);
  }
})();
