/* router.js | @cloudlam */

'use strict';

function Router() {

	this.routes = {};
	this.cur_url = '';

	this.route = function(path, callback) {
		this.routes[path] = callback || function() {};
	};

	this.refresh = function() {
		this.cur_url = location.hash.slice(1) || '/';
		this.routes[this.cur_url]();
	};

	this.init = function() {
		window.addEventListener('load', this.refresh.bind(this), false);
		window.addEventListener('hashchange', this.refresh.bind(this), false);
	}
}
