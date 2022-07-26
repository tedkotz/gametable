/* Global Data */
var unique_idx = 1234;
var selectedToken = null;

function drag_start(event) {
    var style = window.getComputedStyle(event.target, null);
    event.dataTransfer.setData("text/plain",
    (parseInt(style.getPropertyValue("left"),10) - event.clientX) + ',' + (parseInt(style.getPropertyValue("top"),10) - event.clientY) + ',' +  event.target.id );
} 

function drop(event) {
    var offset = event.dataTransfer.getData("text/plain").split(',');
    var dm = document.getElementById(offset[2]);
    dm.parentNode.appendChild(dm);
    dm.style.left = (event.clientX + parseInt(offset[0],10)) + 'px';
    dm.style.top = (event.clientY + parseInt(offset[1],10)) + 'px';
    event.preventDefault();
    return false;
}

function drag_over(event) {
    event.preventDefault();
    return false;
} 

function openTab(evt, Name) {
    var i, tabcontent, tablinks, displayObject;
    tablinks = evt.currentTarget.parentNode.parentNode.children;
    tabcontent = evt.currentTarget.parentNode.parentNode.parentNode.children;
    for (i = 0; i < tabcontent.length; i++) {
        if(tabcontent[i].classList.contains("tabcontent"))
        {
            if( tabcontent[i].id === Name ) {
                displayObject=tabcontent[i];
            } else {
                tabcontent[i].style.display = "none";
            }
        }
    }
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    displayObject.style.display = "block";
    evt.currentTarget.parentNode.className += " active";
}


function set_focused_token( token ) {
    var i, tabcontent;
    var descript, image;
    if( token  && token.classList.contains("token") ) {
        selectedToken=token;
//        descript = "<p>" + token.id + "</p><p>" + token.className + "</p><p>" + token.style.backgroundColor + "</p>";
        descript = "<table><tbody><tr><th>Attribute</th><th>Value</th></tr>" 
            + "<tr><td>Id</td><td>" + token.id + "</td></tr>"
            + "<tr><td>Class</td><td>" + token.className + "</td></tr>"
            + "<tr><td>Color</td><td>" + token.style.backgroundColor + "</td></tr></tbody></table>";
        image = token.style.backgroundImage;
    }
    else {
        selectedToken=null;
        descript = "<p> No Token selected.</p>";
        image = "none"
    }
    tabcontent = document.getElementsByClassName("tokenDescription");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].innerHTML = descript;
        tabcontent[i].style.backgroundImage = image;
    }
}
    
function select_token(evt) {
    set_focused_token( evt.currentTarget );
}

function doubleclick_token(evt) {
    set_focused_token( evt.currentTarget );
}

function wire_up_token(myToken) {
    if ( !(myToken.id) ) {
      myToken.id = "token_" + (unique_idx++).toString();
    }
    myToken.addEventListener("dragstart",drag_start,false);
    //myToken.addEventListener("mousedown",select_token,false);
    myToken.addEventListener("click",select_token,false);
    myToken.addEventListener("dblclick",doubleclick_token,false);
}

function clone_selected_token()
{
    if(selectedToken) {
        var cln = selectedToken.cloneNode(true);
        cln.id = "token_" + (unique_idx++).toString();
        selectedToken.parentNode.appendChild(cln);
        var rect= cln.getBoundingClientRect();
        cln.style.left = (rect.left + 20) + 'px';
        cln.style.top = (rect.top + 10) + 'px';        
        wire_up_token(cln);
        set_focused_token(cln);
    }
}

function delete_selected_token()
{
    if(selectedToken) {
        selectedToken.parentNode.removeChild(selectedToken);
        set_focused_token(null);
    }
}

function save_state() {
    var tokens = document.getElementsByClassName("token");
}

function load_state() {
}

