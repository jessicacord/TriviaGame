//Define questions and answers. Each question is its own object with a 3 wrong answers and one correct
var intervalId;
var clockRunning = false;

window.onload = function() {
    $("#start").on("click", triviaGame.startGame);
};

var triviaGame = {
    questions : [
        {
            question: "Every Rose Has Its Thorn",
            correctAnswer: "Poison",
            answers: ["Guns N' Roses","Bon Jovi","Stryper","Poison"],
            image: "assets/images/poison.jpg"
        },
        {
            question: "What About Love",
            correctAnswer: "Heart",
            answers: ["Fleetwood Mac","Motley Crue","Heart","Journey"],
            image: "assets/images/heart.jpg"
        },
        {
            question: "Love Bites",
            correctAnswer: "Def Leppard",
            answers: ["AC/DC","Aerosmith","Def Leppard","Van Halen"],
            image: "assets/images/def-leppard.jpg"
        },
        {
            question: "Nothing's Gonna Stop Us Now",
            correctAnswer: "Jefferson Starship",
            answers: ["Journey","Jefferson Starship","Queen","Cinderella"],
            image: "assets/images/jefferson-starship.jpg"
        },
        {
            question: "Is This Love",
            correctAnswer: "Whitesnake",
            answers: ["Whitesnake","Skid Row","Duran Duran","Genesis"],
            image: "assets/images/whitesnake.jpg"
        },
        {
            question: "I'll Be There For You",
            correctAnswer: "Bon Jovi",
            answers: ["Rush","Heart","Bon Jovi","Warrant"],
            image: "assets/images/bon-jovi.jpg"
        },
        {
            question: "Don't Stop Believin'",
            correctAnswer: "Journey",
            answers: ["Aerosmith","David Bowie","Bon Jovi","Journey"],
            image: "assets/images/journey.jpg"
        },
        {
            question: "Total Eclipse of the Heart",
            correctAnswer: "Bonnie Tyler",
            answers: ["Cher","Whitney Houston","Bonnie Tyler","Stevie Nicks"],
            image: "assets/images/bonnie-tyler.jpg"
        },
        {
            question: "Faithfully",
            correctAnswer: "Journey",
            answers: ["Foreigner","Steely Dan","U2","Journey"],
            image: "assets/images/journey.jpg"
        },
        {
            question: "Heaven",
            correctAnswer: "Bryan Adams",
            answers: ["Bruce Springsteen","Michael Bolton","Bryan Adams","Phil Collins"],
            image: "assets/images/bryan-adams.jpg"
        },
        {
            question: "Reason To Live",
            correctAnswer: "KISS",
            answers: ["Twisted Sister","KISS","Van Halen","Quiet Riot"],
            image: "assets/images/kiss.jpg"
        },
        {
            question: "I Want To Know What Love Is",
            correctAnswer: "Foreigner",
            answers: ["Foreigner","Rush","The Police","Boston"],
            image: "assets/images/foreigner.jpg"
        }

    ],

    //Variables for correct answers, incorrect, unanswered
    correct : 0,
    incorrect : 0,
    unanswered : 0,
    questionNumber : 0,
    timer: 10,
    answeredCorrect : false,

    //Start game function
    startGame : function() {
        console.log("Game Started");
        triviaGame.displayQuestion();
        

    },

    //Start a timer
    startTimer : function() {
        $("#timer").html($("<H3>").text(triviaGame.timer));
        if (!clockRunning) {
            intervalId = setInterval(triviaGame.count, 1000);
            clockRunning = true;
        } 

    },
    //Timer countdown to 0
    count: function() {

        if ( triviaGame.timer > 1 ) {
            triviaGame.timer--;
            $("#timer").html($("<H3>").text(triviaGame.timer));
        } else {
            triviaGame.answeredCorrect = false;
            triviaGame.stopTimer();
            triviaGame.unanswered += 1;
            console.log(triviaGame.unanswered)
        }
        
            
    },

    //Stop timer when answer is picked or if time runs out.
    stopTimer : function() {
        $("#timer").text("");
        
        clearInterval(intervalId);
        clockRunning = false;
        triviaGame.timer = 10;

        triviaGame.displayAnswer();
        
    },

    displayAnswer : function() {
        
        if ( !triviaGame.answeredCorrect ) {
            $("#game").html($("<H4>").text("The correct answer is:"));
            $("#game").append($("<H2>").text(triviaGame.questions[triviaGame.questionNumber].correctAnswer));
    
        } else {
            $("#game").html($("<H2>").text("That is correct!"));
        }

        $("#game").append($("<IMG>").attr("src", triviaGame.questions[triviaGame.questionNumber].image));
        
        
        triviaGame.questionNumber+= 1;

        if (triviaGame.questionNumber < triviaGame.questions.length){
            setTimeout(triviaGame.displayQuestion, 4000);
        } else {
            setTimeout(triviaGame.endGame, 4000);
        }
        

    },

    displayQuestion : function() {
        triviaGame.startTimer();

        $("#game").html($("<H4>").text(triviaGame.questions[triviaGame.questionNumber].question));

        $("#game").append($("<UL>").attr("id", "answers"));

        triviaGame.questions[triviaGame.questionNumber].answers.forEach(function(i) {

            

            if (i === triviaGame.questions[triviaGame.questionNumber].correctAnswer) {
                $("#answers").append($("<LI>").html($("<button>").attr("class", "correct").text(i)));
                
                
            } else {
                $("#answers").append($("<LI>").html($("<button>").attr("class", "incorrect").text(i)));
                
                
            }
        })

        $(".incorrect").on("click", triviaGame.wrongAnswer);
        $(".correct").on("click", triviaGame.rightAnswer);
        
    },

    rightAnswer : function() {
        triviaGame.answeredCorrect = true;
        triviaGame.stopTimer();
        
        triviaGame.correct += 1;
        
        console.log("That was correct: " + triviaGame.correct);
    },

    wrongAnswer : function() {
        triviaGame.answeredCorrect = false;
        triviaGame.stopTimer();
        
        triviaGame.incorrect += 1;
        
        console.log("That was incorrect: " + triviaGame.incorrect);
    },

    endGame : function() {
        
        $("#game").html("").append($("<H2>").text("Game over"));
        $("#game").append($("<P>").text("Correct: " + triviaGame.correct));
        $("#game").append($("<P>").text("Incorrect: " + triviaGame.incorrect));
        $("#game").append($("<P>").text("Unanswered: " + triviaGame.unanswered));
        $("#game").append($("<BUTTON>").attr("id", "start").text("Play Again"));

        $("#start").on("click", triviaGame.startGame);

        triviaGame.correct = 0;
        triviaGame.incorrect = 0;
        triviaGame.unanswered = 0;
        triviaGame.questionNumber = 0;
        triviaGame.timer = 5;
        clearInterval(intervalId);
        clockRunning = false;

    }

}


