/**
* Copyright 2017 Select Interactive, LLC. All rights reserved.
* @author: The Select Interactive dev team (www.select-interactive.com)
*/
import { $, $$ } from '../utils/$';
import * as Utils from '../utils/utils';

'use strict';

const config = {
    apiKey: 'AIzaSyBt_7r_HQVApau3_oXUvQ8XVgC47gyxl2E'
};

export default class Gmap {
    static init() {
        $$( '.c-gmap-auto' ).forEach( el => new Gmap( el ) );
    }

    constructor( el, loadCallback ) {
        // don't create a map twice
        if ( this.initialized ) {
            return;
        }

        this.container = el;
        this.map = null;
        this.markers = [];
        this.infowindow = null;

        this.loadCallback = loadCallback;

        this.options = {
            defaultCenter: {
                lat: 32.731486,
                lng: -97.366189
            },
            defaultZoom: 15,
            draggable: true,
            icon: '/img/icons/map-marker.v1.png',
            scrollwheel: false,
            styles:
            [
                {
                    'featureType': 'water',
                    'elementType': 'geometry.fill',
                    'stylers': [
                        {
                            'color': '#d3d3d3'
                        }
                    ]
                },
                {
                    'featureType': 'transit',
                    'stylers': [
                        {
                            'color': '#808080'
                        },
                        {
                            'visibility': 'off'
                        }
                    ]
                },
                {
                    'featureType': 'road.highway',
                    'elementType': 'geometry.stroke',
                    'stylers': [
                        {
                            'visibility': 'on'
                        },
                        {
                            'color': '#b3b3b3'
                        }
                    ]
                },
                {
                    'featureType': 'road.highway',
                    'elementType': 'geometry.fill',
                    'stylers': [
                        {
                            'color': '#ffffff'
                        }
                    ]
                },
                {
                    'featureType': 'road.local',
                    'elementType': 'geometry.fill',
                    'stylers': [
                        {
                            'visibility': 'on'
                        },
                        {
                            'color': '#ffffff'
                        },
                        {
                            'weight': 1.8
                        }
                    ]
                },
                {
                    'featureType': 'road.local',
                    'elementType': 'geometry.stroke',
                    'stylers': [
                        {
                            'color': '#d7d7d7'
                        }
                    ]
                },
                {
                    'featureType': 'poi',
                    'elementType': 'geometry.fill',
                    'stylers': [
                        {
                            'visibility': 'on'
                        },
                        {
                            'color': '#ebebeb'
                        }
                    ]
                },
                {
                    'featureType': 'administrative',
                    'elementType': 'geometry',
                    'stylers': [
                        {
                            'color': '#a7a7a7'
                        }
                    ]
                },
                {
                    'featureType': 'road.arterial',
                    'elementType': 'geometry.fill',
                    'stylers': [
                        {
                            'color': '#ffffff'
                        }
                    ]
                },
                {
                    'featureType': 'road.arterial',
                    'elementType': 'geometry.fill',
                    'stylers': [
                        {
                            'color': '#ffffff'
                        }
                    ]
                },
                {
                    'featureType': 'landscape',
                    'elementType': 'geometry.fill',
                    'stylers': [
                        {
                            'visibility': 'on'
                        },
                        {
                            'color': '#efefef'
                        }
                    ]
                },
                {
                    'featureType': 'road',
                    'elementType': 'labels.text.fill',
                    'stylers': [
                        {
                            'color': '#696969'
                        }
                    ]
                },
                {
                    'featureType': 'administrative',
                    'elementType': 'labels.text.fill',
                    'stylers': [
                        {
                            'visibility': 'on'
                        },
                        {
                            'color': '#737373'
                        }
                    ]
                },
                {
                    'featureType': 'poi',
                    'elementType': 'labels.icon',
                    'stylers': [
                        {
                            'visibility': 'off'
                        }
                    ]
                },
                {
                    'featureType': 'poi',
                    'elementType': 'labels',
                    'stylers': [
                        {
                            'visibility': 'off'
                        }
                    ]
                },
                {
                    'featureType': 'road.arterial',
                    'elementType': 'geometry.stroke',
                    'stylers': [
                        {
                            'color': '#d6d6d6'
                        }
                    ]
                },
                {
                    'featureType': 'road',
                    'elementType': 'labels.icon',
                    'stylers': [
                        {
                            'visibility': 'off'
                        }
                    ]
                },
                {},
                {
                    'featureType': 'poi',
                    'elementType': 'geometry.fill',
                    'stylers': [
                        {
                            'color': '#dadada'
                        }
                    ]
                }
            ],
            zoomControl: true
        };

        this.initMap = this.initMap.bind( this );
        this.setDefaultCenter = this.setDefaultCenter.bind( this );
        this.setDefaultZoom = this.setDefaultZoom.bind( this );

        this.addScript();
    }

