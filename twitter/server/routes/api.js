const express = require('express')
const router = new express.Router()
const request = require('request')
var Twitter = require('twitter')

var client = new Twitter({
  consumer_key: '',	// insert consumer key here
  consumer_secret: '', // insert consumer secret here
  access_token_key: '', // insert access token here
  access_token_secret: '' // insert access token secret here
})

router.get('/search_tweets/:query', (req, res) => {
	// [ Insert code to call the Twitter API here ]
})

module.exports = router