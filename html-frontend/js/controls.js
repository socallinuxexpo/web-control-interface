/**
 * Creates a clickable button as part of a button set.
 * @param spec - specification for this control
 * @param send - function to call on click
 * @return container holding button, or updated container
 */
function button(spec,send) {
    var cont = $("#"+sepc.group+" #buttons");
    if (cont.length == 0)
        cont = $("<div></div>").attr("id","buttons");
    return controlable(spec,cont,send)
}
/**
 * Creates a button for use with a select dropdown.
 * @param spec - control spec
 * @param send - function for on-click
 * @return contrainer holding control
 */
function select(spec,send) {
    var id = getValidId(spec.name);
    var cont = $("<div></div>").attr("id",id);
    return controlable(spec,cont,send);
}
/**
 * Gets a button widget
 * @param spec - control spec
 * @param cont - container to put it in
 * @param send - sunction for on-click
 * @return container
 */
function controlable(spec,cont,send) {
    var id = getValidId(spec.name);
    var html = $("<button></button>").button().addClass("ctrlButton").addClass("control");
    html.addClass("ctrlbutton").addClass("control").attr("id",id).click(send);
    html.val(spec.name);
    html.text(spec.name);
    return cont.append(html);
}
/**
 * Gets a readible control from given spec
 * Note: This function registers starts a periodic refresh of the control
 * @param spec - control spec for read-only control
 * @returns - visual display for that control.
 */
function readable(spec) {
    var id = getValidId(spec.name);
    var cont = $("<div></div>").attr("id",id);
    var ra = $("<input type='radio' />").attr("name",spec.name).attr("id",id+"-a");
    var rb = $("<input type='radio' />").attr("name",spec.name).attr("id",id+"-b");
    var la = $("<label>Side A</label>").attr("for",id+"-a");
    var lb = $("<label>Side B</label>").attr("for",id+"-b");
    var ll = $("<label></label>").text(spec.name);
    cont.append(ll).append("<br/>").append(ra).append(la).append(rb).append(lb);
    var fun = getReadFunction(ra,rb,spec.url); 
    ra.on("click",function(){});
    rb.on("click",function(){});
    setInterval(fun,500);
    return cont;
}