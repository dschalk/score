
exports.index = function(req, res){
  res.render('index');
};

exports.experiments = function(request, response){
	response.render('experiments.ejs');
};

exports.cow = function(request, response){
	response.redirect('http://alexschalk.com');
};

exports.playground = function(request, response){
	response.render('playground.ejs');
};