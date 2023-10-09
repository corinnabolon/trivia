import { generateId } from "../utils/GenerateId.js"

export class Question {
  constructor(data) {
    this.id = generateId()
    this.category = data.category
    this.type = data.type
    this.difficulty = data.difficulty
    this.question = data.question
    this.correctAnswer = data.correct_answer
    this.hasBeenAnswered = false
    // this.sillyString = data.difficulty + data.question
    // this.pointValue = Math.random(10)
  }



  get QuestionCardTemplate() {
    return `    
      <div class="col-11 my-4 mx-5 p-2 py-4 trivia-card">
        <div class="text-center fs-5">
          <p>Question</p>
          <p>Categroy: ${this.category}</p>
          <p>Difficulty: ${this.difficulty}</p>
        </div>
        <div class="p-5 fs-3">
          <p>${this.question}</p>
        </div>
        <div class="d-flex justify-content-center">
          <button onclick="app.QuestionsController.checkAnswer('${this.id}', 'True')" type="button" class="btn btn-orange fw-bold mx-5" ${this.disableButton}>True</button>
          <button onclick="app.QuestionsController.checkAnswer('${this.id}', 'False')" type="button" class="btn btn-orange fw-bold mx-5" ${this.disableButton}>False</button>
        </div>
      </div>
    `
  }

  get disableButton() {
    if (this.hasBeenAnswered) {
      return "disabled"
    } else {
      return ""
    }
  }


}