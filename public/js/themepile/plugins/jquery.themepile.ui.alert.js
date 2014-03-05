;(function ( $, window, document, undefined ) {

    var pluginName = "themepileUIAlert",
        defaults = {
            closeButton: ".themepile-ui__alert__close"
        };

    // The actual plugin constructor
    function themepileUIAlert( element, options ) {

        this.element    = element;
        this.options    = $.extend( {}, defaults, options );
        this.close   = $(this.element).find(this.options.closeButton);

        this._defaults = defaults;
        this._name = pluginName;

        this.close.on('click', $.proxy(this, 'closeAlert'));
    }

    themepileUIAlert.prototype = {
        closeAlert: function(event) {
            event.preventDefault();
            $(this.element).remove();
        }
    };

    $.fn[pluginName] = function ( options ) {
        return this.each(function () {
            if (!$.data(this, pluginName)) {
                $.data(this, pluginName, new themepileUIAlert( this, options ));
            }
        });
    };

})( jQuery, window, document );