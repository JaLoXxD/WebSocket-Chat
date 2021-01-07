const express = require('express');
const path = require('path');
const multer = require('multer');
const { join } = require('path');
const uuid = require('uuid');
const morgan = require('morgan');

const app = express();
require('./database');

//Esto es para subir las imágenes con su nombre y extensión originales
const storage = multer.diskStorage({
    destination: path.join(__dirname,'public/uploads'),//ruta donde se guardará la imagen
    filename: (req,file,cb)=>{
        cb(null, file.originalname)
    }
});

//Middlewares
app.use(multer({
    storage: storage,
    dest: path.join(__dirname,'public/uploads'),
    fileFilter: (req,file,cb)=>{
        const filetypes = /jpeg|jpg|png|gif/;
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path.extname(file.originalname));
        if(mimetype && extname){
            return cb(null,true)
        }
        cb('Error: el archivo debe ser una imagen válida')
    }
}).single('image')); //dentro del single va el nombre del campo que sube la imagen ubicado en index.ejs

app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}));

//Router
app.use(require('./routes/index.routes'));

//Static Files
app.use(express.static(path.join(__dirname,'public')))

//Server Settings
app.set('port',process.env.PORT || 3001); 
app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs')

const server = app.listen(app.get('port'),()=>{
    console.log('Server listening on port 3001...');
});

const SocketIO = require('socket.io');
const io = SocketIO(server);


//WebSockets

io.on('connection', (socket) =>{
    console.log("new connection from "+socket.id)

    socket.on('upload',(data)=>{
        console.log('datos recibidos por el servidor');
        console.log(data);
        io.sockets.emit('show',data);
    });
})

