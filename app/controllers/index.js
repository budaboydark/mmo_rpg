module.exports.index = function(application, req, res){
    res.render('index', { validacao: {},usuario:"",senha:"" });
}

module.exports.autenticar = async function(application, req, res){
    
    var dadosForm = req.body;

    req.assert('usuario', 'Usuário não pode ser vazio').notEmpty();
    req.assert('senha', 'Senha não pode ser vazia').notEmpty();

    var erros = req.validationErrors();

    if(erros){
        dadosForm.validacao = erros;
        res.render('index', dadosForm);
        return;
    }

    var UsuariosDAO = new application.app.models.UsuariosDAO();
    UsuariosDAO.autenticar(dadosForm, req, res);

}