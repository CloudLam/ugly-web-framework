/* tab.js | @cloudlam */

'use strict';

function settingInit(app) {
  // Current sidebar type
  if (parseInt(localStorage.getItem('uwfAppType'))) {
    document.getElementById('uwf-setting-sidebartype-d').setAttribute('checked', '');
  } else if (app.type) {
    document.getElementById('uwf-setting-sidebartype-d').setAttribute('checked', '');
  } else {
    document.getElementById('uwf-setting-sidebartype-s').setAttribute('checked', '');
  }
  // Current sidebar color
  document.getElementById('uwf-setting-sidebarcolor-' + app.sidebar.color).setAttribute('checked', '');
  // Set local
  localStorage.setItem('uwfAppType', app.type);
  localStorage.setItem('uwfAppColor', app.sidebar.color);
}
