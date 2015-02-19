/**
 * Calls the Camera
 */
function callCam(query,succ) {
    $.ajax({
        type: "GET",
        url: CONFIG["camera-control"]+"?"+query,
        username: "admin",
        password: "sCalAV13",
        //beforeSend: function(xhr) { 
        //    xhr.setRequestHeader("Authorization", "Basic " + btoa("admin:sCalAV13")); 
        //},
        success: succ
    });
}
/**
 * Updates the pan tilt and zoom displayed on UI
 */
function updateCamUI(pan,tilt,zoom) {
    $(".slider-tilt").slider("value", tilt);
    $(".slider-pan").slider("value", pan);
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
  if (value > CONFIG[type+"-max"])
      value = CONFIG[type+"-max"]
  if (value < CONFIG[type+"-min"])
      value = CONFIG[type+"-min"];
  callCam("move"+type+"="+value,function(data) {setTimeout(getPTZ,1500)});
}
/**
 * Zoom level
 */
function zoomM(zoom) {
    return zoom;
}

/**
 * Increments a value
 */
function increment(id) {
    var type = "pan";
    if (id == "up" || id == "down")
        type = "tilt";
    var multiplier = zoomM(parseFloat($("#zoom").val(),10));
    if (id == "up" || id == "right")
        multiplier *= -1;
    var value = parseInt($("#"+type).val(),10) + multiplier*CONFIG[type+"-step"];
    setPTZ(type,value);
}

function spinnerSet() {
    var type = $(this).attr("id");
    var value = parseFloat($(this).val(),10);
    setPTZ(type,value);
}
function sliderSet() {
    var type = $(this);
    type = type.attr("id");
    type = type.replace("slider-","");
    var value = $(this).slider("option", "value");
    setPTZ(type,value);
}


function vidsetup() {
  $("#dpad button").click(function(){
      increment($(this).attr("id"));
  });
  $(".pan").spinner({ min: CONFIG["pan-min"], max: CONFIG["pan-max"], step: CONFIG["pan-step"], numberFormat: "n" });
  $(".tilt").spinner({ min: CONFIG["tilt-min"], max: CONFIG["tilt-max"], step: CONFIG["tilt-step"], numberFormat: "n" });
  $(".zoom").spinner({ min: CONFIG["zoom-min"], max: CONFIG["zoom-max"], step: CONFIG["zoom-step"]/10, numberFormat: "n" });
  $(".step").spinner({ min: CONFIG["step-min"], max: CONFIG["step-max"], step: 1, numberFormat: "n",
    change: function() {
                CONFIG["pan-step"] = parseFloat($(this).val(),10);
                CONFIG["tilt-step"]= parseFloat($(this).val(),10); 
            } });
   $(".step").val(CONFIG["pan-step"]);
  $(".ptzspinner").spinner({change:spinnerSet}).change(spinnerSet);
  getPTZ();
//  initSliders();
}
/**
 *
 */
function initSliders(){
    $(".slider-pan").slider({
        orientation: "horizontal",
        min: CONFIG["pan-min"],
        max: CONFIG["pan-max"],
        change: sliderSet
    });
    $(".slider-tilt").slider({
        orientation: "vertical",
        min: CONFIG["tilt-min"],
        max: CONFIG["tilt-max"],
        change: sliderSet
    });
}
