/**
 * Calls the Camera
 */
function callCam(query,succ) {
    $.ajax({
        type: "GET",
        url: CONFIG["camera-control"]+"?"+query,
        username: "admin",
        password: "sCalAV13",
        success: succ
    });
}
/**
 * Updates the pan tilt and zoom displayed on UI
 */
function updateCamUI(pan,tilt,zoom) {
    $("#pan").val(pan);
    $("#tilt").val(tilt);
    $("#zoom").val(zoom);
}
/**
 * Calls camera for PTZ
*/
function getPTZ() {
    // Function to parse ptz response
    var parse = function(data) {
        var ptz = data.trim().split("\n");
        var tmp = {};
        for(i=0; i<ptz.length; i++) {
            var parts=ptz[i].split(":");
            tmp[parts[0]] = parseFloat(parts[1],10);
        }
        return tmp;
    }
    callCam("query=ptz",function(data) {
                         var tmp = parse(data);
                         updateCamUI(tmp["pan"],tmp["tilt"],tmp["zoom"]);
                     });
}

/**
 * Set PTZ of certain dir.
 */
function setPTZ(type,value){
  if (type != "pan" && value > CONFIG[type+"-max"])
      value = CONFIG[type+"-max"]
  if (type != "pan" && value < CONFIG[type+"-min"])
      value = CONFIG[type+"-min"];
  callCam("move"+type+"="+value,function(data) {setTimeout(getPTZ,1500)});
}

/**
 * Zoom level
 */
function increment(id) {
    var type = (id == "up" || id == "down") ? "tilt" : "pan";
    var direction = (id == "up" || id == "right") ? -1 : 1;
    var value = parseInt($("#"+type).val(),10) + direction*CONFIG[type+"-step"];
    setPTZ(type,value);
}

function spinnerSet() {
    var type = $(this).attr("id");
    var value = parseFloat($(this).val(),10);
    setPTZ(type,value);
}

function vidsetup() {
  $("#dpad button").click(function(){
      increment($(this).attr("id"));
  });
  $(".pan").spinner({ min: CONFIG["pan-min"], max: CONFIG["pan-max"], step: CONFIG["pan-step"], numberFormat: "n" });
  $(".tilt").spinner({ min: CONFIG["tilt-min"], max: CONFIG["tilt-max"], step: CONFIG["tilt-step"], numberFormat: "n" });
  $(".zoom").spinner({ min: CONFIG["zoom-min"], max: CONFIG["zoom-max"], step: CONFIG["zoom-step"], numberFormat: "n" });
  $(".step").spinner({ min: CONFIG["step-min"], max: CONFIG["step-max"], step: 1, numberFormat: "n",
    change: function() {
                CONFIG["pan-step"] = parseFloat($(this).val(),10);
                CONFIG["tilt-step"]= parseFloat($(this).val(),10); 
            } });
   $(".step").val(1);
	//		jQueryUI			jQuery
  $(".ptzspinner").spinner({change:spinnerSet}).change(spinnerSet);
  getPTZ();
}

