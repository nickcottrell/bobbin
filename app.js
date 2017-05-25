// Initialize Firebase
var config = {
  apiKey: "AIzaSyBLqB1Gr0BKx8BbG9DmX_RJ6Bg6RUVGEEw",
  authDomain: "nc-fb-demo.firebaseapp.com",
  databaseURL: "https://nc-fb-demo.firebaseio.com",
  projectId: "nc-fb-demo",
  storageBucket: "nc-fb-demo.appspot.com",
  messagingSenderId: "218797461062"
	};
	firebase.initializeApp(config);
	var rootRef = firebase.database().ref();
	


	//auth stuff below from: https://www.youtube.com/watch?v=-OKrloDzGpU&vl=en
	//get all the elements from the form
	
	const txtEmail = document.getElementById('txtEmail');
	const txtPassword = document.getElementById('txtPassword');
	const btnLogin = document.getElementById('btnLogin');
	const btnSignUp = document.getElementById('btnSignUp');
	const btnLogOut = document.getElementById('btnLogOut');
	const appElement = document.getElementById('app');
	const statusElement = document.getElementById('status');
		
	btnLogin.addEventListener('click', e => {
	
	//get email and pass
	const email = txtEmail.value;	
	const pass = txtPassword.value;	
	const auth = firebase.auth();	

	const promise = auth.signInWithEmailAndPassword(email, pass);
	promise.catch(e => console.log(e.message));

	});
	
	btnSignUp.addEventListener('click', e => {
	
	//get email and pass
	//TODO: need to check for real email
	const email = txtEmail.value;	
	const pass = txtPassword.value;	
	const auth = firebase.auth();	

	const promise = auth.createUserWithEmailAndPassword(email, pass);
	promise.catch(e => console.log(e.message));

	});


	btnLogOut.addEventListener('click', e => {
		firebase.auth().signOut();
	});



	// add realtime listener
	firebase.auth().onAuthStateChanged(firebaseUser => {
		if (firebaseUser) {
			console.log ('logged in');
			console.log(firebaseUser);
			
			btnLogOut.classList.remove('hide');
			appElement.classList.remove('hide');
			statusElement.classList.remove('hide');


		} else {
			console.log('not logged in.');
			//btnLogOut.classList.add('hide');
			btnLogOut.classList.add('hide');
			appElement.classList.add('hide');					
			statusElement.classList.add('hide');					

		}
	});














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