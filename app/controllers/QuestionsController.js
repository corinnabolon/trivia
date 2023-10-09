import { AppState } from "../AppState.js";
import { questionsService } from "../services/QuestionsService.js";
import { Pop } from "../utils/Pop.js";
import { setHTML, setText } from "../utils/Writer.js";


function _drawQuestions() {
  let questions = AppState.questions
  let content = ``
  console.log("drawing")
  questions.forEach(question => content += question.QuestionCardTemplate)
  setHTML("questionCard", content)
}

function _drawScore() {
  let score = AppState.score
  setText("scorecard", score)
}

export class QuestionsController {

  constructor() {
    console.log("QuestionsController loaded!")
    this.getQuestions()

    AppState.on("questions", _drawQuestions)
    AppState.on("score", _drawScore)
  }

  getQuestions() {
    try {
      questionsService.getQuestions();
      Pop.success("Got the questions!")
    }
    catch (error) {
      Pop.error(error)
      console.error(error)
    }
  }


  checkAnswer(answerId, bool) {
    console.log("Your answer:", answerId)
    questionsService.checkAnswer(answerId, bool)
  }

}