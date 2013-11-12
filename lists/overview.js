function(head, req) {

    var share = require("lib/vaclab/share"),
    mustache = require("lib/couchapp/mustache"),

    epbody = this.templates.extPickBody,
    r,
    i   = 0,
    cnt = 0,
    bo  = {};

    start(share.startHtml);

    while(r = getRow()) {
	var rv = r.value;
	var so = [];
	if(rv._attachments){
	    
	    for(i in rv._attachments){
		var rvai = rv._attachments[i];
		
		so.push({filename:i,
		  content_type:rvai.content_type,
			 length:rvai.length
			});
	    }
	    rv.so = so;
	    send(mustache.to_html(epbody,rv ));
	}// if _at..
        cnt++;
    }//while
}
