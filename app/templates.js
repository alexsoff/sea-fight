var jst_cash = {};

var JST = function(key) {
  if(jst_cash[key]==null) {
    var tplNode = $("#"+key);
    var src = (_.isEmpty(tplNode)) ? "" : tplNode.html();
    jst_cash[key] = Handlebars.compile(src);
  }
  return jst_cash[key];
};
