<%-- 
    Document   : index
    Created on : 21-oct-2016, 8:09:02
    Author     : jrodarte
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>




<!DOCTYPE html>


<!-- Mirrored from mapserver.inegi.org.mx/CEM3_mapa/ by HTTrack Website Copier/3.x [XR&CO'2014], Wed, 12 Oct 2016 20:37:57 GMT -->
<!-- Added by HTTrack --><meta http-equiv="content-type" content="text/html;charset=UTF-8" /><!-- /Added by HTTrack -->
<head>
    <title>Descarga del CEM 3.0</title>
<a href="XML_Lidar/Nube_Puntos_LiDAR_E13B23f3.xml"></a>
    <link rel="icon" type="image/gif" href="css/images/icoINEGI.gif" />

    <link rel="stylesheet" href="css/leaflet.css" />
    <script type="text/javascript" src="js/leaflet-src.js"></script>
    <!--[if lte IE 8]><link rel="stylesheet" href="css/leaflet.ie.css" /><![endif]-->

    <link rel="stylesheet" href="css/leaflet.draw.css" />
    <script type="text/javascript" src="js/Leaflet.draw.js"></script>
    <!--[if lte IE 8]><link rel="stylesheet" href="css/leaflet.draw.ie.css" /><![endif]-->

    <script type="text/javascript" src="js/Edit.Poly.js"></script>
    <script type="text/javascript" src="js/Edit.SimpleShape.js"></script>
    <script type="text/javascript" src="js/Edit.Rectangle.js"></script>

    <script type="text/javascript" src="js/Draw.Feature.js"></script>
    <script type="text/javascript" src="js/Draw.Polyline.js"></script>
    <script type="text/javascript" src="js/Draw.Polygon.js"></script>
    <script type="text/javascript" src="js/Draw.SimpleShape.js"></script>
    <script type="text/javascript" src="js/Draw.Rectangle.js"></script>

    <script type="text/javascript" src="js/Control.Draw.js"></script>
    <script type="text/javascript" src="js/Tooltip.js"></script>
    <script type="text/javascript" src="js/Toolbar.js"></script>

    <script type="text/javascript" src="js/DrawToolbar.js"></script>
    <script type="text/javascript" src="js/EditToolbar.js"></script>
    <script type="text/javascript" src="js/EditToolbar.Edit.js"></script>
    <script type="text/javascript" src="js/EditToolbar.Delete.js"></script>

    <script type="text/javascript" src="js/LatLngUtil.js"></script>

    <script type="text/javascript" src="js/Label.js"></script>
    <script type="text/javascript" src="js/BaseMarkerMethods.js"></script>
    <script type="text/javascript" src="js/Marker.Label.js"></script>
    <script type="text/javascript" src="js/CircleMarker.Label.js"></script>
    <script type="text/javascript" src="js/Path.Label.js"></script>
    <script type="text/javascript" src="js/Map.Label.js"></script>
    <script type="text/javascript" src="js/FeatureGroup.Label.js"></script>
    <link rel="stylesheet" href="css/leaflet.label.css" />

    <link type="text/css" rel="stylesheet" href="css/Control.Coordinates.css"/>
    <link type="text/css" rel="stylesheet" href="css/Control.Coordinates.ie.css"/>
    <script type="text/javascript" src="js/Control.Coordinates.js"></script>
    <script type="text/javascript" src="js/NumberFormatter.js"></script>

    <script type="text/javascript" src="js/jquery-1.11.0.min.js"></script>

    <link href="css/modal.css" rel="stylesheet" type="text/css">
    <script src="js/capas/CoberturaMDE_LiDAR.js" type="text/javascript"></script>
    <script src="js/capas/estados.js" type="text/javascript"></script>
    <script src="js/capas/caneva150k.js" type="text/javascript"></script>
    <script type="text/javascript" src="js/capas/centroidesEdo.js"></script>

    <script type="text/javascript" src="js/jquery-ui-1.10.4.custom.js"></script>
    <link rel="stylesheet" href="css/jquery-ui-1.10.3.custom.css" type="text/css" />

    <script type="text/javascript" src="js/jquery.selectBox.js"></script>
    <link type="text/css" rel="stylesheet" href="css/jquery.selectBox.css"/>

    <link type="text/css" rel="stylesheet" href="css/Control.area.css"/>

    <script type="text/javascript" src="js/layout2/jquery.layout-latest2.js"></script>

    <script type="text/javascript" src="js/Leaflet.singletilewms.js"></script>

    <script type="text/javascript" src="js/leaflet-omnivore.js"></script>

    <script type="text/javascript" src="js/jquery.fileDownload.js"></script>

    <script type="text/javascript" src="js/easy-button.js"></script>

    <script type="text/javascript" src="js/funciones.js"></script>
    <script type="text/javascript" src="js/init.js"></script>

    <script type="text/javascript">
        /*var _gaq = _gaq || [];
	_gaq.push(['_setAccount', 'UA-941940-28']);
	_gaq.push(['_trackPageview']);

	(function() {
            var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
            ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
            var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
	})();*/
    </script>
    <script>

        $(document).ready(function(){



            $( "#dialogEditar" ).dialog({
                autoOpen: false,
                height: 380,
                width: 427,
                modal: true
            });

            $( "#dialogBorrar" ).dialog({
                autoOpen: false,
                height: 370,
                width: 427,
                modal: true
            });

            $( "#dialogAdvertencia" ).dialog({
                autoOpen: false,
                height: 150,
                width: 427,
                modal: true
            });

            $( "#dialogNota" ).dialog({
                autoOpen: false,
                height: 150,
                width: 427,
                modal: true
            });

            $(document).on('click','#btnEdit',function(){
               $( "#dialogEditar" ).dialog( "open" );
            });

            $(document).on('click','#btnElim',function(){
               $( "#dialogBorrar" ).dialog( "open" );
            });

            $(document).on('click','#btnAdvertencia',function(){
               $( "#dialogAdvertencia" ).dialog( "open" );
            });

            $(document).on('click','#btnNota',function(){
               $( "#dialogNota" ).dialog( "open" );
            });
        });

        $(function() {
            $('a[rel*=leanModal]').leanModal({ top : 100, closeButton: ".modal_close" });
        });

        $(function() {
            $( "#tabs" ).tabs();
        });

        $(function(){
            var ht, wt;

            wt = $(document).width();
            ht = $(document).height();

            $('#divVisor3D').dialog({
                autoOpen: false,
                draggable: false,
                width: wt-100,
                height: ht-100,
                title: "Vista 3D",
                resizable: false,
                modal: true,
                open: function( event, ui ) {
                    $('#map').hide();
                    $(contenidoDialogo).appendTo(this);
                },
                close: function( event, ui ) {
                    $('#map').show();
                    $(this).empty();
                    contenidoDialogo = undefined;
                }
            }).css("padding", "0px");
        });

        $('#cboEdo').selectBox({
            menuSpeed: 'fast'
        });


    </script>
        <style>
        #dialog-message {
            font-family: "Trebuchet MS", "Helvetica", "Arial",  "Verdana", "sans-serif";
            font-size: 80%;
        }


        #divDescarga {
            height: 95px;
	}

	body {
            font-family: "Trebuchet MS", "Helvetica", "Arial",  "Verdana", "sans-serif";
            font-size: 75%;
	}

	.classFuente {
            font-family: "Trebuchet MS", "Helvetica", "Arial",  "Verdana", "sans-serif";
            font-size: 80%;
	}

	#divLabelDesc {
            height: auto;
        }

	label {
            color: #3482b0;
	}

        #divContDesc {
            padding:0px 0px 0px 0px
	}

	#divLabelDesc {
            padding:0px 0px 0px 0px
	}

        .circulos {
            background-color: #808486;
            color: white;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            text-align: center;
            vertical-align: middle;
            float: left;
        }

        .circulos2 {
            background-color: #808486;
            color: white;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            text-align: center;
            vertical-align: middle;
            float: left;
            padding-top: 2px;
        }

        .separacion {
            padding-left: 5px;
        }

        .elementos {
            font-size: 80%;
        }

        .titulo {
            font-size: 100%;
        }

        .justificacion {
           text-align:justify;
           text-justify:inter-word;
        }

        a.links:link      {color:#d51f07;}      /* unvisited link */
        a.links:visited   {color:#d51f07;}  /* visited link */
        a.links:hover     {color:#3482b0;}  /* mouse over link */
        a.links:active    {color:#d51f07;}  /* selected link */

        a.link_modal:link       {color:#3482b0;}
        a.link_modal:visited    {color:#3482b0;}
        a.link_modal:hover      {color:#3482b0;}
        a.link_modal:active     {color:#3482b0;}

        .esquina {
            text-align: right;
            padding-right: 5px;
        }

        #piePagina {
            position: absolute;
            bottom: 20px; right: 5px;
            z-index: 1001;
        }
        #piePagina2 {
            position: absolute;
            bottom: 5px; right: 5px;
            z-index: 1001;
        }

        .leaflet-control-zoom-in {
            background-image: url('images/sprite01.png');
            background-repeat: no-repeat;
            background-position: 0px 0px;
        }

        .leaflet-control-zoom-full {
            background-image: url('images/sprite02.png');
            background-repeat: no-repeat;
            background-position: 0px 0px;
        }

        .leaflet-control-zoom-out {
            background-image: url('images/sprite03.png');
            background-repeat: no-repeat;
            background-position: 0px 0px;
        }

        .panel {
            position: fixed;
            top: 10px;
            left: 0;
            display: block;
            background: #E6E6E6;
            border:1px solid #111111;
            -moz-border-radius-topright: 4px;
            -webkit-border-top-right-radius: 4px;
            -moz-border-radius-bottomright: 4px;
            -webkit-border-bottom-right-radius: 4px;
            border-radius: 0px 4px 4px 0px;
            width: 330px;
            height: 550px;
            padding: 45px 0px 30px 10px;
            filter: alpha(opacity=85);
            opacity: .85;
            behavior: url(js/pie/PIE.htc);
        }

        .panel:hover {
            filter: alpha(opacity=85);
            opacity: .85;
        }

        .panel p{
            margin: 0 0 15px 0;
            padding: 0;
            color: #cccccc;
        }

        a.trigger{
            position: fixed;
            text-decoration: none;
            top: 10px; left: 0;
            font-size: 16px;
            letter-spacing:-1px;
            font-family: verdana, helvetica, arial, sans-serif;
            color:#fff;
            padding: 5px 35px 5px 5px;
            font-weight: 700;
            background:#333333 url(images/02.png) 85% 55% no-repeat;
            border:1px solid #444444;
            -moz-border-radius-topright: 4px;
            -webkit-border-top-right-radius: 4px;
            -moz-border-radius-bottomright: 4px;
            -webkit-border-bottom-right-radius: 4px;
            -moz-border-radius-bottomleft: 0px;
            -webkit-border-bottom-left-radius: 0px;
            border-radius: 0px 4px 4px 0px;
            display: block;
        }

        a.trigger:hover{
            position: fixed;
            text-decoration: none;
            top: 10px; left: 0;
            font-size: 16px;
            letter-spacing:-1px;
            font-family: verdana, helvetica, arial, sans-serif;
            color:#fff;
            padding: 5px 35px 5px 5px;
            font-weight: 700;
            background:#222222 url(images/02.png) 85% 55% no-repeat;
            border:1px solid #444444;
            -moz-border-radius-topright: 4px;
            -webkit-border-top-right-radius: 4px;
            -moz-border-radius-bottomright: 4px;
            -webkit-border-bottom-right-radius: 4px;
            -moz-border-radius-bottomleft: 0px;
            -webkit-border-bottom-left-radius: 0px;
            border-radius: 0px 4px 4px 0px;
            display: block;
        }

        a.active.trigger {
            background:#222222 url(images/01.png) 85% 55% no-repeat;
        }

        .btn3D {
            background-image: url('images/3D.png');
            background-repeat: no-repeat;
            background-position: 0px 0px;
        }

        .rojo_area {
            color:red;
        }

        .btn3D_1 {
            cursor:pointer;
            z-index: 1051;
            position: absolute;
            display: block;
            bottom: 1px; right: 2px;
            width: 5px;
            -webkit-border-radius:5px;
            -moz-border-radius:5px;
            border-radius:5px;
            margin:0px;
            padding: 2px;
            color: #959595;

        }

        .btn3D_2 {
            cursor:pointer;
            z-index: 1051;
            position: absolute;
            display: block;
            bottom: 1px; left: 2px;
            width: 5px;
            -webkit-border-radius:5px;
            -moz-border-radius:5px;
            border-radius:5px;
            margin:0px;
            padding: 2px;
            color: #959595;

        }

        .btn3D_3 {
            cursor:pointer;
            z-index: 1051;
            position: absolute;
            display: block;
            bottom: 15px; left: 2px;
            width: 5px;
            -webkit-border-radius:5px;
            -moz-border-radius:5px;
            border-radius:5px;
            margin:0px;
            padding: 2px;
            color: #959595;
        }
        .panel,
        #ocultar{
            visibility: hidden;
        }


    </style>

</head>
<body onLoad="metodo_inegi();">
    
    <div id="map" class="ui-layout-center" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; margin: 0; padding: 0; background: rgb(255, 255, 255); ">
        
        <div class="area-control-label">
            En resoluci&oacute;n de&nbsp;<span id="labelResolucion"></span>&nbsp;m<br>
            &Aacute;rea m&aacute;xima:&nbsp;<span id="labelAreaMax"></span> km<sup>2</sup><br>
            &Aacute;rea actual:&nbsp;<span id="labelArea">0 km<sup>2</sup></span><br>
            <!--ancho: &nbsp; <span id="labelxtotal"></span><br>
            alto: &nbsp; <span id="labelytotal"></span><br>-->
            Nota: Las &aacute;reas son aproximadas
        </div>
        <div class="btn3D_1"></div><!-- Boton todo -->
        <div class="btn3D_2"></div><!-- Boton depende del elemento -->
        <div class="btn3D_3"></div><!-- Boton depende del elemento -->
    </div>

    <!--<div class="ui-layout-west">-->
    <div class="panel">
        <div id="divDescarga">
            <div>
                <select id="cboElemento">
                    <!-- Se modifica el input select para la seleccionar la capa
                    que se va a utilizar -->
                    <option value="00">--Seleccione una opci&oacute;n--</option>   
                    <option value="estatal">&Aacute;rea Geoestad&iacute;stica Estatal (AGEE)</option>
                    <!--<option value="carta">Carta topogr&aacute;fica 1:50 000</option>-->
                </select>
            </div>
            <!-- Se oculta el div que muestra las instrucciones de descarga de archivos-->
            <!--<div id="divPasos_c" style="font-size: 100%"></div>-->
            <div id="divContDesc"></div>
            <div id="divLabelDesc"></div>
            <div id="divLabelDesc2"></div>

        </div>
       
        
        
        

    </div>

    <div id="dialogEditar" title="Editar un &aacute;rea">
        <div id="divPasos_b" class="titulo"><div class="circulos2" >6</div><font class="separacion"><strong>D&eacute; clic en el bot&oacute;n <i>Editar &aacute;rea</i>, localizada a la derecha del mapa</strong></font>
            <br><img src="css/images/boton_edit.png">
        </div><br>
        <div id="divPasos_b" class="titulo"><div class="circulos2" >7</div><font class="separacion"><strong>Modifique el pol&iacute;gono del &aacute;rea</strong></font>
            <br><img src="css/images/poligono_edit.png">
        </div><br>
        <div id="divPasos_b" class="titulo"><div class="circulos2" >8</div><font class="separacion"><strong>D&eacute; clic en bot&oacute;n <i>guardar</i></strong></font>
            <br><img src="css/images/guardar.png">
        </div><br>
        <div id="divPasos_b" class="titulo"><div class="circulos2" >9</div><font class="separacion"><strong>Continue en el paso 5</strong></font></div>
    </div>

    <div id="dialogBorrar" title="Borrar un &aacute;rea" >
        <div id="divPasos_b" class="titulo"><div class="circulos2" >6</div><font class="separacion"><strong>D&eacute; clic en el bot&oacute;n <i>Borrar &aacute;rea</i>, localizada a la derecha del mapa</strong></font>
            <br><img src="css/images/boton_elim.png">
        </div><br>
        <div id="divPasos_b" class="titulo"><div class="circulos2" >7</div><font class="separacion"><strong>D&eacute; clic en pol&iacute;gono del &aacute;rea a borrar</strong></font>
            <br><img src="css/images/poligono_elim.png">
        </div><br>
        <div id="divPasos_b" class="titulo"><div class="circulos2" >8</div><font class="separacion"><strong>D&eacute; clic en bot&oacute;n <i>guardar</i></strong></font>
            <br><img src="css/images/guardar.png">
        </div>
    </div>


    <div id="dialogAdvertencia" class="justificacion" title="Advertencia" >
        Tome en cuenta que los archivos empacados del CEM completo de 15 y 30 m. miden m&aacute;ximo 5.5 GB, por lo que el tiempo de descarga ser&aacute; considerable, adem&aacute;s, sin comprimir tiene un tama&ntilde;o de alrededor de 54 y 14GB respectivamente, por lo que en algunos sistemas de archivo no ser&aacute; posible descomprimirlo
    </div>

    <div id="dialogNota" class="justificacion" title="Nota" >
        Los archivos a nivel nacional de resoluci&oacute;n a 15 y 30 metros fueron compactados usando la opción dividir por volumen, por lo tanto es necesario descargar todas las partes para una correcta descompactaci&oacute;n
    </div>

    <input type="hidden" id="areamax_val">
    <input type="hidden" id="areacalculada_val" value="0">

    <script type="text/javascript" src="js/jquery.leanModal.min.js"></script>
    <script>

    </script>
    <a class="trigger" id="ocultar" href="#">Descarga</a>

    <div id="preparing-file-modal" title="Preparing report..." style="display: none;">
    We are preparing your report, please wait...

    <div class="ui-progressbar-value ui-corner-left ui-corner-right" style="width: 100%; height:22px; margin-top: 20px;"></div>
    </div>

    <div id="error-modal" title="Error" style="display: none;">
        There was a problem generating your report, please try again.
    </div>

    <div id="divVisor3D"></div>

    <script>
         $(window).load(function(){
            $('#map').css("background","#9ce0ff");
         })

        </script>
</body>

<!-- Mirrored from mapserver.inegi.org.mx/CEM3_mapa/ by HTTrack Website Copier/3.x [XR&CO'2014], Wed, 12 Oct 2016 20:39:34 GMT -->
</html>

