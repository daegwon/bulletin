// initialize Firebase
// [ Insert Firebase setup code here ]
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

$(document).ready(function() {
	// set default news source to load for logged-out users
	getNews("techcrunch")

	// modal toggling
	$("#signup-toggle").click(function() {
		$("#modal-signup").show()
		$(".page").show()
	})

	$("#login-toggle").click(function() {
		$("#modal-login").show()
		$(".page").show()
	})

	$(".modal-close").click(function() {
		$(".modal").hide()
		$(".page").hide()
	})

	// news source toggling
	$(".title-link").click(function() {
		getNews($(this).attr("id"), isLoggedIn)
	})

	// set global variable for logged-in state
	var isLoggedIn = false

	// detects auth state changes
	// [ Insert Firebase onAuthStateChanged() code here ]
	firebase.auth().onAuthStateChanged(function(user) {
		if (user) {
			$("#title-buttons-logged-out").hide()
			$("#title-buttons-logged-in").show()
			isLoggedIn = true
		} else {
			$("#title-buttons-logged-out").show()
			$("#title-buttons-logged-in").hide()
			isLoggedIn = false
		}

		// always load this news source first
		getNews("recode", isLoggedIn)
	})

	// signup
	// [ Insert signup code here ]
	$("#signup").click(function() {
	var email = $("#signup-email").val()
	var password = $("#signup-password").val()
	firebase.auth().createUserWithEmailAndPassword(email, password)
	.then(function() {
		$(".modal").hide()
		$(".page").hide()
		firebase.auth().signInWithEmailAndPassword(email, password)
	})
	.catch(function(error) {
		var errorCode = error.code
		var errorMessage = error.message
		$("#signup-error").html(errorMessage)
	})
	})

	// login
	// [ Insert login code here ]
	$("#login").click(function() {
	var email = $("#login-email").val()
	var password = $("#login-password").val()
	firebase.auth().signInWithEmailAndPassword(email, password)
	.then(function() {
		$(".modal").hide()
		$(".page").hide()
	})
	.catch(function(error) {
		var errorCode = error.code;
		var errorMessage = error.message;
		$("#login-error").html(errorMessage)
	})
	})

	// logout
	// [ Insert logout code here ]
	$("#logout").click(function() {
	firebase.auth().signOut().then(function() {
		location.reload()
	})
	})

	// function to get news articles from a specific source
	function getNews(source, isLoggedIn) {
		// paste your API key from https://newsapi.org/account after "apiKey="
		var url = "https://newsapi.org/v1/articles?source=" + source + "&apiKey=3c187c8e5609417db6ae1293d14be999"
		$.getJSON(url, function(data) {
			console.log(data)

			// [ Insert code to display news articles here ]
			$(".container").html('')    // clear existing articles
			$(".title-link").css('text-decoration', 'none')
			$("#" + source).css('text-decoration', 'underline')     // underline the source link

			for (var i = 0; i < data.articles.length; i++) {
				var article = data.articles[i]

				$( "<div></div>", {
					id: "article-container-" + i,
					class: "article-container",
					style: "background-image: url(" + article.urlToImage + ")",
				}).appendTo($(".container"))
				
				$("#article-container-" + i).bind("click", { url: article.url }, function(e) {
					window.open(e.data.url)
				})

				$( "<div></div>", {
					class: "article-text",
				}).appendTo($("#article-container-" + i))
				
				$( "<div></div>", {
					class: "article-title",
					text: article.title
				}).appendTo($("#article-container-" + i + " .article-text"));

				$( "<div></div>", {
					class: "article-datetime",
					text: moment(article.publishedAt).format("MMMM Do YYYY, h:mm:ss a")
				}).appendTo($("#article-container-" + i + " .article-text"))

				if (isLoggedIn) {
					$( "<div></div>", {
						class: "slack-button",
						id: "slack-button-" + i,
						text: "Send to Slack",
					}).appendTo($("#article-container-" + i))

					$("#slack-button-" + i).bind("click", {
						source: source,
						article: article
					}, function(e) {
						e.preventDefault()
						e.stopPropagation()
						var source = e.data.source
						var article = e.data.article
						sendToSlack(source, article.title, article.description, article.url, article.urlToImage)
					})
				}
			}

		})
	}

	// function to send Slack message about article
	// [ insert sendToSlack() function here ]
})