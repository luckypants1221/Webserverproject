import { useState } from 'react';
import { Checkbox } from './ui/checkbox';
import { Sparkles } from 'lucide-react';

interface Task {
  id: string;
  title: string;
  points: number;
  completed: boolean;
}

export function DailyTasks() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: '1', title: '일일 학습 30분 완료하기', points: 30, completed: false },
    { id: '2', title: '어제 학습한 내용 복습하기', points: 20, completed: false },
    { id: '3', title: '퀴즈 5개 풀기', points: 25, completed: false },
    { id: '4', title: '연속 학습 3일 달성', points: 50, completed: false },
  ]);

  const toggleTask = (id: string) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  return (
    <div className="space-y-3">
      {tasks.map((task) => (
        <div
          key={task.id}
          className="flex items-center justify-between p-4 rounded-xl hover:bg-gray-50 transition-colors border border-gray-100"
        >
          <div className="flex items-center gap-3 flex-1">
            <Checkbox
              id={task.id}
              checked={task.completed}
              onCheckedChange={() => toggleTask(task.id)}
              className="border-gray-300 data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600"
            />
            <label
              htmlFor={task.id}
              className={`flex-1 cursor-pointer ${
                task.completed ? 'line-through text-gray-400' : 'text-gray-700'
              }`}
            >
              {task.title}
            </label>
          </div>
          <div className="flex items-center gap-1 text-purple-600 bg-purple-50 px-3 py-1 rounded-lg">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm">+{task.points}P</span>
          </div>
        </div>
      ))}
    </div>
  );
}