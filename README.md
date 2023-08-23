# TimeBloc: Calendar Task Manager

TimeBloc is a web application built using SolidJS that integrates with Google Calendar to help you efficiently manage your time and build a well-organized schedule. With TimeBloc, you can easily allocate time slots for various tasks, track your activities, and maintain a productive routine.

## Features

- **Calendar View:** TimeBloc provides a Google Calendar-like view where you can see your scheduled tasks and activities for each day of the week.

- **Drag and Drop:** You can easily assign time slots for tasks by dragging and dropping them onto the calendar. TimeBloc will automatically update the start and end times based on your actions.

- **Slot Assignment:** On the right side of the calendar, you can manage your time slots. You can add new slots, edit existing ones, specify the name of the task, the hours needed, and even choose a color for better organization.

- **Week Navigation:** TimeBloc allows you to navigate through weeks using chevron buttons at the top of the calendar. You can move to the previous or next week to plan your activities effectively.

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/your-username/timebloc.git
cd timebloc
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:3000` to access TimeBloc.

## Usage

1. Upon launching TimeBloc, you'll see the main screen divided into two sections:
- The left side displays the calendar with slots for each hour of the day. You can drag and drop tasks onto the calendar to schedule them.
- The right side shows the slot management section, where you can view and edit your time slots.

2. To add a new time slot, click the "Add New Slot" button in the slot management section. A popup will appear allowing you to input the slot name, hours needed, and select a color.

3. To edit an existing time slot, click on the slot in the slot management section. The same popup will appear, allowing you to edit the slot details.

4. Navigate through weeks using the chevron buttons at the top to plan your schedule ahead.

## Technologies Used

- SolidJS: A declarative JavaScript library for building user interfaces.
- Dayjs: A fast and lightweight date manipulation library.
- Tailwind CSS: A utility-first CSS framework for styling the application.
- Google Calendar API.

## Contributing

Contributions are welcome! If you have suggestions, improvements, or bug fixes, feel free to open an issue or submit a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
