module.exports.jogo = function (application, req, res) {

    if (req.session.autorizado !== true) {
        res.send('Usuário precisa fazer login');
        return;
    }

    var msg = '';
    if (req.query.msg != '') {
        msg = req.query.msg;
    }

    var usuario = req.session.usuario;
    var casa = req.session.casa;

    var JogoDAO = new application.app.models.JogoDAO();

    JogoDAO.iniciaJogo(res, usuario, casa, msg);
}

module.exports.sair = function (application, req, res) {
    req.session.destroy(function (err) {
        res.render('index', { validacao: {} });
    });
}

module.exports.suditos = function (application, req, res) {
    if (req.session.autorizado !== true) {
        res.send('Usuário precisa fazer login');
        return;
    }

    res.render('aldeoes', { validacao: {} });
}

module.exports.pergaminhos = function (application, req, res) {
    if (req.session.autorizado !== true) {
        res.send('Usuário precisa fazer login');
        return;
    }


    var JogoDAO = new application.app.models.JogoDAO();
    var usuario = req.session.usuario;
    JogoDAO.getAcoes(usuario,res);

}

module.exports.ordenar_acao_sudito = function (application, req, res) {
    if (req.session.autorizado !== true) {
        res.send('Usuário precisa fazer login');
        return;
    }

    var dadosForm = req.body;

    req.assert('acao', 'Ação deve ser informada').notEmpty();
    req.assert('quantidade', 'Quantidade deve ser informada').notEmpty();

    var erros = req.validationErrors();

    if (erros) {
        res.redirect('jogo?msg=A');
        return;
    }

    var JogoDAO = new application.app.models.JogoDAO();

    dadosForm.usuario = req.session.usuario;
    JogoDAO.acao(dadosForm);

    res.redirect('jogo?msg=B');
}

module.exports.revogar_acao = (application,req,res) => {
    var url_query = req.query;

    var JogoDAO = new application.app.models.JogoDAO();
    var _id = url_query['id'];
    JogoDAO.revogar_acao(_id,res);
}