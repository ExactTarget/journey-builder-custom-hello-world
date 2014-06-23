'use strict';
define( function( require ) {
    // Dependencies
    var Postmonger = require('postmonger');

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

        /**
            If you want to have a multi-step configuration view, you need to manage the DOM manually.
            You can filter what changes to make by implementing the following type of logic when Postmonger from the server triggers an "updateStep" call.

            if( step  >= 1 && step <= 3 ) {
                $('.step').hide(); // All DOM elements which are steps should have this class (this hides them all)
                $('#step' + step ).show(); // This selectively only displays the current step
                // Allow the user to make any changes and when you're ready, use:
                connection.trigger( 'updateStep', step ); 
            }
        **/

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
                filter: '<FilterDefinition Source=\'helloWorldNTO\'><ConditionSet Operator=\'AND\' ConditionSetName=\'Grouping\'><Condition ID=\'ece15cd0-8893-e311-b943-78e3b50b4f00\' isParam=\'false\' Operator=\'Equal\' conditionValid=\'1\'><Value><![CDATA[' + data.originEventStart + ']]></Value></Condition></ConditionSet></FilterDefinition>'
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
FROM: https://jbprod.exacttargetapps.com/rest/v1/contact/definition/?oauth_token=NONE&_=1392167891474
{
    id: "eae15cd0-8893-e311-b943-78e3b50b4f00"
    key: "helloWorldNTO"
    name: "helloWorldNTO"
    -attributes: [
        -{
            id: "ebe15cd0-8893-e311-b943-78e3b50b4f00"
            name: "alternativeEmail"
            key: "alternativeEmail"
            fieldType: 7
            isHidden: false
            isNullable: false
            isReadonly: false
            ordinal: 0
            sourceCustomObjectFieldId: "22b22851-c11d-41d3-916b-f3d50c1fbe5b"
        }
        -{
            id: "ece15cd0-8893-e311-b943-78e3b50b4f00"
            name: "originEventStart"
            key: "originEventStart"
            fieldType: 11
            isHidden: false
            isNullable: true
            isReadonly: false
            ordinal: 1
            sourceCustomObjectFieldId: "404de0d1-0578-4769-beb1-984412da3e14"
        }
        -{
            id: "ede15cd0-8893-e311-b943-78e3b50b4f00"
            name: "EventInstanceID"
            key: "EventInstanceID"
            fieldType: 11
            isHidden: false
            isNullable: false
            isReadonly: false
            ordinal: 2
            sourceCustomObjectFieldId: "b0e2c2b6-a3c0-4c93-866c-0880b3e7f4d9"
        }
    ]
}
*/
});
