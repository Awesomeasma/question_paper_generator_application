// questionPaperGenerator.js

class QuestionPaperGenerator {
    constructor(questionStore) {
      this.questionStore = questionStore;
    }
  
    generateQuestionPaper(totalMarks, difficultyDistribution) {
      const questionPaper = [];
  
      // Validate that there are enough questions for the specified distribution
      Object.entries(difficultyDistribution).forEach(([difficulty, percentage]) => {
        const requiredMarks = (totalMarks * percentage) / 100;
        const availableQuestions = this.questionStore.getQuestionsByDifficulty(difficulty);
  
        if (availableQuestions.length < requiredMarks) {
          // Log a warning and adjust the distribution proportionally
          console.error(`Not enough questions available for difficulty ${difficulty}`);
          console.log("Adjusting distribution...");
  
          const adjustedPercentage = (availableQuestions.length / totalMarks) * 100;
          difficultyDistribution[difficulty] = Math.round(adjustedPercentage);
        }
      });
  
      // Generate the question paper based on the adjusted distribution
      Object.entries(difficultyDistribution).forEach(([difficulty, percentage]) => {
        const requiredMarks = (totalMarks * percentage) / 100;
        const availableQuestions = this.questionStore.getQuestionsByDifficulty(difficulty);
  
        for (let i = 0; i < requiredMarks; i++) {
          if (availableQuestions.length > 0) {
            const randomIndex = Math.floor(Math.random() * availableQuestions.length);
            const selectedQuestion = availableQuestions.splice(randomIndex, 1)[0];
            questionPaper.push(selectedQuestion);
          }
        }
      });
  
      return questionPaper;
    }
  }
  
  module.exports = QuestionPaperGenerator;
  