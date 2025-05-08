import { Goal } from "@/app/business/record/record.service";

  

export default function GoalListItem({ goals }: { goals: Goal[] }) {
    if (goals.length === 0) {
      return <div className="text-center text-gray-400">지난 목표가 없습니다.</div>;
    }
  
    return (
      <ul className="mt-2 space-y-2">
        {goals.map((goal) => (
          <li key={goal.id} className="p-4 rounded border shadow-sm bg-white flex flex-row justify-between items-center">
            <div className="font-semibold">{goal.bird.speciesName}</div>
            <div className="text-xs text-gray-400">{goal.isCompleted ? '완료됨' : '미완료'}</div>
          </li>
        ))}
      </ul>
    );
  }
  