const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const jogoSchema = new Schema({
    usuario: String,
    moeda: Number,
    suditos: Number,
    temor: Number,
    sabedoria: Number,
    comercio: Number,
    magia: Number

});

const acaoSchema = new Schema({
    acao: Number,
    acao_termina_em: Date,
    quantidade: Number,
    usuario: String
})

function JogoDAO() {

}

JogoDAO.prototype.gerarParametros = async function (usuario) {
    const usuariosModel = mongoose.model('jogo', jogoSchema);
    try {
        await usuariosModel.insertMany([{
            usuario: usuario,
            moeda: 15,
            suditos: 10,
            temor: Math.floor(Math.random() * 1000),
            sabedoria: Math.floor(Math.random() * 1000),
            comercio: Math.floor(Math.random() * 1000),
            magia: Math.floor(Math.random() * 1000)
        }]);
    } catch (error) {
        console.log(error);
    }
}

JogoDAO.prototype.iniciaJogo = async function (res, usuario, casa, msg) {
    const jogoModel = mongoose.model("jogos", jogoSchema);
    const result = await jogoModel.find({ usuario: usuario });
    if (result[0] != undefined) {
        res.render('jogo', { img_casa: casa, jogo: result[0], msg: msg });
    }
}

JogoDAO.prototype.acao = async function (acao) {

    var date = new Date();

    var tempo = null;

    switch (parseInt(acao.acao)) {
        case 1: tempo = 1 * 60 * 60000; break;
        case 2: tempo = 2 * 60 * 60000; break;
        case 3: tempo = 5 * 60 * 60000; break;
        case 4: tempo = 5 * 60 * 60000; break;
    }

    acao.acao_termina_em = date.getTime() + tempo;
    const acaoModel = mongoose.model('acao', acaoSchema);

    try {
        await acaoModel.insertMany([acao]);
    } catch (error) {
        console.log(error);
    }

    const jogoModel = mongoose.model('jogo', jogoSchema);
    var moedas = null;
    try {
        switch (parseInt(acao.acao)) {
            case 1: moedas = -2 * acao.quantidade; break;
            case 2: moedas = -3 * acao.quantidade; break;
            case 3: moedas = -1 * acao.quantidade; break;
            case 4: moedas = -1 * acao.quantidade; break;
        }
    
        await jogoModel.findOneAndUpdate({usuario:acao.usuario},{$inc:{moeda:moedas}});
    } catch (error) {
        console.log(error);
    }

    
}

JogoDAO.prototype.getAcoes = async function (usuario, res) {
    const jogoModel = mongoose.model("acao", acaoSchema);

    var date = new Date();
    var momento_atual = date.getTime();

    const result = await jogoModel.find({ usuario: usuario,acao_termina_em:{$gt:momento_atual} });

    if (result[0] != undefined) {
        res.render('pergaminhos', { acoes: result });
    }
}

JogoDAO.prototype.revogar_acao = async (_id,res) => {
    const acaoModel = mongoose.model("acao", acaoSchema);
    const ac = await acaoModel.deleteOne({ _id:_id });
    if(ac.ok == 1){
        res.redirect("/jogo?msg=D");
    }
}

module.exports = function () {
    return JogoDAO;
}