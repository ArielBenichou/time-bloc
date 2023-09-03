import { createSignal } from 'solid-js';
import type { Component } from 'solid-js';
import Calendar from './components/Calendar';
import SlotsManager from './components/SlotsManager';
import { formatWeek, getCurrentSunday } from './utils/time-and-date.util';

const App: Component = () => {
    const [currentWeek, setCurrentWeek] = createSignal(getCurrentSunday());
    return (
        <div class="flex flex-col h-screen p-2 overflow-hidden">
            <div class="flex justify-between">
                <h1 class="text-4xl">Time<b>Bloc</b></h1>
                { /* <UserProfileBadge /> */}
                <p>User</p>
            </div>
            <div class="flex flex-grow space-x-4 m-4 h-full">
                { /* TODO: add gap */}
                <div class="flex flex-col basis-3/4 h-full">
                    {/* Calendar Header */}
                    <div class="flex justify-start items-center space-x-4">
                        {/* Chevron arrows to scroll through the weeks */}
                        <button
                            class="px-4 py-2 text-black bg-gray-100 hover:bg-gray-200 rounded-full"
                            onClick={() => setCurrentWeek(currentWeek().subtract(7, 'days'))}
                        >
                            &lt;
                        </button>
                        <button
                            class="px-4 py-2 text-black bg-gray-100 hover:bg-gray-200 rounded-full"
                            onClick={() => setCurrentWeek(currentWeek().add(7, 'days'))}
                        >
                            &gt;
                        </button>
                        <div class="text-xl font-bold">{formatWeek(currentWeek())}</div>
                    </div>

                    <Calendar currentWeek={currentWeek()} />
                </div>

                <div class="basis-1/4">
                    <SlotsManager currentWeek={currentWeek()} />
                </div>
            </div>
        </div>
    );
};

export default App;

