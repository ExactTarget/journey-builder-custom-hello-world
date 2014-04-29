'use strict';
define( function( require ) {
    // Dependencies
    var Postmonger = require('postmonger');
    require( 'jquery.min' );
    require( 'underscore' );

    // Vars
    var connection = new Postmonger.Session();
    var $oes = $('#originEventStart');
    var data, uiPayload, etPayload;

    // Once we know the window is loaded
    $(window).ready( function() {
        // Notify Journey Builder our window is loaded
        connection.trigger('ready');

        // Allow Marketers to configure the value
        $oes.removeAttr( 'disabled' );
    });

    connection.on( 'updateStep', function( step ) {
        /*
        console.log( 'Journey Builder sent Hello World Trigger an updateStep notice with the following data' );
        if( step ) {
            console.log( 'STEP: ', step );
        }
        */
        var value = $oes.val();
        if( !value ) {
            // Notify user they need to select a value 
            $('#helloWorldTriggerConfigError').html('<strong style="color: red;">You must enter something</strong>');
        } else {
            // Successful change
            // When we're all done, define our payload
            data = {
                originEventStart: $oes.val()
            };

            uiPayload = {
                options: data,
                description: 'This is a hello world trigger configuration instance.'
            };

            etPayload = {
                filter: "__WILL_REPLACE_WITH_FILTER__"
            };

            connection.trigger( 'save', uiPayload, etPayload );
        }
    });

    // Populate Fields is sent from Journey Builder to this Custom
    // Trigger UI via Postmonger (iframe-to-iframe communication).
    connection.on('populateFields', function( options ) {
        //console.log( 'Journey Builder sent Hello World Trigger a populateFields notice with the following data' );
        if( options ) {
            //console.log( 'OPTIONS: ', options );
            // Persist
            $('#originEventStart').val( options.originEventStart );
        }
    });

/*
FILTER XML IDS FROM: https://jbprod.exacttargetapps.com/rest/v1/contact/definition/?oauth_token=NONE&_=1392167891474
*/
});
