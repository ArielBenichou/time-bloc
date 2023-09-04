import { createSignal, splitProps } from 'solid-js';
import rightChevron from "./assets/right-chevron.png";
import type { Component, Setter } from 'solid-js';
import Calendar from './components/Calendar';
import SlotsManager from './components/SlotsManager';
import { formatWeek, getCurrentSunday } from './utils/time-and-date.util';
import { Dayjs } from 'dayjs';

const App: Component = () => {
    const [currentWeek, setCurrentWeek] = createSignal(getCurrentSunday());
    return (
        <div class="rn-flex flex-1 p-2 h-full bg-slate-100">
            <div class="flex justify-between">
                <h1 class="text-4xl">Time<b>Bloc</b></h1>
                { /* <UserProfileBadge /> */}
                <p>User</p>
            </div>

            <div class="rn-flex flex-col gap-4 m-2 flex-1">
                <ToolsHeader currentWeek={currentWeek()} setCurrentWeek={setCurrentWeek} />
                <div class="rn-flex flex-row gap-4 flex-1">
                    <div class="flex flex-1 flex-col basis-3/4 gap-4">
                        <Calendar currentWeek={currentWeek()} />
                    </div>

                    <div class="flex flex-col flex-1 gap-4 basis-1/4">
                        <SlotsManager currentWeek={currentWeek()} />
                    </div>
                </div>
            </div>
        </div>
    );
};

const ToolsHeader: Component<{ currentWeek: Dayjs, setCurrentWeek: Setter<Dayjs> }> = (props) => {
    return (
        <div class="flex justify-start items-center space-x-4">
            {/* Chevron arrows to scroll through the weeks */}
            <button
                class="p-3 text-black bg-white hover:bg-slate-100 active:bg-slate-200 active:shadow-inner active:drop-shadow-sm rounded-full drop-shadow-md "
                onClick={() => props.setCurrentWeek(props.currentWeek.subtract(7, 'days'))}
            >
                <img class="h-3 rotate-180" src={rightChevron} alt="left chevron" />
            </button>
            <button
                class="p-3 text-black bg-white hover:bg-slate-100 active:bg-slate-200 active:shadow-inner active:drop-shadow-sm rounded-full drop-shadow-md "
                onClick={() => props.setCurrentWeek(props.currentWeek.add(7, 'days'))}
            >
                <img class="h-3" src={rightChevron} alt="right chevron" />
            </button>
            <div class="text-xl font-bold">{formatWeek(props.currentWeek)}</div>
        </div>

    );
}

export default App;

