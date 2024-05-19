
function PasswordRecovery ({ ipAddres, token }) {
    return `<a href={http://${ipAddres}/confirmrecovery/?token=${token}}>Recover password</a>`
}

module.exports = PasswordRecovery;