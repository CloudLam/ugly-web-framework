/* tab.js | @cloudlam */

'use strict';

function settingInit(app) {
  // Current sidebar type
  if (localStorage.getItem('uwfAppType')) {
    if (parseInt(localStorage.getItem('uwfAppType'))) {
      document.getElementById('uwf-setting-sidebartype-d').setAttribute('checked', '');
    } else {
      document.getElementById('uwf-setting-sidebartype-s').setAttribute('checked', '');
    }
  } else if (app.type) {
    document.getElementById('uwf-setting-sidebartype-d').setAttribute('checked', '');
  } else {
    document.getElementById('uwf-setting-sidebartype-s').setAttribute('checked', '');
  }

  // Current sidebar color
  document.getElementById('uwf-setting-sidebarcolor-' + app.sidebar.color).setAttribute('checked', '');

  // Set local
  document.getElementById('uwf-setting-sidebartype-s').onclick = function (event) {
    app.type = 0;
    localStorage.setItem('uwfAppType', app.type);
  }
  document.getElementById('uwf-setting-sidebartype-d').onclick = function (event) {
    app.type = 1;
    localStorage.setItem('uwfAppType', app.type);
  }
  document.getElementById('uwf-setting-sidebarcolor-blue').onclick = function (event) {
    app.sidebar.color = 'blue';
    localStorage.setItem('uwfAppColor', app.sidebar.color);
  }
  document.getElementById('uwf-setting-sidebarcolor-red').onclick = function (event) {
    app.sidebar.color = 'red';
    localStorage.setItem('uwfAppColor', app.sidebar.color);
  }
  document.getElementById('uwf-setting-sidebarcolor-green').onclick = function (event) {
    app.sidebar.color = 'green';
    localStorage.setItem('uwfAppColor', app.sidebar.color);
  }
  document.getElementById('uwf-setting-sidebarcolor-yellow').onclick = function (event) {
    app.sidebar.color = 'yellow';
    localStorage.setItem('uwfAppColor', app.sidebar.color);
  }
  document.getElementById('uwf-setting-sidebarcolor-gray').onclick = function (event) {
    app.sidebar.color = 'gray';
    localStorage.setItem('uwfAppColor', app.sidebar.color);
  }
  document.getElementById('uwf-setting-sidebarcolor-black').onclick = function (event) {
    app.sidebar.color = 'black';
    localStorage.setItem('uwfAppColor', app.sidebar.color);
  }
}
