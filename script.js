class Quiz {
    constructor(questions){
        this.questions = questions;
        this.question = document.getElementById("question");
        this.answerButtons = document.getElementById("answer-buttons");
        this.feedback = document.getElementById("feedback");
        this.nextButton = document.getElementById("next-button");
        this.questionIndex = 0;
        this.nextButton.addEventListener(`click`, () => {
            this.next();
        });
    }

    populateQuizAnswer(answer, question){
        const li = document.createElement("li");
        const btn = document.createElement("button");
        btn.className = "btn";
        btn.textContent = answer.text;
        btn.addEventListener(`click`, () => {
            if(answer.correct){
                for(const item of this.answerButtons.children){
                    item.firstChild.classList.remove("wrong");
                    item.firstChild.disabled = true;
                }
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

    init(){
        const question = this.questions[this.questionIndex];
        this.question.textContent = question.question;
        this.answerButtons.innerHTML = "";
        for(const answer of question.answers){
            this.populateQuizAnswer(answer, question);
        }
    }

    next(){
        this.questionIndex ++;
        this.feedback.innerHTML = "";
        this.nextButton.classList.add("hide");
        if(this.questionIndex === this.questions.length){
            const modalContainer = document.querySelector(".modal-container");
            modalContainer.classList.remove("hide");
            const resetBtn = document.getElementById("reset-button");
            resetBtn.addEventListener(`click`, () => {
                //var1 - reload la pagina
                // window.location.reload();
                
                //var2 - revenire la prima intrebare
                this.questionIndex = 0;
                modalContainer.classList.add("hide");
                this.init();
            })
            return;
        }
        this.init();
    }
}

document.addEventListener(`DOMContentLoaded`, async () => {
    const fileData = await fetch("./questions.json");
    const questions = await fileData.json();
    console.log(questions);

    const quiz = new Quiz(questions);
    quiz.init();
})