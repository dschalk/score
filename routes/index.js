
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index');
};


exports.experiments = function(request, response){
	response.render('experiments.ejs');
};