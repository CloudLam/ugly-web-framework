/* app.js | @cloudlam */

window.onload = function () {
  init();
}

function init () {
  load({
    node: document.getElementById('app'),
    url: './component/hello/greeting.html'
  }, function () {});
}
