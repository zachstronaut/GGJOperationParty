(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['buttonWidget'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers; data = data || {};
  var buffer = "", stack1, foundHelper, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<p>";
  foundHelper = helpers.controlName;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.controlName; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "</p>\n<input type=\"button\" value=\"";
  foundHelper = helpers.controlAction;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.controlAction; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "\" />";
  return buffer;});
templates['canvasWidget'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers; data = data || {};
  


  return "<canvas height=\"300\" width=\"300\"></canvas>";});
templates['lobbyScreen'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers; data = data || {};
  var buffer = "", stack1, stack2, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n        <li class=\"waiting\">";
  stack1 = typeof depth0 === functionType ? depth0.apply(depth0) : depth0;
  buffer += escapeExpression(stack1) + "</li>\n    ";
  return buffer;}

  buffer += "<h3>Welcome to Game: ";
  stack1 = depth0.lobby;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.name;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "</h3>\n<p>Players currently in lobby:</p>\n<ul class=\"waitingList\">\n    ";
  stack1 = depth0.players;
  stack2 = {};
  stack1 = helpers.each.call(depth0, stack1, {hash:stack2,inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n</ul>\n<input type=\"button\" class=\"startGame\" value=\"Team is Ready!\">\n<p id=\"waitingMsg\">Waiting...</p>";
  return buffer;});
templates['selectGameScreen'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers; data = data || {};
  var buffer = "", stack1, stack2, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    <li data-name=\"";
  stack1 = typeof depth0 === functionType ? depth0.apply(depth0) : depth0;
  buffer += escapeExpression(stack1) + "\"><input class=\"gameSelect\" type=\"button\" value=\"";
  stack1 = typeof depth0 === functionType ? depth0.apply(depth0) : depth0;
  buffer += escapeExpression(stack1) + "\"/></li>\n";
  return buffer;}

  buffer += "<h2>Welcome to Operation: Party!</h2>\n<h3>Select a Lobby:</h3>\n<ul>\n";
  stack1 = depth0.lobbies;
  stack2 = {};
  stack1 = helpers.each.call(depth0, stack1, {hash:stack2,inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n</ul>\n\n<div class=\"modalFooter\">\n    <p>For the 2013 GGJ - Minneapolis IGDATC Chapter.</p>\n    <p>By Zachary Johnson, Scott Lembcke, and Will Buck.</p>\n    <p>Artwork by Barry McMahon.</p>\n</div>";
  return buffer;});
})();
