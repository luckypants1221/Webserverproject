import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { WeeklyProgressChart } from './WeeklyProgressChart';
import { DailyTasks } from './DailyTasks';
import { Target, TrendingUp, CheckCircle2 } from 'lucide-react';

interface HomePageProps {
  onStartQuiz: () => void;
}

export function HomePage({ onStartQuiz }: HomePageProps) {
  const dailyGoal = 50;
  const completedToday = 15;
  const progressPercentage = (completedToday / dailyGoal) * 100;
  const weekProgress = 72; // 예시용

  const today = new Date().toLocaleDateString('ko-KR', {
    month: 'long',
    day: 'numeric',
    weekday: 'long',
  });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
      {/* Left Column - Daily Goal */}
      <div className="lg:col-span-1 h-full">
        <Card className="border border-gray-200 rounded-2xl shadow-sm h-full flex flex-col justify-between">
          <CardHeader className="pb-2">
            <CardTitle className="flex flex-col text-gray-900">
              <span className="text-sm text-gray-500">{today}</span>
              <span className="flex items-center gap-2 text-xl font-semibold mt-1">
                <Target className="w-5 h-5 text-purple-600" />
                오늘의 학습
              </span>
            </CardTitle>
          </CardHeader>

          <CardContent className="flex-1 flex flex-col justify-between py-4">
            {/* Goal Info */}
            <div className="text-center">
              <p className="text-sm text-gray-500 mb-2">하루 목표</p>
              <div className="flex justify-center items-end gap-1">
                <span className="text-4xl font-bold text-gray-900">{completedToday}</span>
                <span className="text-gray-500 mb-1">/ {dailyGoal}</span>
              </div>
            </div>

            {/* Circular Progress */}
            <div className="flex justify-center py-2">
              <div className="relative w-28 h-28">
                <svg className="w-28 h-28 transform -rotate-90">
                  <circle
                    cx="56"
                    cy="56"
                    r="48"
                    stroke="#E5E7EB"
                    strokeWidth="10"
                    fill="none"
                  />
                  <circle
                    cx="56"
                    cy="56"
                    r="48"
                    stroke="#7C3AED"
                    strokeWidth="10"
                    fill="none"
                    strokeDasharray={`${2 * Math.PI * 48}`}
                    strokeDashoffset={`${2 * Math.PI * 48 * (1 - progressPercentage / 100)}`}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xl font-semibold text-gray-900">
                    {Math.round(progressPercentage)}%
                  </span>
                </div>
              </div>
            </div>

            {/* Extra Info */}
            <div className="text-center text-sm text-gray-500">
              이번 주 평균 달성률:{" "}
              <span className="font-semibold text-purple-600">{weekProgress}%</span>
            </div>

            {/* Start Button */}
            <Button
              onClick={onStartQuiz}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white rounded-xl h-12 mt-4"
            >
              <CheckCircle2 className="w-5 h-5 mr-2" />
              학습 시작하기
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Right Columns */}
      <div className="lg:col-span-2 flex flex-col gap-6">
        <Card className="border border-gray-200 rounded-2xl shadow-sm flex-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-gray-900">
              <TrendingUp className="w-5 h-5 text-purple-600" />
              주간 학습 통계
            </CardTitle>
          </CardHeader>
          <CardContent>
            <WeeklyProgressChart />
          </CardContent>
        </Card>

        <Card className="border border-gray-200 rounded-2xl shadow-sm flex-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-gray-900">
              <CheckCircle2 className="w-5 h-5 text-purple-600" />
              일일 과제
            </CardTitle>
          </CardHeader>
          <CardContent>
            <DailyTasks />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
