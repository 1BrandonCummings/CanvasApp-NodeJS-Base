# Force.com Canvas NodeJS 
===========

## Installation info

## Create you own app on a Force.con Developer Edition org

- Setup -> Create -> Apps -> (Connected Apps) New
- Fill **Conntected App Name**, **API Name** and **Contact Email**
- Check the **Enable OAuth Settings** in the *API (Enable OAuth Settings)* section
 - **Callback URL**: put a valid URL (you don't need it for the scope of this example)
 - **Selected OAuth Scopes**: select the scopes you want for the NodeJS app acess token to grant
- In the section *Canvas App Settings* type:
 - **Canvas App URL**: the url of the POST action to be called by Salesforce when injecting the session data (e.g. https://nodejs-canvas-test.herokuapp.com/canvas/callback)
 - **Access Method**: use *Signed Request (POST)*
 - **Locations**: choose *Chatter Tab* (the app will be shown in the Chatter page)

Than you need to enable this app.
- Setup -> Manage Apps -> Connected Apps -> *Your App Name*
- In the *OAuth policies* select *Admin approved users are pre-authorized* for the **Permitted Users** field
- In the *Profiles* related list select your profile (all user of that profile are automatically allowed to consume this app)

There are more ways to configure the Canvas App usage, this is the quicker.


### Set config.js variables (https://devcenter.heroku.com/articles/config-vars):
	$ heroku config:set GITHUB_USERNAME=joesmith
	Adding config vars and restarting myapp... done, v12
	GITHUB_USERNAME: joesmith

	$ heroku config
	GITHUB_USERNAME: joesmith
	OTHER_VAR:       production

	$ heroku config:get GITHUB_USERNAME
	joesmith

	$ heroku config:unset GITHUB_USERNAME
	Unsetting GITHUB_USERNAME and restarting myapp... done, v13

http://utility-app.herokuapp.com/
