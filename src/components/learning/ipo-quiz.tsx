'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, XCircle, HelpCircle, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const quizQuestions = [
  {
    id: 1,
    question: 'What is the primary purpose of an IPO?',
    options: [
      'To raise capital from public investors',
      'To reduce company taxes',
      'To change company management',
      'To merge with another company',
    ],
    correctAnswer: 0,
    explanation:
      "An IPO's main purpose is to raise capital by offering company shares to public investors.",
  },
  {
    id: 2,
    question: 'What document must companies file with the SEC for an IPO?',
    options: ['Form 10-K', 'Form S-1', 'Form 8-K', 'Form 1040'],
    correctAnswer: 1,
    explanation:
      'Form S-1 is the initial registration form for new securities required by the SEC for public companies in the United States.',
  },
  {
    id: 3,
    question: "What is a 'lock-up period' in an IPO?",
    options: [
      'Time between filing and trading',
      'Period when stock price is fixed',
      'Time insiders cannot sell shares',
      'Duration of the roadshow',
    ],
    correctAnswer: 2,
    explanation:
      'A lock-up period is a time after an IPO when insiders and early investors are restricted from selling their shares.',
  },
  {
    id: 4,
    question: "What is a 'roadshow' in the IPO process?",
    options: [
      'Marketing presentations to potential investors',
      'Company facility tours',
      'Stock exchange visits',
      'Employee training sessions',
    ],
    correctAnswer: 0,
    explanation:
      "A roadshow involves presentations to potential investors to generate interest in the company's shares before the IPO.",
  },
];

interface QuizProps {
  onProgress: (progress: number) => void;
}

export function IPOQuiz({ onProgress }: QuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    setShowExplanation(true);

    if (answerIndex === quizQuestions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      setQuizComplete(true);
      const progressValue = Math.round((score / quizQuestions.length) * 100);
      onProgress(progressValue);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setScore(0);
    setQuizComplete(false);
  };

  if (quizComplete) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <div className="mb-4">
            <Badge
              variant={score > 2 ? 'default' : 'destructive'}
              className="text-lg px-4 py-2"
            >
              Score: {score}/{quizQuestions.length}
            </Badge>
          </div>
          <p className="text-lg mb-6">
            {score > 2
              ? 'Great job! You have a good understanding of IPOs.'
              : 'Keep learning! Review the material and try again.'}
          </p>
          <Button onClick={handleRestart}>Try Again</Button>
        </CardContent>
      </Card>
    );
  }

  const question = quizQuestions[currentQuestion];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <Badge variant="outline">
          Question {currentQuestion + 1}/{quizQuestions.length}
        </Badge>
        <Badge variant="outline">Score: {score}</Badge>
      </div>

      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">{question.question}</h3>
          <div className="space-y-3">
            {question.options.map((option, index) => (
              <Button
                key={index}
                variant="outline"
                className={cn(
                  'w-full justify-start text-left font-normal',
                  selectedAnswer !== null &&
                    index === question.correctAnswer &&
                    'border-green-500',
                  selectedAnswer === index &&
                    index !== question.correctAnswer &&
                    'border-red-500'
                )}
                disabled={selectedAnswer !== null}
                onClick={() => handleAnswerSelect(index)}
              >
                <div className="flex items-center gap-2">
                  {selectedAnswer !== null ? (
                    index === question.correctAnswer ? (
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                    ) : index === selectedAnswer ? (
                      <XCircle className="h-4 w-4 text-red-500" />
                    ) : (
                      <HelpCircle className="h-4 w-4 text-muted-foreground" />
                    )
                  ) : (
                    <HelpCircle className="h-4 w-4 text-muted-foreground" />
                  )}
                  {option}
                </div>
              </Button>
            ))}
          </div>
          {showExplanation && (
            <div className="mt-4 p-4 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground">
                {question.explanation}
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {selectedAnswer !== null && (
        <div className="flex justify-end">
          <Button onClick={handleNext}>
            {currentQuestion < quizQuestions.length - 1 ? (
              <>
                Next Question
                <ArrowRight className="ml-2 h-4 w-4" />
              </>
            ) : (
              'Complete Quiz'
            )}
          </Button>
        </div>
      )}
    </div>
  );
}
