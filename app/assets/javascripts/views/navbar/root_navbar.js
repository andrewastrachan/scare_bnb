ScareBnb.Views.RootNavbar = Backbone.View.extend({
	template: JST["navbar/root_navbar"],
	
	events: {
		"click a.log-out" : "signOut",
		"submit form.form-signin" : "signIn",
		"submit form.form-signup" : "signUp",
		"click button.guest" : "guestSignIn"
	},
	
	initialize: function() {
		this.listenTo(ScareBnb.Collections.users, "'sync add remove change reset'", this.render)
	},
	
	signOut: function(event) {
		this.listenToOnce(ScareBnb.Collections.users.currentUser(), "change", this.render)
		ScareBnb.Collections.users.currentUser().signOut()
	},
	
	signIn: function(event) {
		event.preventDefault();
		var userParams = $(event.currentTarget).serializeJSON()
		ScareBnb.Collections.users.signIn(userParams)
	},

	guestSignIn: function(event){
		event.preventDefault();
		$('#logInEmail').val('patrickbateman2014rd@outlook.com');
		$('#logInPassword').val('password');
		setTimeout(function(){
			$('#signIn').submit();
		}, 700);
	},

	signUp: function(event){
		event.preventDefault();
		var userData = $(event.currentTarget).serializeJSON();
		debugger;
		ScareBnb.Collections.users.signUp(userData);
	},
		
	render: function() {
		var content = this.template({user: ScareBnb.Collections.users.currentUser()});
		this.$el.html(content);
		
		return this;
	},
	
}); 