/*
  @desc: This file has the logic for all the chat functionality of 
  tunesnack
*/
// Initialize Firebase
var config = {
    apiKey: "AIzaSyDqc__TTWo9X8H7pQFuHKChIn2MqIgvhUI"
    , authDomain: "tunesnack.firebaseapp.com"
    , databaseURL: "https://tunesnack.firebaseio.com"
    , storageBucket: "tunesnack.appspot.com"
    , messagingSenderId: "690348205582"
};
firebase.initializeApp(config);
var database = firebase.database();
var usernameDatabase = database.ref("/username")
var popChatDatabase = database.ref("/popchat");
var rockChatDatabase = database.ref("/rockchat");
var indieChatDatabase = database.ref("/indiechat");
var electricChatDatabase = database.ref("/electricchat");
var countryChatDatabase = database.ref("/countrychat");
var username = 'guest';
var message;
var current_genre = "";
var loading_messages = [
    "You are awesome !!"
    , "Have a wonderful day !!"
    , "Life is good !!"
    , "Work hard, play hard !!"
    , "Keep loving bootcamp !!"
    , "Thank you Steven, N8 and all other TA's !!"
]
var play_radio = function (genre) {
    var station = "";
    if (genre === 'rock') {
        station = 'absoluterockradio';
    }
    else if (genre === 'indie') {
        station = 'theindieblend';
    }
    else if (genre === 'electric') {
        station = '-radiopartypl-house-discohouse-progressive-edm';
    }
    else if (genre === 'country') {
        station = '113fmbigkickin-country';
    }
    else if (genre === 'pop') {
        station = 'absoluterockradio';
    }
    (function (win, doc, script, source, objectName) {
        (win.RadionomyPlayerObject = win.RadionomyPlayerObject || []).push(objectName);
        win[objectName] = win[objectName] || function (k, v) {
            (win[objectName].parameters = win[objectName].parameters || {
                src: source
                , version: '1.1'
            })[k] = v;
        };
        var js, rjs = doc.getElementsByTagName(script)[0];
        js = doc.createElement(script);
        js.async = 1;
        js.src = source;
        rjs.parentNode.insertBefore(js, rjs);
    }(window, document, 'script', 'https://www.radionomy.com/js/radionomy.player.js', 'radplayer'));
    radplayer('url', station);
    radplayer('type', 'mobile');
    radplayer('autoplay', '1');
    radplayer('volume', '50');
    radplayer('color1', '#000000');
    radplayer('color2', '#ffffff');
}
var handle_chat = function (selectedGenre) {
    popChatDatabase.off('child_added');
    rockChatDatabase.off('child_added');
    indieChatDatabase.off('child_added');
    electricChatDatabase.off('child_added');
    countryChatDatabase.off('child_added');
    $('#chat-list').empty();
    localStorage.setItem('genre', selectedGenre);
    generateRobot();
    if (localStorage.getItem("genre") === "pop") {
        popChatDatabase.orderByChild("time").on("child_added", function (data) {
            getMessageAppend(data);
        });
    }
    if (localStorage.getItem("genre") === "rock") {
        rockChatDatabase.orderByChild("time").on("child_added", function (data) {
            getMessageAppend(data);
        });
    }
    if (localStorage.getItem("genre") === "indie") {
        indieChatDatabase.orderByChild("time").on("child_added", function (data) {
            getMessageAppend(data);
        });
    }
    if (localStorage.getItem("genre") === "electric") {
        electricChatDatabase.orderByChild("time").on("child_added", function (data) {
            getMessageAppend(data);
        });
    }
    if (localStorage.getItem("genre") === "country") {
        countryChatDatabase.orderByChild("time").on("child_added", function (data) {
            getMessageAppend(data);
        });
    }
}
$('#enter').on('click', function (e) {
    e.preventDefault();
    $("#warning").fadeOut('slow');
    setUsername();
});
$(".channel").click(function () {
    handle_chat($(this).attr('data-channel'));
});
var refresh_chat_room = function (genre) {
    var icon = "#" + localStorage.getItem('genre') + '-icon';
    var num = Math.floor((Math.random() * 5) + 1);
    $("#loading-message").html(loading_messages[num]);
    setTimeout("$('#cool-message').fadeIn('slow');", 500);
    setTimeout("$('#cool-message').fadeOut('slow');", 1000);
    setTimeout("$('#chat-elements').fadeIn('slow');", 2000);
    $("#name").html(localStorage.getItem('username'));
    $(icon).removeClass('icofont-play-alt-3');
    $(icon).addClass('icofont-song-notes');
    //    handle_chat(localStorage.getItem('genre'));
    handle_chat(genre);
    setTimeout("play_radio(localStorage.getItem('genre'));", 3000);
    setTimeout("$('body').find('iframe').css({'height': '0', 'width': '0', 'border': 'none'});", 4000);
}

