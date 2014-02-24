# Journey Builder
## Custom Interaction - Hello World

**NOTE:** You won't be able to run this locally. It is intended to be ran on a publicly available web server/cloud only.

**NOTE:** This app and the associated code is NOT production quality, its pure purpose is to demonstrate the full flow of custom interactions in Journey Builder

### Pre-Requisites

* Must have an ExactTarget Marketing Cloud account
* Journey Builder and all associated applications  must be provisioned into this account
* A publicly accessible web server or cloud (I'll be using [Heroku](https://heroku.com) with a single dyno and you can too, just sign up for a free account)
* Web Server or Cloud MUST support SSL (which is why we recommend Heroku...it just works for single dyno apps)
* A valid Code@ account and associated App Center Developer Account (available from within Code@)
* Understanding of client-server communications, JavaScript, HTML(5), Node.js and Express

### How To Use

#### Creating our base app in Code@

1. clone this repository locally
    git clone git@github.com:ExactTarget/journey-builder-custom-hello-world.git

2. Login to your Code@ account [https://code.exacttarget.com/user/login](https://code.exacttarget.com/user/login)

3. Select [App Center](https://code.exacttarget.com/appcenter) from the Code@ navigation. Register as a developer if you haven't already.

4. Select "Create New App"

5. Select "Marketing Cloud" as the template type and use the following properties:
    
    * App Type: HubExchange App
    * App Category: Offline
    * Name: Hello World
    * Description: This is a hello world app
    * Package: &lt;THIS MUST BE UNIQUE ACROSS ALL OF EXACTTARGET&gt; (I recommend something like johndoeJBCustomHelloWorldApp) where you replace johndoe with your first and last name
    * Would you like to use an existing App ID: No
    * IMH Icon: Not required
    * Application Endpoints: The base is your publicly accessible web server's endpoint for this app, this can be updated later, MUST BE OVER SSL
        * Login URL: https://endpoint.tld/login
        * Logout URL: https://endpoint.tld/logout
        * Redirect URL: https://endpoint.tld/
    * Application Event Callbacks: Not required

6. Integrate your app with an account which will not be impacted by having an additional icon in the app switcher of the marketing cloud

7. Data Access: No (SSO Only)

8. Make sure everything is correct, and finish.

9. If everything is successful, you should see a message saying so. Stay on this screen and let's copy the information into our app's code we'll need...

#### Copying App Center Data

1. Open /app.js

2. Copy the values from the App Center Hello World Summary Screen into this section of code in app.js

    var APIKeys = {
        appId           : '__insert_your_app_id__',
        clientId        : '__insert_your_app_client_id__',
        clientSecret    : '__insert_your_app_client_secret__',
        appSignature    : '__insert_your_app_signature__',
        authUrl         : 'https://auth.exacttargetapis.com/v1/requestToken?legacy=1'
    };

#### Associating Custom Trigger to the Contact Model

#### Defining our Custom Trigger in Trigger Admin

#### Testing our app loads in the Marketing Cloud

#### Creating our Custom Trigger in Journey Builder

#### Creating our Custom Activity

#### Testing our Custom Interaction
