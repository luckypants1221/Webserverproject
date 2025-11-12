import { useState } from "react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import {
  CheckCircle2,
  XCircle,
  ArrowRight,
} from "lucide-react";

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}
interface WrongItem {
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
}

const quizQuestions: Question[] = [
  {
    id: 1,
    question: "'laundry'의 한국어 뜻은 무엇입니까?",
    options: ["세탁", "요리", "청소", "운동"],
    correctAnswer: 0,
    explanation:
      "Laundry는 세탁이라는 의미로, 옷을 빨고 건조시키는 과정을 말합니다.",
  },
  {
    id: 2,
    question: "'도서관'의 올바른 영어 번역은?",
    options: ["Restaurant", "Library", "Museum", "School"],
    correctAnswer: 1,
    explanation:
      "도서관은 'library'입니다. 책을 빌리고 읽는 곳이에요.",
  },
  {
    id: 3,
    question: "'go'의 과거형은?",
    options: ["goed", "went", "gone", "going"],
    correctAnswer: 1,
    explanation: "'Went'는 go의 불규칙 과거형입니다.",
  },
  {
    id: 4,
    question: "'아름다운'의 영어 단어는?",
    options: ["Ugly", "Beautiful", "Smart", "Tall"],
    correctAnswer: 1,
    explanation: "Beautiful은 '아름다운'이라는 뜻입니다.",
  },
  {
    id: 5,
    question: "올바른 문장을 선택하세요:",
    options: [
      "She don't like apples",
      "She doesn't likes apples",
      "She doesn't like apples",
      "She not like apples",
    ],
    correctAnswer: 2,
    explanation: "정답은 'She doesn't like apples'입니다.",
  },
];

interface WrongAnswer {
  question: string;
  correctAnswer: string;
  explanation: string;
}

interface QuizPageProps {
  onComplete: (points: number, wrongs: WrongItem[]) => void;
}

export function QuizPage({ onComplete }: QuizPageProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [wrongs, setWrongs] = useState<WrongItem[]>([]);

  const q = quizQuestions[currentIndex];
  const progress =
    ((currentIndex + 1) / quizQuestions.length) * 100;
  const isCorrect = selected === q.correctAnswer;

  const handleSubmit = () => {
    if (selected === null) return;
    setShowFeedback(true);

    if (isCorrect) {
      setScore((s) => s + 20);
    } else {
      // ❗정답, 보기, 해설 모두 저장
      setWrongs((prev) => [
        ...prev,
        {
          question: q.question,
          options: q.options,
          correctAnswerIndex: q.correctAnswer,
          explanation: q.explanation,
        },
      ]);
    }
  };

  const handleNext = () => {
    if (currentIndex < quizQuestions.length - 1) {
      setCurrentIndex((i) => i + 1);
      setSelected(null);
      setShowFeedback(false);
    } else {
      const finalScore = isCorrect ? score + 20 : score;
      const finalWrongs = isCorrect
        ? wrongs
        : [
            ...wrongs,
            {
              question: q.question,
              options: q.options,
              correctAnswerIndex: q.correctAnswer,
              explanation: q.explanation,
            },
          ];
      onComplete(finalScore, finalWrongs);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Progress */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm text-gray-600">
          <span>
            질문 {currentIndex + 1}/{quizQuestions.length}
          </span>
          <span>{Math.round(progress)}%</span>
        </div>
        <Progress
          value={progress}
          className="h-2 bg-gray-200"
        />
      </div>

      <Card className="border border-gray-200 rounded-2xl shadow-sm">
        <CardContent className="pt-8 pb-8">
          <h2 className="text-gray-900 text-center text-xl mb-8">
            {q.question}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {q.options.map((opt, i) => {
              const isSel = selected === i;
              const isAns = i === q.correctAnswer;
              let cls =
                "w-full justify-center h-auto py-6 px-6 rounded-xl border-2 transition-all";
              if (!showFeedback) {
                cls += isSel
                  ? " bg-purple-50 border-purple-600 text-purple-900"
                  : " bg-white border-gray-200 hover:bg-gray-50 text-gray-700";
              } else {
                if (isAns)
                  cls +=
                    " bg-green-50 border-green-500 text-green-900";
                else if (isSel && !isCorrect)
                  cls +=
                    " bg-red-50 border-red-500 text-red-900";
                else
                  cls +=
                    " bg-gray-50 border-gray-200 text-gray-500";
              }

              return (
                <Button
                  key={i}
                  variant="outline"
                  className={cls}
                  onClick={() => setSelected(i)}
                  disabled={showFeedback}
                >
                  {opt}
                </Button>
              );
            })}
          </div>

          {/* Feedback */}
          {showFeedback && (
            <div
              className={`p-6 rounded-xl mb-6 border-2 ${
                isCorrect
                  ? "bg-green-50 border-green-200"
                  : "bg-red-50 border-red-200"
              }`}
            >
              <div className="flex items-start gap-3">
                {isCorrect ? (
                  <CheckCircle2 className="w-6 h-6 text-green-600 mt-0.5" />
                ) : (
                  <XCircle className="w-6 h-6 text-red-600 mt-0.5" />
                )}
                <div>
                  <p
                    className={`mb-2 ${
                      isCorrect
                        ? "text-green-900"
                        : "text-red-900"
                    }`}
                  >
                    {isCorrect ? "정답입니다!" : "틀렸습니다."}
                  </p>
                  <p className="text-sm text-gray-600">
                    {q.explanation}
                  </p>
                </div>
              </div>
            </div>
          )}

          {!showFeedback ? (
            <Button
              onClick={handleSubmit}
              disabled={selected === null}
              className="w-full bg-purple-600 text-white h-14 rounded-xl"
            >
              정답 확인
            </Button>
          ) : (
            <Button
              onClick={handleNext}
              className="w-full bg-purple-600 text-white h-14 rounded-xl"
            >
              {currentIndex < quizQuestions.length - 1
                ? "다음 질문"
                : "퀴즈 완료"}
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
}