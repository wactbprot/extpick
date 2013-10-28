exports.CalObj = function(doc){
    var Obj = doc.CalibrationObject;
    if(Obj.Tasks){
	var noOfTasks = Obj.Tasks.length;
	
	return( {  "Tasks"    : Obj.Tasks,
		   "name"     : (Obj.Name || Obj.Device.Name).replace(/\s/g, "_"),
		   "_avail"   : noOfTasks > 0,
		   "noOfTasks": noOfTasks,
		   "Defaults" : Obj.Defaults || undefined
		});
    }else{
	return({"_avail"     : false});
	
    }
};

exports.AuxObj = function(doc){
  var Obj = doc.AuxObject;
  if(Obj.Tasks){
    var noOfTasks = Obj.Tasks.length;

    return( { "Tasks"     : Obj.Tasks,
              "name"     : Obj.Name.replace(/\s/g, "_"),
              "_avail"   : noOfTasks > 0,
              "noOfTasks": noOfTasks,
              "Defaults" : Obj.Defaults || null
            });
  }else{
    return({"_avail"     : false});

  }
};

exports.MP = function(doc){
    var Obj = doc.MP;
    if(Obj.Tasks){
	var noOfTasks = Obj.Tasks.length;
	return( {  "Tasks"    : Obj.Tasks,
		   "name"     : "MP",
		   "_avail"   : noOfTasks > 0,
		   "noOfTasks": noOfTasks,
		   "Defaults" : Obj.Defaults || null
		});
    }else{
	return({"_avail"     : false});
    }
};

exports.Standard = function(doc){
    var Obj = doc.Standard;
    if(Obj.Tasks){
	var noOfTasks = Obj.Tasks.length;
	
	return( { "Tasks"     : Obj.Tasks,
		  "name"      : (Obj.Name || Obj.Type).replace(/\s/g, "_"),
		  "_avail"    : noOfTasks > 0,
		  "noOfTasks" : noOfTasks,
		  "Defaults"  : Obj.Defaults || undefined
		});
    }else{
	return({"_avail"      : false});
	
    }
};

exports.RetTask = function(retObj){
    
    if(retObj || retObj._avail){
	
	for (var i = 0; i < retObj.noOfTasks; i++) {
	    
	    var  _task = JSON.parse(JSON.stringify( retObj.Tasks[i]));
	    
	    var retKey =  retObj.name +"_"+_task.TaskName;
	    
	    _task.Defaults = retObj.Defaults || undefined;
	    _task.TaskName = retKey;
	    
	    var retVal = {"Task"    :_task,
			  "Defaults":retObj.Defaults
			 };
	    if(retVal && retKey){
		
		emit( retKey, retVal);
		
	    }
	}
    }
};
