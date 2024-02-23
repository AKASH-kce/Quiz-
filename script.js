const questions=[
    {
        question:"which is largest animal in the world?",
        answer:[
            {text:"shark",correct:false},
            {text:"Blue Whale",correct:false},
            {text:"Elephant",correct:true},
            {text:"Girafee",correct:false},
        ]
    },
    {
        question:"What country is sushi from?",
        answer:[
            {text:"Thailand",correct:false},
            {text:"japan",correct:true},
            {text:"India",correct:false},
            {text:"France",correct:false},
        ]
    },
    {
        question:"According to the Old Testament, how many days did it take God to create the world?",
        answer:[
            {text:"1",correct:false},
            {text:"6",correct:true},
            {text:"7",correct:false},
            {text:"11",correct:false},
        ]
    }, {
        question:"Which is the world's most populous country?",
        answer:[
            {text:"China",correct:true},
            {text:"America",correct:false},
            {text:"India",correct:false},
            {text:"Brazil",correct:false},
        ]
    }, {
        question:"About what percentage of the earth's surface is water?",
        answer:[
            {text:"10%",correct:false},
            {text:"50%",correct:false},
            {text:"70%",correct:true},
            {text:"95%",correct:false},
        ]
    }
     
];

const questionElement =document.getElementById("question");
const answerButton =document.getElementById("answer-button");
const nextButton =document.getElementById("next-btn");

let currentQuestionIndex=0;
let score=0;

function startQuiz()
{
     currentQuestionIndex=0;
     score=0;
     nextButton.innerHTML="Next";
     showQuestion();

}

function showQuestion()
{
    resetState();
    let currentQuestion=questions[currentQuestionIndex];
    let questionNo=currentQuestionIndex+1;
    questionElement.innerHTML=questionNo+". "+currentQuestion.question;
    
    currentQuestion.answer.forEach(answer=>
        {
         const button=document.createElement("button");
         button.innerHTML=answer.text;
         button.classList.add("btn");
         answerButton.appendChild(button);  
          if(answer.correct)
          {
            button.dataset.correct=answer.correct;
          }
          button.addEventListener("click",selectAnswer);
        });

        
}

function resetState()
{
    nextButton.style.display="none";
    while(answerButton.firstChild)
    {
        answerButton.removeChild(answerButton.firstChild);
    }
    
}

function selectAnswer(e)
{
    const selectedBtn=e.target;
    const iscorrect=selectedBtn.dataset.correct==="true";
    if(iscorrect)
    {
        selectedBtn.classList.add("correct");
        score++;
    }
    else
    {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButton.children).forEach(button=>{
        if(button.dataset.correct==="true")
        {
            button.classList.add("correct");
        }
        button.disabled=true;
    });
    nextButton.style.display="block";
    
}

function showScore()
{
    resetState();
    questionElement.innerHTML=`You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML="play Again";
    nextButton.style.display="block";
}
function handelNextButton()
{
    currentQuestionIndex++;
    if(currentQuestionIndex<questions.length)
    {
        showQuestion();
    }
    else
    {
        showScore();
    }
};
nextButton.addEventListener("click",()=>{
    if(currentQuestionIndex<questions.length)
    {
        handelNextButton();
    }
    else{
        startQuiz();
    }
});
startQuiz();