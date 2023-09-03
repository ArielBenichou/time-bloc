import { Component, createSignal } from 'solid-js';
import type { Dayjs } from 'dayjs';

interface Slot {
    id: number;
    name: string;
    hoursNeeded: number;
    hoursBooked: number;
    color: string;
}

const SlotsManager: Component<{ currentWeek: Dayjs }> = (props) => {
    const [slots, setSlots] = createSignal<Slot[]>([
        // Add more calendar events as needed
        {
            id: 1,
            name: 'Math',
            hoursNeeded: 15,
            hoursBooked: 1,
            color: '#F45866',
        },
        {
            id: 2,
            name: 'Drawing',
            hoursNeeded: 5,
            hoursBooked: 1,
            color: '#C45AB3',
        },
        {
            id: 3,
            name: 'Workout',
            hoursNeeded: 5,
            hoursBooked: 2,
            color: '#9CEC5B',
        },
        // Add more slots as needed
    ]);

    const [showAddPopup, setShowAddPopup] = createSignal(false);
    const [newSlotName, setNewSlotName] = createSignal('');
    const [newSlotColor, setNewSlotColor] = createSignal('#000000');
    const [newSlotHoursNeeded, setNewSlotHoursNeeded] = createSignal(1);

    const addNewSlot = () => {
        const newSlotId = slots().length + 1;
        const newSlot: Slot = {
            id: newSlotId,
            name: newSlotName(),
            hoursNeeded: newSlotHoursNeeded(),
            hoursBooked: 0,
            color: newSlotColor(),
        };
        setSlots(prevSlots => [...prevSlots, newSlot]);
        setShowAddPopup(false);
        setNewSlotName('');
        setNewSlotHoursNeeded(1);
        setNewSlotColor('#000000');
    };

    return (
        <>
            <h2 class="text-xl font-semibold mb-4">Slot Assignment</h2>
            <div class="overflow-scroll max-h-full">
                {Array(5).fill(slots()).flat().map(slot => (
                    <div class="border border-gray-300 mb-2 flex" >
                        <div style={{ "background-color": slot.color }} class="w-2" />
                        <div class="flex flex-col p-2">
                            <div class="font-semibold">{slot.name}</div>
                            <div class="text-gray-500">{slot.hoursBooked}h / {slot.hoursNeeded}h</div>
                            {/* Here you can implement drag and drop logic to assign slots to the calendar */}
                            {/* You can also include configuration options for the slot */}
                        </div>
                    </div>
                ))}
            </div>
            <button
                class="mt-4 px-4 py-2 text-white bg-green-500 hover:bg-green-600 rounded"
                onClick={() => setShowAddPopup(true)}
            >
                Add New Slot
            </button>

            {showAddPopup() && (
                <div class="fixed top-0 left-0 w-screen h-screen bg-gray-800 bg-opacity-50 flex items-center justify-center">
                    <div class="bg-white p-6 rounded shadow-md">
                        <h3 class="text-lg font-semibold mb-2">Add New Slot</h3>
                        <input
                            class="border border-gray-300 px-2 py-1 mb-2 w-full"
                            type="text"
                            placeholder="Slot Name"
                            value={newSlotName()}
                            onInput={(e: any) => setNewSlotName(e.target.value)}
                        />
                        <input
                            class="border border-gray-300 px-2 py-1 mb-2 w-full"
                            type="number"
                            placeholder="Hours Needed"
                            value={newSlotHoursNeeded()}
                            onInput={(e: any) => setNewSlotHoursNeeded(Number(e.target.value))}
                        />
                        <label class="block mb-2">Slot Color:</label>
                        <input
                            class="border border-gray-300 px-2 py-1 mb-2 w-full"
                            type="color"
                            value={newSlotColor()}
                            onInput={(e: any) => setNewSlotColor(e.target.value)}
                        />
                        <button
                            class="px-4 py-2 text-white bg-green-500 hover:bg-green-600 rounded"
                            onClick={addNewSlot}
                        >
                            Add Slot
                        </button>
                        <button
                            class="ml-2 px-2 py-1 text-gray-500 hover:text-gray-700"
                            onClick={() => setShowAddPopup(false)}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default SlotsManager;