function load_token(evt) {
    var form = evt.currentTarget.parentNode;
    var new_token = document.createElement('div');
    var selectedFile = form["tokenFile"].files[0];
    if( selectedFile )
    {
        var reader = new FileReader();
        
        reader.onload = function(event) {
            if(event.target.error) {
              alert("Load Error:" + event.target.error.message);
            }
            else {
                var tokenObject=null;
                try {
                    tokenObject=JSON.parse( event.target.result);
                }
                catch (e) { }
                if( tokenObject && tokenObject.type && tokenObject.type === "GameTableToken" && 
                    Number(tokenObject["majorVersion"]) === 1 && Number(tokenObject["minorVersion"]) >= 0 ) {
                    
                    new_token.className =  tokenObject["className"];
                    new_token.style.height = tokenObject["size"];
                    new_token.style.width = tokenObject["size"];
                    new_token.style.backgroundColor= tokenObject["color"];
                    new_token.style.backgroundImage = tokenObject["image"];
                }
                else {
                    new_token.className =  "halfround token";
                    new_token.style.height = form["tokenSize"].value + "in";
                    new_token.style.width = form["tokenSize"].value + "in";
                    new_token.style.backgroundColor= "transparent";
                    new_token.style.backgroundImage = "url("+event.target.result+")";
                }
            }
        };
        
        if(selectedFile.type === "binary/json") {
            reader.readAsText(selectedFile);
        }
        else {
            reader.readAsDataURL(selectedFile);
        }
    }
    else
    {
        var colorName = form["tokenColor"].value;
        if( colorName==="other" ) {
            colorName = form["tokenOtherColor"].value;
        }
        new_token.className =  form["tokenShape"].value + " token";
        new_token.style.height = form["tokenSize"].value + "in";
        new_token.style.width = form["tokenSize"].value + "in";
        new_token.style.backgroundColor= colorName;
        new_token.style.backgroundImage="none";         
    }
    form["tokenFile"].value="";
    new_token.setAttribute("draggable", "true");
    document.body.appendChild(new_token);
    wire_up_token(new_token);
    set_focused_token(new_token);   
}

function saveAs(uri, filename) {
    var link = document.createElement('a');
    if (typeof link.download === 'string') {
    link.href = uri;
    link.download = filename;

    //Firefox requires the link to be in the body
    document.body.appendChild(link);

    //simulate click
    link.click();

    //remove the link when done
    document.body.removeChild(link);
    }
    else {
    window.open(uri);
    }
}

function save_selected_token(evt) {
    if(selectedToken) {
        var filename=selectedToken.id + ".json";
        var tokenObject = {};

        tokenObject["type"]="GameTableToken";
        tokenObject["majorVersion"]="1";
        tokenObject["minorVersion"]="0"; 
        tokenObject["className"]=selectedToken.className;
        tokenObject["color"]=selectedToken.style.backgroundColor;
        tokenObject["size"]=selectedToken.style.height;
        tokenObject["image"]=selectedToken.style.backgroundImage;

        saveAs('data:binary/json,' + encodeURIComponent(JSON.stringify(tokenObject, null, ' ')), filename);
    }
}

function background_loaded(event) {
    if(event.target.error) {
        alert("Load Error:" + event.target.error.message);
    }
    else {
        document.body.style.backgroundImage = "url("+event.target.result+")";
    }
}
    

function set_background(evt) {
    var form = evt.currentTarget.parentNode;
    var colorName = form["mapColor"].value;
    if( colorName==="other" ) {
        colorName = form["mapOtherColor"].value;
    }
    document.body.style.backgroundColor= colorName;
    var selectedFile = form["mapImage"].files[0];
    if( selectedFile )
    {
        var reader = new FileReader();
        
        reader.onload = background_loaded;
            
        reader.readAsDataURL(selectedFile);
    }
    else
    {
       document.body.style.backgroundImage="none";         
    }
}

function show_controls(event) {
    var controlBoxes = document.getElementsByClassName("controlBox");
    for (var i = 0; i < controlBoxes.length; i++) {
        controlBoxes[i].style.display = "block";
    }
}

function hide_control(event) {
    var controlBoxes = document.getElementsByClassName("controlBox");
    var count = 0;
    for (var i = 0; i < controlBoxes.length; i++) {
        if (controlBoxes[i].style.display !== "none")
        {
            count++;
        }
    }
    if (count > 1) {
        event.target.parentNode.parentNode.style.display = "none";
    }
}


document.body.addEventListener('dragover',drag_over,false);
document.body.addEventListener('drop',drop,false); 
var c = document.body.children;

for( var x in  c) {
  var child = c[x];
  if( child.getAttribute && child.getAttribute("draggable") === "true" ) {
      wire_up_token(child);
  }
}

var itm = document.getElementById("controlS");

// Copy the <li> element and its child nodes
[ "controlN", "controlE", "controlW" ].forEach(function (item) {
    var cln = itm.cloneNode(true);
    cln.id = item;
    cln.style.display = "none";
    itm.parentNode.appendChild(cln);
})

var forms = document.getElementsByTagName("FORM");
for (var i = 0; i < forms.length; i++) {
  forms[i].reset();
}

