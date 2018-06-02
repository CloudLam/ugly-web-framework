/* page.js | @cloudlam */

'use strict';

function settingInit (app) {
  var sidebarType = document.getElementById('uwf-setting-sidebartype');
  var sidebarColor = document.getElementById('uwf-setting-sidebarcolor');

  // Set type
  if (localStorage.getItem('uwfAppType')) {
    setSelected(sidebarType, parseInt(localStorage.getItem('uwfAppType')));
  } else {
    setSelected(sidebarType, app.type);
  }

  // Set color
  if (localStorage.getItem('uwfAppColor')) {
    setSelected(sidebarColor, localStorage.getItem('uwfAppColor'));
  } else {
    setSelected(sidebarType, app.sidebar.color);
  }

  var listHandler = function (event) {
    if (event.target == sidebarType || event.target.parentNode == sidebarType) {
      closeList([sidebarColor]);
      openList(sidebarType);
      return;
    }
    if (event.target == sidebarColor || event.target.parentNode == sidebarColor) {
      closeList([sidebarType]);
      openList(sidebarColor);
      return;
    }

    var className = event.target.parentNode.getAttribute('class');
    if (className && className.indexOf('uwf-setting-option') > -1) {
      var select = event.target.parentNode.previousSibling || event.target.parentNode.previousSiblingElement;
      selectOption(select, event.target.innerHTML);
    }

    closeList([sidebarType, sidebarColor]);
  };

  document.removeEventListener('click', listHandler, false);
  document.addEventListener('click', listHandler, false);

  function openList (element) {
    element.parentNode.setAttribute('class', element.parentNode.getAttribute('class').replace('hide', 'show'));
  }

  function closeList (elements) {
    for (var i = 0; i < elements.length; i++) {
      elements[i].parentNode.setAttribute('class', elements[i].parentNode.getAttribute('class').replace('show', 'hide'));
    }
  }

  function setSelected (select, selected) {
    if (select == sidebarType) {
      if (selected) {
        sidebarType.children[0].innerHTML = 'Detail';
      } else {
        sidebarType.children[0].innerHTML = 'Simplified';
      }
    }
    if (select == sidebarColor) {
      var options = sidebarColor.nextSibling || sidebarColor.nextElementSibling;
      for (var i = 0; i < options.children.length; i++) {
        if (options.children[i].children[0].className.indexOf(selected) > -1) {
          sidebarColor.children[0].innerHTML = options.children[i].innerHTML;
          break;
        }
      }
    }
  }

  function selectOption (select, option) {
    if (select == sidebarType) {
      sidebarType.children[0].innerHTML = option;
      app.type = option.toLowerCase() === 'detail' ? 1 : 0;
      localStorage.setItem('uwfAppType', app.type);
    }
    if (select == sidebarColor) {
      sidebarColor.children[0].innerHTML = option;
      app.sidebar.color = parseDOM(option)[0].className.split(' ')[1];
      localStorage.setItem('uwfAppColor', app.sidebar.color);
    }
  }
}

function profileInit (element) {
  var edit = document.getElementById('uwf-profile-edit');
  var done = document.getElementById('uwf-profile-done');
  var cancel = document.getElementById('uwf-profile-cancel');
  var photo = document.getElementById('uwf-profile-photo');
  var photoInput = document.getElementById('uwf-profile-photo-input');

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
  photo.onclick = function (event) {
    photoInput.click();
  }
  photoInput.onchange = function (event) {
    var reader = new FileReader();
    reader.onload = function (e) {
      photo.children[0].src = e.target.result;
    }
    reader.readAsDataURL(this.files[0]);
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

function formInit (app) {
  if (!window.File || !window.FileList || !window.FileReader) {
	  return;
  }

  var file = document.getElementById('file');

  var fileSelectHandler = function (event) {
    var files = '';
    for (var i = 0; i < event.target.files.length; i++) {
      files += '<label>' + event.target.files[i].name + '</label>';
    }
    event.target.parentNode.children[2].innerHTML = files;
  };

  var fileDragHover = function (event) {
    event.stopPropagation();
    event.preventDefault();
  }

  file.addEventListener('change', fileSelectHandler, false);
  file.addEventListener('dropover', fileDragHover, false);
  file.addEventListener('dropleave', fileDragHover, false);
  file.addEventListener('drop', fileSelectHandler, false);
}
