;(function ( $, window, document, undefined ) {

    var pluginName = "themepileUITabs",
        defaults = {
            nav: ".themepile-ui__tabs__navigation__item",
            tab: ".themepile-ui__tabs__content",
            navActiveClass: "themepile-ui__tabs__navigation__item_state_current",
            tabActiveClass: "themepile-ui__tabs__content_state_current"
        };

    // The actual plugin constructor
    function themepileUITabs( element, options ) {

        this.element    = element;
        this.options    = $.extend( {}, defaults, options );
        this.nav   = $(this.element).find(this.options.nav);
        this.tab    = $(this.element).find(this.options.tab);

        this._defaults = defaults;
        this._name = pluginName;

        this.nav.on('click', $.proxy(this, 'show'));
    }

    themepileUITabs.prototype = {
        show: function(event) {
            event.preventDefault();
            var tabIndex = $(event.currentTarget).index();
            this.nav.removeClass(this.options.navActiveClass);
            this.nav.eq(tabIndex).addClass(this.options.navActiveClass);
            this.tab.removeClass(this.options.tabActiveClass);
            this.tab.eq(tabIndex).addClass(this.options.tabActiveClass);
        }
    };

    $.fn[pluginName] = function ( options ) {
        return this.each(function () {
            if (!$.data(this, pluginName)) {
                $.data(this, pluginName, new themepileUITabs( this, options ));
            }
        });
    };

})( jQuery, window, document );