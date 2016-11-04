L.Edit = L.Edit || {};

L.Edit.Rectangle = L.Edit.SimpleShape.extend({
	_createMoveMarker: function () {
		var bounds = this._shape.getBounds(),
			center = bounds.getCenter();

		this._moveMarker = this._createMarker(center, this.options.moveIcon);
	},

	_createResizeMarker: function () {
		var corners = this._getCorners();

		this._resizeMarkers = [];

		for (var i = 0, l = corners.length; i < l; i++) {
			this._resizeMarkers.push(this._createMarker(corners[i], this.options.resizeIcon));
			// Monkey in the corner index as we will need to know this for dragging
			this._resizeMarkers[i]._cornerIndex = i;
		}
	},

	_onMarkerDragStart: function (e) {
		L.Edit.SimpleShape.prototype._onMarkerDragStart.call(this, e);

		// Save a reference to the opposite point
		var corners = this._getCorners(),
			marker = e.target,
			currentCornerIndex = marker._cornerIndex;

		this._oppositeCorner = corners[(currentCornerIndex + 2) % 4];

		this._toggleCornerMarkers(0, currentCornerIndex);
                //$('#divLabelDesc').html(this._startLatLng+ ' - ' +latlng);
                //$('#divLabelDesc').html(Math.random());
	},

	_onMarkerDragEnd: function (e) {
		var marker = e.target,
			bounds, center;

		// Reset move marker position to the center
		if (marker === this._moveMarker) {
			bounds = this._shape.getBounds();
			center = bounds.getCenter();

			marker.setLatLng(center);
		}

		this._toggleCornerMarkers(1);

		this._repositionCornerMarkers();

		L.Edit.SimpleShape.prototype._onMarkerDragEnd.call(this, e);
	},

	_move: function (newCenter) {
		var latlngs = this._shape.getLatLngs(),
			bounds = this._shape.getBounds(),
			center = bounds.getCenter(),
			offset, newLatLngs = [];

		// Offset the latlngs to the new center
		for (var i = 0, l = latlngs.length; i < l; i++) {
			offset = [latlngs[i].lat - center.lat, latlngs[i].lng - center.lng];
			newLatLngs.push([newCenter.lat + offset[0], newCenter.lng + offset[1]]);
		}

		this._shape.setLatLngs(newLatLngs);

		// Respoition the resize markers
		this._repositionCornerMarkers();

	},

	_resize: function (latlng) {
		var bounds;

		// Update the shape based on the current position of this corner and the opposite point
		this._shape.setBounds(L.latLngBounds(latlng, this._oppositeCorner));

		// Respoition the move marker
		bounds = this._shape.getBounds();
		this._moveMarker.setLatLng(bounds.getCenter());

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

                /*area_calculada = Math.abs(x2-x1)*Math.abs(y2-y1);
                area_calculada = area_calculada*100;
                area_calculada = Math.floor(area_calculada);
                area_calculada = area_calculada/100;*/
                area_calculada = (Math.abs(x2-x1)*108)*(Math.abs(y2-y1)*108);
                ancho = Math.floor((Math.abs(x2-x1)*10000))/10000;
                alto  = Math.floor((Math.abs(y2-y1)*10000))/10000;
                //area_calculada = area_calculada*100;
                area_calculada = Math.floor(area_calculada);
                //area_calculada = (area_calculada/100);

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

                var number = new String(area_calculada);

                result = '';

                while( number.length > 3 )
                {
                    result = ',' + number.substr(number.length - 3) + result;
                    number = number.substring(0, number.length - 3);
                }

                result = number + result;

                //$('#labelxtotal').html(''+ancho);
                //$('#labelytotal').html(''+alto);

                $('#labelArea').html(''+result+' km<sup>2</sup>');
	},

	_getCorners: function () {
		var bounds = this._shape.getBounds(),
			nw = bounds.getNorthWest(),
			ne = bounds.getNorthEast(),
			se = bounds.getSouthEast(),
			sw = bounds.getSouthWest();

		return [nw, ne, se, sw];
	},

	_toggleCornerMarkers: function (opacity) {
		for (var i = 0, l = this._resizeMarkers.length; i < l; i++) {
			this._resizeMarkers[i].setOpacity(opacity);
		}
	},

	_repositionCornerMarkers: function () {
		var corners = this._getCorners();

		for (var i = 0, l = this._resizeMarkers.length; i < l; i++) {
			this._resizeMarkers[i].setLatLng(corners[i]);
		}
	}
});

L.Rectangle.addInitHook(function () {
	if (L.Edit.Rectangle) {
		this.editing = new L.Edit.Rectangle(this);

		if (this.options.editable) {
			this.editing.enable();
		}
	}
});
