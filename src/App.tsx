import { useState } from "react";
import { Header } from "./components/Header";
import { HomePage } from "./components/HomePage";
import { QuizPage } from "./components/QuizPage";
import { Sidebar } from "./components/Sidebar";
import { LoginPage } from "./components/LoginPage";
import { SignupPage } from "./components/SignupPage";
import { WrongNotePage } from "./components/WrongNotePage";

type Screen = "home" | "quiz" | "info" | "shop" | "wrongnote";
type Page = "login" | "signup" | "main";

export default function App() {
  const [page, setPage] = useState<Page>("login");
  const [currentScreen, setCurrentScreen] =
    useState<Screen>("home");
  const [userPoints, setUserPoints] = useState(3633);
  const [userLevel, setUserLevel] = useState(47);
  const [wrongNotes, setWrongNotes] = useState<
    {
      date: string;
      wrongs: {
        question: string;
        options: string[];
        correctAnswerIndex: number;
        explanation: string;
      }[];
    }[]
  >([]);

  // 로그인 화면
  if (page === "login")
    return (
      <LoginPage
        onLogin={() => setPage("main")}
        onSignupClick={() => setPage("signup")}
      />
    );

  // 회원가입 화면
  if (page === "signup")
    return (
      <SignupPage
        onSignup={() => setPage("main")}
        onBackToLogin={() => setPage("login")}
      />
    );

  // 메인 화면
  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar
        currentScreen={currentScreen}
        onNavigate={setCurrentScreen}
      />

      <div className="flex-1">
        <Header userPoints={userPoints} userLevel={userLevel} />

        <main className="container mx-auto px-6 py-8 max-w-7xl">
          {currentScreen === "home" && (
            <HomePage
              onStartQuiz={() => setCurrentScreen("quiz")}
            />
          )}

          {currentScreen === "quiz" && (
            <QuizPage
              onComplete={(points, wrongs) => {
                setUserPoints((p) => p + points);
                const today = new Date().toLocaleDateString(
                  "ko-KR",
                );
                setWrongNotes((prev) => {
                  const idx = prev.findIndex(
                    (n) => n.date === today,
                  );
                  if (idx !== -1) {
                    const updated = [...prev];
                    updated[idx] = {
                      ...updated[idx],
                      wrongs: [
                        ...updated[idx].wrongs,
                        ...wrongs,
                      ],
                    };
                    return updated;
                  }
                  return [...prev, { date: today, wrongs }];
                });
                setCurrentScreen("home");
              }}
            />
          )}

          {currentScreen === "wrongnote" && (
            <WrongNotePage wrongNotes={wrongNotes} />
          )}

          {(currentScreen === "info" ||
            currentScreen === "shop") && (
            <div className="text-center py-12">
              <p className="text-gray-600">준비 중...</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}