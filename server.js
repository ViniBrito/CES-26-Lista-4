// Importando pacotes necessários
const express = require('express')
	, app = express()
	, multer = require('multer');

// Definindo botão de retornar ao início
const botao = "<br><br><button style='border-radius: 20px' onclick='history.back()'>Voltar à página inicial</button>";

// Criando uma instância do middleware configurada
// destination: lida com o destino
// filename: permite definir o nome do arquivo gravado
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

// Utilizando a storage para configurar a instância do multer
const upload = multer({ storage });
//Definindo rotas de acesso aos arquivos carregados
app.use(express.static('public'));
app.use('/static', express.static('uploads'));

// Definindo mensagem exibida após upload
app.post('/upload/success', upload.array('file'), 
    (req, res) => {
        //const tempPath = __dirname+'\\'+req.file.path;
        res.send("Upload concluído com sucesso."+botao);
    });

// Definindo rota de processamento dos dados no formulário do IMC
app.get('/calculate', function(req, res){
    var texto = "<h1>Resultado da avaliação</h1>\nSeu IMC é ";
    var h = req.query.height/100;
        w = req.query.weight;
        i = w/h**2;
    texto+=parseFloat(i).toFixed(2)+" e você está oficialmente ";
    if(i < 18.5) texto+="<b style='color: red'>magro</b>";
    else if(i < 25.0) texto+="<b style='color: grey'>normal</b>"
    else if(i < 30.0) texto+="<b style='color: orange'>com sobrepeso</b>"
    else if(i < 40.0) texto+="<b style='color: red'>obeso</b>"
    else texto+="<b style='color: #C10606'>gravemente obeso</b>"
    res.send(texto+botao);
});

// Conectando servidor à porta 3000
app.listen(3000, () => console.log('Aplicação funcional'));

