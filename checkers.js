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

function select_token(evt) {
    var i, tabcontent, tablinks;
    selectedToken=evt.currentTarget;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        if( tabcontent[i].id === "Token Description" ) {
            tabcontent[i].style.display = "block";
        } else {
            tabcontent[i].style.display = "none";
        }
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
}

function doubleclick_token(event) {
    select_token(event);
}

function wire_up_token(myToken) {
    if ( !(myToken.id) ) {
      myToken.id = "token_" + (unique_idx++).toString();
    }
    myToken.addEventListener("dragstart",drag_start,false);
    //myToken.addEventListener("mousedown",select_token,false);
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
        selectedToken=cln;
    }
}

function delete_selected_token()
{
    if(selectedToken) {
        selectedToken.parentNode.removeChild(selectedToken);
        selectedToken=null;
    }
}

function save_state() {
    var tokens = document.getElementsByClassName("token");
}

function load_state() {
}

function load_token(evt, form) {
    var form = evt.currentTarget.parentNode;
    var new_token = document.createElement('div');
    new_token.className = form["tokenColor"].value + form["tokenShape"].value + " token";
    new_token.setAttribute("draggable", "true");
    document.body.appendChild(new_token);
    wire_up_token(new_token);
}

function save_token() {
}

function set_background() {
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

// Get the last <li> element ("Milk") of <ul> with id="myList2"
var itm = document.getElementById("controlS");

// Copy the <li> element and its child nodes
[ "controlN", "controlE", "controlW" ].forEach(function (item) {
    var cln = itm.cloneNode(true);
    cln.id = item;
    cln.style.display = "none";
    itm.parentNode.appendChild(cln);
})

