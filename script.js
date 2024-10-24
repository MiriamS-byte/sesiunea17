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
            // li.innerHTML = `<button class="btn">${option.text}</button>`;
            const btn = document.createElement("button");
            btn.className = "btn";
            btn.textContent = answer.text;
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