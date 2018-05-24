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

function profileInit(element) {
  var edit = document.getElementById('uwf-profile-edit');
  var done = document.getElementById('uwf-profile-done');
  var cancel = document.getElementById('uwf-profile-cancel');
  edit.onclick = function (event) {
    edit.style.display = 'none';
    done.style.display = 'inline-block';
    cancel.style.display = 'inline-block';
    profileControl(edit);
  }
  done.onclick = function (event) {
    done.style.display = 'none';
    cancel.style.display = 'none';
    edit.style.display = 'inline-block';
    profileControl(done);
  }
  cancel.onclick = function (event) {
    done.style.display = 'none';
    cancel.style.display = 'none';
    edit.style.display = 'inline-block';
    profileControl(cancel);
  }
  function profileControl (target) {
    var items = element.querySelectorAll('.uwf-profile-item');
    for (var i = 0; i < items.length; i++) {
      if (target == edit) {
        items[i].children[1].style.display = 'inline-block';
        items[i].children[2].style.display = 'none';
      } else {
        items[i].children[1].style.display = 'none';
        items[i].children[2].style.display = 'inline-block';
      }
    }
  }
}
