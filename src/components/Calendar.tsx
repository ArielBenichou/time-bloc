import { createSignal } from 'solid-js';
import type { Component } from 'solid-js';
import dayjs, { Dayjs } from 'dayjs';

interface CalendarEvent {
    id: number;
    title: string;
    startTime: string; // ISO 8601 format (e.g., "2023-08-22T10:00:00.000Z")
    endTime: string;   // ISO 8601 format (e.g., "2023-08-22T11:00:00.000Z")
    color: string; // HEX
}

const Calendar: Component<{ currentWeek: Dayjs }> = (props) => {
    const [calendarEvents, setCalendarEvents] = createSignal<CalendarEvent[]>([
        {
            id: 1,
            title: 'Math',
            startTime: '2023-08-22T10:00:00.000Z',
            endTime: '2023-08-22T11:00:00.000Z',
            color: '#F45866'
        }, {
            id: 2,
            title: 'Drawing',
            startTime: '2023-08-22T11:00:00.000Z',
            endTime: '2023-08-22T12:00:00.000Z',
            color: '#C45AB3'
        }, {
            id: 3,
            title: 'Workout',
            startTime: '2023-08-23T18:00:00.000Z',
            endTime: '2023-08-23T19:00:00.000Z',
            color: '#9CEC5B'
        }, {
            id: 4,
            title: 'Workout',
            startTime: '2023-08-24T18:00:00.000Z',
            endTime: '2023-08-24T19:00:00.000Z',
            color: '#9CEC5B'
        },



        // Add more calendar events as needed
    ]);

    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return (
        <div class="border border-gray-300 h-full rounded overflow-scroll">
            <div class="grid grid-cols-8">
                <div class="border border-gray-300" >
                    <div class="m-2 flex flex-col">
                        <div class="text-lg font-semibold">day</div>
                        <div class="text-gray-500">hours</div>
                    </div>
                </div>

                {daysOfWeek.map((day, index) => {
                    const dayDate = props.currentWeek.add(index, 'day');
                    return (
                        <div class="border border-gray-300" >
                            <div class="m-2 flex flex-col">
                                <div class="text-lg font-semibold">{day}</div>
                                <div class="text-gray-500">{dayDate.format('MMM D')}</div>
                            </div>
                        </div>
                    )
                })}
            </div>

            {Array.from({ length: 24 }).map((_: any, hour: number) => (
                <div class="grid grid-cols-8">
                    <div class="h-10 border border-gray-300 flex items-center pl-1 pr-2">
                        {hour}:00
                    </div>
                    {daysOfWeek.map((day, index) => {
                        const dayDate = props.currentWeek.add(index, 'day');
                        return (
                            <div class="h-10 border border-gray-300" >
                                {calendarEvents().map(event => {
                                    const eventStartTime = dayjs(event.startTime);
                                    const eventEndTime = dayjs(event.endTime);
                                    if (
                                        eventStartTime.isSame(dayDate, 'day') &&
                                        eventStartTime.hour() <= hour &&
                                        eventEndTime.hour() > hour
                                    ) {
                                        return (
                                            <div
                                                class="h-10 p-1 rounded text-sm cursor-pointer"
                                                style={{ "background-color": event.color }}
                                            >
                                                {event.title}
                                            </div>
                                        );
                                    }
                                    return null;
                                })}
                            </div>
                        );
                    })}
                </div>
            ))}
        </div>
    );
    return (
        <div class="border border-gray-300 grid grid-cols-8 h-full overflow-scroll rounded">
            { /* TODO: change the rendering to be row based, so we can stick the top one to top */}
            {/* Leftmost column for hours */}
            <div class="border border-gray-300" >
                <div class="m-2 flex flex-col">
                    <div class="text-lg font-semibold">day</div>
                    <div class="text-gray-500">hours</div>
                </div>
                {/* Render hour slots */}
                {Array.from({ length: 24 }).map((_, hour) => (

                    <div class="h-10 border-t border-gray-300 flex items-center pl-1 pr-2">
                        {hour}:00
                    </div>
                ))}
            </div>
            {daysOfWeek.map((day, index) => {
                const dayDate = props.currentWeek.add(index, 'day');
                return (
                    <div class="border border-gray-300" >
                        <div class="m-2 flex flex-col">
                            <div class="text-lg font-semibold">{day}</div>
                            <div class="text-gray-500">{dayDate.format('MMM D')}</div>
                        </div>
                        {/* Render hour slots */}
                        {Array.from({ length: 24 }).map((_, hour) => (
                            <div class="h-10 border-t border-gray-300" >
                                {calendarEvents().map(event => {
                                    const eventStartTime = dayjs(event.startTime);
                                    const eventEndTime = dayjs(event.endTime);
                                    if (
                                        eventStartTime.isSame(dayDate, 'day') &&
                                        eventStartTime.hour() <= hour &&
                                        eventEndTime.hour() > hour
                                    ) {
                                        return (
                                            <div
                                                class="h-10 p-1 rounded text-sm cursor-pointer"
                                                style={{ "background-color": event.color }}
                                            >
                                                {event.title}
                                            </div>
                                        );
                                    }
                                    return null;
                                })}
                            </div>
                        ))}
                    </div>
                );
            })}
        </div>
    );
};

export default Calendar;

