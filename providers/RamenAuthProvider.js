const { ServiceProvider } = require('@adonisjs/fold')

class RamenAuthProvider extends ServiceProvider {
    boot() {}

    register() {
        this.app.singleton('Ramen/AuthController', (app) => {
            const RamenAuthController = require('../src/controllers/RamenAuthController')
            return RamenAuthController
        })

        this.app.singleton('Ramen/ForgotPasswordController', (app) => {
            const RamenForgotPasswordController = require('../src/controllers/RamenForgotPasswordController')
            return RamenForgotPasswordController
        })

        this.app.singleton('Ramen/AuthVerify', (app) => {
            const RamenAuthVerify = require('../src/middlewares/RamenAuthVerify')
            return new RamenAuthVerify()
        })
    }
}

module.exports = RamenAuthProvider