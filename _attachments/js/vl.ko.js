var ViewModel = function(_standard, _type, _year, _sign) {
    var that = this;
    
    that.standard = ko.observable(_standard);
    that.type = ko.observable(_type);
    that.year = ko.observable(_year);
    that.sign = ko.observable(_sign);
    
    that.docsThatMatch = ko.observable();
    
    ko.dependentObservable(function() {
			       // couchcall
			       // success : function(data){
			       var req ={};
			       
			       req.url = "_list/overview/docs";
			       req.data = {startkey: "\"" + that.year() + "_"+
					   that.standard() + "_"+
					   that.type() + "_"+
					   that.sign()+ "\"",
					   endkey:"\"" + that.year() + "_"+
					   that.standard() + "_"+
					   that.type() + "_"+
					   that.sign()+"zzzzzzzzz"+ "\""};
			       
			       req.success  =   that.docsThatMatch;
			       $.ajax(req);
			       
			   }, that);
    
  
};
 
ko.applyBindings(new ViewModel("CE3", "KK", "2013", ""));

