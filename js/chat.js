/*
	@desc: This file has the logic for all the chat functionality of 
	tunesnack
*/
 

 // Initialize Firebase

  var config = {
    apiKey: "AIzaSyDqc__TTWo9X8H7pQFuHKChIn2MqIgvhUI",
    authDomain: "tunesnack.firebaseapp.com",
    databaseURL: "https://tunesnack.firebaseio.com",
    storageBucket: "tunesnack.appspot.com",
    messagingSenderId: "690348205582"
  

  };


firebase.initializeApp(config);


var database = firebase.database();
var popChatDatabase = database.ref("/popchat");
var rockChatDatabase = database.ref("/rockchat");
var indieChatDatabase = database.ref("/indiechat");
var electricChatDatabase = database.ref("/electricchat");
var countryChatDatabase = database.ref("/countrychat");
var username;
var message;

//on click, if they chose a certain genre, pull chat from that genre

$('#pop').on('click' ,function(){

	$('#popChatBox').removeClass('disappear') //will show the pop chatbox
 	
 	if ($("#username").val() !== "") { // if the input is not empty, declare the username
    	username = $("#username").val();
    }

});

$('#rock').on('click' ,function(){

	$('#rockChatBox').removeClass('disappear') //will show the rock chatbox

	if ($("#username").val() !== "") {  // if the input is not empty, declare the username
    	username = $("#username").val();
    }

});

$('#indie').on('click' ,function(){

	$('#indieChatBox').removeClass('disappear') //will show the indie chatbox

	if ($("#username").val() !== "") {  // if the input is not empty, declare the username
    	username = $("#username").val();
    }

});

$('#electric').on('click' ,function(){

	$('#electricChatBox').removeClass('disappear') //will show the electric chatbox

	if ($("#username").val() !== "") {  // if the input is not empty, declare the username
    	username = $("#username").val();
    }

});

$('#country').on('click' ,function(){

	$('#countryChatBox').removeClass('disappear') //will show the country chatbox

	if ($("#username").val() !== "") {  // if the input is not empty, declare the username                   
    	username = $("#username").val();
    }

});



// start of chat functions // via send button

$("#popchat-send").click(function() { 

  if ($("#popchat-input").val() !== "") { //if the input box is not empty, send the following information to the database

    message = $("#popchat-input").val();

    popChatDatabase.push({
      name: username,
      message: message,
      time: firebase.database.ServerValue.TIMESTAMP,
      
    });

    $("#popchat-input").val("");
  }
});



$("#rockchat-send").click(function() { 

  if ($("#rockchat-input").val() !== "") {

    message = $("#rockchat-input").val();

    rockChatDatabase.push({
      name: username,
      message: message,
      time: firebase.database.ServerValue.TIMESTAMP,
      
    });

    $("#rockchat-input").val("");
  }
});


$("#indiechat-send").click(function() { 

  if ($("#indiechat-input").val() !== "") {

    message = $("#indiechat-input").val();

    indieChatDatabase.push({
      name: username,
      message: message,
      time: firebase.database.ServerValue.TIMESTAMP,
      
    });

    $("#indiechat-input").val("");
  }
});



$("#electricchat-send").click(function() { 

  if ($("#electricchat-input").val() !== "") {

    message = $("#electricchat-input").val();

    electricChatDatabase.push({
      name: username,
      message: message,
      time: firebase.database.ServerValue.TIMESTAMP,
      
    });

    $("#electricchat-input").val("");
  }
});


$("#countrychat-send").click(function() { 

  if ($("#countrychat-input").val() !== "") {

    message = $("#countrychat-input").val();

    countryChatDatabase.push({
      name: username,
      message: message,
      time: firebase.database.ServerValue.TIMESTAMP,
      
    });

    $("#countrychat-input").val("");
  }
});


// chat function via "enter" key

