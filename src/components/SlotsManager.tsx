import { Component, For, children, createSignal, onCleanup, onMount } from 'solid-js';
import type { Dayjs } from 'dayjs';

type Slot = {
    id: number;
    name: string;
    hoursNeeded: number;
    hoursBooked: number;
    defaultBlockTime: number;
    color: string;
};

type CreateSlot = Omit<Slot, 'id' | 'hoursBooked'>

const SlotsManager: Component<{ currentWeek: Dayjs }> = (props) => {
    const [isModalOpen, setIsModalOpen] = createSignal(false);
    const [slots, setSlots] = createSignal<Slot[]>([
        // Add more calendar events as needed
        {
            id: 1,
            name: 'Math',
            hoursNeeded: 15,
            hoursBooked: 1,
            defaultBlockTime: 1,
            color: '#F45866',
        },
        {
            id: 2,
            name: 'Drawing',
            hoursNeeded: 5,
            hoursBooked: 1,
            defaultBlockTime: 0.5,
            color: '#C45AB3',
        },
        {
            id: 3,
            name: 'Workout',
            hoursNeeded: 5,
            hoursBooked: 2,
            defaultBlockTime: 0.25,
            color: '#9CEC5B',
        },
        // Add more slots as needed
    ]);
    // if this is -1 that mean this is not selected
    const [selectedSlotId, setSelectedSlotId] = createSignal<Slot["id"]>(-1);
    const selectedSlot = () => slots().find(el => el.id === selectedSlotId());
    const isUpdateMode = () => selectedSlotId() !== -1;

    const openUpdateModal = (slotId: number) => {
        setSelectedSlotId(slotId);
        setIsModalOpen(true);
    }


    const closeModal = () => {
        setIsModalOpen(false);
        if (isUpdateMode()) {
            setSelectedSlotId(-1);
        }
    }


    const addNewSlot = (data: CreateSlot) => {
        const newSlotId = slots().length + 1;
        const newSlot: Slot = {
            id: newSlotId,
            name: data.name,
            hoursNeeded: data.hoursNeeded,
            hoursBooked: 0,
            defaultBlockTime: data.defaultBlockTime,
            color: data.color,
        };
        setSlots(prevSlots => [...prevSlots, newSlot]);
        setIsModalOpen(false);
    };

    const updateSlot = (data: Slot) => {
        setSlots(prevSlots => prevSlots.map(slot => {
            if (slot.id === data.id) {
                return {
                    id: data.id,
                    name: data.name,
                    hoursNeeded: data.hoursNeeded,
                    hoursBooked: data.hoursBooked,
                    defaultBlockTime: data.defaultBlockTime,
                    color: data.color,
                };
            }
            return slot;
        }));
        setIsModalOpen(false);
        setSelectedSlotId(-1);
    }

    return (
        <>
            <h2 class="text-xl font-semibold">Slot Assignment</h2>
            <div class="flex flex-col gap-2 overflow-scroll no-scrollbar max-h-full">
                {slots().map(slot => (
                    <Slot slot={slot} onClick={openUpdateModal} />
                ))}
            </div>

            <Button callback={() => setIsModalOpen(true)}>
                Add New Slot
            </Button>

            <Button callback={() => console.log("TODO")} color='ORANGE'>
                Save
            </Button>

            {isModalOpen() && <SlotModal
                isUpdateMode={isUpdateMode()}
                defaultValue={{
                    name: selectedSlot()?.name ?? "",
                    hoursNeeded: selectedSlot()?.hoursNeeded ?? 0,
                    color: selectedSlot()?.color ?? "#000000",
                    defaultBlockTime: selectedSlot()?.defaultBlockTime ?? 1,
                }}
                onCancel={closeModal}
                onSubmit={(data) => isUpdateMode() ? updateSlot({ ...selectedSlot() as Slot, ...data }) : addNewSlot(data)}
            />}
        </>
    );
};


const Slot: Component<{ slot: Slot, onClick: (id: Slot["id"]) => void }> = (props) => {
    return (
        <div class="border border-gray-300 bg-white drop-shadow flex cursor-pointer" onClick={() => props.onClick(props.slot.id)} >
            <div style={{ "background-color": props.slot.color }} class="w-2" />
            <div class="flex flex-col p-2">
                <div class="font-semibold">{props.slot.name}</div>
                <div class="text-gray-500">{props.slot.hoursBooked}h / {props.slot.hoursNeeded}h [{props.slot.defaultBlockTime}h]</div>
                {/* Here you can implement drag and drop logic to assign slots to the calendar */}
                {/* You can also include configuration options for the slot */}
            </div>
        </div>
    );
}


