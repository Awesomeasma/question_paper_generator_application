// main.js

const path = require('path');
const QuestionStore = require(path.resolve(__dirname, 'questionStore.js'));
const QuestionPaperGenerator = require(path.resolve(__dirname, 'questionPaperGenerator.js'));
const sampleData = require('../data/sampleData.js');

// Create a QuestionStore and add sample questions
const questionStore = new QuestionStore();
sampleData.forEach((question) => {
  questionStore.addQuestion(question);
});

// Create a QuestionPaperGenerator instance
const questionPaperGenerator = new QuestionPaperGenerator(questionStore);

// Generate a question paper with the specified requirements
const totalMarks = 100;

// Define the initial distribution
let difficultyDistribution = {
  Easy: 20,
  Medium: 50,
  Hard: 30,
};

// Attempt to generate the question paper
try {
  const questionPaper = questionPaperGenerator.generateQuestionPaper(totalMarks, difficultyDistribution);
  console.log("Generated Question Paper:", questionPaper);
} catch (error) {
  // Log an error message
  console.error("Error:", error.message);

  // Log a message and continue with the original distribution
  console.log("Continuing with the original distribution...");

  // Retry generating the question paper with the original distribution
  const adjustedQuestionPaper = questionPaperGenerator.generateQuestionPaper(totalMarks, difficultyDistribution);
  console.log("Adjusted Question Paper:", adjustedQuestionPaper);
}