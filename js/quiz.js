var playerMaster = JSON.parse(localStorage.getItem('playerMaster'));
var nowUserEmail = localStorage.getItem("nowUserEmail");
var myQuizType = localStorage.getItem("myQuizType");

// quiz Json
if (myQuizType == "countryQuiz") {



    var questions = [{
        question : "Enter Your Email to begin quiz:   " ,

        choices : [ "SUBMIT"],

        correctAnswer : 0
    }, {
        question : "Converting a portion of a traditional IRA into a Roth IRA is a good idea this year if:",
        choices : ["A. You have a big tax deduction this year and your marginal tax rate is lower than normal.*", "B. You have more taxable income than usual and your marginal tax rate is higher than normal.", "C. The value of the assets in your IRA has remained the same for 10 years.", "Dont know?"],
        correctAnswer : 0
    }, {
        question : "In order to avoid a penalty tax, distributions from an IRA must begin the year in which you attain the age of:",
        choices : ["55", "59 1/2", "65", "70 1/2 *"],
        correctAnswer : 4
    }, {
        question : "Which one of the following statements is true concerning the federal income tax treatment of distributions to a 65-year-old retiree?",
        choices : ["A. All distributions from a Roth IRA that has been maintained for more than five years will be tax-free.*", "B. Distributions from a traditional IRA prior to age 70½ will be subject to an additional 10 percent penalty tax.", "C. All distributions from a traditional IRA created with tax deductible contributions will be taxed as long-term capital gains.", "neither"],
        correctAnswer : 0
    }, {
        question : "Which of the following types of long-term bonds typically has the highest yield?",
        choices : ["A. AAA-rated corporate bonds", "B. B-rated corporate bonds*", "C. Treasury bonds", "Dont know?"],
        correctAnswer : 2
    }, {
        question : "Please choose the response below that best completes this statement. If you have a well-diversified portfolio of 50 percent stocks and 50 percent bonds that is worth $100,000 at retirement, based on historical returns in the United States, the most you can afford to withdraw is ____ plus inflation each year in order to have a 95 percent chance that your assets will last for 30 years.",
        choices : ["A. $2,000", "B. $4,000*", "C. $6,000", "D. $8,000"],
        correctAnswer : 2
    }, {
        question : "The total out-of-pocket medical costs for married couples in retirement are relatively consistent from retiree to retiree.",
        choices : ["True", "False*", "Mhhh", "Neither "],
        correctAnswer : 2
    }, {
        question : "Buying a single company’s stock usually provides a safer return than a stock mutual fund.",
        choices : ["True", "False *", "dont know", "Neither"],
        correctAnswer : 2
    }, {
        question : "If 100 percent of a mutual fund’s assets are invested in long-term bonds and the investment climate changes so that interest rates rise significantly, then the value of the mutual fund shares:",
        choices : ["A. Decreases significantly*", "B. May rise or fall depending upon the type of bond", "C. Increases significantly", "D. Will not change at all"],
        correctAnswer : 2
    }, {
        question : "A single person who is likely to live to age 90 is generally going to be better off claiming Social Security benefits at:",
        choices : ["A.62", "B.66", "C.70*", "D.75"],
        correctAnswer : 3
    }];

} else {

    var questions = [{
        question : "Enter Your Email to begin quiz: ",
        choices : ["SUBMIT"],
        correctAnswer : 1
    }, {
        question : "What major event happened on September 11, 2001, in the United States?",
        choices : ["Brasília", "Toronto", "Andrea", "Lima"],
        correctAnswer : 0
    }, {
        question : "On September 11, 2001, terrorists attacked the United States. ",
        choices : ["Ankara", "Bratislava", "Lisbon", "Istanbul"],
        correctAnswer : 0
    }, {
        question : "What is the name of the President of the United States now?",
        choices : ["Donald Trump", "Berlin", "Paris", "Bern"],
        correctAnswer : 1
    }, {
        question : "What is the name of the Vice President of the United States now?",
        choices : ["Republican Party", "Pyongyang", "Tokyo", "Manila"],
        correctAnswer : 0
    }, {
        question : "Which city is the capital of Cuba?",
        choices : ["Havana", "Guatemala", "Tegucigalpa", "Managua"],
        correctAnswer : 0
    }, {
        question : "Which city is the capital of Bolivia?",
        choices : ["Mike Pence", "Paramaribo", "Bolivia", "La Paz"],
        correctAnswer : 1
    }, {
        question : "What is the supreme law of the land?",
        choices : ["  The Constitution", "  The President", "  The Congress", "  The Bill of Rights"],
        correctAnswer : 2
    }];

}


var currentQuestion = 0;
var correctAnswers = 0;
var questionNumber = 1;

$(document).ready(function() {

    // show question
    showCurrentQuestion();

    // control next button
    $(this).find(".nextButton").on("click", function() {

        document.getElementById('emailf').style.display = 'none';

        value = $("input[type='radio']:checked").val();

        // player doesn't select radio button
        if (value == undefined) {
            alert("Please select the answer!")
        } else {
            // check player answer if it is right or wrong
            if (value == questions[currentQuestion].correctAnswer) {


                correctAnswers++;
            }
            document.getElementById('emailf').style.display = 'none';


            questionNumber++;
            currentQuestion++;

            // player can play only 10 questions per 1 quiz
            if (currentQuestion < 10) {
                showCurrentQuestion();
            } else {
                // store quiz information that player played
                localStorage.setItem("myQuizType", myQuizType);
                localStorage.setItem("MyCorrectAnswers", correctAnswers);
                document.getElementById("quizForm").submit();

            }

        }

    });

});


    function RemoveForm()
    {
// Two places to customize:

// Specify the id of the form.
        var IDofForm = "form2";

// Specify the id of the div containing the form.
        var IDofDivWithForm = "example2";

// End of customizations.

// This line submits the form. (If Ajax processed, call Ajax function, instead.)
        document.getElementById(IDofForm).submit();

// This collapses the form.
        document.getElementById(IDofDivWithForm).style.visibility = "hidden";
    }


// show question in html page
function showCurrentQuestion() {

    var myQuizType = localStorage.getItem("myQuizType");
    if (myQuizType == "countryQuiz") {
        document.getElementById("quizTitle").firstChild.nodeValue = "Republican Quiz";
    } else {
        document.getElementById("quizTitle").firstChild.nodeValue = "Democrat Quiz";
    }



    var question = questions[currentQuestion].question;
    var choiceSize = questions[currentQuestion].choices.length;
    var questionState = $(document).find(".quizContainer  .question");
    var choiceList = $(document).find(".quizContainer  .choiceList");

    $(questionState).text(questionNumber + ". " + question);
    $(choiceList).find("li").remove();

    var choice;
    for ( i = 0; i < choiceSize; i++) {
        choice = questions[currentQuestion].choices[i];
        $('<li><input type="radio" value=' + i + ' name="choiceRadio" />' + choice + '</li>').appendTo(choiceList);
    }


}

