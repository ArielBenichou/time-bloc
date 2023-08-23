import { createSignal } from 'solid-js';
import type { Component } from 'solid-js';
import Calendar from './components/Calendar';
import dayjs from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import weekday from 'dayjs/plugin/weekday';
import SlotsManager from './components/SlotsManager';
dayjs.extend(isSameOrBefore);
dayjs.extend(weekday);

function getCurrentSunday() {
    const currentDate = dayjs();

    const sunday = currentDate.day(0);

    // If the current date is after Sunday, consider it for the next week
    if (currentDate.isSameOrBefore(sunday)) {
        sunday.subtract(7, 'days');
    }

    // Set the time to 00:00
    const sundayAtMidnight = sunday.startOf('day');

    return sundayAtMidnight;
}

const App: Component = () => {
    const [currentWeek, setCurrentWeek] = createSignal(getCurrentSunday());

    // TODO: Define your task slots and logic here

    return (
        <div class="flex flex-col h-screen p-2">
            <div class="flex justify-between">
                <h1 class="text-4xl">Time<b>Bloc</b></h1>
                { /* <UserProfileBadge /> */}
                <p>User</p>
            </div>
            <div class="flex h-5/6">
                <div class="w-3/4 p-4">
                    <div class="mt-auto flex justify-end gap-2 w-full mb-2">
                        <div>{currentWeek().toISOString()}</div>
                        {/* Chevron arrows to scroll through the weeks */}
                        <button
                            class="px-4 py-2 text-white bg-blue-500 hover:bg-blue-600 rounded"
                            onClick={() => setCurrentWeek(currentWeek().subtract(7, 'days'))}
                        >
                            &lt; Previous Week
                        </button>
                        <button
                            class="px-4 py-2 text-white bg-blue-500 hover:bg-blue-600 rounded"
                            onClick={() => setCurrentWeek(currentWeek().add(7, 'days'))}
                        >
                            Next Week &gt;
                        </button>
                    </div>
                    <Calendar currentWeek={currentWeek()} />
                </div>
                <div class="w-1/4 p-4">
                    <SlotsManager currentWeek={currentWeek()} />
                </div>
            </div>
        </div>
    );
};

export default App;

