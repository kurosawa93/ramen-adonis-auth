# Thank you for installing ramen-adonis-auth

  
## How to Use

In order to use this package in your project, you will need to add the following lines in your `start/app.js` files inside the `providers` property.

```

const providers = [

...

...

...

'ramen-adonis-auth/providers/RamenAuthProvider', // for auth servers

'ramen-adonis-auth/providers/RamenAuthClientProvider', // for auth clients

]

```

  

### Auth Server

In your auth server app, after adding the provider in your `start/app.js` file, you can create and extend your app controller to `ramen` provided controllers like below;

```

const RamenAuthController = use('Ramen/AuthController)

  

class YourAppController extends RamenAuthController {

	constructor() {

		super(yourAuthModel, yourDefaultRoles);

	}

}

```

  

there is two parameters which you must be add when you called parent constructor;

- **yourAuthModel**: this is your authentication model class which holds the email and password attribute. The default class from adonis is `User`, but you can change it anytime.
inside `jwt` attribute in `config/auth.js` file. Your config file should be look like this;
	 ```
	'use strict'
	
	/** @type {import('@adonisjs/framework/src/Env')} */
	const Env = use('Env')

	module.exports = {

		...

		authenticator: 'jwt',

		...

		...

		...

		jwt: {

			serializer: 'lucid',

			model: 'App/Models/Account',

			scheme: 'jwt',

			uid: 'email',

			password: 'password',

			options: {

				secret: Env.get('APP_KEY'),

				expiresIn: 604800

			}

		},

	}
	```
	Please note the auth model must be extending `Ramen/ModelTrait` trait 		from [ramen-adonis-datamodel](https://github.com/kurosawa93/ramen-adonis-datamodel) package, or some of the function might be have unexpected behaviour.

- **yourDefaultRoles**: this is an optional parameters. this should be used when you are using `Role` relation inside your account models. this will be adding the default roles when	`register` or `aesRegister` method is called from your app.

### Auth Client
If you are using `Role` and you need to authenticate each request with different permission, you can use `Ramen/AuthVerify` as middleware in each of your authenticated endpoints. Your middleware files should be look like this;
```
'use strict'

const Route = use('Route')

...

...

Route.post('your/authenticated/endpoint', 'YourControllerFile@method').middleware(['ramenAuth,assessmentResult.write'])

...

...
``` 

`ramenAuth` is a `namedMiddleware` which you defined in `start/kernel.js` file. Example of `start/kernel.js` file;
```
const namedMiddleware = {
  ...
  
  ...
  
  ramenAuth: 'Ramen/AuthVerify'
}
```
