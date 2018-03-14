'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

// Create an immediately invoked functional expression to wrap our code
(function () {

	// Define our constructor
	window.FTTabs = function () {

		// Create global element references
		//this.activeTab = null;
		// Define option defaults
		var defaults = {
			label: ['test1', 'test2'],
			content: ['this is the content for test1', 'this is the content for test2'],
			activetab: 'test1',
			side: 'top',
			accordian: false
		};

		// Create options by extending defaults with the passed in arugments
		if (arguments[0] && _typeof(arguments[0]) === "object") {
			this.options = extendDefaults(defaults, arguments[0]);
		}
	};

	// Public Methods
	FTTabs.prototype.activeTab = function () {
		var _ = this,
		    i,
		    contentContainer,
		    tabs = document.getElementsByClassName('tab'),
		    panels = document.getElementsByClassName('panel'),
		    active = ' active';

		buildOut.call(this);
		initializeEvents.call(this);
		// Declare all variables
		for (i = tabs.length - 1; i >= 0; i--) {
			tabs[i].addEventListener("click", function () {
				var panelId = this.getAttribute('aria-controls');
				var currentPanel = document.getElementById(panelId);
				//es6
				//[ ...n.parentNode.children ].filter(c => c.nodeType == 1 && c != n)
				//add active class
				//loop through all tabs and remove active class
				this.parentNode.childNodes.forEach(function (tab) {
					tab.classList ? tab.classList.remove('active') : '';
				});
				for (i = panels.length - 1; i >= 0; i--) {
					panels[i].classList ? panels[i].classList.remove('open') : '';
				}
				//add active class to the element that was just clicked
				this.classList.toggle('active');
				currentPanel.classList.toggle('open');
			}, false);
		}
		tabs[0].className = " tab active";
		panels[0].className = " panel open";
	};

	FTTabs.prototype.alert = function () {
		var _ = this;
		buildOut.call(this);
		initializeEvents.call(this);
		console.log('alert method fired');
	};

	// Private Methods
	function buildOut() {

		var label, content, contentContainer;
		/*
  * If content is an HTML string, append the HTML string.
  * If content is a domNode, append its content.
  */

		if (typeof this.options.content === "string") {
			content = this.options.content;
		} else {
			content = this.options.content.innerHTML;
		}
	}

	function extendDefaults(source, properties) {
		var property;
		for (property in properties) {
			if (properties.hasOwnProperty(property)) {
				source[property] = properties[property];
			}
		}
		return source;
	}

	function initializeEvents() {}
})();

var tabsContainer = document.getElementById('tabsContainer');
var panel1 = document.getElementById('panel1');
var panel2 = document.getElementById('panel2');

var FTTabs = new FTTabs({
	label: ['Parts', 'Sales'],
	content: [panel1, panel2]
});

var tabsContainer2 = document.getElementById('tabsContainer2');
var panel12 = document.getElementById('panel12');
var panel22 = document.getElementById('panel22');

FTTabs.activeTab();