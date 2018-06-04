/* routes.js | @cloudlam */

'use strict';

function Routes (app) {
  // Index
  app.router.route('index', function () {
    app.board.card.innerHTML = '';
    app.head.title = 'TITLE';
    app.head.subtitle = 'SUBTITLE';
  });

  // Welcome
  app.router.route('welcome', function () {
    app.board.card.innerHTML = '';
    app.board.tab.create('welcome', {
      'tab-id': 'welcome', 
      'tab-title': 'WELCOME'
    }, function () {
      app.head.title = 'TITLE';
      app.head.subtitle = 'SUBTITLE';
      load({
        node: app.board.card,
        url: './component/page/welcome.html'
      }, function (xhr, dom) {});
    });
  });

  // Form
  app.router.route('form', function () {
    app.board.card.innerHTML = '';
    app.board.tab.create('form', {
      'tab-id': 'form', 
      'tab-title': 'FORM'
    }, function () {
      app.head.title = 'FORM';
      app.head.subtitle = '';
      load({
        node: app.board.card,
        url: './component/page/form.html'
      }, function (xhr, dom) {
        formInit(app);
      });
    });
  });

  // Selects
  app.router.route('selects', function () {
    app.board.card.innerHTML = '';
    app.board.tab.create('selects', {
      'tab-id': 'selects', 
      'tab-title': 'SELECTS'
    }, function () {
      app.head.title = 'SELECTS';
      app.head.subtitle = '';
      load({
        node: app.board.card,
        url: './component/page/selects.html'
      }, function (xhr, dom) {
        var node = document.getElementById('multiple');
        var selects = new Selects({
          node: node,
          name: node.getAttribute('name')
        });
        selects.init();
      });
    });
  });

  // Profile
  app.router.route('profile', function () {
    app.board.card.innerHTML = '';
    app.board.tab.create('profile', {
      'tab-id': 'profile', 
      'tab-title': 'PROFILE'
    }, function () {
      app.head.title = 'PROFILE';
      app.head.subtitle = '';
      load({
        node: app.board.card,
        url: './component/page/profile.html'
      }, function (xhr, dom) {
        profileInit(dom[0]);
        profile.set('name', 'User');
      });
    });
  });

  // Table
  app.router.route('table', function () {
    app.board.card.innerHTML = '';
    app.board.tab.create('table', {
      'tab-id': 'table', 
      'tab-title': 'TABLE'
    }, function () {
      app.head.title = 'TABLE';
      app.head.subtitle = '';
      load({
        node: app.board.card,
        url: './component/page/table.html'
      }, function (xhr, dom) {
        var table = new Table({
          parent: dom[0],
          col: ['NO.', 'LETTER', 'NAME', 'FRUIT', 'ANIMAL'],
          source: './mock/table.json',
          render: {
            column: [
              {width: '10%'},
              {width: '15%', filter: true},
              {width: '25%', filter: true},
              {width: '25%'},
              {width: '25%'}
            ],
            search: {
              id: 'uwf-table',
              class: 'uwf-table-search',
              title: '<i class="material-icons">search</i>'
            },
            page: {
              class: 'uwf-table-page',
              first: '<i class="material-icons">first_page</i>',
              prev: '<i class="material-icons">chevron_left</i>',
              next: '<i class="material-icons">chevron_right</i>',
              last: '<i class="material-icons">last_page</i>',
              more: '<i class="material-icons">more_horiz</i>',
            }
          }
        });
        table.init();
      });
    });
  });

  // Date Picker
  app.router.route('datepicker', function () {
    app.board.card.innerHTML = '';
    app.board.tab.create('datepicker', {
      'tab-id': 'datepicker', 
      'tab-title': 'DATE PICKER'
    }, function () {
      app.head.title = 'DATE PICKER';
      app.head.subtitle = '';
      load({
        node: app.board.card,
        url: './component/page/datepicker.html'
      }, function (xhr, dom) {});
    });
  });

  // Setting
  app.router.route('setting', function () {
    app.board.card.innerHTML = '';
    app.board.tab.create('setting', {
      'tab-id': 'setting', 
      'tab-title': 'SETTING'
    }, function () {
      app.head.title = 'SETTING';
      app.head.subtitle = '';
      load({
        node: app.board.card,
        url: './component/page/setting.html'
      }, function (xhr, dom) {
        settingInit(app);
      });
    });
  });

  // Help
  app.router.route('help', function () {
    app.board.card.innerHTML = '';
    app.board.tab.create('help', {
      'tab-id': 'help', 
      'tab-title': 'HELP'
    }, function () {
      app.head.title = 'HELP';
      app.head.subtitle = '';
      load({
        node: app.board.card,
        url: './component/page/help.html'
      }, function (xhr, dom) {});
    });
  });
}
