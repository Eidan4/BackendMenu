const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');


class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT || 9000;
        this.path = {
            auth:  '/api/auth',
            category: '/api/category',
            mesa: '/api/mesa',
            user: '/api/users',
            role: '/api/role',
            platos: '/api/platos',
            notificacion: '/api/notificacion',
            order: '/api/order',
        };

        this.connectDB();

        this.middlewares();

        this.routes();


    }

    async connectDB() {
        await dbConnection();
    }

    middlewares() {
        this.app.use(cors());

        this.app.use( bodyParser.urlencoded({ extended: false }) );

        this.app.use( bodyParser.json() );

        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath:true
        }));

    }

    routes(){
        this.app.use(this.path.auth,require('../routers/auth'));
        this.app.use(this.path.category,require('../routers/category'));
        this.app.use(this.path.mesa,require('../routers/mesa'));
        this.app.use(this.path.user,require('../routers/user'));
        this.app.use(this.path.role,require('../routers/role'));
        this.app.use(this.path.platos,require('../routers/platos'));
        this.app.use(this.path.notificacion,require('../routers/notificacion'));
        this.app.use(this.path.order,require('../routers/order'));
    }

    listen() {
        this.app.listen(this.port, ()=>{
            console.log(`Server running on port ${this.port}`)
        });
    }
}

module.exports = Server;