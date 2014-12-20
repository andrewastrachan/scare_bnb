ScareBnb.Collections.Users = Backbone.Collection.extend({
	model: ScareBnb.Models.User,
	
  signIn: function(userData){
     $.ajax({
       url: "/session",
       type: "POST",
       data: userData,
       success: function(resp){
         if(!!resp['success']){
           var id = parseInt(resp['success'], 10);
           var existingUser = ScareBnb.Collections.users.findWhere({ id: id });
           if(!!existingUser){
             existingUser.set({ logged_in: true });
             existingUser.fetch();
           } else {
             var currentUser = new ScareBnb.Models.User({ id: id });
             ScareBnb.Collections.users.add(currentUser);
             currentUser.fetch();
           };
         } else {
           resp['errors'].forEach(function(message){
             toastr.error(message)
           });
         };
       }
     });
   },
	 
	signUp: function(userData) {
	 $.ajax({
	   url: "/api/users",
	   type: "POST",
	   data: userData,
	   success: function(resp){
	     if(!!resp['success']){
	       var id = parseInt(resp['success'], 10);
	       var existingUser = ScareBnb.Collections.users.findWhere({ id: id });
	       var currentUser = new ScareBnb.Models.User({ id: id });
	       ScareBnb.Collections.users.add(currentUser);
	       currentUser.fetch();
	     } else {
	       resp.forEach(function(message){
	         toastr.error(message)
	       });
	     };
	   }
	 });
	},
	
  currentUser: function(){
    return this.findWhere({ logged_in: true }) || null
  }

});

ScareBnb.Collections.users = new ScareBnb.Collections.Users()