const SlotModal: Component<{
    onCancel: Function,
    onSubmit: (args: CreateSlot) => void,
    defaultValue: CreateSlot,
    isUpdateMode: boolean
}> = (props) => {
    let ref: HTMLDivElement;

    const [newSlotName, setNewSlotName] = createSignal(props.defaultValue.name);
    const [newSlotBlockTime, setNewSlotBlockTime] = createSignal(props.defaultValue.defaultBlockTime);
    const [newSlotColor, setNewSlotColor] = createSignal(props.defaultValue.color);
    const [newSlotHoursNeeded, setNewSlotHoursNeeded] = createSignal(props.defaultValue.hoursNeeded);

    const handleClick = (event: MouseEvent) => {
        if (!ref.contains((event as any).target)) {
            props.onCancel();
        };
    };

    const handleSubmit = () => {
        props.onSubmit({
            name: newSlotName(),
            hoursNeeded: newSlotHoursNeeded(),
            defaultBlockTime: newSlotBlockTime(),
            color: newSlotColor(),
        });

        setNewSlotName('');
        setNewSlotHoursNeeded(1);
        setNewSlotBlockTime(1);
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
                <h3 class="text-lg font-semibold mb-2">{props.isUpdateMode ? "Edit Slot" : "Add New Slot"}</h3>
                <div class="flex flex-row gap-2">
                    { /* TODO: basis not working */}
                    <input
                        class="border border-gray-300 px-2 py-1 basis-2/3"
                        type="text"
                        placeholder="Slot Name"
                        value={newSlotName()}
                        onInput={(e: any) => setNewSlotName(e.target.value)}
                    />
                    <input
                        class="border border-gray-300 px-2 py-1 basis-1/3"
                        type="number"
                        placeholder="Hours Needed"
                        min={0}
                        step={0.25}
                        value={newSlotHoursNeeded()}
                        onInput={(e: any) => setNewSlotHoursNeeded(Number(e.target.value))}
                    />
                </div>

                <div class="flex flex-row items-center gap-2">
                    <label class="block">Slot Color:</label>
                    <ButtonGroup options={{ 0.25: "15m", 0.5: "30m", 1: "1h" }} selected={newSlotBlockTime()} onSelect={setNewSlotBlockTime} />
                </div>

                <div class="flex flex-row items-center gap-2">
                    <label class="block">Slot Color:</label>
                    <input
                        class="px-2 py-1 rounded-full "
                        type="color"
                        value={newSlotColor()}
                        onInput={(e: any) => setNewSlotColor(e.target.value)}
                    />
                </div>
                <div class="flex flex-row justify-between">
                    <Button
                        color={props.isUpdateMode ? "ORANGE" : "GREEN"}
                        callback={() => handleSubmit()}
                    >
                        {props.isUpdateMode ? "Update Slot" : "Create Slot"}
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

// TOOD: make this generic, so that the selected can only be a keyof the options, and the val is not any but the valuesof options
const ButtonGroup: Component<{
    options: Record<any, string>,
    selected: any,
    onSelect: (val: any) => void
}> = (props) => {
    const [active, setActive] = createSignal(props.selected);
    const handleSelect = (key: string) => {
        setActive(key);
        props.onSelect(key);
    }
    //TODO: bug with the display of selected time block
    return (
        <div class="inline-flex rounded-md shadow-sm">
            <For each={Object.keys(props.options)}>
                {(key, idx) => {
                    const rounded = idx() === 0 ? "rounded-l-md" : idx() === Object.keys(props.options).length - 1 ? "rounded-r-md" : "";
                    const color = key === active() ? "text-blue-700 bg-slate-100" : "text-gray-900 bg-white hover:text-blue-700";
                    return (<a
                        class={["px-4 py-2 text-sm font-medium border border-gray-200 hover:bg-gray-100 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700", rounded, color].join(" ")}
                        onClick={() => handleSelect(key)}
                    >
                        {props.options[key]}
                    </a>)
                }}
            </For>
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

