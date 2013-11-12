// Here's my data model
var ViewModel = function(_standard, _type, _year, _sign) {
    var that = this;

    that.standard = ko.observable(_standard);
    that.type = ko.observable(_type);
    that.year = ko.observable(_year);
    that.sign = ko.observable(_sign);
 
    that.docsThatMatch = ko.computed(
	function() {
	    
	    // couchcall
	    // success : function(data){
	    var req ={};
	    
	    req.url = "_list/overview/docs";
            req.data = {key: "\"" + that.year() + "_"+
			that.standard() + "_"+
			that.type() + "_"+
			that.sign()+ "\""};
	    
            req.success = function(html){
		// ?????????

	return html;
            };	
            $.ajax(req);
	    
	}, that);
    
  
};
 
ko.applyBindings(new ViewModel("CE3", "VG", "2013", "0070_0001"));

