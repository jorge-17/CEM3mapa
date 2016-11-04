L.Draw.Rectangle = L.Draw.SimpleShape.extend({
	statics: {
		TYPE: 'rectangle'
	},

	options: {
		shapeOptions: {
			stroke: true,
			color: '#000',
			weight: 2,
			opacity: 0.5,
			fill: true,
			fillColor: '#ccc', //same as color by default
			fillOpacity: 0.4,
			clickable: true
		}
	},

	initialize: function (map, options) {
		// Save the type so super can fire, need to do this as cannot do this.TYPE :(
		this.type = L.Draw.Rectangle.TYPE;

		this._initialLabelText = L.drawLocal.draw.handlers.rectangle.tooltip.start;

		L.Draw.SimpleShape.prototype.initialize.call(this, map, options);
	},

	_drawShape: function (latlng) {
                var bounds;

		if (!this._shape) {
			this._shape = new L.Rectangle(new L.LatLngBounds(this._startLatLng, latlng), this.options.shapeOptions);
			this._map.addLayer(this._shape);
                        //alert(this._startLatLng+ ' - ' +latlng);
                        //$('#divLabelDesc2').html(Math.random());
		} else {
			this._shape.setBounds(new L.LatLngBounds(this._startLatLng, latlng));
                        bounds = this._shape.getBounds();

                        var x1;
                        var y1;
                        var x2;
                        var y2;
                        var area_calculada;
                        var ancho, alto, area_limite, result;

                        x1 = bounds.getWest();
                        y1 = bounds.getSouth();

                        x2 = bounds.getEast();
                        y2 = bounds.getNorth();

                        area_calculada = (Math.abs(x2-x1)*108)*(Math.abs(y2-y1)*108);
                        area_calculada = Math.floor(area_calculada);

                        area_limite = $('#areamax_val').val();
                        $('#areacalculada_val').val(area_calculada);

                        var styles = {
                            //backgroundColor : "red",
                            color: "red"
                        };

                        if(area_calculada > area_limite){
                            //$('#labelArea').css(styles);
                            $('#labelArea').addClass('rojo_area');
                        } else {
                            //$('#labelArea').removeAttr('style');
                            $('#labelArea').removeClass('rojo_area');
                        }


                        ancho = Math.floor((Math.abs(x2-x1)*10000))/10000;
                        alto =  Math.floor((Math.abs(y2-y1)*10000))/10000;

                        area_calculada = Math.floor(area_calculada);

                        var number = new String(area_calculada);

                        var result = '';

                        while( number.length > 3 )
                        {
                            result = ',' + number.substr(number.length - 3) + result;
                            number = number.substring(0, number.length - 3);
                        }

                        result = number + result;


                        //$('#labelxtotal').html(''+ancho);
                        //$('#labelytotal').html(''+alto);

                        $('#labelArea').html(''+result+' km<sup>2</sup>');

		}
	},

	_fireCreatedEvent: function () {
		var rectangle = new L.Rectangle(this._shape.getBounds(), this.options.shapeOptions);
                //alert(this._shape.getBounds());
		L.Draw.SimpleShape.prototype._fireCreatedEvent.call(this, rectangle);
	}
});

        function trunc(x) {
            return x < 0 ? Math.ceil(x) : Math.floor(x);
        }


