/*
 * Leaflet.draw assumes that you have already included the Leaflet library.
 */

L.drawVersion = '0.2.3-dev';

L.drawLocal = {
	draw: {
		toolbar: {
			actions: {
				title: 'Cancelar área',
				text: 'Cancelar'
			},
			buttons: {
				rectangle: 'Dibujar área'
			}
		},
		handlers: {

			rectangle: {
				tooltip: {
					start: 'Dibujar área'
				}
			},
			simpleshape: {
				tooltip: {
                                        //aqui poner dato
					end: 'Dibujar área'
				}
			}
		}
	},
	edit: {
		toolbar: {
			actions: {
				save: {
					title: 'Guardar cambios.',
					text: 'Guardar'
				},
				cancel: {
					title: 'Cancelar edicion',
					text: 'Cancelar'
				}
			},
			buttons: {
				edit: 'Editar área',
				editDisabled: 'No hay área que editar',
				remove: 'Borrar área',
				removeDisabled: 'No hay área que borrar'
			}
		},
		handlers: {
			edit: {
				tooltip: {
					text: '',
					subtext: 'Clic en cancelar para descartar cambios'
				}
			},
			remove: {
				tooltip: {
					text: 'Clic en el área a borrar'
				}
			}
		}
	}
};
