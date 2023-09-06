import { createSignal, onCleanup, onMount, splitProps } from 'solid-js';
import rightChevron from "./assets/right-chevron.png";
import type { Component, Setter } from 'solid-js';
import Calendar from './components/Calendar';
import SlotsManager from './components/SlotsManager';
import { formatWeek, getCurrentSunday } from './utils/time-and-date.util';
import { Dayjs } from 'dayjs';

const App: Component = () => {
    const [currentWeek, setCurrentWeek] = createSignal(getCurrentSunday());
    return (
        <div class="flex flex-col min-h-0 flex-1 p-2 h-full bg-slate-100">
            <div class="flex justify-between">
                <h1 class="text-4xl">Time<b>Bloc</b></h1>
                <UserAvatar />
            </div>

            <div class="flex flex-col min-h-0 gap-4 m-2 flex-1">
                <ToolsHeader currentWeek={currentWeek()} setCurrentWeek={setCurrentWeek} />
                <div class="flex flex-row min-h-0 gap-4 flex-1">
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

const UserAvatar: Component = () => {
    // TODO: make texts dynmaic, make the button do somthing
    const [isOpen, setIsOpen] = createSignal(false);
    let ref: HTMLDivElement;

    const handleClick = (event: MouseEvent) => {
        if (!ref.contains((event as any).target) && isOpen()) {
            setIsOpen(false);
        };
    };

    onMount(() => {
        document.addEventListener('click', handleClick);
    });

    onCleanup(() => {
        document.removeEventListener('click', handleClick);
    });

    return (
        <div class="relative" ref={ref!} >
            <div onClick={() => setIsOpen(!isOpen())} class="cursor-pointer relative inline-flex h-10 w-10 items-center justify-center rounded-full bg-gray-200 ">
                <span class="font-medium text-gray-600 ">AB</span>
                <span class="absolute left-7 top-0 h-3.5 w-3.5 rounded-full border-2 border-white bg-green-400 "></span>
            </div>

            <div class={(isOpen() ? "" : "hidden ") + "right-0 z-10 absolute mt-1 w-44 divide-y divide-gray-100 rounded-lg bg-white shadow "}>
                <div class="px-4 py-3 text-sm text-gray-900 ">
                    <div>Ariel Benichou</div>
                    <div class="truncate font-medium">arielbenichou@nomail.net</div>
                </div>
                <ul class="py-2 text-sm text-gray-700 " aria-labelledby="avatarButton">
                    <li>
                        <a href="#" class="block px-4 py-2 hover:bg-gray-100 ">Settings</a>
                    </li>
                </ul>
                <div class="py-1">
                    <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 ">Sign out</a>
                </div>
            </div>
        </div>
    );
}

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

