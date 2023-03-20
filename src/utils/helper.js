export function handleScroll(className) {
  const slider = document.querySelector(`.${className}`);
  let isDown = false;
  let startX;
  let scrollLeft;

  function handleMouseDown(e) {
    // console.log(e);
    isDown = true;
    startX = (e?.touches ? e.touches[0].pageX : e.pageX) - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
    // console.log(startX);
  }

  function handleMouseLeave() {
    isDown = false;
  }
  function handleMouseUp() {
    isDown = false;
  }

  function handleMouseMove(e) {
    if (!isDown) return;
    e.preventDefault();
    const x = (e?.touches ? e.touches[0].pageX : e.pageX) - slider.offsetLeft;
    const walk = x - startX;
    slider.scrollLeft = scrollLeft - walk;
    // console.log(x);
  }

  slider.addEventListener('mousedown', (e) => handleMouseDown(e));
  slider.addEventListener('touchstart', (e) => handleMouseDown(e));
  slider.addEventListener('mouseleave', handleMouseLeave);
  slider.addEventListener('touchend', handleMouseLeave);
  slider.addEventListener('mouseup', handleMouseUp);
  slider.addEventListener('mousemove', (e) => handleMouseMove(e));
  slider.addEventListener('touchmove', (e) => handleMouseMove(e));
}



export const replaceURLs = (message) => {
  if (!message) return;

  var urlRegex = /(((https?:\/\/)|(www\.))[^\s]+)/g;
  return message.replace(urlRegex, function (url) {
    var hyperlink = url;
    if (!hyperlink.match('^https?://')) {
      hyperlink = 'http://' + hyperlink;
    }
    return (
      '<a href="' +
      hyperlink +
      '" target="_blank" rel="noopener noreferrer">' +
      url +
      '</a>'
    );
  });
};

export const stringToHTML = function (str) {
  var parser = new DOMParser();
  var doc = parser.parseFromString(str, 'text/html');
  return doc.body;
};
