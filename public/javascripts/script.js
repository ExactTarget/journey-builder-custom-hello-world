'use strict';
/**
 * Handle clicks in the UI
 */

// Make sure jQuery is loaded first
$(function() {

    // Cache some vars
    var $emailInput     = $('#email');
    var $oes            = $('#originEventStart');
    var $emailSubmit    = $('#emailSubmit');
    var $reset          = $('#reset');
    var $clear          = $('#clear');
    var $fetch          = $('#fetch');
    var $results        = $('ul.results');

    // When someone submits this form, fire the event to the custom trigger
    $emailSubmit.on('click', function( evt ) {
        var altEmail    = $emailInput.val();
        var oesVal      = $oes.val();
        var reqBody     = {
            alternativeEmail: altEmail,
            originEventStart: oesVal
        };
        
        // Disable the inputs until we receive a resposne
        $emailInput.attr( 'disabled', 'disabled' );
        $oes.attr( 'disabled', 'disabled' );
        $emailSubmit.attr( 'disabled', 'disabled' );

        $.ajax( '/fireEvent/helloWorld', {
            type: 'POST',
            data: reqBody,
            error: function( xhr, status, error ) {
                //console.log( 'ERROR: ', error );
                $('ul.events').append( '<li>Error: ' +  error + '</li>' );
            },
            success: function( data, status, xhr ) {
                //console.log( 'Response from Journey Builder: ', data );
                $('ul.events').append( '<li>EventInstanceId: ' + String(data) + '</li>' );
            },
            complete: function() {
                // Enable the inputs until we receive a resposne
                $emailInput.removeAttr( 'disabled' );
                $oes.removeAttr( 'disabled' );
                $emailSubmit.removeAttr( 'disabled' );
            }
        });
    });

    $clear.on('click', function( evt ) {
        $.ajax( '/clearList', {
            error: function( xhr, status, error ) {
                console.log( 'ERROR: ', error );
            },
            success: function( data, status, xhr ) {
                $results.html( '' );
            }
        });
    });

    $fetch.on('click', function( evt ) {
        $.ajax( '/getActivityData', {
            type: 'GET',
            dataType: 'json',
            error: function( xhr, status, error ) {
                console.log( 'ERROR: ', error );
            },
            success: function( data, status, xhr ) {
                if( !data.data ) {
                    $results.append( '<li>There are no logs in the list</li>' );
                } else {
                    var dataLength = data.data.length;
                    while( dataLength-- ) {
                        $results.append( '<li><code><pre>'+ JSON.stringify( data.data[dataLength], null, 4 ) +'</pre></code></li>' );
                    }
                }
            }
        });
    });
});
