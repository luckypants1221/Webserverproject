import { Sparkles, Trophy } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import penguinLogo from 'figma:asset/c839abf795c331a2d3295e0cc14b0b60d27d9172.png';

interface HeaderProps {
  userPoints: number;
  userLevel: number;
}

export function Header({ userPoints, userLevel }: HeaderProps) {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="container mx-auto px-6 py-4 max-w-7xl">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <img 
              src={penguinLogo}
              alt="Quit Logo"
              className="w-10 h-10 object-contain"
            />
            <div>
              <h1 className="text-gray-900">Quit!</h1>
              <p className="text-sm text-gray-500">온라인 학습 플랫폼</p>
            </div>
          </div>

          {/* User Info */}
          <div className="flex items-center gap-6">
            {/* Level */}
            <div className="flex items-center gap-2 bg-purple-50 px-4 py-2 rounded-xl">
              <Trophy className="w-5 h-5 text-purple-600" />
              <div>
                <p className="text-xs text-gray-500">레벨</p>
                <p className="text-gray-900">{userLevel}</p>
              </div>
            </div>

            {/* Points */}
            <div className="flex items-center gap-2 bg-purple-50 px-4 py-2 rounded-xl">
              <Sparkles className="w-5 h-5 text-purple-600" />
              <div>
                <p className="text-xs text-gray-500">포인트</p>
                <p className="text-gray-900">{userPoints.toLocaleString()}</p>
              </div>
            </div>

            {/* Avatar */}
            <Avatar className="w-10 h-10 border-2 border-purple-200">
              <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=user" />
              <AvatarFallback className="bg-purple-100 text-purple-700">U</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>
    </header>
  );
}