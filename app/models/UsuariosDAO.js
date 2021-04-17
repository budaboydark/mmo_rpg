const mongoose = require('mongoose');
const crypto = require('crypto');

const Schema = mongoose.Schema;

const usuariosSchema = new Schema({
  nome: String,
  usuario: String,
  senha: String,
  casa: String
});


function UsuariosDAO(){
 
}

UsuariosDAO.prototype.inserirUsuario = async function(usuario){

    usuario.senha = crypto.createHash('md5').update(usuario.senha).digest("hex");

    const usuariosModel = mongoose.model('usuarios',usuariosSchema);
    try{
        await usuariosModel.insertMany(usuario);
    }catch (error){
        console.log(error);
    }
}

UsuariosDAO.prototype.autenticar = async function(usuario, req, res){
    const usuariosModel = mongoose.model('usuarios',usuariosSchema);
    
    var auxSenha = usuario.senha;
    usuario.senha = crypto.createHash('md5').update(usuario.senha).digest("hex");
    
    const result = await usuariosModel.find(usuario);
                
    if(result[0] != undefined){
        req.session.autorizado = true;
        req.session.usuario = result[0].usuario;
        req.session.casa = result[0].casa;
    }

    if(req.session.autorizado){
        res.redirect("jogo");
    }else{
        usuario.validacao = [{"msg":"usuário ou senha inválidos"}];
        usuario.senha = auxSenha;
        res.render("index", usuario);
    }

}

module.exports = function(){
    return UsuariosDAO;
}