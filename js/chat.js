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
var usernameDatabase = database.ref("/username")
var popChatDatabase = database.ref("/popchat");
var rockChatDatabase = database.ref("/rockchat");
var indieChatDatabase = database.ref("/indiechat");
var electricChatDatabase = database.ref("/electricchat");
var countryChatDatabase = database.ref("/countrychat");
var username = 'guest' ;
var message;
var current_genre = "";



$('#enter').on('click', function(){
popChatDatabase.off('child_added');
rockChatDatabase.off('child_added');
indieChatDatabase.off('child_added');
electricChatDatabase.off('child_added');
countryChatDatabase.off('child_added');

$('#Messages').empty();
setUsername()

var selectedGenre = $('#genreoptions option:selected')[0].value;
console.log(selectedGenre);

if (selectedGenre === "pop"){
  
  localStorage.setItem('genre', 'pop');
  generateRobot();
  console.log("pop");


}

if (selectedGenre === "rock"){
  
  localStorage.setItem('genre', 'rock');
  generateRobot();
  console.log("rock");


}

if (selectedGenre === "indie"){
  
  localStorage.setItem('genre', 'indie');
  generateRobot();
  console.log("indie");

}

if (selectedGenre === "electric"){
  
  localStorage.setItem('genre', 'electric');
  generateRobot();
  console.log("electric");

}

if (selectedGenre === "country"){

  localStorage.setItem('genre', 'country');
  generateRobot();
  console.log("country");

}


// continue to work here

console.log($('#genreoptions option:selected')[0].value);


if(localStorage.getItem("genre") === "pop"){
  
  popChatDatabase.orderByChild("time").on("child_added", function(data) {
  getMessageAppend(data);

  });

}

if(localStorage.getItem("genre") === "rock"){
    
  rockChatDatabase.orderByChild("time").on("child_added", function(data) {
  getMessageAppend(data);

  });

}

if(localStorage.getItem("genre") === "indie"){
  indieChatDatabase.orderByChild("time").on("child_added", function(data) {
  getMessageAppend(data);

  });

}

if(localStorage.getItem("genre") === "electric"){
  electricChatDatabase.orderByChild("time").on("child_added", function(data) {
  getMessageAppend(data);

  });

}

if(localStorage.getItem("genre") === "country"){
  countryChatDatabase.orderByChild("time").on("child_added", function(data){
  getMessageAppend(data);

  });

}

});

function setUsername() {
input = $('#username').val().toString().toLowerCase();
  usernameDatabase.once('value', function(snapshot) {
  var users = snapshot.val();
 
    for(user in users){

      console.log(users[user]);
      if(users[user].toString().toLowerCase() === input){
        alert('try another name');
        return false;
      }else{
          usernameDatabase.push(input);
          localStorage.setItem('username', username);
          return false;

      }
    }

  });
//   localStorage.setItem('username', $('#username').val());
}


function generateRobot (){
// username = localstorage.getItem('username')
var queryURL = 'https://robohash.p.mashape.com/index.php?text='+ username;


$.ajax({
    url:  queryURL, // The URL to the API. You can get this in the API page of the API you intend to consume
    type: 'GET', // The HTTP Method, can be GET POST PUT DELETE etc
    data: {}, // Additional parameters here
    dataType: 'json',
    success: function(data) {

    console.log((data.imageUrl)); 
    var imageURL = data.imageUrl;
    localStorage.setItem("imageURL" , imageURL);

  },
    error: function(err) { console.log(err); },
    beforeSend: function(xhr) {
    xhr.setRequestHeader("X-Mashape-Authorization", "0q6E1TrM3zmshpYCK0rIO60DmVyEp1McPMkjsn8CXxBDRmjxLY"); // Enter here your Mashape key
    }

});


};



function getMessageAppend(messageObj){

  console.log(messageObj.val())
  convertedTime = moment.unix(messageObj.val().time).format('LT')
  var newDiv = $('<div>');
  var img = $('<img>')
      img.attr('src', messageObj.val().picture);
      img.attr('width' , '50px');
      img.attr('height' , '50px');
  $('#Messages').append(newDiv);
  newDiv.append(img);
  newDiv.append(messageObj.val().name);
  newDiv.append("(" + convertedTime + "): ");
  newDiv.append(messageObj.val().message);

  // var img = $('<img>')
  //     img.attr('src', messageObj.val().picture)
  //     img.attr('width' , '50px')
  //     img.attr('height' , '50px')
  // var p = $('<p>')
  // newMessage = messageObj.val().message
  // messageToAppend = p.html(img + messageObj.val().name + "(" + convertedTime + "): " +  messageObj.val().message);
  // $('#Messages').append( messageToAppend);

}

// send messages to the proper database locations

$("#chat-send").on('click' , function() {
  var imagelink = localStorage.getItem('imageURL');
    if ($("#chat-input").val() !== "") {
      var message = $("#chat-input").val();

      if(localStorage.getItem("genre") === "pop"){

        popChatDatabase.push({
          picture: imagelink,
          name: username,
          message: message,
          time: firebase.database.ServerValue.TIMESTAMP,
        });


      }

      if(localStorage.getItem("genre") === "rock"){

        rockChatDatabase.push({
          picture: imagelink,
          name: username,
          message: message,
          time: firebase.database.ServerValue.TIMESTAMP,
        });


      }

      if(localStorage.getItem("genre") === "indie"){

        indieChatDatabase.push({
          picture: imagelink,
          name: username,
          message: message,
          time: firebase.database.ServerValue.TIMESTAMP,
        });


      }

      if(localStorage.getItem("genre") === "electric"){

        electricChatDatabase.push({
          picture: imagelink,
          name: username,
          message: message,
          time: firebase.database.ServerValue.TIMESTAMP,
        });


      }

      if(localStorage.getItem("genre") === "country"){

        countryChatDatabase.push({
          picture: imagelink,
          name: username,
          message: message,
          time: firebase.database.ServerValue.TIMESTAMP,
        });


      }


    }

    $("#chat-input").val(""); //empty the inputbox
});

$("#chat-input").keypress(function(enter) {
  imagelink = localStorage.getItem('imageURL');

    if (enter.keyCode === 13 && $("#chat-input").val() !== "") {
      var message = $("#chat-input").val();

            if(localStorage.getItem("genre") === "pop"){

        popChatDatabase.push({
          picture: imagelink,
          name: username,
          message: message,
          time: firebase.database.ServerValue.TIMESTAMP,
        });

        $("#chat-input").val(""); 

      }

      if(localStorage.getItem("genre") === "rock"){

        rockChatDatabase.push({
          picture: imagelink,
          name: username,
          message: message,
          time: firebase.database.ServerValue.TIMESTAMP,
        });

        $("#chat-input").val(""); 
      
      }

      if(localStorage.getItem("genre") === "indie"){

        indieChatDatabase.push({
          picture: imagelink,
          name: username,
          message: message,
          time: firebase.database.ServerValue.TIMESTAMP,
        });

        $("#chat-input").val(""); 

      }

      if(localStorage.getItem("genre") === "electric"){

        electricChatDatabase.push({
          picture: imagelink,
          name: username,
          message: message,
          time: firebase.database.ServerValue.TIMESTAMP,
        });

        $("#chat-input").val(""); 

      }

      if(localStorage.getItem("genre") === "country"){

        countryChatDatabase.push({
          picture: imagelink,
          name: username,
          message: message,
          time: firebase.database.ServerValue.TIMESTAMP,
        });

        $("#chat-input").val(""); 

      }
    
    }

    
});

