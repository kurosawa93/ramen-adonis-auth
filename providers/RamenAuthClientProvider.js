const { ServiceProvider } = require('@adonisjs/fold')

class RamenAuthClientProvider extends ServiceProvider {
    boot() {}

    register() {
        this.app.singleton('Ramen/AuthVerify', (app) => {
            const RamenAuthVerify = require('../src/middlewares/RamenAuthVerify')
            return new RamenAuthVerify()
        })
    }
}

module.exports = RamenAuthClientProvider