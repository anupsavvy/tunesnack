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
var username = 'guest' ;
var message;
var current_genre = "";



$('#enter').on('click', function(){

$('#Messages').empty();

var selectedGenre = $('#username option:selected')[0].value;
console.log(selectedGenre);

if (selectedGenre === "pop"){
  
  localStorage.setItem('genre', 'pop')
  console.log("pop")


}

if (selectedGenre === "rock"){
  
  localStorage.setItem('genre', 'rock')
  console.log("rock")

}

if (selectedGenre === "indie"){
  
  localStorage.setItem('genre', 'indie')
  console.log("indie")

}

if (selectedGenre === "electric"){
  
  localStorage.setItem('genre', 'electric')
  console.log("electric")

}

if (selectedGenre === "country"){

  localStorage.setItem('genre', 'country')
  console.log("country")

}


// continue to work here

console.log($('#username option:selected')[0].value);


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



function getMessageAppend(messageObj){

  console.log(messageObj.val())
  convertedTime = moment.unix(messageObj.val().time).format('LT')
  var p = $('<p>')
  newMessage = messageObj.val().message
  messageToAppend = p.text(messageObj.val().name + "(" + convertedTime + "): " +  messageObj.val().message);
  $('#Messages').append( messageToAppend);

}

// send messages to the proper database locations

$("#chat-send").click(function() {
    if ($("#chat-input").val() !== "") {
      var message = $("#chat-input").val();

      if(localStorage.getItem("genre") === "pop"){

        popChatDatabase.push({
          name: username,
          message: message,
          time: firebase.database.ServerValue.TIMESTAMP,
        });


      }

      if(localStorage.getItem("genre") === "rock"){

        rockChatDatabase.push({
          name: username,
          message: message,
          time: firebase.database.ServerValue.TIMESTAMP,
        });


      }

      if(localStorage.getItem("genre") === "indie"){

        indieChatDatabase.push({
          name: username,
          message: message,
          time: firebase.database.ServerValue.TIMESTAMP,
        });


      }

      if(localStorage.getItem("genre") === "electric"){

        electricChatDatabase.push({
          name: username,
          message: message,
          time: firebase.database.ServerValue.TIMESTAMP,
        });


      }

      if(localStorage.getItem("genre") === "country"){

        countryChatDatabase.push({
          name: username,
          message: message,
          time: firebase.database.ServerValue.TIMESTAMP,
        });


      }


    }

    $("#chat-input").val(""); //empty the inputbox
});

$("#chat-input").keypress(function(enter) {

    if (enter.keyCode === 13 && $("#chat-input").val() !== "") {
      var message = $("#chat-input").val();

            if(localStorage.getItem("genre") === "pop"){

        popChatDatabase.push({
          name: username,
          message: message,
          time: firebase.database.ServerValue.TIMESTAMP,
        });

        $("#chat-input").val(""); 

      }

      if(localStorage.getItem("genre") === "rock"){

        rockChatDatabase.push({
          name: username,
          message: message,
          time: firebase.database.ServerValue.TIMESTAMP,
        });

        $("#chat-input").val(""); 
      
      }

      if(localStorage.getItem("genre") === "indie"){

        indieChatDatabase.push({
          name: username,
          message: message,
          time: firebase.database.ServerValue.TIMESTAMP,
        });

        $("#chat-input").val(""); 

      }

      if(localStorage.getItem("genre") === "electric"){

        electricChatDatabase.push({
          name: username,
          message: message,
          time: firebase.database.ServerValue.TIMESTAMP,
        });

        $("#chat-input").val(""); 

      }

      if(localStorage.getItem("genre") === "country"){

        countryChatDatabase.push({
          name: username,
          message: message,
          time: firebase.database.ServerValue.TIMESTAMP,
        });

        $("#chat-input").val(""); 

      }
    
    }

    
});






});