function setUsername() {
    var login = false;
    if (localStorage.getItem('username') !== null) { // this function checks if username exist in localstorage
        username = localStorage.getItem('username') //if it does, set username = to the username stored in localstorage
        setTimeout("$('#login-elements').fadeOut('slow');", 100);
        setTimeout("$('#chat-elements').fadeIn('slow');", 500);
        login = true;
    }
    else { // if not check if the username already exist in firebase, for uniqueness
        input = $('#username').val().toString().toLowerCase();
        usernameDatabase.once('value', function (snapshot) {
            var users = snapshot.val();
            for (user in users) {
                console.log(users[user]);
                if (users[user].toString().toLowerCase() === input) { //if it does, alert try another name
                    $("#warning").fadeIn('slow');
                    setTimeout("$('#warning-message').html('This username has already been taken.Try a new name.')", 100);
                    return false;
                }
                else if (input === "") {
                    $("#warning").fadeIn('slow');
                    setTimeout("$('#warning-message').html('Username cannot be blank.')", 100);
                    return false;
                }
            }
            usernameDatabase.push(input)
            localStorage.setItem('username', input);
            login = true;
        });
    }
    if (login === true) {
        var selectedGenre = $('#genreoptions option:selected')[0].value;
        setTimeout("$('#login-elements').fadeOut('slow');", 100);
        //        setTimeout("$('#chat-elements').fadeIn('slow');", 500);
        refresh_chat_room(selectedGenre);
    }
}

function generateRobot() {
    var queryURL = 'https://robohash.p.mashape.com/index.php?text=' + username;
    $.ajax({
        url: queryURL, // The URL to the API. You can get this in the API page of the API you intend to consume
        type: 'GET', // The HTTP Method, can be GET POST PUT DELETE etc
        data: {}, // Additional parameters here
        dataType: 'json'
        , success: function (data) {
            console.log((data.imageUrl));
            var imageURL = data.imageUrl;
            localStorage.setItem("imageURL", imageURL);
        }
        , error: function (err) {
            console.log(err);
        }
        , beforeSend: function (xhr) {
            xhr.setRequestHeader("X-Mashape-Authorization", "0q6E1TrM3zmshpYCK0rIO60DmVyEp1McPMkjsn8CXxBDRmjxLY"); // Enter here your Mashape key
        }
    });
};

function getMessageAppend(messageObj) {
    convertedTime = moment(messageObj.val().time).format('LT')
    $("#chat-list").append("<li><div class='chat-body'><div class='row'><div class='col-sm-1'><img class='img-circle' src='" + messageObj.val().picture + "'></div><div class='col-sm-11'><strong class='pull-left'>" + messageObj.val().name + "</strong><small class='text-muted'><span class='glyphicon glyphicon-time'>  </span>" + convertedTime + "</small><div class='row'><div class='col-sm-12'><p id='chat-content'>" + messageObj.val().message + "</p></div></div></div></div></div></li>");
    var chat_panel = $('#chat-panel');
    var height = chat_panel[0].scrollHeight;
    chat_panel.scrollTop(height);
}
// send messages to the proper database locations
$("#chat-send").on('click', function () {
    username = localStorage.getItem('username');
    var imagelink = localStorage.getItem('imageURL');
    if ($("#chat-input").val() !== "") {
        var message = $("#chat-input").val();
        if (localStorage.getItem("genre") === "pop") {
            popChatDatabase.push({
                picture: imagelink
                , name: username
                , message: message
                , time: firebase.database.ServerValue.TIMESTAMP
            , });
        }
        if (localStorage.getItem("genre") === "rock") {
            rockChatDatabase.push({
                picture: imagelink
                , name: username
                , message: message
                , time: firebase.database.ServerValue.TIMESTAMP
            , });
        }
        if (localStorage.getItem("genre") === "indie") {
            indieChatDatabase.push({
                picture: imagelink
                , name: username
                , message: message
                , time: firebase.database.ServerValue.TIMESTAMP
            , });
        }
        if (localStorage.getItem("genre") === "electric") {
            electricChatDatabase.push({
                picture: imagelink
                , name: username
                , message: message
                , time: firebase.database.ServerValue.TIMESTAMP
            , });
        }
        if (localStorage.getItem("genre") === "country") {
            countryChatDatabase.push({
                picture: imagelink
                , name: username
                , message: message
                , time: firebase.database.ServerValue.TIMESTAMP
            , });
        }
    }
    $("#chat-input").val(""); //empty the inputbox
});
$("#chat-input").keypress(function (enter) {
    username = localStorage.getItem('username');
    imagelink = localStorage.getItem('imageURL');
    if (enter.keyCode === 13 && $("#chat-input").val() !== "") {
        var message = $("#chat-input").val();
        if (localStorage.getItem("genre") === "pop") {
            popChatDatabase.push({
                picture: imagelink
                , name: username
                , message: message
                , time: firebase.database.ServerValue.TIMESTAMP
            , });
            $("#chat-input").val("");
        }
        if (localStorage.getItem("genre") === "rock") {
            rockChatDatabase.push({
                picture: imagelink
                , name: username
                , message: message
                , time: firebase.database.ServerValue.TIMESTAMP
            , });
            $("#chat-input").val("");
        }
        if (localStorage.getItem("genre") === "indie") {
            indieChatDatabase.push({
                picture: imagelink
                , name: username
                , message: message
                , time: firebase.database.ServerValue.TIMESTAMP
            , });
            $("#chat-input").val("");
        }
        if (localStorage.getItem("genre") === "electric") {
            electricChatDatabase.push({
                picture: imagelink
                , name: username
                , message: message
                , time: firebase.database.ServerValue.TIMESTAMP
            , });
            $("#chat-input").val("");
        }
        if (localStorage.getItem("genre") === "country") {
            countryChatDatabase.push({
                picture: imagelink
                , name: username
                , message: message
                , time: firebase.database.ServerValue.TIMESTAMP
            , });
            $("#chat-input").val("");
        }
    }
});