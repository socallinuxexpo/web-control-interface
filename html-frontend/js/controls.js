/**
 * Creates a clickable button as part of a button set.
 * @param spec - specification for this control
 * @param send - function to call on click
 * @return container holding button, or updated container
 */
function button(spec,send) {
    var cont = $("#"+getValidId(spec.group)+" #buttons");
    if (cont.length == 0)
        cont = $("<div></div>").attr("id","buttons");
        cont.buttonset();
    return controlable(spec,cont,send).buttonset("refresh");
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
    // Add any argument controls
    if ("args" in spec) {
        args(cont,id,spec.args);
    } else {
        spec.args = [];
    }
    var html = $("<button></button>").button().addClass("ctrlButton").addClass("control");
    html.addClass("ctrlbutton").addClass("control").attr("id",id).click(send);
    html.val(spec.name);
    html.text(spec.name);
    html.data("url",spec.url);
    html.data("args",spec.args);
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
    var la = $("<label>Signs</label>").attr("for",id+"-a");
    var lb = $("<label>Speaker</label>").attr("for",id+"-b");
    var ll = $("<label></label>").text(spec.name);
    cont.append(ll).append("<br/>").append(ra).append(la).append(rb).append(lb);
    var url = CONFIG.url+spec.url;
    var fun = getReadFunction(url,ra,rb); 
    ra.on("click",function(){});
    rb.on("click",function(){});
    setInterval(fun,CONFIG["poll-period"]);
    return cont;
}
/**
 * Returns a function that will read a pin and update
 * a given div.
 * @param span - span id to update
 * @param pin - pin to read
 * @return function to call and read pin
 **/
function getReadFunction(url,ra, rb,fun) {
    var ret = function() {
        ajax(url,
            function(resp) {
                ra.prop("checked", resp.value);
                rb.prop("checked", !resp.value);
            },
            function() {
                ra.prop("checked", false);
                rb.prop("checked", false);
                GlobalLogger.error("Failed read pin at: "+url);
            });
    };
    return ret;
}
/**
 * Groups controls by name.  If group exists, append control.
 * @param group - group name
 * @param cont - container to add to this group
 * @return group div
 */
function group(group,cont) {
    var id = getValidId(group);
    var res = $("div#" + id);
    if (res.length == 0)
    {
       res = $("<div></div>").attr("id",id).addClass("controls-group");
       res.addClass("control-element").addClass("ui-corner-all").addClass("ui-widget-content");
       res.append($("<h4></h4>").text(group));
    }
    return res.append(cont);
}

/**
 * Add argument selections to controls
 * @param cont - container to add to
 * @param args - args specification
 */
function args(cont,cid,args) {
    for (var i = 0; i < args.length; i++)
    {
        var arg = args[i];
        var name = arg.name;
        var id = cid +"-arg-"+name;
        var values = options(name,arg.value);
        var item = null;
        //Hidden args have no input
        if ("hidden" in arg) {
            item = $("<input></input>").attr("name",name).attr("type","hidden").addClass("arg").attr("id",id);
            item.val(values[0]);
        }
        else {
            item = $("<select></select>").addClass("arg").attr("name",name).attr("id",id);
            item.addClass("ui-widget-content").addClass("rounded-fix-padding");
            for (var j = 0; j < values.length; j++)
            {
                var opt = $("<option></option>").val(values[j].url).text(values[j].name);
                item.append(opt);
            }
            var label = $("<label></label>").text(arg.label+":").attr("for",id);
            cont.append(label);
        }
        cont.append(item.addClass("ui-corner-all"));
    }
}
/**
 * Returns possible values for an argument based upon its name.
 * @param name - name of argument
 * @return - possible values for argument
 */
function options(name,value) {
    switch(name) {
        case "room-url":
            return [window.location.hostname];
        case "camera-url":
            var urls = [];
            for (var i = 0; i < CONFIG["rooms"].length; i++) {
                urls.push({"name":CONFIG["rooms"][i].name,"url":CONFIG["rooms"][i].camera});
            }
            return urls;
        default:
            return [(value===undefined)?name:value];
    }
}
