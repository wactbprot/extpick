function(doc) {
    
    var key = doc.Year +"_"+
	doc.Standard+"_"+
	doc.Type+"_"+
	doc.Sign,
    value = doc;
    emit(key, value);
}
