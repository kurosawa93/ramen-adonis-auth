'use strict'

const path = require('path')

module.exports = async (cli) => {
    try {
        const configIn = path.join(__dirname, './config', 'ramenauth.js')
        const configOut = path.join(cli.helpers.configPath(), 'ramenauth.js')
        await cli.command.copy(configIn, configOut)
        cli.command.completed('create', 'config/ramenauth.js')

        const emailTemplateIn = path.join(__dirname, './src/views', 'forgot.edge')
        const emailTemplateOut = path.join(cli.helpers.viewsPath(), 'emails/forgot.edge')
        await cli.command.copy(emailTemplateIn, emailTemplateOut)
        cli.command.completed('create', 'emails/forgot.edge')
    } catch (error) {
        // ignore error
        console.log(error)
    }
}