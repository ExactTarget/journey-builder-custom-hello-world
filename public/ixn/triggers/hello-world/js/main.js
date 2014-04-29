'use strict';
requirejs.config({
    baseUrl: '../../../../vendor',
    deps: [ 'jquery.min', 'underscore', 'postmonger'],
    shim: {
        'jquery.min': {
            exports: '$'
        },
        'fuelux/all': {
            deps: ['jquery.min', 'underscore']
        }
    }
});

requirejs( ['../ixn/triggers/hello-world/js/hello-world', 'fuelux/all'], function( $, _, helloWorld ) {
    //console.log( 'REQUIRE LOADED' );
});

requirejs.onError = function( err ) {
    //console.log( "REQUIRE ERROR: ", err );
    if( err.requireType === 'timeout' ) {
        console.log( 'modules: ' + err.requireModules );
    }
    throw err;
};
