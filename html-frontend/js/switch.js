var hSwitch = document.getElementById("HDMI");
$(document).ready(setupObs);
var vSwitch = document.getElementById("layout-view");

function clicked()
{
    hSwitch.classList.toggle("show");
    vSwitch.classList.toggle("show");
}


hSwitch.onclick = function(event){
    if(!event.target.matches('HDMI')) {
        var hdmi_drpdwns = document.getElementById("HDMI")

        for (var i = 0; i < hdmi_drpdwns.length; i++)
        {
            var hopen = hdmi_drpdwns[i];
            //hdmi" of data "1" if current setting is 2, otherwise "2" if current setting is 1
            $.get("http://127.0.0.1:5000/matrix");
            if (hopen.classList.contains('show')){
                hopen.classList.remove('show');
            }
        }
    }
    else{
        window.alert("HDMI ERROR");
    }
}

function handle_obsList(data, err)
{
    alert(data);
    alert(err);

}

vSwitch.onclick = function(event){
    if(!event.target.matches('layout-view')) {
        var layout_drpdwns = document.getElementsByClassName("layout-view")

        for (var j = 0; j < layout_drpdwns.length; j++)
        {
            var lopen = layout_drpdwns[j];
            //hdmi" of data "1" if current setting is 2, otherwise "2" if current setting is 1
            $.get("http://127.0.0.1:5000/obs");
            if (lopen.classList.contains('show')){
                lopen.classList.remove('show');
            }
        }
    }
    else
    {
        window.alert("VIEW ERROR");
    }
}

function setupObs()
{
    const obs = new OBSWebSocket();

    obs.connect({
        address: '192.168.0.2:4444',
        password: 'starchmd1'
    }).catch(err =>
    {
        alert(err);
    }).then(() => {
        console.log(`Success! We're connected & authenticated.`);
        return obs.send('GetSceneList');

    }).then(data =>
    {
        console.log(`${data.scenes.length} Available Scenes!`);
        data.scenes.forEach(scene =>
        {
            $("#layout-view").append("<a href=\"#\">"+ scene.name +"</a>")
        });
    }).catch(err =>
    { // Promise convention dicates you have a catch on every chain.
        console.log(err);
    });
}

