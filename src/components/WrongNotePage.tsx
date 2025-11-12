import { useState } from "react";
import { Button } from "./ui/button";
import {
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  XCircle,
} from "lucide-react";

interface WrongItem {
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
}

interface WrongNotePageProps {
  wrongNotes: {
    date: string;
    wrongs: WrongItem[];
  }[];
}

export function WrongNotePage({
  wrongNotes,
}: WrongNotePageProps) {
  const [openId, setOpenId] = useState<string | null>(null);
  const [retryId, setRetryId] = useState<string | null>(null);
  const [selected, setSelected] = useState<number | null>(null);
  const [showResult, setShowResult] = useState<string | null>(
    null,
  );

  if (!wrongNotes || wrongNotes.length === 0) {
    return (
      <div className="text-center py-12 text-gray-600">
        아직 오답이 없습니다 📘
      </div>
    );
  }

  const handleToggle = (id: string) => {
    setOpenId(openId === id ? null : id);
    setRetryId(null);
    setSelected(null);
    setShowResult(null);
  };

  const handleRetry = (id: string) => {
    setRetryId(id);
    setSelected(null);
    setShowResult(null);
  };

  const handleSubmit = (id: string) => {
    setShowResult(id);
  };

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">
        📚 오답노트
      </h2>

      {wrongNotes
        .slice()
        .reverse()
        .map((note) => (
          <div
            key={note.date}
            className="border border-gray-200 rounded-2xl p-6 bg-white shadow-sm"
          >
            <h3 className="text-lg font-semibold text-purple-600 mb-4">
              {note.date}
            </h3>

            {note.wrongs.map((w, idx) => {
              const id = `${note.date}-${idx}`;
              const isOpen = openId === id;
              const isRetry = retryId === id;
              const isAnswered = showResult === id;
              const isCorrect =
                selected === w.correctAnswerIndex;

              return (
                <div
                  key={id}
                  className="border border-gray-100 rounded-lg bg-gray-50 mb-3 overflow-hidden"
                >
                  {/* 문제 제목 */}
                  <button
                    onClick={() => handleToggle(id)}
                    className="w-full text-left flex justify-between items-center px-4 py-3 text-gray-800 hover:bg-gray-100"
                  >
                    <span>❌ {w.question}</span>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-gray-500" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-gray-500" />
                    )}
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 bg-white border-t border-gray-200">
                      {/* 다시 풀기 버튼 */}
                      {!isRetry && !isAnswered && (
                        <div className="pt-3">
                          <Button
                            onClick={() => handleRetry(id)}
                            className="bg-purple-600 hover:bg-purple-700 text-white rounded-xl h-10"
                          >
                            다시 풀기
                          </Button>
                        </div>
                      )}

                      {/* 다시풀기 모드 */}
                      {isRetry && !isAnswered && (
                        <div className="space-y-3 pt-3">
                          {w.options.map((opt, i) => (
                            <Button
                              key={i}
                              onClick={() => setSelected(i)}
                              className={`w-full text-left h-auto py-4 px-5 rounded-lg border ${
                                selected === i
                                  ? "bg-purple-50 border-purple-500 text-purple-700"
                                  : "bg-white border-gray-200 hover:bg-gray-50 text-gray-700"
                              }`}
                            >
                              {opt}
                            </Button>
                          ))}

                          <Button
                            onClick={() => handleSubmit(id)}
                            disabled={selected === null}
                            className="w-full bg-purple-600 hover:bg-purple-700 text-white rounded-xl h-10 mt-2"
                          >
                            정답 확인
                          </Button>
                        </div>
                      )}

                      {/* 정답 / 해설 */}
                      {isAnswered && (
                        <div
                          className={`mt-4 p-4 rounded-xl border-2 ${
                            isCorrect
                              ? "bg-green-50 border-green-200"
                              : "bg-red-50 border-red-200"
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            {isCorrect ? (
                              <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5" />
                            ) : (
                              <XCircle className="w-5 h-5 text-red-600 mt-0.5" />
                            )}
                            <div>
                              <p
                                className={`font-medium ${
                                  isCorrect
                                    ? "text-green-800"
                                    : "text-red-800"
                                }`}
                              >
                                {isCorrect
                                  ? "정답입니다!"
                                  : "틀렸습니다! 다시 복습해보세요."}
                              </p>
                              <p className="text-sm text-gray-700 mt-1">
                                ✅ 정답:{" "}
                                {
                                  w.options[
                                    w.correctAnswerIndex
                                  ]
                                }
                              </p>
                              <p className="text-sm text-gray-600 mt-1">
                                💬 {w.explanation}
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ))}
    </div>
  );
}