import { Component, children, createSignal, onCleanup, onMount } from 'solid-js';
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

    const addNewSlot = (data: { name: string, hours: number, color: string }) => {
        const newSlotId = slots().length + 1;
        const newSlot: Slot = {
            id: newSlotId,
            name: data.name,
            hoursNeeded: data.hours,
            hoursBooked: 0,
            color: data.color,
        };
        setSlots(prevSlots => [...prevSlots, newSlot]);
        setShowAddPopup(false);
    };

    return (
        <>
            <h2 class="text-xl font-semibold">Slot Assignment</h2>
            <div class="flex flex-col gap-2 overflow-scroll no-scrollbar max-h-full">
                {slots().map(slot => (
                    <Slot slot={slot} />
                ))}
            </div>

            <Button callback={() => setShowAddPopup(true)}>
                Add New Slot
            </Button>

            <Button callback={() => console.log("TODO")} color='ORANGE'>
                Save
            </Button>

            {showAddPopup() && <SlotModal
                onCancel={() => setShowAddPopup(false)}
                onSubmit={(data) => addNewSlot(data)}
            />}
        </>
    );
};


const Slot: Component<{ slot: Slot }> = (props) => {
    return (
        <div class="border border-gray-300 bg-white drop-shadow flex" >
            <div style={{ "background-color": props.slot.color }} class="w-2" />
            <div class="flex flex-col p-2">
                <div class="font-semibold">{props.slot.name}</div>
                <div class="text-gray-500">{props.slot.hoursBooked}h / {props.slot.hoursNeeded}h</div>
                {/* Here you can implement drag and drop logic to assign slots to the calendar */}
                {/* You can also include configuration options for the slot */}
            </div>
        </div>
    );
}


const SlotModal: Component<{ onCancel: Function, onSubmit: (args: { name: string, hours: number, color: string }) => void }> = (props) => {
    let ref: HTMLDivElement;

    const [newSlotName, setNewSlotName] = createSignal('');
    const [newSlotColor, setNewSlotColor] = createSignal('#000000');
    const [newSlotHoursNeeded, setNewSlotHoursNeeded] = createSignal(1);

    const handleClick = (event: MouseEvent) => {
        console.log({ target: event.target })
        if (!ref.contains((event as any).target)) {
            props.onCancel();
        };
    };

    const handleSubmit = () => {
        props.onSubmit({
            name: newSlotName(),
            hours: newSlotHoursNeeded(),
            color: newSlotColor()
        });

        setNewSlotName('');
        setNewSlotHoursNeeded(1);
        setNewSlotColor('#000000');
    }

    onMount(() => {
        document.addEventListener('click', handleClick);
    });

    onCleanup(() => {
        document.removeEventListener('click', handleClick);
    });

    return (
        <div class="fixed top-0 left-0 w-screen h-screen bg-gray-800 bg-opacity-50 flex items-center justify-center">
            <div class="bg-white p-6 rounded shadow-md flex flex-col gap-2"
                ref={ref!}
            >
                <h3 class="text-lg font-semibold mb-2">Add New Slot</h3>
                <div class="flex flex-row gap-2">
                    { /* TODO: basis not working */}
                    <input
                        class="border border-gray-300 px-2 py-1 basis-2/3 flex-grow"
                        type="text"
                        placeholder="Slot Name"
                        value={newSlotName()}
                        onInput={(e: any) => setNewSlotName(e.target.value)}
                    />
                    <input
                        class="border border-gray-300 px-2 py-1 basis-1/3"
                        type="number"
                        placeholder="Hours Needed"
                        value={newSlotHoursNeeded()}
                        onInput={(e: any) => setNewSlotHoursNeeded(Number(e.target.value))}
                    />
                </div>
                <div class="flex flex-row gap-2">
                    <label class="block mb-2">Slot Color:</label>
                    <input
                        class="px-2 py-1 rounded-full "
                        type="color"
                        value={newSlotColor()}
                        onInput={(e: any) => setNewSlotColor(e.target.value)}
                    />
                </div>
                <div class="flex flex-row justify-between">
                    <Button
                        callback={() => handleSubmit()}
                    >
                        Add Slot
                    </Button>
                    <Button
                        type='TRANSPARENT'
                        callback={() => props.onCancel()}
                    >
                        Cancel
                    </Button>
                </div>
            </div>
        </div>
    );
}


const Button: Component<{
    children: any,
    callback: Function,
    type?: "FILL" | "TRANSPARENT",
    color?: "GREEN" | "ORANGE"
}> = (props) => {
    const content = children(() => props.children);
    const [bgColor, bgHover] = (function(color): [string, string] {
        switch (color) {
            case "ORANGE":
                return ["bg-orange-500", "hover:bg-orange-600"]
            case "GREEN":
            default:
                return ["bg-green-500", "hover:bg-green-600"]
        }
    })(props.color);
    const type = props.type ?? "FILL";

    return (
        <button
            class={type === "FILL" ?
                `px-4 py-2 text-white ${bgColor} ${bgHover} rounded`
                : "px-4 py-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded"}

            onClick={() => props.callback()}
        >
            {content()}
        </button>

    );
}

export default SlotsManager;

