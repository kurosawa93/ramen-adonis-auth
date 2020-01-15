# Thank you for installing ramen-adonis-auth

## How to Use
In order to use this package in your project, you will need to add the following lines in your `start/app.js` files inside the `providers` property.
```
const providers = [
  ...
  ...
  ...
  'ramen-adonis-datamodel/providers/RamenAuthProvider',
]
```

And you can extend your base model with using `use('Ramen/FirebaseModel')` inside your model file.