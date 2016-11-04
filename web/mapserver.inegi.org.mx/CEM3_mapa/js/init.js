var datosEdo = {};
var datosClave50k = [];
var datosClave50k_2 = new Array();
var num50k;

var geojsonCaneva50k;

var targetPrevious;
var estadoPrevious;
var idEdo = '00';
var targetPreviousCarta;
var cartaPrevious;
var labelEdo;
var labelCarta;

var map;
var textoCaneva;
var geojsonCenEdos;
var geojsonEstados;

var x1;
var y1;
var x2;
var y2;

var layerAnt;
var countLayer = 0;
/*
 * Se crea una nueva funciona donde se realizaran todas las operaciones, para el uso del mapa digital
 * este metodo es llamado al momento de de la carga del mapa con las rejillas
 * @returns {undefined}
 */
function metodo_inegi(){
    var dir = L.layerGroup();
    console.log(dir);
    
    /*
     * Se obtienen todas las imagenes que seran utilizadas en el mapa
     * @type String
     */

    /*var CEM3 = new L.TileLayer.WMS("http://W-WEBINTRAIWS02/ImageX/ecw_wms.dll?cem3_mapa?", {
        layers: 'CEM3_MAPA',
        format: 'image/png',
        transparent: true,
        crs: L.CRS.EPSG4326,
        version: '1.1.1'
    });*/
    var osmUrl='http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    //var osmAttrib='Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors';
    var osmAttrib='';
    var osm = new L.TileLayer(osmUrl, {minZoom: 3, maxZoom: 16, attribution: osmAttrib});

    //http://mapserver.inegi.org.mx/geoserver/cem30_workespacewms/wms?service=WMS&version=1.1.0&request=GetMap&layers=cem30_workespacewms:continentes&styles=&bbox=-124.566761848,4.9517726647428,-62.745,45.783296132841&width=512&height=338&srs=EPSG:4326&format=application/openlayers
    var continentes = new L.TileLayer.WMS("http://gaiamapas1.inegi.org.mx/mdmCache/service/wms?", {
        layers: 'cem30_workespacewms:continentes',
        format: 'image/png',
        transparent: true,
        crs: L.CRS.EPSG4326,
        version: '1.1.0'
    });

    var CEM3 = new L.TileLayer.WMS("http://w-webintraiws02/ImageX/ecw_wms.dll?cem3_mapa_new?", {
        layers: 'CEM3_MAPA',
        format: 'image/png',
        transparent: true,
        crs: L.CRS.EPSG4326,
        bgcolor:"0xFFFFFF",
        version: '1.1.1'
    });

    var hipsografica = new L.TileLayer('http://mapserver.inegi.org.mx/imagen_tiles/{z}/{x}/{y}.png', {
        minZoom: 5,
        maxZoom: 11
    });

    var tms = new L.TileLayer('http://mapserver.inegi.org.mx/hscem3/{z}/{x}/{y}.png', {
        minZoom: 3,
        maxZoom: 13,
        tms:true
    });
    
    var southWest = L.latLng(14.5322372942479, -117.124268906205),
        northEast = L.latLng(32.7186263286279 ,-86.7403797742453),
        bounds = L.latLngBounds(southWest,northEast);

        var southWest2 = L.latLng(14, -118),
        northEast2 = L.latLng(33 ,-86.0),
        bounds2 = L.latLngBounds(southWest2,northEast2);
    
    /*
     * Se crea la capa en la cual se manejaran las rejillas
     */
    
    map = new L.Map('map', {layers: [continentes,tms], zoom: 6, minZoom:5, center: new L.LatLng(22.9887, -102.4585), maxZoom: 13 });
    
    map.fitBounds(bounds);
    map.setMaxBounds(bounds2);
    
    /*
     * Se lee el archivo JSON donde estan todas las cordenadas de los poligonos
     * de cada estado
     */
    
    geojsonEstados = L.geoJson(Estados,{
        style: $.cem3.styleEdo,
        onEachFeature: $.cem3.onEachFeatureEdo
    });
    
    /*
     * Se lee el archivo donde estan todas las coordenadas de la cuadricula que
     * sera agregada al mapa
     */
    
    geojsonCaneva50k  = L.geoJson(PoliINEGI,{
            style: $.cem3.styleCaneva50k,
            onEachFeature: $.cem3.onEachFeatureCaneva50k
	});
    
    /*
     * Al cargar el mapa se agrega la capa que delimita los estados
     */
    
    map.addLayer(geojsonEstados);
    
    /*
     * Se van leyendo las lineas del archivo de estados y se van obteniendo
     * las caracteristicas necesarias para su manejo
     * @type Array
     */
    
    var states = [];
                var i=0;
                var a=0;
                for (each in geojsonEstados._layers) {
                    
                    var id=geojsonEstados._layers[each].feature.properties.CVE_ENT;
                    var name = geojsonEstados._layers[each].feature.properties.NOM_ENT;
                    var swLat = geojsonEstados._layers[each].getBounds()._southWest.lat;
                    var swLng = geojsonEstados._layers[each].getBounds()._southWest.lng;
                    var neLat = geojsonEstados._layers[each].getBounds()._northEast.lat;
                    var neLng = geojsonEstados._layers[each].getBounds()._northEast.lng;
                    var bbox = swLat + "," + swLng + "," + neLat + "," + neLng;

                    states.push({clave:id, label: name, value: name, swlat: swLat, swlng: swLng, nelat: neLat, nelng: neLng});

                    //console.log(states[a]);

                    //a++;

                    //console.log(bbox);

                    datosEdo[i] = {};
                    datosEdo[i][0] = each;
                    datosEdo[i][1] = name;
                    //console.log(each);
                    i++;
                }
                
                /*
                 * Se obtiene el nombre del estado al que se le dio click y fue
                 * almacenado en la memoria Cache
                 * @type localStorage.NAME|Storage.NAME
                 */
                
                var NOMBRE_i=localStorage["NAME"];
                //alert(NOMBRE_i);
                /*
                 * Se obtiene un numero que identifica a cada estado, el cual es 
                 * buscado por medio del nombre recuperado
                 */
                for (var i=0; i < 32; i++){
                            if (datosEdo[i][1] === NOMBRE_i){
                                num = datosEdo[i][0];
                                //console.log(num);
                                break;
                            }
                        }
                        
                        /*
                         * Se obtiene la clave que identifica al estado recuperado
                         * esto se hace para delimitar el estado y realizar el zoom
                         * en dicho estado
                         * @type .L@call;geoJson._layers.feature.properties.CVE_ENT
                         */
                        
                var estado = geojsonEstados._layers[num].feature.properties.CVE_ENT;
                
                        console.log(estado);
                        //Aqui empieza
                        
                        /*
                         * Se obtienen los 4 valores que serviran para delimitar
                         * al estado seleccionado
                         * @type type
                         */
                        
                        var w = parseFloat(bbox.split(",")[1]);
                        var s = parseFloat(bbox.split(",")[0]);
                        var e = parseFloat(bbox.split(",")[3]);
                        var n = parseFloat(bbox.split(",")[2]);
                        //console.log(w+"-"+s+"-"+e+"-"+n);
                            
                        /*
                         * Se mandan los valores anteriores para que en el mapa
                         * se muestre el estado, con una linea gruesa que lo rodea
                         * y coloreado
                         */
    
                        map.fitBounds([[(s),(w)],[(n),(e)]]);
                        
                        var layer  = geojsonEstados._layers[num];
                        //console.log(layer);

                        layer.setStyle({
                            fillColor: '#4f91d3',
                            weight: 3,
                            color: '#000',
                            fillOpacity: 0.4
                        });
                        
                        /*
                         * Las siguientes lineas serviran para hacer el zoom y
                         * agregar la cuadricula despues de haber seleccionado
                         * el estado
                         * @type type
                         */
                        
                        var inferior = geojsonEstados._layers[num].getBounds().getSouthWest();
                        var superior = geojsonEstados._layers[num].getBounds().getNorthEast();
                        map.fitBounds(geojsonEstados._layers[num].getBounds());
                        map.addLayer(geojsonCaneva50k);
}

