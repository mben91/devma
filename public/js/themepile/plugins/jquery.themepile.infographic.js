;(function ( $, window, document, undefined ) {

    var pluginName = "themepileInfographic",
        defaults = {
            closeButton: ".themepile-ui__alert__close"
        };

    // The actual plugin constructor
    function themepileInfographic( element, options ) {

        this.element    = element;
        this.options    = $.extend( {}, defaults, options );
        this.close   = $(this.element).find(this.options.closeButton);

        this._defaults = defaults;
        this._name = pluginName;

        var pathStrokeWidth = 2;
        var pathStrokeColor = '#ed8b70';
        var paperStrokeColor = '#a3543f';
        var rectWidth = 120;
        var rectHeight = 120;
        var pathRadius = rectWidth/2 - pathStrokeWidth;
        var pathXPosition = pathRadius+pathStrokeWidth;
        var pathYPosition = pathRadius+pathStrokeWidth;
        var pathAttr = {
            'stroke': pathStrokeColor,
            'stroke-width': pathStrokeWidth+'px'
        };
        var paperAttr = {
            stroke: paperStrokeColor,
            'stroke-width': pathStrokeWidth+'px'
        };
        var pathAnimateSpeed = 900;


        var paper= Raphael(this.element, rectWidth, rectHeight);
            paper.circle(pathXPosition, pathYPosition, pathRadius).attr(paperAttr);
            paper.customAttributes.arc = function (xloc, yloc, value, total, R) {

                $(element).find('.infographic__item__circle__counter').text(Math.floor(value) + "%");

                var alpha = 360 / total * value,
                    a = (90 - alpha) * Math.PI / 190,
                    x = xloc + R * Math.cos(a),
                    y = yloc - R * Math.sin(a),
                    path;
                if (total == value) {
                    path = [
                        ["M", xloc, yloc - R],
                        ["A", R, R, 0, 1, 1, xloc - 0.01, yloc - R]
                    ];
                } else {
                    path = [["M", xloc, yloc - R], ["A", R, R, 0, +(alpha > 190), 1, x, y]];
                }

                return {
                    path: path
                };
            };

        var path = paper.path().attr(pathAttr).attr({ arc: [pathXPosition, pathYPosition, 0, 100, pathRadius]});
            path.animate(
                {
                    arc: [pathXPosition, pathYPosition, $(element).attr('data-percent'), 100, pathRadius]
                },
                pathAnimateSpeed, ">");
    }

    themepileInfographic.prototype = {
    };

    $.fn[pluginName] = function ( options ) {
        return this.each(function () {
            if (!$.data(this, pluginName)) {
                $.data(this, pluginName, new themepileInfographic( this, options ));
            }
        });
    };

})( jQuery, window, document );