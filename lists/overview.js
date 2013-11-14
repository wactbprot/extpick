function(head, req) {

    var share = require("lib/vaclab/share"),
    mustache = require("lib/couchapp/mustache"),

    epbody = this.templates.extPickBody,
    r,
    gotNoData = true,
    i   = 0,
    cnt = 0,
    bo  = {};

    start(share.startHtml);



        while(r = getRow()) {
            
	    var rv = r.value;
            var soPng = [];
            var soXls = [];
            if(rv._attachments){
		gotNoData = false;
                for(i in rv._attachments){
                    var rvai = rv._attachments[i];
		    if(rvai.content_type == "image/png"){
			soPng.push({filename:i,
				    content_type:rvai.content_type,
				    length:rvai.length
				   });
		    }else{
			soXls.push({filename:i,
				    content_type:rvai.content_type,
				    length:rvai.length
				   });
		
		    }
                }
                rv.soPng = soPng;
		rv.soXls = soXls;
		
                send(mustache.to_html(epbody,rv ));
		cnt++;
            }
	}//while
    
    if(gotNoData){
	send("<h2>nothing on database</h2>");
    }// if _at..
    
    
}
