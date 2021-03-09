require('dotenv').config({ path: '../.env' })
const { SERVER_PORT, SERVER_HOST } = process.env;
module.exports =(app)=>{
    const expressSwagger = require('express-swagger-generator')(app);
    let options = {
        swaggerDefinition: {
            info: {
                description: 'This is a calendario api server',
                title: 'Swagger',
                version: '0.0.1',
            },
            host: `${SERVER_HOST}:${SERVER_PORT}`,
            basePath: '/',
            produces: [
                "application/json",
            ],
            schemes: ['http'/*, 'https'*/],
            // securityDefinitions: {
            //     JWT: {
            //         type: 'apiKey',
            //         in: 'header',
            //         name: 'Authorization',
            //         description: "",
            //     }
            // }
        },
        basedir: __dirname, //app absolute path
        files: ['./routes/*.js'] //Path to the API handle folder
    };
    expressSwagger(options)
}

