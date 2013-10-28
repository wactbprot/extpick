exports.CalObjNames = function(Obj){
    var    tmpco   = "",
    i = 0,
    cmco,
    retCalObjNames = [];

    if(Obj.Measurement &&
       Obj.Measurement.CalibrationObject){
        cmco = Obj.Measurement.CalibrationObject;
        
	for(i; i < cmco.length; i++ ){
            retCalObjNames.push(
		(cmco[i].Name || cmco[i].Device.Name)
		    .replace(/\s/g, "_")
	    );
        }
        emit(null,{CalObjNames:retCalObjNames});
    }
};

exports.CalObjTask = function(Obj){
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

exports.AuxObjTask = function(Obj){
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

exports.MPTask = function(Obj){

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
exports.YampTask = function(Obj){

    if(Obj.Tasks){
	var noOfTasks = Obj.Tasks.length;
        return( {  "Tasks"    : Obj.Tasks,
                   "name"     : "",
                   "_avail"   : noOfTasks > 0,
                   "noOfTasks": noOfTasks,
                   "Defaults" : Obj.Defaults || null
                });
    }else{
        return({"_avail"     : false});
    }
};

exports.StandardTask = function(Obj){
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

exports.retTask = function(retObj){

    if(retObj || retObj._avail){

        for (var i = 0; i < retObj.noOfTasks; i++) {

            var  _task = JSON.parse(JSON.stringify( retObj.Tasks[i]));


	    if(retObj.name === ""){
		var retKey =  _task.TaskName;
	    }else{
		var retKey =  retObj.name +"_"+_task.TaskName;
	    }
	    
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
