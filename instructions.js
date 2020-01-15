'use strict'

const path = require('path')

module.exports = async (cli) => {
    try {
        const configIn = path.join(__dirname, './config', 'ramenauth.js')
        const configOut = path.join(cli.helpers.configPath(), 'ramenauth.js')
        await cli.command.copy(configIn, configOut)
        cli.command.completed('create', 'config/ramenauth.js')
    } catch (error) {
        // ignore error
        console.log(error)
    }
}