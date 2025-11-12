import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import penguinLogo from "figma:asset/c839abf795c331a2d3295e0cc14b0b60d27d9172.png";

interface SignupPageProps {
  onSignup: () => void;
  onBackToLogin: () => void;
}

export function SignupPage({
  onSignup,
  onBackToLogin,
}: SignupPageProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirm) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }
    // 실제 회원가입 API 연결 가능
    onSignup();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <img
            src={penguinLogo}
            alt="Penguin"
            className="w-28 h-28 mx-auto mb-4"
          />
          <h1 className="text-2xl font-semibold text-gray-900 mb-2">
            회원가입
          </h1>
          <p className="text-gray-600">
            새로운 계정을 만들어 학습을 시작하세요
          </p>
        </div>

        <Card className="border border-gray-200 rounded-2xl shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl text-center text-gray-900">
              회원가입
            </CardTitle>
            <CardDescription className="text-center text-gray-600">
              아래 정보를 입력해주세요
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">이메일</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-12 rounded-xl border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">비밀번호</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="h-12 rounded-xl border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirm">비밀번호 확인</Label>
                <Input
                  id="confirm"
                  type="password"
                  placeholder="••••••••"
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  required
                  className="h-12 rounded-xl border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                />
              </div>

              <Button
                type="submit"
                className="w-full h-12 bg-purple-600 text-white rounded-xl"
              >
                회원가입
              </Button>

              <Button
                type="button"
                onClick={onBackToLogin}
                variant="outline"
                className="w-full h-12 border-2 border-gray-200 hover:bg-gray-50 text-gray-700 rounded-xl"
              >
                로그인 화면으로 돌아가기
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}