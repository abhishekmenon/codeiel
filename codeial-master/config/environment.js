
const development = {
    name : 'development',
    asset_path: './assests',
    session_cookie_key: 'somethingBlah',
    db: 'codeial_development',
    smtp: {
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: 'aish.rohatgi1008@gmail.com',
            pass: '####'
        }
    },
    google_client_ID: "974210960158-k9h531d1glvr2l08vil31vkdn8lrk0v7.apps.googleusercontent.com",
    google_client_Secret: "e7wWopeGYbbHyO5zNnn85Kb0",
    google_callback_URL: "http://localhost:8000/users/auth/google/callback",
    jwt_secret_key: 'codeial',
}

const production = {
    name : 'development',
    asset_path: './assests',
    session_cookie_key: 'somethingBlah',
    db: 'codeial_development',
    smtp: {
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: process.env.CODEIAL_GMAIL_USERNAME,
            pass: process.env.CODEIAL_GMAIL_PASSWORD
        }
    },
    google_client_ID: "974210960158-k9h531d1glvr2l08vil31vkdn8lrk0v7.apps.googleusercontent.com",
    google_client_Secret: "e7wWopeGYbbHyO5zNnn85Kb0",
    google_callback_URL: "http://localhost:8000/users/auth/google/callback",
    jwt_secret_key: 'codeial',
}


module.exports = eval(process.env.NODE_ENV) == undefined ? development : eval(process.env.NODE_ENV);