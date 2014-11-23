function logArrayElements(element, index, array) {
  parts=element.split(":")
  return parts
}

function getptz(cam){
  $.ajax({
    type: "GET",
    url: "https://"+ CAM_IP +"/x/1/cgi-bin/ptz.cgi?query=ptz",
    success: function(data) {
      ptz = data.trim().split("\n");
      for(i=0; i<ptz.length; i++) {
        parts=ptz[i].split(":")
        $("#" + parts[0] + "_" + cam).val(parts[1]);
        //document.forms[0].elements[parts[0]+"_"+cam].value = parts[1];
        console.log("query: " + parts[1]);
        lastValues[i] = parts[1]
      }
      $(".slider-tilt").slider("value", TILT_MAX - lastValues[TILT_ID]);
      $(".slider-pan").slider("value", PAN_MAX - lastValues[PAN_ID]);
    }
  });
}
function setptz(cam,type,direction,amount=null){
  value = parseInt($("#" + type + "_" + cam).val(), 10)
  //value = parseInt(document.forms[0].elements[type+"_"+cam].value)
  oldVal = value

if(amount == null){
	  if(type == 'pan'){
	    amount = PAN_INCREMENT
	  }
	  else if(type == 'tilt'){
	    amount = TILT_INCREMENT
	  }
	  else{
	    amount = 2
	  }

	  if(direction == 'up'){
	    value += amount;
	  }
	  else{
	    value -= amount;
	  }
}
else {
	value = amount
}
  console.log("current: " + oldVal + "direction: " + direction + " request: " + value)
  $.get(
    "https://"+CAM_IP+"/x/1/cgi-bin/ptz.cgi?move"+type+"="+value,
    function(data) {
      delay = 1000;
      if(type == 'zoom'){
        delay = 2000
      }
      setTimeout("getptz(1)", 1500);
    }
  );
}
function vidsetup() {
  $(".up_btn").click(function(){
    setptz('1', 'tilt', 'down')
  });
  $(".down_btn").click(function(){
    setptz('1', 'tilt', 'up')
  });
  $(".left_btn").click(function(){
    setptz('1', 'pan', 'up')
  });
  $(".right_btn").click(function(){
    setptz('1', 'pan', 'down')
  });

  $( ".pan" ).spinner({
    min: PAN_MIN,
    max: PAN_MAX,
    step: 5.0,
    numberFormat: "n"
  });
  $( ".tilt" ).spinner({
    min: 0,
    max: 180,
    step: 5.0,
    numberFormat: "n"
  });
  $( ".zoom" ).spinner({
    min: 0,
    max: 20,
    step: 1.0,
    numberFormat: "n"
  });

  $(".pan").change(function() {
    curr = $(".pan").val()
    diff = curr - lastValues[PAN_ID];
    direction = ''
    if(diff > 0){
      direction = 'up'
    }
    else {
      direction = 'down'
    }
    setptz(1,'pan', direction, curr);
    $(".slider-pan").slider("value", PAN_MAX - curr)
  });

  $(".tilt").change(function() {
    curr = $(".tilt").val()
    diff = curr - lastValues[TILT_ID];
    direction = ''
    if(diff > 0){
      direction = 'up'
    }
    else {
      direction = 'down'
    }
    setptz(1,'tilt', direction, curr);
    $(".slider-tilt").slider("value", TILT_MAX - curr)
  });


  $(".zoom").change(function() {
    curr = $(".zoom").val()
    diff = curr - lastValues[ZOOM_ID];
    direction = ''
    if(diff > 0){
      direction = 'in'
    }
    else {
      direction = 'out'
    }
    setptz(1,'zoom', direction, curr);
  });

  // Let input boxes fire change event when spinner used
  $(".ui-spinner-button").click(function() {
    $(this).siblings('input').change();
  });

  getptz('1');
  setTimeout("initSliders()", 1000)

}

function initSliders(){
  $(".slider-pan").slider({
    orientation: "horizontal",
    min: PAN_MIN,
    max: PAN_MAX,
    value: lastValues[PAN_ID],
    slide: function(event, ui) {
      $(".pan").val(PAN_MAX - ui.value);
      $(".pan").trigger("change")
    }
  });

  $(".slider-tilt").slider({
    orientation: "vertical",
    min: TILT_MIN,
    max: TILT_MAX,
    value: lastValues[TILT_ID],
    slide: function(event, ui) {
      $(".tilt").val(TILT_MAX - ui.value);
      $(".tilt").trigger("change")
    }
  });
}
