L.Control.EasyButtons = L.Control.extend({
    options: {
        position: 'topright',
        title: '',
        intentedIcon: 'fa-circle-o'
    },

    initialize: function (options) {

    },

    onAdd: function () {
        var container = L.DomUtil.create('div', 'leaflet-bar leaflet-control d3');
        this.link = L.DomUtil.create('a', ''+ this.options.intentedIcon, container);
        //this.link = L.DomUtil.create('a', ''+ this.options.intentedIcon, container);
        L.DomUtil.create('i', '', this.link);
        this.link.href = '#';

        L.DomEvent.on(this.link, 'click', this._click, this);
        //this.link.title = this.options.title;
        this.link.title = 'modelo 3D de la vista actual';

        this._updateDisabled();
        map.on("zoomend", function(e) {
            var className = ' disabled-3d';
            var classDisabled = ' leaflet-disabled';
            //if (e.target._zoom >= 11) {
            if (e.target._zoom >= 10) {
                //L.DomUtil.removeClass($('.d3'), className);
                $('.btn3D').removeClass(className);
                $('.btn3D').removeClass(classDisabled);
            } else {
                $('.btn3D').addClass(className);
                $('.btn3D').addClass(classDisabled);
                $('.btn3D').children().prop('disabled',true);
                //$('.btn3D')
               // L.DomUtil.addClass(this.link, className);
               //console.log('');
            }
        });

        return container;
    },

    intendedFunction: function(){ alert('no function selected');},

    _click: function (e) {
        L.DomEvent.stopPropagation(e);
        L.DomEvent.preventDefault(e);
        this.intendedFunction();
    },

    _updateDisabled: function () {
        var className = ' disabled-3d leaflet-disabled';

        L.DomUtil.addClass(this.link, className);
    }
});

L.easyButton = function( btnIcon , btnFunction , btnTitle , btnMap ) {
  var newControl = new L.Control.EasyButtons;
  if (btnIcon) newControl.options.intentedIcon = btnIcon;

  if ( typeof btnFunction === 'function'){
    newControl.intendedFunction = btnFunction;
  }

  if (btnTitle) newControl.options.title = btnTitle;

  if ( btnMap == '' ){
    // skip auto addition
  } else if ( btnMap ) {
    btnMap.addControl(newControl);
  } else {
    map.addControl(newControl);
  }
  return newControl;
};
