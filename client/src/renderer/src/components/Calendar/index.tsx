import React, { useState } from "react";
import { Calendar } from "@nextui-org/react";
import { today, getLocalTimeZone } from "@internationalized/date";

export default function App() {
    const [showCalendar, setShowCalendar] = useState(false);
    const currentMonth = today(getLocalTimeZone()).toDate().toLocaleString('default', { month: 'long' });

    const toggleCalendar = () => {
        setShowCalendar(!showCalendar);
    };

    return (
        <div className="flex flex-col items-center relative ">
            <button
                onClick={toggleCalendar}
                className="px-4 py-2 bg-c-primary text-white rounded-md hover:bg-blue-600 transition duration-300"
            >
                {currentMonth}
            </button>
            <div className={`absolute top-14 z-20 transition-all duration-500 ease-in-out ${showCalendar ? 'opacity-100 max-h-screen' : 'opacity-0 max-h-0 overflow-hidden'}`}>
                {showCalendar && (
                    <Calendar
                        className="bg-white"
                        aria-label="Date (Max Date Value)"
                        defaultValue={today(getLocalTimeZone())}
                        maxValue={today(getLocalTimeZone())}
                    />
                )}
            </div>
        </div>
    );
}