$("#popchat-input").keypress(function(enter) {

  if (enter.keyCode === 13 && $("#popchat-input").val() !== "" && popChatBox.hasClass('disappear') === false) { //if the chat box does not have the class disappear(therefore it is showing), then push the information into that database

  	message = $("#popchat-input").val();

    popChatDatabase.push({
      name: username,
      message: message,
      time: firebase.database.ServerValue.TIMESTAMP,
      
    });

    $("#popchat-input").val("");

  }


});

$("#rockchat-input").keypress(function(enter) {

  if (enter.keyCode === 13 && $("#rockchat-input").val() !== "" && rockChatBox.hasClass('disappear') === false) { //if the chat box does not have the class disappear(therefore it is showing), then push the information into that database

  	message = $("#rockchat-input").val();

    rockChatDatabase.push({
      name: username,
      message: message,
      time: firebase.database.ServerValue.TIMESTAMP,
      
    });

    $("#rockchat-input").val("");

  }


});


$("#indiechat-input").keypress(function(enter) {

  if (enter.keyCode === 13 && $("#indiechat-input").val() !== "" && indieChatBox.hasClass('disappear') === false) { //if the chat box does not have the class disappear(therefore it is showing), then push the information into that database

  	message = $("#indiechat-input").val();

    indieChatDatabase.push({
      name: username,
      message: message,
      time: firebase.database.ServerValue.TIMESTAMP,
      
    });

    $("#indiechat-input").val("");

  }


});

$("#electricchat-input").keypress(function(enter) {

  if (enter.keyCode === 13 && $("#electricchat-input").val() !== "" && electricChatBox.hasClass('disappear') === false) { //if the chat box does not have the class disappear(therefore it is showing), then push the information into that database

  	message = $("#electricchat-input").val();

    electricChatDatabase.push({
      name: username,
      message: message,
      time: firebase.database.ServerValue.TIMESTAMP,
      
    });

    $("#electricchat-input").val("");

  }


});

$("#countrychat-input").keypress(function(enter) {

  if (enter.keyCode === 13 && $("#countrychat-input").val() !== "" && countryChatBox.hasClass('disappear') === false) { //if the chat box does not have the class disappear(therefore it is showing), then push the information into that database

  	message = $("#countrychat-input").val();

    countryChatDatabase.push({
      name: username,
      message: message,
      time: firebase.database.ServerValue.TIMESTAMP,
      
    });

    $("#countrychat-input").val("");

  }


});


// append message part

popChatDatabase.orderByChild("time").on("child_added", function(popsnapshot) {

$("#popMessages").append("<p popsnapshot.val().name + : "> + popsnapshot.val().message + "</p>");

$("#popMessages").scrollTop($("#popMessages")[0].scrollHeight);

 });


rockChatDatabase.orderByChild("time").on("child_added", function(rocksnapshot) {

$("#rockMessages").append("<p rocksnapshot.val().name + : "> + rocksnapshot.val().message + "</p>");

$("#rockMessages").scrollTop($("#rockMessages")[0].scrollHeight);

 });



indieChatDatabase.orderByChild("time").on("child_added", function(indiesnapshot) {

$("#indieMessages").append("<p indiesnapshot.val().name + : "> + indiesnapshot.val().message + "</p>");

$("#indieMessages").scrollTop($("#indieMessages")[0].scrollHeight);

 });


electricChatDatabase.orderByChild("time").on("child_added", function(electricsnapshot) {

$("#electricMessages").append("<p electricsnapshot.val().name + : "> + electricsnapshot.val().message + "</p>");

$("#electricMessages").scrollTop($("#electricMessages")[0].scrollHeight);

 });


countryChatDatabase.orderByChild("time").on("child_added", function(countrysnapshot) {

$("#countryMessages").append("<p countrysnapshot.val().name + : "> + countrysnapshot.val().message + "</p>");

$("#countryMessages").scrollTop($("#countryMessages")[0].scrollHeight);

 });



