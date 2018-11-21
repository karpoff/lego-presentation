(function () {
  function applyEmoji() {
    document.querySelectorAll('section, header').forEach(function (el) {
      var input = el.innerHTML;
      var output = emojione.shortnameToUnicode(input);
  
      el.innerHTML = output;
    });
  }

  Reveal.addEventListener('slidechanged', applyEmoji);
  Reveal.addEventListener('ready', applyEmoji);
})();