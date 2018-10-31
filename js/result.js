var playerMaster = JSON.parse(localStorage.getItem('playerMaster'));

var nowUserEmail = localStorage.getItem("nowUserEmail");
var myQuizType = localStorage.getItem("myQuizType");
var MyCorrectAnswers = localStorage.getItem("MyCorrectAnswers");
var MyPlayDate = localStorage.getItem("MyPlayDate");

// Json for store quiz information
var quizMaster = {};
quizMaster.results = [];

var result = {};

result.myEmailAddress = nowUserEmail;
result.myQuizType = myQuizType;
result.MyCorrectAnswers = MyCorrectAnswers;
result.myPlayDate = MyPlayDate;

if (localStorage && localStorage.getItem('quizMaster')) {
    quizMaster = JSON.parse(localStorage.getItem('quizMaster'));
} else {
    localStorage.setItem('quizMaster', JSON.stringify(quizMaster));
}

// how player came result page between main.html an quiz.html
function validCheck() {
    if (result.myQuizType == "" || result.myQuizType == null) {
        return true;
    } else {
        return false;
    }
}

// find user infomation in playerMaster
function findNowUserEmail(myEmailAddress) {
    var size = playerMaster["players"].length;

    for ( i = 0; i < size; i++) {
        var NowuserEmail = playerMaster["players"][i]['myEmailAddress'];
        if (NowuserEmail == myEmailAddress) {
            return i;
        }
    }
    return -1;
}

// show current player's history about quiz
function getHistory(testNumber, myEmailAddress, myQuizType, MyCorrectAnswers, myPlayDate) {

    var historyContainer = $(document).find(".historyContainer");

    if (MyCorrectAnswers > 7) {
        var MyResultMsg = "PASS";
    } else {
        var MyResultMsg = "FAIL";
    }

    historyContainer = '<tr>' + '   <td>' + testNumber + '</td>' + '   <td>' + myQuizType + '</td>' + '   <td>' + MyCorrectAnswers + ' / 10 </td>' + '   <td>' + MyResultMsg + '</td>' + '</tr>';
    $('.historyContainer').append(historyContainer);

}

// clear temp local storage
function clearTemp() {
    localStorage.setItem("myQuizType", "");
    localStorage.setItem("MyCorrectAnswers", "");
}


$(document).ready(function() {

    var position = findNowUserEmail(nowUserEmail);

    var rFirstName = playerMaster["players"][position]['myFirstName'];
    var rLastName = playerMaster["players"][position]['myLastName'];
    var rEmailAddress = playerMaster["players"][position]['myEmailAddress'];
    var rPhoneNumber = playerMaster["players"][position]['myPhoneNumber'];
    var rAddress = playerMaster["players"][position]['myAddress'];

    var resultNameH1 = $(document).find(".resultNameH1");
    var resultMsgH2 = $(document).find(".resultMsgH2");
    var tbResults = $(document).find(".tbResults");

    // show title on result.html and result messsge of current quiz
    if (validCheck()) {
        $(resultNameH1).text(rFirstName + " Result Page");
        $(resultMsgH2).text("This is your information & history.");
    } else if (MyCorrectAnswers > 7) {
        $(resultNameH1).text(rFirstName + " scored: " + MyCorrectAnswers + " out of 10.");
        $(resultMsgH2).text("You have successfully passed the test");
    } else {
        $(resultNameH1).text(rFirstName + " scored: " + MyCorrectAnswers + " out of 10.");
        $(resultMsgH2).text("Unfortunately you did not pass the test. Please try again later!");
    }

    // show current player information
    var playerInfo = $(document).find(".playerContainer .playerInfo");

    $('<tr><td width="20%">First Name</td><td>' + rFirstName + '</td></tr>' + '<tr><td>Last Name</td><td>' + rLastName + '</td></tr>' + '<tr><td>Email Address</td><td>' + rEmailAddress + '</td></tr>' + '<tr><td>Phone Number</td><td>' + rPhoneNumber + '</td></tr>' + '<tr><td>Address</td><td>' + rAddress + '</td></tr>').appendTo(playerInfo);

    var testNumber = 0;
    // for showing player's history
    for ( i = 0; i < quizMaster["results"].length; i++) {
        if (quizMaster["results"][i]['myEmailAddress'] == rEmailAddress) {++testNumber;
            getHistory(testNumber, quizMaster["results"][i]['myEmailAddress'], quizMaster["results"][i]['myQuizType'], quizMaster["results"][i]['MyCorrectAnswers']);
        }
    }

    // if player haven't played quiz yet and came result page from main.html
    if (testNumber == 0) {
        $(tbResults).hide();
        $(resultNameH1).text(rFirstName + " did not play this quiz.");
        $(resultMsgH2).text("Please, Play the quiz!");
    }

    // restart quiz
    $('.quizAgain').click(function(event) {
        clearTemp();
        location.replace("main.html");
    });

    // log out
    $('.logOut').click(function(event) {
        localStorage.setItem("nowUserEmail", "");
        clearTemp();
        location.replace("index.html");
    });

});

if (!validCheck() && localStorage && localStorage.getItem('quizMaster')) {
    var quizMaster = JSON.parse(localStorage.getItem('quizMaster'));

    quizMaster.results.push(result);

    localStorage.setItem('quizMaster', JSON.stringify(quizMaster));

    clearTemp();

}

