class Quiz {
    constructor(questions){
        this.questions = questions;
        this.question = document.getElementById("question");
        this.answerButtons = document.getElementById("answer-buttons");
        this.feedback = document.getElementById("feedback");
        this.nextButton = document.getElementById("next-button");
    }

    init(){
        const question = this.questions[0];
        this.question.textContent = question.question;
        this.answerButtons.innerHTML = "";
        for(const answer of question.answers){
            const li = document.createElement("li");
            const btn = document.createElement("button");
            btn.className = "btn";
            btn.textContent = answer.text;
            btn.addEventListener(`click`, () => {
                if(answer.correct){
                    btn.classList.add("correct");
                    this.feedback.textContent = question.explanation;
                    this.feedback.className = "text-correct";
                    this.nextButton.classList.remove("hide");
                }else {
                    btn.classList.add("wrong");
                    this.feedback.textContent = "Raspuns gresit. Te rog sa incerci din nou";
                    this.feedback.className = "text-wrong";
                }
            })
            li.appendChild(btn);
            this.answerButtons.appendChild(li);
        }
    }
}

document.addEventListener(`DOMContentLoaded`, async () => {
    const fileData = await fetch("./questions.json");
    const questions = await fileData.json();
    console.log(questions);

    const quiz = new Quiz(questions);
    quiz.init();
})