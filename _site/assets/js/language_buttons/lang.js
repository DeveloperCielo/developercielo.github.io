/*
Copyright 2008-2013 Concur Technologies, Inc.

Licensed under the Apache License, Version 2.0 (the "License"); you may
not use this file except in compliance with the License. You may obtain
a copy of the License at

  http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
License for the specific language governing permissions and limitations
under the License.
*/
(function (global) {
  let languages = [];

  global.setupLanguages = setupLanguages;
  global.activateLanguage = activateLanguage;

  function activateLanguage(language) {
    if (!language) return;
    if (language === '') return;

    $(`.selectable[data-languages*="${language}*"] a`).removeClass('active');
    $(`.selectable[data-languages*="${language}*"] a[data-language-name="${language}"`).addClass('active');

    languages.forEach((lang) => {
      if (global.isOpen) {
        $(`.selectable .language-${lang}`).hide();
        $(`.locked .language-${lang}`).hide();

        return;
      }

      $(`.selectable[data-languages*="${language}*"] .language-${lang}`).hide();
    });

    $(`.language-${language}`).show();

    window.language = language;

    // global.toc.calculateHeights();

    // scroll to the new location of the position
    const hash = decodeURIComponent(window.location.hash);

    if ($(hash).get(0)) {
      $(hash).get(0).scrollIntoView(true);
    }
  }

  // if a button is clicked, add the state to the history
  function pushURL(language) {
    if (!history) {
      return;
    }

    let {
      hash,
    } = window.location;

    if (hash) {
      hash = hash.replace(/^#+/, '');
    }

    history.pushState({}, '', `'?${language}#${hash}`);

    // save language as next default
    localStorage.setItem('language', language);
  }

  function setupLanguages(l, isOpen) {
    const defaultLanguage = localStorage.getItem('language');

    languages = l;

    if ((location.search.substr(1) !== '') && ($.inArray(location.search.substr(1), languages)) !== -1) {
      // the language is in the URL, so use that language!
      activateLanguage(location.search.substr(1), isOpen);

      localStorage.setItem('language', location.search.substr(1));
    } else if ((defaultLanguage !== null) && ($.inArray(defaultLanguage, languages) !== -1)) {
      // the language was the last selected one saved in localstorage, so use that language!
      activateLanguage(defaultLanguage, isOpen);
    } else {
      // no language selected, so use the default
      activateLanguage(languages[0], isOpen);
    }

    $('.selectable .language-buttons a').on('click', function () {
      const language = $(this).data('language-name');
      const e = new CustomEvent('languagechange', {
        detail: language,
      });

      pushURL(language);
      activateLanguage(language, isOpen);

      window.dispatchEvent(e);

      return false;
    });

    window.onpopstate = () => {
      activateLanguage(window.location.search.substr(1));
    };
  }
})(window);
