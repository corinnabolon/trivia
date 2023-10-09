import { AppState } from "../AppState.js";
import { Question } from "../models/Questions.js";
import { Pop } from "../utils/Pop.js";


class QuestionsService {
  constructor() {
    console.log("QuestionsService loaded!")
  }

  async getQuestions() {
    // const response = await axios.get("https://opentdb.com/api.php?amount=10&category=23&difficulty=medium&type=boolean")
    const response = await axios.get("https://opentdb.com/api.php?amount=20&type=boolean")
    console.log("GOT QUESTIONS", response.data.results)
    const newQuestions = response.data.results.map(questionPOJO => new Question(questionPOJO))
    AppState.questions = newQuestions
    console.log("Questions in AppState", AppState.questions)
  }

  checkAnswer(answerId, bool) {
    let questions = AppState.questions
    // let score = AppState.score  //This won't actually change the score in the AppState, it's just a reference to it!  (Because of the Proxy layer)
    let foundQuestion = questions.find(question => question.id == answerId)
    foundQuestion.hasBeenAnswered = true
    AppState.emit("questions")
    console.log(AppState.questions)
    console.log(foundQuestion)
    console.log(foundQuestion.correctAnswer, bool)
    if (foundQuestion.correctAnswer == bool) {
      AppState.score += 1
      Pop.success(`You got it right!`)
    } else {
      Pop.error(`You got it wrong.`)
    }
  }

}


export const questionsService = new QuestionsService()