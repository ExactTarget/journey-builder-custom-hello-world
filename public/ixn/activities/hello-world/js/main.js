requirejs.config({
    baseUrl: ‘../../../../vendor’,
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

requirejs( ['fuelux/all', '../ixn/activities/hello-world/js/hello-world'], function() {
	//console.log( 'REQUIRE LOADED' );
});

requirejs.onError = function( err ) {
	//console.log( "REQUIRE ERROR: ", err );
	if( err.requireType === 'timeout' ) {
		console.log( 'modules: ' + err.requireModules );
	}

	throw err;
};
