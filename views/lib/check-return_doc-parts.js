exports.calibration = function(doc){
    var dc = doc.Calibration,
    _res = {  "_avail"  : false,
              "key"     : "",
              "value"   : ""
           };

    if(doc._id =='000_TEMPLATE'){

        _res._avail  = true;
        _res.key     = 'Calibration_Template';
        _res.value   = doc;

    }else{
        if(dc.Year     &&
           dc.Sign     &&
           dc.Standard &&
           dc.Type){
            /**
             * Es werden nur noch Dokumente
             * benutzt, die Sign(s) mit der Syntax
             * xxxx-yyyy oder  xxxx_yyyy besitzen
             * und die nicht vom Typ NN sind
             */
            var _csl = dc.Sign.split(/[-_]+/).length;

            if((_csl == 2) &&
                !(dc.Type == 'NN') ){

                _res._avail = true;
                _res.key    = dc.Year+'_'+dc.Type+'_'+ dc.Sign  ;

                if(dc.Type == 'IK' &&
                   dc.Result       &&
                   dc.Result.Values){

                    _res.key = dc.Year+'_'+dc.Type +'_'+ dc.Sign;

                }
                _res.value   = doc;
            }
        }
    }
    return(_res );
};

exports.allCalObj = function(doc){
    var _res = {  "_avail"  : false,
                  "key"     : "",
                  "value"   : ""
               },
    co       = doc.CalibrationObject;

    if(co.Name){
	_res._avail = true;
	_res.key    = co.Name;
	_res.value  = doc;	
    }

    if(co.Device && co.Device.Name){
	_res._avail = true;
	_res.key    = co.Device.Name;
	_res.value  = doc;	
    }

    return _res;
};

exports.calObj = function(doc){

    var _res = {  "_avail"  : false,
                  "key"     : "",
                  "value"   : ""
               },
    co       = doc.CalibrationObject,
    cod      = co.Device;


    if(co.Type){
        var _coType = co.Type;
    }
    if(co.Sign){
        var _coSign = co.Sign;
    }
    if(cod.Standard){
        var _coStd = cod.Standard;
    }
    if(co.Standard){
        var _coStd = cod.Standard;
    }
    var _coDate = '';
    if(co.Date){
        _coDate = co.Date.Value.split(' ')[0];
    }else{
        // muss weh tun!
        _coDate = '1999-01-01';
    }

    if(_coStd   &&
       _coDate  &&
       _coType  &&
       _coSign   ){

           _res._avail = true;
           _res.key =  _coStd +'_'+ _coDate +'_'+_coType+'_'+ _coSign;
           _res.value = doc;
       }
    return _res;
};




exports.auxObj = function(doc){

    var _res = {  "_avail"  : false,
                  "key"     : "",
                  "value"   : ""
               },
    ao = doc.AuxObject;

    if(ao.Name){
        _res._avail = true;
        _res.key    = ao.Name;
        _res.value  = doc;

    }
    return _res;
};

/**
 * Constants (die universiumsweit gültigen)
 */
exports.const = function(doc){
    return {_avail:true,
            key   :doc.Constants.Date.Value.slice(0,10),
            value : doc
           };
};
/**
 * Standarddokumente
 * diese müssen einen Namen oder
 * einen Typ besitzen. Der param in der up list
 * entscheidet anhand Name und Type welches
 * Standarddokument benutzt wird
 *
 */
exports.standard = function(doc){
    var ds = doc.Standard,
    _res = {  "_avail"  : false,
              "key"     : "",
              "value"   : ""
           };

    if((ds.Type  || ds.Name) &&
        ds.Date   &&
       (ds.Date.Value || ds.Date[0].Value)){

        var _d1 = ds.Date.Value || ds.Date[0].Value;
        var _d2 = _d1.split("-");

        var date = [_d2[0],_d2[1],_d2[2]].join("-");

        _res._avail = true;
        _res.key = ds.Type + '_' + date;
        _res.value = doc;

        return(_res );

    };
};


exports.allCustomers = function(doc){
    var _res = {  "_avail"  : false,
                  "key"     : "",
                  "value"   : ""
               },
    o       = doc.Customer;
    
    if(o.Name){
	_res._avail = true;
	_res.key    = o.Name;
	_res.value  = doc;	
    }
    return _res;
};

exports.allToDo = function(doc){
    var _res = {  "_avail"  : false,
                  "key"     : "",
                  "value"   : ""
               },
    o       = doc.ToDo;
    
    if(o.Name || o.Sign){
	_res._avail = true;
	_res.key    = o.Name || o.Sign;
	_res.value  = doc;	
    }
    return _res;
};

exports.servers = function(doc){
    /*
     * aus historischen Gründen hat(te) hier der key noch die Werte
     * sollte in diwan geändert werden
     */    
    var _res = {  "_avail"  : true,
                  "key"     : "Servers",
                  "value"   : doc.Servers
               };
    
    return _res;
};

exports.translations = function(doc){
    /*
     * aus historischen Gründen hat(te) hier der key noch die Werte
     * sollte in diwan geändert werden
     */    
    var _res = {  "_avail"  : true,
                  "key"     : "Translations",
                  "value"   : doc.Translations
               };
    
    return _res;
};
