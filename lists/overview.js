function(head, req) {

    var share = require("lib/vaclab/share"),
    mustache = require("lib/couchapp/mustache"),
    ephead = this.templates.overviewHead,
    epbody = this.templates.overviewBody,
    epfoot = this.templates.overviewFoot,
    r,i,
    cnt = 0,
    bo  = {
	title:"Excel&Co"
    };

    start(share.startHtml);
    send(mustache.to_html(ephead, bo));
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
    
    send(mustache.to_html(epfoot,bo));
}
/**
{_id: "92853a9a1fe97346160f656670258f14", 
 _rev:"18-81757cade5cdfc4f3ea04d8b092189a0", 
 Standard: "CE3", 
 Sign: "4813_0003",
 Type: "IK", 
 Year: "2013", 
 _attachments: {
     2013-IK-CE3-4813_0003.Analysis.xlsx:{content_type: "NA", revpos: 18, digest: "md5-+r6l3eoTosO5YmKxDMuowQ==",					   length: 7222, stub: true}, 2013-IK-CE3-4813_0003.Measurement.xlsx:
{content_type: "NA", revpos: 17, digest: "md5-Y9UonUuJrhV59U7dDfQ6QQ==",
length: 5488, stub: true}, 2013-IK-CE3-4813_0003.html: {content_type:
"text/html", revpos: 16, digest: "md5-fiLv795UlqDODrZ/ZB2Dtw==", length:
20633, stub: true}, figures/unnamed-chunk-2.png: {content_type: "image/png",
revpos: 15, digest: "md5-rQreIDDbEViWUS2C0+rhxQ==", length: 2306, stub: true},
figures/temperature-plot.png: {content_type: "image/png", revpos: 14, digest:
"md5-xTwAlv/ZMEBGPfgnff7/Rg==", length: 16851, stub: true},
figures/pfilloffset-plot.png: {content_type: "image/png", revpos: 13, digest:
"md5-+5+CoZZPJvcMcJjrVfERog==", length: 5233, stub: true},
figures/pfill-plot.png: {content_type: "image/png", revpos: 12, digest:
"md5-IM/RW5x8Aik6+s5drv1gwg==", length: 4240, stub: true},
figures/pcal-plot.png: {content_type: "image/png", revpos: 11, digest:
"md5-xZTvBoOgj+FrVzIILPWxQw==", length: 4368, stub: true}}} 
**/