module.exports.cadastro = function(application, req, res){
    res.render('cadastro', { validacao: {}, dadosForm: {},msg:"" });
}

module.exports.cadastrar = function(application, req, res){
    
    var dadosForm = req.body;

    req.assert('nome', 'Nome não pode ser vazio').notEmpty();
    req.assert('usuario', 'Usuário não pode ser vazio').notEmpty();
    req.assert('senha', 'Senha não pode ser vazia').notEmpty();
    req.assert('casa', 'Casa não pode ser vazia').notEmpty();

    var erros = req.validationErrors();

    if(erros){
        res.render('cadastro', { validacao: erros, dadosForm: dadosForm });
        return;
    }
    var UsuariosDAO = new application.app.models.UsuariosDAO();
    var JogoDAO = new application.app.models.JogoDAO();

    UsuariosDAO.inserirUsuario(dadosForm);
    JogoDAO.gerarParametros(dadosForm.usuario);

    res.render('cadastro', { validacao: erros, dadosForm: {}, msg:"A" });
    return;

}