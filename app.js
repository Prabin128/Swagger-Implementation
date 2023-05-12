const express = require('express');
const bodyParser = require('body-parser');
const swaggerjsdoc =  require("swagger-jsdoc");
const swaggerui = require("swagger-ui-express");
const morgan = require("morgan");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(morgan("dev"));
app.use("/uploads/images/", express.static("uploads/images"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



const productRoute = require('./routes/products');
const userIdRoute = require('./routes/userId');
const userRoute =  require('./routes/user');



        //Swagger implementation
const options = {
    definition : {
        openapi : "3.0.0",
        info: {
            title : "Product model",
            version : "0.1",
            description : "This is a product model for basic CRUD Operation",       
            contact: {
                name: "Prabin Poudel",
                url : "Prabin.com",
                email: "poudelprabin09@gmail.com"
            },
            servers: ['http://localhost:3000/'],
        },
        components: {
            securitySchemes: {
                jwt: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
    },
    apis : ["./routes/*.js"],
};
const spacs = swaggerjsdoc(options)
app.use('/doc',
        swaggerui.serve, 
        swaggerui.setup(spacs));




app.use("/product", productRoute);
app.use("/userId", userIdRoute);
app.use("/user", userRoute);

module.exports = app;