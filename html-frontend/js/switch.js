var Hswitch = document.getElementById("HDMI");
var Vswitch = document.getElementById("layout-view");

function clicked()
{
    Hswitch.classList.toggle("show");
    Vswitch.classList.toggle("show");
}


Hswitch.onclick = function(event){
    if(!event.target.matches('.hdmi-dropbtn')) {
        var hdmi_drpdwns = document.getElementsByClassName("hdmi-content")

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

Vswitch.onclick = function(event){
    if(!event.target.matches('layout-dropbtn')) {
        var layout_drpdwns = document.getElementsByClassName("layout-content")

        const obs = new OBSWebSocket();
        obs.connect({ address: '192.168.0.2:4444', password: 'starchmd1' });

        obs.send('GetSceneList', {} ).then(function(data){alert(data)});


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
