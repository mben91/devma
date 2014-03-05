;(function ( $, window, document, undefined ) {

    var pluginName = "themepileUIAccordion",
        defaults = {
            nav: ".themepile-ui__accordion__item ",
            navActiveClass: "themepile-ui__accordion__item_state_open",
            closeAll: false
        };

    // The actual plugin constructor
    function themepileUIAccordion( element, options ) {

        this.element    = element;
        this.options    = $.extend( {}, defaults, options );
        this.nav   = $(this.element).find(this.options.nav);

        this._defaults = defaults;
        this._name = pluginName;

        this.nav.on('click', $.proxy(this, 'open'));
    }

    themepileUIAccordion.prototype = {
        open: function(event) {
            event.preventDefault();
            var item = $(event.currentTarget);
            item.toggleClass(this.options.navActiveClass);
            this.options.closeAll && this.closeAll(item);
        },
        closeAll: function(element){
            this.nav.not(element).removeClass(this.options.navActiveClass);
        }
    };

    $.fn[pluginName] = function ( options ) {
        return this.each(function () {
            if (!$.data(this, pluginName)) {
                $.data(this, pluginName, new themepileUIAccordion( this, options ));
            }
        });
    };

})( jQuery, window, document );