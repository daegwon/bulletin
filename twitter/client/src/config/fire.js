import firebase from 'firebase'	

let config = {
	// [ Insert Firebase config code here ]
		  var config = {
    apiKey: "AIzaSyDnlMXBohPWHW-54oP8ZTlW2MYCWZjSsT8",
    authDomain: "news-e0bb7.firebaseapp.com",
    databaseURL: "https://news-e0bb7.firebaseio.com",
    projectId: "news-e0bb7",
    storageBucket: "",
    messagingSenderId: "31874971467"
  };
  firebase.initializeApp(config);
}

let fire = firebase.initializeApp(config)
export default fire