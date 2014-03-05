;
(function ($, window, document, undefined) {

    var pluginName = "themepileUIBackToTop",
        defaults = {
            scrollSpeed: 200,
            isHideScrollLimit: $(window).height(),
            showHideEffectSpeed: 200,
            button: ".themepile-ui__back-to-top__button"
        };

    // The actual plugin constructor
    function themepileUIBackToTop(element, options) {

        this.element = element;
        this.options = $.extend({}, defaults, options);
        this.window = $(window);
        this.button = $(this.element).find(this.options.button);

        this._defaults = defaults;
        this._name = pluginName;

        this.button.on('click', $.proxy(this, 'scrollToTop'));
        this.window.on('scroll', $.proxy(this, 'checkScrollTopPosition'));
        this.checkScrollTopPosition();

    }

    themepileUIBackToTop.prototype = {
        checkScrollTopPosition: function () {
            if (this.getCurrentScrollPosition() > this.options.isHideScrollLimit) {
                $(this.element).fadeIn(this.options.showHideEffectSpeed);
            } else {
                $(this.element).fadeOut(this.options.showHideEffectSpeed);
            }
        },
        getCurrentScrollPosition: function () {
            return $(document).scrollTop();
        },
        scrollToTop: function (event) {
            event.preventDefault();
            $('html, body').animate({
                scrollTop: 0
            }, this.options.scrollSpeed);
        }
    };

    $.fn[pluginName] = function (options) {
        return this.each(function () {
            if (!$.data(this, pluginName)) {
                $.data(this, pluginName, new themepileUIBackToTop(this, options));
            }
        });
    };

})(jQuery, window, document);