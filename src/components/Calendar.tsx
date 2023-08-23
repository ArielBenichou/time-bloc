import { createSignal } from 'solid-js';
import type { Component } from 'solid-js';
import dayjs, { Dayjs } from 'dayjs';

interface CalendarEvent {
    id: number;
    title: string;
    startTime: string; // ISO 8601 format (e.g., "2023-08-22T10:00:00.000Z")
    endTime: string;   // ISO 8601 format (e.g., "2023-08-22T11:00:00.000Z")
}

const Calendar: Component<{ currentWeek: Dayjs }> = (props) => {
    const [calendarEvents, setCalendarEvents] = createSignal<CalendarEvent[]>([
        {
            id: 1,
            title: 'Meeting with Team',
            startTime: '2023-08-22T10:00:00.000Z',
            endTime: '2023-08-22T11:00:00.000Z',
        },
        // Add more calendar events as needed
    ]);

    const [draggingEvent, setDraggingEvent] = createSignal<CalendarEvent | null>(null);
    const [isDragging, setIsDragging] = createSignal(false);

    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    const handleDragStart = (event: CalendarEvent) => {
        setDraggingEvent(event);
        setIsDragging(true);
    };

    const handleDrag = (event: MouseEvent) => {
        if (isDragging() && draggingEvent()) {
            // Update event start and end times based on cursor position
            // Implement snapping behavior to time slots
        }
    };

    const handleDragEnd = () => {
        if (draggingEvent()) {
            // Update the event data in the calendarEvents signal
            // Reset dragging state
        }
    };

    return (
        <div class="border border-gray-300 rounded p-4 h-full overflow-scroll" onMouseMove={handleDrag} onMouseUp={handleDragEnd}>
            <h2 class="text-xl font-semibold mb-4">Calendar</h2>
            <div class="grid grid-cols-7 gap-4">
                {daysOfWeek.map((day, index) => {
                    const dayDate = props.currentWeek.add(index, 'day');
                    return (
                        <div class="border border-gray-300 p-2" >
                            <div class="text-lg font-semibold mb-2">{day}</div>
                            <div class="text-gray-500 mb-2">{dayDate.format('ddd, MMM D')}</div>
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
                                                    class="bg-blue-200 h-10 p-1 rounded text-sm cursor-pointer"

                                                    onMouseDown={() => handleDragStart(event)}
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
        </div>
    );
};

export default Calendar;