function initMap(){

    var dir = L.layerGroup();
    console.log(dir);

    /*var CEM3 = new L.TileLayer.WMS("http://W-WEBINTRAIWS02/ImageX/ecw_wms.dll?cem3_mapa?", {
        layers: 'CEM3_MAPA',
        format: 'image/png',
        transparent: true,
        crs: L.CRS.EPSG4326,
        version: '1.1.1'
    });*/
    var osmUrl='http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    //var osmAttrib='Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors';
    var osmAttrib='';
    var osm = new L.TileLayer(osmUrl, {minZoom: 3, maxZoom: 16, attribution: osmAttrib});

    //http://mapserver.inegi.org.mx/geoserver/cem30_workespacewms/wms?service=WMS&version=1.1.0&request=GetMap&layers=cem30_workespacewms:continentes&styles=&bbox=-124.566761848,4.9517726647428,-62.745,45.783296132841&width=512&height=338&srs=EPSG:4326&format=application/openlayers
    var continentes = new L.TileLayer.WMS("http://gaiamapas1.inegi.org.mx/mdmCache/service/wms?", {
        layers: 'cem30_workespacewms:continentes',
        format: 'image/png',
        transparent: true,
        crs: L.CRS.EPSG4326,
        version: '1.1.0'
    });

    var CEM3 = new L.TileLayer.WMS("http://w-webintraiws02/ImageX/ecw_wms.dll?cem3_mapa_new?", {
        layers: 'CEM3_MAPA',
        format: 'image/png',
        transparent: true,
        crs: L.CRS.EPSG4326,
        bgcolor:"0xFFFFFF",
        version: '1.1.1'
    });

    var hipsografica = new L.TileLayer('http://mapserver.inegi.org.mx/imagen_tiles/{z}/{x}/{y}.png', {
        minZoom: 5,
        maxZoom: 11
    });

    var tms = new L.TileLayer('http://mapserver.inegi.org.mx/hscem3/{z}/{x}/{y}.png', {
        minZoom: 3,
        maxZoom: 13,
        tms:true
    });

    /*var southWest2 = L.latLng(13.4751, -135.9927),
        northEast2 = L.latLng(34.6332 ,-86.1548),
        bounds2 = L.latLngBounds(southWest2,northEast2);*/

        /*var southWest = L.latLng(13.4751, -119.9927),
        northEast = L.latLng(34.6332 ,-86.1548),
        bounds = L.latLngBounds(southWest,northEast);*/

        var southWest = L.latLng(14.5322372942479, -117.124268906205),
        northEast = L.latLng(32.7186263286279 ,-86.7403797742453),
        bounds = L.latLngBounds(southWest,northEast);

        var southWest2 = L.latLng(14, -118),
        northEast2 = L.latLng(33 ,-86.0),
        bounds2 = L.latLngBounds(southWest2,northEast2);

    map = new L.Map('map', {layers: [continentes,tms], zoom: 6, minZoom:5, center: new L.LatLng(22.9887, -102.4585), maxZoom: 13 });

    geojsonEstados = L.geoJson(Estados,{
        style: $.cem3.styleEdo,
        onEachFeature: $.cem3.onEachFeatureEdo
    });

    map.fitBounds(bounds);
    map.setMaxBounds(bounds2);

    var customLayer = L.geoJson(null, {
        style: $.cem3.styleCaneva50k,
        onEachFeature: $.cem3.onEachFeatureCaneva50k
    });

    var drawnItems = new L.FeatureGroup();
	map.addLayer(drawnItems);

	var drawControl = new L.Control.Draw({
            position: 'topright',
            draw: {
                polygon: {
                    allowIntersection: false,
                    showArea: true,
                    drawError: {
                        color: '#ccc',
			timeout: 1000
                    },
                    shapeOptions: {
                        color: '#ccc'
                    }
                }
            },
            edit: {
                featureGroup: drawnItems,
		remove: true
            }
        });

        map.addControl(drawControl);

	map.on('draw:created', function(e) {
    var type = e.layerType,
      layer = e.layer;

    if (countLayer == 0) {
      drawnItems.addLayer(layer);
      layerAnt = layer;
      countLayer = 1;
    } else {
      drawnItems.removeLayer(layerAnt);
      drawnItems.addLayer(layer);
      layerAnt = layer;
    }

    x1 = drawnItems.getBounds().getWest();
    y1 = drawnItems.getBounds().getSouth();
    x2 = drawnItems.getBounds().getEast();
    y2 = drawnItems.getBounds().getNorth();
  });

  map.on('draw:edited', function(e) {
    var layers = e.layers;
    var countOfEditedLayers = 0;
    layers.eachLayer(function(layer) {
      x1 = drawnItems.getBounds().getWest();
      y1 = drawnItems.getBounds().getSouth();
      x2 = drawnItems.getBounds().getEast();
      y2 = drawnItems.getBounds().getNorth();
    });
  });



  var geojsonEstadosArea = L.geoJson(Estados, {
    style: $.cem3.styleEdoArea,
    onEachFeature: $.cem3.onEachFeatureEdoArea
  })

	var etiquetaEdo = new L.TileLayer.WMS("http://gaia.inegi.org.mx/NLB/balancer.do?map=/opt/map/mdm5texto.map", {
            layers: 't100',
            format: 'image/png',
            transparent: true,
            crs: L.CRS.EPSG4326

        });
    //Se agrega la capa de estados el cargar la paguina----------------------------

    map.addLayer(geojsonEstados);

	geojsonCaneva50k  = L.geoJson(Caneva50k,{
            style: $.cem3.styleCaneva50k,
            onEachFeature: $.cem3.onEachFeatureCaneva50k
	});

        geojsonCenEdos = L.geoJson(cenEdos,{
            pointToLayer: function (feature, latlng) {
                return new L.CircleMarker(latlng, {
                    radius: 0,
                    fillColor: "#A3C990",
                    color: "#000",
                    weight: 1,
                    opacity: 1,
                    fillOpacity: 0
                });
            },
            onEachFeature: $.cem3.onEachFeatureCenEdos
        });



        var options = {
            layers: 'cem30_workespacewms:carta_ptos',
            version: '1.1.0',
            format: 'image/gif',
            transparent: true,
            opacity: 1
        };

        textoCaneva = new L.ImageOverlay.WMS('http://mapserver.inegi.org.mx/geoserver/wms?', options);

        $(".trigger").click(function(){
		$(".panel").toggle("fast");
		$(this).toggleClass("active");
		return false;
	});

        $('body').layout({ applyDefaultStyles: true });

        $('.leaflet-draw').css('display','none');

        $('#cboElemento').selectBox({
            menuSpeed: 'fast'
        });

        //remueve radio button seleccionados al refrescar la pagina
        $('input:radio[name="descarga"]').attr("checked", false);

        $.cem3.cargaClaves50k();

        $.cem3.etiquetaNota();

        $('#radioN').buttonset();
        $('#radioD').buttonset();

        map.on('zoomend ', function(e) {
            $.cem3.activaEtiqueta();
        });

        $(document).on('change','#cboElemento',function(event){
            $.cem3.activaEtiqueta();
        });

        L.control.coordinates({
            position:"bottomleft", //optional default "bootomright"
            decimals:4, //optional default 4
            decimalSeperator:".", //optional default "."
            labelTemplateLat:"&nbsp;{y} N,", //optional default "Lat: {y}"
            labelTemplateLng:"{x} W", //optional default "Lng: {x}"
            enableUserInput:true, //optional default true
            useDMS:true, //optional default false
            useLatLngOrder: false //ordering of labels, default false-> lng-lat
        }).addTo(map);

        //Boton desactivado para pruebas
        L.easyButton('btn3D',
          function() {
            if(map._zoom >= 10){
            //if(map._zoom >= 16){
              var lon1 = map.getBounds()._southWest.lng;
              var lat1 = map.getBounds()._southWest.lat;
              var lon2 = map.getBounds()._northEast.lng;
              var lat2 = map.getBounds()._northEast.lat;
              var newurl = "http://mapserver.inegi.org.mx/Visor3D/index.html?bbox="+lon1+","+lat1+","+lon2+","+lat2+"&incrustado";
              $.cem3.cargaVisor(newurl);
            } else {

            }
          },
          '3D'
        );

        map.on("zoomend", function(e) {
            if (e.target._zoom >= 13) {
                //$(".d3").css("display", "block");
                //$(".d3").disable(false);
            } else {
                //$(".d3").css("display", "none");
                //$(".d3").disable(true);
            }
        });
//-------------------------------------------------------------------------------------------------
        $('#cboElemento').change(function(){
            $.cem3.functionDesc();
            $.cem3.divArea();
            $.cem3.etiquetaNota();
            $.cem3.zoomAll();

            if ($('#cboElemento').val() == 'estatal'){
		idEdo = '00';

                $('#divBtnD').css('display','none');
                //map.removeLayer(geojsonEstadosArea);

                $('.leaflet-draw').css('display','none');
                $('#divContDesc').css('height','55px');

                $('.leaflet-draw').css('display','none');
                //map.removeLayer(geojsonEstadosArea);

                $('#divContDesc').html('');

                //map.removeLayer(geojsonCaneva50k);
                //drawnItems.removeLayer(layerAnt);

                map.addLayer(geojsonEstados);


//Se imprime un mensaje para efectos de pruebas
                console.log("Agrego ya los limites por estados");

                var options =  '<div id="divEdo"><br><select id="cboEdo" style="font-size:80%;">';
                options += '<option value="00">--seleccione una opci&oacute;n--</option>';
                var states = [];
                var i=0;
                var a=0;
                for (each in geojsonEstados._layers) {
                    var name = geojsonEstados._layers[each].feature.properties.NOM_ENT;
                    var swLat = geojsonEstados._layers[each].getBounds()._southWest.lat;
                    var swLng = geojsonEstados._layers[each].getBounds()._southWest.lng;
                    var neLat = geojsonEstados._layers[each].getBounds()._northEast.lat;
                    var neLng = geojsonEstados._layers[each].getBounds()._northEast.lng;
                    var bbox = swLat + "," + swLng + "," + neLat + "," + neLng;

                    states.push({label: name, value: name, swlat: swLat, swlng: swLng, nelat: neLat, nelng: neLng});

                    //console.log(states[a]);

                    //a++;
                    options += '<option value="' + bbox + '">' + geojsonEstados._layers[each].feature.properties.NOM_ENT + '</option>';
                    //console.log(bbox);

                    datosEdo[i] = {};
                    datosEdo[i][0] = each;
                    datosEdo[i][1] = name;
                    //console.log(each);
                    i++;
                }

                options += '</select><div/>';

                $('#divContDesc').append(options);
                $('#cboEdo').selectBox({
                    menuSpeed: 'fast'
                });

                $('#cboEdo').change(function(){
                    //Coordenadas del estado (4 valores)
                    var valor =  $('#cboEdo').val();
                    //Nombre del estado seleccionado
                    var texto = $('#cboEdo option:selected').text();
                  //  console.log(valor);
                    var num;

                    if (valor === "00") {
                        idEdo = '00';
                        $.cem3.functionDesc();
                        map.fitBounds(geojsonEstados.getBounds());

                        if(typeof targetPrevious != 'undefined'){
                            geojsonEstados.resetStyle(targetPrevious);
                        }
                    } else {

                        for (var i=0; i < 32; i++){
                            if (datosEdo[i][1] == texto){
                                num = datosEdo[i][0];
                                //console.log(num);
                                break;
                            }
                        }

                        var estado = geojsonEstados._layers[num].feature.properties.CVE_ENT;
                        console.log(estado);
                        //Aqui empieza

                        var w = parseFloat(valor.split(",")[1]);
                        var s = parseFloat(valor.split(",")[0]);
                        var e = parseFloat(valor.split(",")[3]);
                        var n = parseFloat(valor.split(",")[2]);
                        console.log(w+"-"+s+"-"+e+"-"+n);

                        map.fitBounds([[(s),(w)],[(n),(e)]]);




                        //aqui termina
                        idEdo = estado;
                        $.cem3.functionDesc();
                        var id=localStorage["ID"];
                        console.log(id);
                        var layer  = geojsonEstados._layers[num];
                        //console.log(layer);

                        layer.setStyle({
                            fillColor: '#4f91d3',
                            weight: 3,
                            color: '#000',
                            fillOpacity: 0.4
                        });

                        if((targetPrevious) && (targetPrevious != layer)){
                            layer  = targetPrevious;
                            layer.setStyle({
                                weight: 1,
                                color: '#000',
                                fillOpacity: 0
                            });

                            targetPrevious = "e.target";
                        }

                        targetPrevious = geojsonEstados._layers[num];
                        estdoPrevious = estado;
                        /*Al momento en que se selecciona un estado del input select, se
                         * agrega la capa de poligonos sobre el estado seleccionado
                         */
                        map.addLayer(geojsonCaneva50k);
                    };
                });
////-----------------------CARTA------------------------------------
            } else if ($('#cboElemento').val() == 'carta'){
                idEdo = '00';

                $('#divBtnD').css('display','block');
                if(typeof targetPrevious != 'undefined'){
                    geojsonEstados.resetStyle(targetPrevious);
                }

                map.removeLayer(geojsonEstados);


                $('.leaflet-draw').css('display','none');
                map.removeLayer(geojsonEstadosArea);

                drawnItems.removeLayer(layerAnt);

                $('.leaflet-draw').css('display','none');
                $('#divContDesc').css('height','55px');

                $('#divContDesc').html('<br>'+
                                             '<input type="text" id="txtCarta" maxlength="6"/>');

                //Llena el campo de autocomplete con las claves cartograficas y al seleccionar alguna hace zoom a esa clave
                $( "#txtCarta" ).autocomplete({
                    source: datosClave50k_2,
                    select: function( event, ui ) {
                        $.cem3.seleccionaCarta(ui.item.label);
                    }
                });

            } else {
                map.removeLayer(geojsonCaneva50k);
                map.removeLayer(geojsonEstados);

                map.removeLayer(geojsonEstadosArea);
                drawnItems.removeLayer(layerAnt);

                $('#divContDesc').html('');
                $('#divPasos_c').html('');

            }
        });
//----------------------------------------------------------------------------------------------------
        $(document).on('keypress','#txtCarta',function(event){
            if(event.which === 13){
                var buscarClave = $('#txtCarta').val();
                $.cem3.seleccionaCarta(buscarClave);
            }
        });

        $(document).on('click','#btnD',function(){

            if(($('#cboElemento').val() == 'area') || $('#cboElemento').val() == 'carta' ){

                var nivel = $('input:radio[name="nivel"]:checked').val();

                var gd1=0;
                var gd2=0;

                var capaId = '';
                var valido = false;
                var valida_area = false;
                var area_limite;
                var area_calculada;
                var mensaje_salida;
                var territorio_nacional = false;

                switch(nivel){
                    case '15':
                        gd1=0.0001388889;
                        gd2=-0.0001388889;
                        capaId='cem30_workespace:cem3_r15';
                        area_limite = 11664;
                        break;
                    case '30':
                        gd1=0.0002777778;
                        gd2=-0.0002777778;
                        capaId='cem30_workespace:cem3_r30';
                        area_limite = 46656;
                        break;
                    case '60':
                        gd1=0.0005555560;
                        gd2=-0.0005555560;
                        capaId='cem30_workespace:cem3_r60';
                        area_limite = 186624;
                        break;
                    case '90':
                        gd1=0.0008333330;
                        gd2=-0.0008333330;
                        capaId='cem30_workespace:cem3_r90';
                        area_limite = 419904;
                        break;
                    case '120':
                        gd1=0.0011111111;
                        gd2=-0.0011111111;
                        capaId='cem30_workespace:cem3_r120';
                        area_limite = 746496;
                        break;
                }

                $.get("GeoIntersects",{res:nivel,minx:x1,miny:y1,maxx:x2,maxy:y2},function(respuesta){
                    console.log(respuesta);
                    if(respuesta == 1){
                        territorio_nacional = true;

                        area_calculada = (Math.abs(x2-x1)*108)*(Math.abs(y2-y1)*108);
                        area_calculada = Math.floor(area_calculada);

                        if(($('#cboElemento').val() == 'area')){
                            if(map.hasLayer(layerAnt)){
                                valido = true;
                                if(area_calculada <= area_limite){
                                    valida_area = true;
                                } else {
                                    valida_area = false;
                                    var resultado_calculo = area_calculada-area_limite;

                                    var number = new String(resultado_calculo);

                                    var resultFinal = '';

                                    while( number.length > 3 )
                                    {
                                        resultFinal = ',' + number.substr(number.length - 3) + resultFinal;
                                        number = number.substring(0, number.length - 3);
                                    }

                                    resultFinal = number + resultFinal;

                                    var area_div = trunc(area_limite/1000);
                                    var area_res = area_limite%1000;
                                    var area_string = area_div+','+area_res;

                                    mensaje_salida = "El área que intenta descargar sobrepasa por "+resultFinal+" km2 el valor predefinido de "+area_string+" km2";
                                }
                            } else {
                                mensaje_salida = 'Generar área a descargar';
                            }
                        } else if($('#cboElemento').val() == 'carta'){
                            if($('#txtCarta').val() != ''){
                                var num = '00';
                                num = $.cem3.existeClave($('#txtCarta').val());
                                if(num != '00'){
                                    valido = true;
                                    valida_area = true;
                                    var layer50k  = geojsonCaneva50k._layers[num];
                                    x1 = layer50k.getBounds().getWest();
                                    y1 = layer50k.getBounds().getSouth();
                                    x2 = layer50k.getBounds().getEast();
                                    y2 = layer50k.getBounds().getNorth();
                                } else {
                                    valido = false;
                                    mensaje_salida = "La carta que intenta descargar, no existe";
                                }
                            } else {
                                    valido = false;
                                    mensaje_salida = "No ha capturado la carta a descargar";
                            }
                        }

                        if(valido && valida_area){
                            var x1_1, x2_1, y1_1, y2_1;
                            x1_1 = (trunc(x1*1000000)/1000000).toString();
                            y1_1 = (trunc(y1*1000000)/1000000).toString();
                            x2_1 = (trunc(x2*1000000)/1000000).toString();
                            y2_1 = (trunc(y2*1000000)/1000000).toString();

                            x1_1 = x1_1.replace(".", "_");
                            y1_1 = y1_1.replace(".", "_");
                            x2_1 = x2_1.replace(".", "_");
                            y2_1 = y2_1.replace(".", "_");

                            x1_1 = x1_1.replace("-", "");
                            y1_1 = y1_1.replace("-", "");
                            x2_1 = x2_1.replace("-", "");
                            y2_1 = y2_1.replace("-", "");

                            var carta = $('#txtCarta').val();

                            if (typeof carta == "undefined"){
                                carta = '0';
                            }

                            var resolucion = nivel;

                            var url2 = 'http://mapserver.inegi.org.mx/geoserver/wcs?request=GetCoverage'+
                                        '&service=WCS'+
                                        '&version=1.0.0'+
                                        '&coverage='+capaId+
                                        '&crs=epsg:4326'+
                                        '&bbox='+x1+','+y1+','+x2+','+y2+
                                        '&resx='+gd1+
                                        '&resy='+gd1+
                                        '&format=GeoTIFF';
                                console.log(url2);

                            //window.location.href = url2;
                            $.cookie("fileDownload=true", { path: '/' });

                            //var $preparingFileModal = $("#preparing-file-modal");

                            //$preparingFileModal.dialog({ modal: true });

                            $.fileDownload(url2, {
                                headers: {
                                    "Accept": "image/tiff",
                                    "content-Type": "image/tiff"
                                },
                                successCallback: function (url) {

                                    //$preparingFileModal.dialog('close');
                                    var url="DescargaTifMDE";
                                    var urlParametros = new Object();
                                    urlParametros["clave"] = carta;
                                    urlParametros["resolucion"] = resolucion;
                                    urlParametros["x1"] = x1_1;
                                    urlParametros["y1"] = y1_1;
                                    urlParametros["x2"] = x2_1;
                                    urlParametros["y2"] = y2_1;

                                    $.post(url, urlParametros, function(datos){
                                    });
                                },
                                failCallback: function (responseHtml, url) {

                                }
                            });
                            return false;

                        } else {
                            alert(mensaje_salida);
                        }
                    } else {
                        mensaje_salida = 'No hay información para esta área';
                        alert(mensaje_salida);
                    }
                });

            }
        });

        $(document).on('click','#btnVisualiza3DCarta',function(event){
            $.cem3.visualiza3DCarta();
        });

        $(document).on('click', '#btnDescargaSombreadoCarta',function(event){
            $.cem3.descargaSombreadoCarta();
        });

        $(document).on('click', '#btnDescargaSombreadoArea',function(event){
            $.cem3.descargaSombreadoArea();
        });

        $(document).on('click','#btnVisualiza3DArea',function(event){

            $.cem3.visualiza3DArea();
        });

        $(document).on('click','input:radio[name=nivel]',function(event){
            var existe = $('#cboElemento').val();
            if(existe != '00'){
                $.cem3.functionDesc();
                $.cem3.divArea();
            }
        });

        /*$(document).on('click','.btn3D_1',function(event){
          if(map._zoom >= 11){
              var lon1 = map.getBounds()._southWest.lng;
              var lat1 = map.getBounds()._southWest.lat;
              var lon2 = map.getBounds()._northEast.lng;
              var lat2 = map.getBounds()._northEast.lat;
              var newurl = "http://mapserver.inegi.org.mx/Visor3D/index.html?bbox="+lon1+","+lat1+","+lon2+","+lat2+"&incrustado";
              $.cem3.cargaVisor(newurl);
            } else {

            }
        });


        $(document).on('click','.btn3D_3',function(event){
          if(($('#cboElemento').val() == 'carta')){
            $.cem3.visualiza3DCarta();
          } else if (($('#cboElemento').val() == 'area')){
            $.cem3.visualiza3DArea();
          }
        });

        $(document).on('click','.btn3D_2',function(event){
          if(($('#cboElemento').val() == 'carta')){
            $.cem3.descargaSombreadoCarta();
          } else if (($('#cboElemento').val() == 'area')){
            $.cem3.descargaSombreadoArea();
          }
        });*/
}

