var createError = require('http-errors');
var express = require('express'); //express 모듈 셋팅
var path = require('path');
var cookieParser = require('cookie-parser'); // body 데이터 받기 위한 모듈

//LOG 저장 관련
var logger = require('morgan'); // log 관련 모듈 셋팅
const winston = require('./routes/logger'); // winston log 설정

//Route 설정
var indexRouter = require('./routes/index'); // js 연결 설정
var heroHaruRouter = require('./routes/heroHaru'); // js 연결 설정
var apiRouter = require('./routes/api_route'); // js 연결 설정
var rankRouter = require('./routes/rank'); // js 연결 설정

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views')); // view path 설정
app.set('view engine', 'ejs'); //ejs 템플릿 설정

//app.use(logger('dev'));
//app.use(logger('short'));
//app.use(logger('combined'));
app.use(logger('common'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var session = require('express-session');
app.use(session({
  secret: 'Jeremy',
  resave: false,
  saveUninitialized: true,
  cookie:{
    maxAge: 24000 * 60 * 60 // 24 시간 설정
  }
}));

// view-router setting
app.use('/', indexRouter);
app.use('/api',apiRouter);
app.use('/rank',rankRouter);
app.use('/heroharu', heroHaruRouter);
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  winston.error(err.message);
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
