'use strict'

const Config = use('Adonis/Src/Config')
const axios = require('axios')

class RamenAuthVerify {
    /**
     * 
     * @param {*} param0 
     * @param {*} next 
     * @param {*} properties 
     * 
     * properties is array, and should only contain one element, which is the API Permission.
     * One API should only have one permission. This is debatable in the future.
     */
    async handle({ request, response }, next, properties) {
        let appUrl = Config._config.ramenauth.appUrl
        appUrl = appUrl + '/api/auth/verify'
        let token = request.header('Authorization')
        if (!token) {
            return response.status(403).send({
                data: null,
                meta: {
                    message: 'Request incomplete. Token not provided'
                }
            })
        }

        token = token.split(' ')
        token = token[1]
        const body = {
            claim: properties[0],
            token: token
        }

        try {
            const { data } = await axios.post(appUrl, body)
            request['created_by'] = data.data
            request.body.created_by = data.data  // to support older version, to prevent breaking in a lot of place
        }
        catch(error) {
            let message = error.message
            let code = 500
            if (error.response) {
                message = error.response.data.meta.message
                code = 403
            }

            return response.status(code).send({
                data: null,
                meta: {
                    message: 'Failed contacting auth server. ' + message
                }
            })
        }
        await next()
    }
}

module.exports = RamenAuthVerify