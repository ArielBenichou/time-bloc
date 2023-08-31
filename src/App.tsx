import { createSignal } from 'solid-js';
import type { Component } from 'solid-js';
import Calendar from './components/Calendar';
import SlotsManager from './components/SlotsManager';
import { formatWeek, getCurrentSunday } from './utils/time-and-date.util';

const App: Component = () => {
    const [currentWeek, setCurrentWeek] = createSignal(getCurrentSunday());

    return (
        <div class="flex flex-col h-screen p-2">
            <div class="flex justify-between">
                <h1 class="text-4xl">Time<b>Bloc</b></h1>
                { /* <UserProfileBadge /> */}
                <p>User</p>
            </div>
            <div class="flex h-5/6">
                <div class="w-3/4 p-4">
                    <div class="mt-auto flex justify-start items-center gap-2 w-full mb-2">
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
                <div class="w-1/4 p-4">
                    <SlotsManager currentWeek={currentWeek()} />
                </div>
            </div>
        </div>
    );
};

export default App;

