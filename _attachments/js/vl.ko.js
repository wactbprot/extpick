// Here's my data model
var ViewModel = function(_standard, _type, _year, _sign) {
    this.standard = ko.observable(_standard);
    this.type = ko.observable(_type);
    this.year = ko.observable(_year);
    this.sign = ko.observable(_sign);
 
    this.docsThatMatch = ko.computed(function() {
					 
				    return this.standard() + " " + this.sign();
    }, this);
};
 
ko.applyBindings(new ViewModel("CE3", "VG", "2013", "0070_0001"));

