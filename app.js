var express = require('express')
  , stylus = require('stylus')
  , nib = require('nib')


var app = express()
	function compile(str, path) {
  		return stylus(str)
    	.set('filename', path)
    	.use(nib())
}
app.set('views', __dirname + '/views')
app.set('view engine', 'jade')
app.use(express.logger('dev')) 	// 'dev' - logs incoming requests to console log
app.use(stylus.middleware( 		// apply Stylus middleware - compile .styl files to CSS
  { src: __dirname + '/public' 	// '/public' - static files will be put in public folder -- sets as root
  , compile: compile
  }
))
app.use(express.static(__dirname + '/public'))

app.get('/', function (req, res) {
  res.render('index',
  { title : 'Home' }
  )
})
app.listen(3000)