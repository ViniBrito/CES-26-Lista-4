// server.js
const express = require('express')
	, app = express()
	, multer = require('multer');

// cria uma instância do middleware configurada
// destination: lida com o destino
// filenane: permite definir o nome do arquivo gravado
const storage = multer.diskStorage({
    destination: function (req, file, cb) {

        // error first callback
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {

        // error first callback
        cb(null, file.originalname);
    }
});

// utiliza a storage para configurar a instância do multer
const upload = multer({ storage });

app.use(express.static('public'));
app.use(express.static('uploads'));

// continua do mesma forma
app.post('/upload/success', upload.array('file'), 
    (req, res) => {
        //const tempPath = __dirname+'\\'+req.file.path;
        res.send("Upload concluído com sucesso.");
    });

app.listen(3000, () => console.log('App na porta 3000'));