    initMap() {
        this.setDefaultCenter();
        this.setDefaultZoom();

        this.map = new google.maps.Map( this.container, {
            center: this.options.defaultCenter,
            draggable: this.options.draggable,
            mapTypeControl: false,
            scrollwheel: this.options.scrollwheel,
            streetViewControl: false,
            zoom: this.options.defaultZoom,
            zoomControl: this.options.zoomControl
        } );

        this.map.setOptions( { styles: this.options.styles } );

        if ( this.container.hasAttribute( 'data-map-marker' ) ) {
            let center = this.options.defaultCenter;

            if ( this.container.hasAttribute( 'data-map-marker-position' ) ) {
                let latLng = this.container.getAttribute( 'data-map-marker-position' );
                latLng = latLng.split( ',' );

                center = {
                    lat: parseFloat( latLng[0] ),
                    lng: parseFloat( latLng[1] )
                };
            }

            this.addMarker( center );
        }

        if ( this.loadCallback && typeof this.loadCallback === 'function' ) {
            this.loadCallback( this.map );
        }
    }

    addScript() {
        Utils.loadScript( `https://maps.googleapis.com/maps/api/js?key=${config.apiKey}` )
            .then( () => this.initMap() );
    }

    setDefaultCenter() {
        if ( this.container.hasAttribute( 'data-map-center' ) ) {
            const coords = this.container.getAttribute( 'data-map-center' );
            const position = coords.split( ',' );

            if ( position.length ) {
                this.options.defaultCenter = {
                    lat: parseFloat( position[0] ),
                    lng: parseFloat( position[1] )
                };
            }
        }
    }

    setDefaultZoom() {
        if ( this.container.hasAttribute( 'data-map-zoom' ) ) {
            let zoom = parseInt( this.container.getAttribute( 'data-map-zoom' ), 10 );

            if ( Utils.mq( '(max-width:1024px)' ) ) {
                zoom = zoom - 1;
            }

            this.options.defaultZoom = zoom;
        }
    }

    addMarker( data, zIndex, fn, showIw, iwContent ) {
        const me = this;
        let icon = data.marker || this.options.icon;

        let marker = new google.maps.Marker( {
            data: data,
            icon: icon,
            map: this.map,
            position: {
                lat: data.lat,
                lng: data.lng
            }
        } );

        if ( zIndex ) {
            marker.setZIndex( zIndex );
        }

        if ( fn && typeof fn === 'function' ) {
            marker.addListener( 'click', fn );
        }

        if ( showIw && iwContent ) {
            const infowindow = new google.maps.InfoWindow( {
                content: iwContent
            } );

            marker.addListener( 'mouseover', () => {
                if ( this.infowindow ) {
                    this.infowindow.close();
                }

                infowindow.open( this.map, marker );

                this.infowindow = infowindow;
            } );

            marker.addListener( 'mouseout', () => {
                //infowindow.close();
            } );
        }

        this.markers.push( marker );
    }

    setView( lat, lng, zoom ) {
        this.map.setCenter( {
            lat: lat,
            lng: lng
        } );

        this.map.setZoom( zoom );
    }

    resetMap() {
        this.setView( this.options.defaultCenter.lat, this.options.defaultCenter.lng, this.options.defaultZoom );

        if ( this.infowindow ) {
            this.infowindow.close();
            this.infowindow = null;
        }
    }
}