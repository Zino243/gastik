import { UserSubscription } from "../lib/subscription";
interface DayCardProps {
    day: number;
    subscriptions?: (UserSubscription & { Service?: { name: string; logo: string }; Category?: { name: string } })[];
}
export function DayCard({ day, subscriptions }: DayCardProps) {
    const now = new Date()
    const isToday = now.getDate() === day
    return (
        <div className={`
            w-26 h-26 flex flex-col items-center justify-center
            ${isToday ? 'border-2 border-primary' : 'border border-input'}
        `}>
            <span>{day}</span>
            <div className="flex gap-1 mt-1">
                {subscriptions?.map((sub, i) => (
                    <div 
                        key={i}
                        className="w-2 h-2 rounded-full bg-primary"
                    />
                ))}
            </div>
        </div>
    )
}