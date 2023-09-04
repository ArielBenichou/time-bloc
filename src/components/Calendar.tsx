import { createSignal } from 'solid-js';
import type { Component } from 'solid-js';
import dayjs, { Dayjs } from 'dayjs';
import { DAYS_OF_WEEK } from '../utils/time-and-date.util';

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
            startTime: props.currentWeek.add(1, 'day').set('hour', 14).set('minute', 0).toISOString(),
            endTime: props.currentWeek.add(1, 'day').set('hour', 15).set('minute', 0).toISOString(),
            color: '#F45866'
        }, {
            id: 2,
            title: 'Drawing',
            startTime: props.currentWeek.add(1, 'day').set('hour', 15).set('minute', 0).toISOString(),
            endTime: props.currentWeek.add(1, 'day').set('hour', 16).set('minute', 0).toISOString(),
            color: '#C45AB3'
        }, {
            id: 3,
            title: 'Workout',
            startTime: props.currentWeek.add(2, 'day').set('hour', 10).set('minute', 0).toISOString(),
            endTime: props.currentWeek.add(2, 'day').set('hour', 12).set('minute', 0).toISOString(),
            color: '#9CEC5B'
        }, {
            id: 4,
            title: 'Workout',
            startTime: props.currentWeek.add(5, 'day').set('hour', 8).set('minute', 0).toISOString(),
            endTime: props.currentWeek.add(5, 'day').set('hour', 8).set('minute', 30).toISOString(),
            color: '#9CEC5B'
        },



        // Add more calendar events as needed
    ]);

    return (
        <div class="flex flex-col flex-1 overflow-hidden border border-gray-300 rounded bg-white drop-shadow">
            <HeaderRow currentWeek={props.currentWeek} />
            <div class="flex flex-col overflow-scroll no-scrollbar">
                {Array.from({ length: 24 }).map((_: any, hour: number) => (
                    <CalendarRow calendarEvents={calendarEvents()} hour={hour} currentWeek={props.currentWeek} />
                ))}
            </div>
        </div>
    );
};


const HeaderRow: Component<{ currentWeek: Dayjs }> = (props) => {
    return (
        <div class="grid grid-cols-8 border-b-2">
            <div class="p-2 flex flex-col border border-gray-300 border-r-2 overflow-x-clip" >
                <div class="text-lg font-semibold">day</div>
                <div class="text-gray-500">hours</div>
            </div>

            {DAYS_OF_WEEK.map((day, index) => {
                const dayDate = props.currentWeek.add(index, 'day');
                return (
                    <div class="p-2 flex flex-col border border-gray-300 overflow-x-clip">
                        <div class="text-lg font-semibold">{day}</div>
                        <div class="text-gray-500">{dayDate.format('MMM D')}</div>
                    </div>
                )
            })}
        </div>
    );

}


const CalendarRow: Component<{ currentWeek: Dayjs, calendarEvents: CalendarEvent[], hour: number }> = (props) => {
    return (
        <div class="grid grid-cols-8">
            <div class="h-10 border border-gray-300 border-r-2 flex items-center pl-1 pr-2">
                {props.hour}:00
            </div>
            {DAYS_OF_WEEK.map((day, index) => {
                const dayDate = props.currentWeek.add(index, 'day');
                return (
                    <div class="h-10 border border-gray-300" >
                        {props.calendarEvents.map(event => {
                            const eventStartTime = dayjs(event.startTime);
                            const eventEndTime = dayjs(event.endTime);
                            const length = eventEndTime.diff(eventStartTime, 'hours', true);

                            if (
                                eventStartTime.isSame(dayDate, 'day') &&
                                eventStartTime.hour() <= props.hour &&
                                eventStartTime.hour() + length > props.hour) {
                                return (
                                    <div
                                        class={"p-1 rounded text-sm cursor-pointer" + (length > 0.5 ? " h-10" : " h-5")}
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
    );
}

export default Calendar;

