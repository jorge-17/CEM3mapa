;(function($){
    $.cem3 = {
        styleEdo:function(feature){
            return {
		weight: 1,
		opacity: 1,
		color: 'black',
		fillOpacity: 0
            };
        },
        onEachFeatureEdo: function(feature, layer){
            layer.on({
		mouseover: $.cem3.highlightFeature,
		mouseout: $.cem3.resetHighlightEdo,
		click: $.cem3.enabledFeatureEdo
            });
        },
        highlightFeature: function(e){
            var opcion = $("input:radio[name=tipo]:checked").val();
            if (opcion != 'nacional'){
                var layer  = e.target;
                //console.log(layer);
		layer.setStyle({
                    weight: 3
                });
            }
        },
        resetHighlightEdo: function(e){
            var layer  = e.target;
            layer.setStyle({
                weight: 1
            });
        },
        enabledFeatureEdo:function(e){
            var estado = e.target.feature.properties.CVE_ENT;
            console.log(estado);

            $.cem3.zoomToFeature(e,estado);

            idEdo = estado;
            $.cem3.functionDescMapa();

            var swLat = e.target.getBounds()._southWest.lat;
            var swLng = e.target.getBounds()._southWest.lng;
            var neLat = e.target.getBounds()._northEast.lat;
            var neLng = e.target.getBounds()._northEast.lng;
            var bbox = swLat + "," + swLng + "," + neLat + "," + neLng;

            $('#cboEdo').selectBox('value', bbox);
            var layer  = e.target;
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

            targetPrevious = e.target;
            estadoPrevious = estado;
        },
        styleCaneva50k:function(feature){
            return {
                weight: 0.7,
		opacity: 1,
		color: 'black',
                fillOpacity: 0
            };
        },
        onEachFeatureCaneva50k:function(feature, layer){
            layer.on({
		mouseover: $.cem3.highlightFeatureCaneva50k,
                mouseout: $.cem3.resetHighlightCaneva50k,
		click: $.cem3.enabledFeatureCaneva50k
            });
        },
        highlightFeatureCaneva50k:function(e){
            var layer  = e.target;
            layer.setStyle({
		weight: 2
            });
	},
        resetHighlightCaneva50k:function(e){
            var layer  = e.target;
            layer.setStyle({
		weight: 0.7
            });
        },
        enabledFeatureCaneva50k:function(e){
            $.cem3.zoomToFeatureCaneva(e);
            var clave = e.target.feature.properties.clave50k;
            $('#txtCarta').val(clave);

            var layer  = e.target;
            layer.setStyle({
		fillColor: '#4f91d3',
		weight: 3,
		color: '#000',
		fillOpacity: 0.4
            });

            x1 = layer.getBounds().getWest();
            y1 = layer.getBounds().getSouth();
            x2 = layer.getBounds().getEast();
            y2 = layer.getBounds().getNorth();

            if((targetPreviousCarta) && (targetPreviousCarta != layer)){
		layer  = targetPreviousCarta;
		layer.setStyle({
                    weight: 1,
                    color: '#000',
                    fillOpacity: 0
		});

                targetPreviousCarta = "e.target";
            }

            targetPreviousCarta = e.target;
            cartaPrevious = clave;

        },
        styleEdoArea:function(feature){
            return {
		weight: 1,
		opacity: 1,
		color: 'black',
		fillOpacity: 0
            };
        },
        styleCaneva50k:function(feature){
            return {
                weight: 0.7,
		opacity: 1,
		color: 'black',
                fillOpacity: 0
            };
        },
        onEachFeatureEdoArea:function(feature, layer){
            layer.bindLabel(feature.properties.nom_ent, { noHide: true })
        },
        onEachFeatureCaneva50k:function(feature, layer) {
            layer.on({
		mouseover: $.cem3.highlightFeatureCaneva50k,
                mouseout: $.cem3.resetHighlightCaneva50k,
		click: $.cem3.enabledFeatureCaneva50k
            });
	},
        highlightFeatureCaneva50k:function(e){
            var layer  = e.target;
            layer.setStyle({
		weight: 2
            });
	},
        resetHighlightCaneva50k:function(e){
            var layer  = e.target;
            layer.setStyle({
		weight: 0.7
            });
        },
        enabledFeatureCaneva50k:function(e){
            $.cem3.zoomToFeatureCaneva(e);
            var clave = e.target.feature.properties.clave50k;
            $('#txtCarta').val(clave);

            var layer  = e.target;
            layer.setStyle({
		fillColor: '#4f91d3',
		weight: 3,
		color: '#000',
		fillOpacity: 0.4
            });

            x1 = layer.getBounds().getWest();
            y1 = layer.getBounds().getSouth();
            x2 = layer.getBounds().getEast();
            y2 = layer.getBounds().getNorth();

            if((targetPreviousCarta) && (targetPreviousCarta != layer)){
		layer  = targetPreviousCarta;
		layer.setStyle({
                    weight: 1,
                    color: '#000',
                    fillOpacity: 0
		});

                targetPreviousCarta = "e.target";
            }

            targetPreviousCarta = e.target;
            cartaPrevious = clave;

        },
        onEachFeatureCenEdos:function(feature, layer){
            layer.bindLabel(feature.properties.nom_ent, { noHide: true })
        },
        cargaClaves50k:function(){
            var i=0;
            for (each in geojsonCaneva50k._layers) {
                var clave = geojsonCaneva50k._layers[each].feature.properties.clave50k;
                var swLat = geojsonCaneva50k._layers[each].getBounds()._southWest.lat;
                var swLng = geojsonCaneva50k._layers[each].getBounds()._southWest.lng;
                var neLat = geojsonCaneva50k._layers[each].getBounds()._northEast.lat;
                var neLng = geojsonCaneva50k._layers[each].getBounds()._northEast.lng;
                var bbox = swLat + "," + swLng + "," + neLat + "," + neLng;

                datosClave50k[i] = {};
                datosClave50k[i][0] = each;
                datosClave50k[i][1] = clave;
                datosClave50k.push(datosClave50k);
                datosClave50k.push(clave);
                datosClave50k_2.push(clave);
                i++;
            }

            num50k = datosClave50k.length;
        },
        etiquetaNota:function(){

            var seleccionado = $('#cboElemento').val();
            var nivel = $('input:radio[name="nivel"]:checked').val();

            var mensaje;
            var pasos_a;

            switch(seleccionado){
                case 'nacional':
                    if(nivel =='15' || nivel =='30'){
                    } else {
                        pasos_a = '';
                    }
                    break;
                case 'estatal':
                    pasos_a = '<br><div class="circulos">3</div><font class="separacion"><strong>Seleccione el &Aacute;rea Geoestad&iacute;stica Estatal de la lista desplegable o d&eacute; clic en objeto geogr&aacute;fico del mapa</strong></font>';
                    break;
                case 'area':
                    pasos_a = '';
                    break;
                case 'carta':
                    pasos_a = '<br><div class="circulos" >3</div><font class="separacion"><strong>Escriba la clave de la carta topogr&aacute;fica en el cuadro de texto o d&eacute; clic en el canev&aacute; del mapa</strong></strong></font>';
                    break;
            }

            if(typeof pasos_a != 'undefined'){
                $('#divPasos_c').html(pasos_a);
            } else {
                $('#divNotas').html('');
            }
        },
        activaEtiqueta:function(){
            if(($('#cboElemento').val()=='estatal')||($('#cboElemento').val()=='area')){
                map.removeLayer( textoCaneva );
                if ( map.getZoom() > 6 ){ map.addLayer( geojsonCenEdos )}
                else if ( map.getZoom() <= 6 ){ map.removeLayer( geojsonCenEdos )}
                if($('#cboElemento').val()=='estatal'){

                    //alert(map.fitBounds(geojsonEstados.getBounds()._southWest.lat));
                }
            } else if($('#cboElemento').val()=='carta'){
                map.addLayer(textoCaneva);
                textoCaneva.bringToBack();
                map.addLayer(geojsonCaneva50k);

                map.removeLayer( geojsonCenEdos );

            } else {
                map.removeLayer( textoCaneva );

                map.removeLayer( geojsonCenEdos );
            }
        },
        functionDesc:function(){
            var mensaje = '';
            $('#divLabelDesc').html(mensaje);

            var nivelD = $("input:radio[name=nivel]:checked").val();

            if(($('#cboElemento').val() == 'nacional')){
                    mensaje += '<div class="titulo"><div class="circulos" >3</div><font class="separacion"><strong>D&eacute; clic en la(s) liga(s) para iniciar la descarga del CEM completo</strong></font></div>';
                    mensaje += '<div style="font-size:110%">';
                    mensaje += '<div style="padding-left:20px;">';
                if(nivelD == '15'){
                    mensaje += '<br>';
                    var extra;
                    for(var i=1; i<=11; i++){
                        if(i<=9){
                            extra = '0';
                        } else {
                            extra = '';
                        }
                        mensaje += '<a class="links" href="CEM_V3_R'+nivelD+'_Nacional_Parte' +(extra+i)+ '.rar?idEntidad=Nacional&idResolucion='+nivelD+'&idParte='+(extra+i)+'">CEM_V3_R'+nivelD+'_Nacional_Parte'+(extra+i)+'.rar</a><br>';
                    }
                } else {
                    mensaje += '<br>';
                    if(nivelD == '30'){
                        for(i=1; i<=4; i++){
                            mensaje += '<a class="links" href="CEM_V3_R'+nivelD+'_Nacional_Parte0' +i+ '.rar?idEntidad=Nacional&idResolucion='+nivelD+'&idParte=0'+i+'">CEM_V3_R'+nivelD+'_Nacional_Parte0'+i+'.rar</a><br>';
                        }
                    } else {
                        $('#divPasos_c').html('');
                        mensaje += '<a class="links" href="CEM_V3_R'+nivelD+'_Nacional.rar?idEntidad=Nacional&idResolucion='+nivelD+'">CEM_V3_R'+nivelD+'_Nacional.rar</a><br>';
                    }
                }
                mensaje += '</div>';
                if(nivelD == '15' || nivelD == '30'){
                    $('#divPasos_c').html('<br><div class="esquina"><a id="btnAdvertencia" class="link_modal" href="#">[+] Advertencia</a></div>');
                    mensaje += '<br><div class="esquina"><a id="btnNota" class="link_modal" href="#">[+] Nota</a></div>';
                }
                mensaje += '</div>';
            } else if(($('#cboElemento').val() == 'estatal')){
                if (idEdo != '00'){
                    mensaje += '<br><div class="titulo"><div class="circulos" >4</div><font class="separacion"><strong>D&eacute; clic en la liga para iniciar la descarga</strong></font></div>';
                    mensaje += '<div style="padding-left:20px;">';
                    mensaje += '<br><a class="links" href="CEM_V3_R'+nivelD+'_E'+idEdo+'.rar?idEntidad='+idEdo+'&idResolucion='+nivelD+'">CEM_V3_R'+nivelD+'_E'+idEdo+'.rar</a>';
                    mensaje += '</div>';
                } else {
                    idEdo = '00'
                    mensaje = '';
                }
            } else if(($('#cboElemento').val() == 'carta')){
                mensaje += '<div class="circulos" >4</div><font class="separacion"><strong>D&eacute; clic en la liga para iniciar la descarga</strong></strong></font>';
                mensaje += '<div style="font-size:110%; padding-left:20px;">';
                //mensaje += '<br><a href="#" class="links" id="btnD">Descargar CEM</a>';

                mensaje += '<br><a href="#" class="links" id="btnD">Descargar CEM</a>&nbsp;&nbsp;&nbsp;&nbsp;<a href="#" class="links" id="btnDescargaSombreadoCarta">Descargar sombreado</a>';
                mensaje += '<br><br><img src="images/3D-circulo-16.png">&nbsp;<a href="#" class="links" id="btnVisualiza3DCarta">Visualizar &aacute;rea de descarga en 3D</a>';

                mensaje += '</div>';
            } else if(($('#cboElemento').val() == 'area')){
                mensaje += '<br><div class="titulo"><div class="circulos" >3</div><font class="separacion"><strong>Seleccione herramienta <i>Dibujar &aacute;rea</i> localizada a la derecha del mapa</strong></font></div>';
                mensaje += '<div style="font-size:110%; padding-left:20px;">';
                mensaje += '<img src="css/images/boton_new.png">';
                mensaje += '</div>';
                mensaje += '<br><div class="titulo"><div class="circulos" >4</div><font class="separacion"><strong>Dibuje un rectangulo sobre el mapa</strong></font></div>';
                mensaje += '<div style="font-size:110%; padding-left:20px;">';
                mensaje += '<img src="css/images/poligono_new.png">';
                mensaje += '</div>';
                mensaje += '<br><div class="esquina"><a id="btnEdit" class="link_modal" href="#">[+] Editar un &aacute;rea</a></div>';
                mensaje += '<div class="esquina"><a id="btnElim" class="link_modal" href="#">[+] Borrar un &aacute;rea</a></div>';
                mensaje += '<br><div class="titulo"><font class="separacion"><strong>Nota: El &aacute;rea m&aacute;xima para la descarga se ajustar&aacute; seg&uacute;n la resoluci&oacute;n, observe el dato en la esquina inferior izquierda del mapa</strong></font></div>';
                mensaje += '<br><div class="circulos" >5</div><font class="separacion"><strong>D&eacute; clic en la liga para iniciar la descarga</strong></strong></font>';
                mensaje += '<div style="font-size:110%; padding-left:20px;">';
                //mensaje += '<br><a href="#" class="links" id="btnD">Descargar CEM</a>';

                mensaje += '<br><a href="#" class="links" id="btnD">Descargar CEM</a>&nbsp;&nbsp;&nbsp;&nbsp;<a href="#" class="links" id="btnDescargaSombreadoArea">Descargar sombreado</a>';
                mensaje += '<br><br><img src="images/3D-circulo-16.png">&nbsp;<a href="#" class="links" id="btnVisualiza3DArea">Visualizar &aacute;rea de descarga en 3D</a>';

                mensaje += '</div>';

            } else {
                mensaje = '';
            }

            $('#divLabelDesc').html(mensaje);

        },
        divArea:function(){
            if(($('#cboElemento').val()=='area')){
                var nivel = $('input:radio[name="nivel"]:checked').val();
                $('.area-control-label').css('display','block');
                $('#labelResolucion').html(nivel);
                var area = $.cem3.devuelveArea();
                var area_div = $.cem3.trunc(area/1000);
                var area_res = area%1000;
                var area_string = area_div+','+area_res;
                $('#labelAreaMax').html(area_string);
                $('#areamax_val').val(area);

                var areacalculada = $('#areacalculada_val').val();

                var styles = {
                    backgroundColor : "red",
                    color: "white"
                };

                if(areacalculada > area){
                    $('#labelArea').css(styles);
                } else
                    $('#labelArea').removeAttr('style');

            } else {
                $('.area-control-label').css('display','none');
                $('#labelResolucion').html('0');
                $('#labelAreaMax').html('0');
                $('#labelArea').html('0');
            }
        },
        etiquetaNota:function(){

            var seleccionado = $('#cboElemento').val();
            var nivel = $('input:radio[name="nivel"]:checked').val();

            var mensaje;
            var pasos_a;

            switch(seleccionado){
                case 'nacional':
                    if(nivel =='15' || nivel =='30'){
                    } else {
                        pasos_a = '';
                    }
                    break;
                case 'estatal':
                    pasos_a = '<br><div class="circulos">3</div><font class="separacion"><strong>Seleccione el &Aacute;rea Geoestad&iacute;stica Estatal de la lista desplegable o d&eacute; clic en objeto geogr&aacute;fico del mapa</strong></font>';
                    break;
                case 'area':
                    pasos_a = '';
                    break;
                case 'carta':
                    pasos_a = '<br><div class="circulos" >3</div><font class="separacion"><strong>Escriba la clave de la carta topogr&aacute;fica en el cuadro de texto o d&eacute; clic en el canev&aacute; del mapa</strong></strong></font>';
                    break;
            }

            if(typeof pasos_a != 'undefined'){
                $('#divPasos_c').html(pasos_a);
            } else {
                $('#divNotas').html('');
            }
        },
        zoomAll:function(){
            var southWest = L.latLng(13.844545, -117.297442),
                northEast = L.latLng(33.035270, -86.315642),
                bounds = L.latLngBounds(southWest,northEast);
            map.fitBounds(bounds);
        },
        zoomToFeature:function(e,estado){
            var inferior = e.target.getBounds().getSouthWest();
            var superior = e.target.getBounds().getNorthEast();
            map.fitBounds(e.target.getBounds());
	},
        functionDescMapa:function(){
            var mensaje;
            var nivelD = $("input:radio[name=nivel]:checked").val();
            mensaje  = '<div class="titulo"><div class="circulos" >4</div><font class="separacion"><strong>D&eacute; clic en la liga para iniciar la descarga</strong></font></div>';
            mensaje += '<div style="padding-left:20px;">';
            mensaje += '<br><a class="links" href="CEM_V3_R'+nivelD+'_E'+idEdo+'.rar?idEntidad='+idEdo+'&idResolucion='+nivelD+'">CEM_V3_R'+nivelD+'_E'+idEdo+'.rar</a><br>';
            mensaje += '</div>';
            $('#divLabelDesc').html(mensaje);
	},
        devuelveArea:function(){
            var nivel = $('input:radio[name="nivel"]:checked').val();
            var area_limite;
            switch(nivel){
                case '15':
                    area_limite = 11664;
                    break;
                case '30':
                    area_limite = 46656;
                    break;
                case '60':
                    area_limite = 186624;
                    break;
                case '90':
                    area_limite = 419904;
                    break;
                case '120':
                    area_limite = 746496;
                    break;
            }

            return(area_limite);
        },
        trunc:function(x) {
            return x < 0 ? Math.ceil(x) : Math.floor(x);
        },
        zoomToFeatureCaneva:function(e){
            var inferior = e.target.getBounds().getSouthWest();
            var superior = e.target.getBounds().getNorthEast();
            var w = inferior.lng;
            var s = inferior.lat;
            var e = superior.lng;
            var n = superior.lat;

            map.fitBounds([[s,(w)],[n,(e)]]);

	},
        seleccionaCarta:function(carta){
                var num = '00';

                num = $.cem3.existeClave(carta);

                if(num !== '00'){
                    var cve50k = geojsonCaneva50k._layers[num].feature.properties.clave50k;
                    var layer50k  = geojsonCaneva50k._layers[num];

                    var inferior = layer50k.getBounds().getSouthWest();
                    var superior = layer50k.getBounds().getNorthEast();
                    var w = inferior.lng;
                    var s = inferior.lat;
                    var e = superior.lng;
                    var n = superior.lat;

                    map.fitBounds([[s,(w)],[n,(e)]]);

                    x1 = layer50k.getBounds().getWest();
                    y1 = layer50k.getBounds().getSouth();
                    x2 = layer50k.getBounds().getEast();
                    y2 = layer50k.getBounds().getNorth();

                    layer50k.setStyle({
                        fillColor: '#4f91d3',
                        weight: 1,
                        color: '#000',
                        fillOpacity: 0.4
                    });

                    if((targetPreviousCarta) && (targetPreviousCarta !== layer50k)){
                        layer50k  = targetPreviousCarta;
                        layer50k.setStyle({
                            weight: 1,
                            color: '#000',
                            fillOpacity: 0
                        });

                        targetPreviousCarta = "e.target";
                    }

                    targetPreviousCarta = geojsonCaneva50k._layers[num];
                    cartaPrevious = cve50k;
                } else {
                    layer50k  = targetPreviousCarta;;
                    layer50k.setStyle({
                            weight: 1,
                            color: '#000',
                            fillOpacity: 0
                        });
                    targetPreviousCarta = "";
                    alert('Carta no existe');
                }

        },
        loadArea: function(_val){
            if(map.hasLayer(layerAnt)){
                var lon1 = layerAnt.getBounds()._southWest.lng;
                var lat1 = layerAnt.getBounds()._southWest.lat;
                var lon2 = layerAnt.getBounds()._northEast.lng;
                var lat2 = layerAnt.getBounds()._northEast.lat;

                /*if(map._zoom < 13)
                    alert('Hacer un acercamiento mayor');
                else {
                    var newurl = "http://10.153.3.13:8080/Visor3D/index.html?bbox="+lon1+","+lat1+","+lon2+","+lat2+"&incrustado";
                    $.cem3.cargaVisor(newurl);
                }*/
            } else {
                alert('Defina un área a visualizar');
            }
        },
        loadCarta: function(){
            var buscarClave = $('#txtCarta').val();
            var num = '00';
            num = $.cem3.existeClave(buscarClave);
            if(num !== '00'){
                 var newurl = "http://mapserver.inegi.org.mx/Visor3D/index.html?carta="+buscarClave+"&incrustado";
                $.cem3.cargaVisor(newurl);
            } else {
                alert('Seleccione una carta topográfica para visualizar');
            }
        },
        existeClave: function(buscarClave){
            var num = '00';
            var i=0;
            for(i=0; i<num50k; i++){
                if(buscarClave == datosClave50k[i][1]){
                    num = datosClave50k[i][0];
                    break;
                }
            }

            return(num);
        },
        cargaVisor: function(urlVisor) {
            contenidoDialogo = document.createElement("IFRAME");
            $('#divVisor3D').dialog("open");
            $(contenidoDialogo).css({
                'width': ($('#divVisor3D').innerWidth() - 4) + 'px',
                'height': ($('#divVisor3D').innerHeight() - 10) + 'px'
            });
            contenidoDialogo.src = urlVisor;
        },
        visualiza3DCarta:function(){
            var buscarClave = $('#txtCarta').val();
            var num = '00';
            num = $.cem3.existeClave(buscarClave);
            if(num !== '00'){
                var newurl = "http://mapserver.inegi.org.mx/Visor3D/index.html?carta="+buscarClave+"&incrustado";
                console.log(newurl);
                $.cem3.cargaVisor(newurl);
            } else {
                alert('Seleccione una carta topográfica para visualizar');
            }
        },
        visualiza3DArea:function(){
            if(map.hasLayer(layerAnt)){
                var lon1 = layerAnt.getBounds()._southWest.lng;
                var lat1 = layerAnt.getBounds()._southWest.lat;
                var lon2 = layerAnt.getBounds()._northEast.lng;
                var lat2 = layerAnt.getBounds()._northEast.lat;
                if($('#labelArea').hasClass('rojo_area')){
                    alert('Reduzca el area a visualizar');
                } else {
                    var newurl = "http://mapserver.inegi.org.mx/Visor3D/index.html?bbox="+lon1+","+lat1+","+lon2+","+lat2+"&incrustado";
                    $.cem3.cargaVisor(newurl);
                }
            } else {
                alert('Defina un área a visualizar');
            }
        },
        descargaSombreadoCarta: function(){
            var buscarClave = $('#txtCarta').val();
            var num = '00';
            num = $.cem3.existeClave(buscarClave);
            if(num !== '00'){
                var layer50k  = geojsonCaneva50k._layers[num];
                var x1_sa = layer50k.getBounds().getWest();
                var y1_sa = layer50k.getBounds().getSouth();
                var x2_sa = layer50k.getBounds().getEast();
                var y2_sa = layer50k.getBounds().getNorth();
                $.cem3.descargaSombreado(x1_sa,y1_sa,x2_sa,y2_sa);
            } else {
                alert('Seleccione una carta topográfica para descargar sombreado');
            }
        },
        descargaSombreadoArea: function(){
            if(map.hasLayer(layerAnt)){
                var lon1 = layerAnt.getBounds()._southWest.lng;
                var lat1 = layerAnt.getBounds()._southWest.lat;
                var lon2 = layerAnt.getBounds()._northEast.lng;
                var lat2 = layerAnt.getBounds()._northEast.lat;
                if($('#labelArea').hasClass('rojo_area')){
                    alert('Reduzca el area para descargar sombreado');
                } else {
                    $.cem3.descargaSombreado(lon1,lat1,lon2,lat2);
                }
            } else {
                alert('Defina un área para descargar sombreado');
            }
        },
        descargaSombreado: function(_x1,_y1,_x2,_y2){
            var ancho = ((Math.abs(_x1-_x2))*111120)/30;
            var alto = ((Math.abs(_y1-_y2))*111120)/30;

            ancho = Math.ceil(ancho);
            alto = Math.ceil(alto);

            //var url = 'http://mapserver.inegi.org.mx/Visor3D/ArchivoWMS?http://w-webintraiws02/ImageX/ecw_wms.dll?cem3_mapa_new?&'+
            var url = 'http://mapserver.inegi.org.mx/Visor3D/ArchivoWMS?http://w-webintraiws02/ImageX/ecw_wms.dll?cem3_new?&'+
                    'SERVICE=WMS&'+
                    'REQUEST=GetMap&'+
                    'VERSION=1.1.1&'+
                    'LAYERS=CEM3_MAPA&'+
                    'STYLES=&FORMAT=image/jpeg&'+
                    'TRANSPARENT=false&BGCOLOR=0x000000&'+
                    'SRS=EPSG:4326&'+
                    'width='+ancho+'&'+
                    'height='+alto+'&'+
                    'bbox='+_x1+','+_y1+','+_x2+','+_y2+'&'+
                    'outputfilename=Sombreado_grises';

            window.location.href = url;
            //console.log(url);
        }
    };
})(jQuery);
