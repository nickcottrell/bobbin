//thanks to http://thejackalofjavascript.com/getting-started-with-firebase/ AND https://www.youtube.com/watch?v=hDV3_OIci7A

function saveToList(event) {
    if (event.which == 13 || event.keyCode == 13) { // as the user presses the enter key, we will attempt to save the data
        var thingName = document.getElementById('thingName').value.trim();
        if (thingName.length > 0) {
            saveToFB(thingName);
        }
        document.getElementById('thingName').value = '';
        return false;
    }
};

function saveToFB(thingName) {
    // this will save data to Firebase
    firebase.database().ref().push({
        name: thingName
    });
};

function refreshUI(list) {
    var lis = '';
    for (var i = 0; i < list.length; i++) {
        lis += '<li data-key="' + list[i].key + '">' + list[i].name + ' [' + genLinks(list[i].key, list[i].name) + ']</li>';
    };
    document.getElementById('listofThings').innerHTML = lis;
};


function genLinks(key, thName) {
    var links = '';
    links += '<a href="javascript:edit(\'' + key + '\',\'' + thName + '\')">Edit</a> | ';
    links += '<a href="javascript:del(\'' + key + '\',\'' + thName + '\')">Delete</a>';
    return links;
};

function edit(key, thName) {
    var thingName = prompt("Update the movie name", thName);
    if (thingName && thingName.length > 0) {
        var updateThingRef = buildEndPoint(key);
       	// you can also do this... i think
		// firebase.database().ref(key).update({
		updateThingRef.update({
            name: thingName
        });
    }
}

function del(key, thName) {
    var response = confirm("Are certain about removing \"" + thName + "\" from the list?");
    if (response == true) {
        var deleteThingRef = buildEndPoint(key);
        deleteThingRef.remove();
    }
}

function buildEndPoint (key) {
	return new firebase.database().ref(key);
}


// this will get fired on inital load as well as when ever there is a change in the data
firebase.database().ref().on("value", function(snapshot) {
    var data = snapshot.val();
    var list = [];
    for (var key in data) {
        if (data.hasOwnProperty(key)) {
            name = data[key].name ? data[key].name : '';
            if (name.trim().length > 0) {
                list.push({
                    name: name,
                    key: key
                })
            }
        }
    }
    // refresh the UI
    refreshUI(list);
});