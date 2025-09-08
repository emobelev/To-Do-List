# To-Do List

A simple web-based to-do list application.  
Tasks can be added, marked as completed, and deleted. Completed tasks are automatically moved to the end of the list.

## Features

- Add new tasks
- Mark tasks as completed
- Delete tasks
- Completed tasks appear at the end
- Tasks are saved in your browser (localStorage)
- Alert if you try to add a duplicate task

## Usage

1. Open `index.html` in your browser.
2. Enter a task and click "Add" or press Enter.
3. Click the checkbox to mark a task as completed.
4. Click the delete button to remove a task.
5. If you try to add a task that already exists, you’ll see an alert.

## Styling

- Uses [Sofia Sans](https://fonts.google.com/specimen/Sofia+Sans) font from Google Fonts.
- Alternating row background for tasks.
- Completed tasks are shown with a line-through and faded color.
- **Tailwind CSS** utility classes are used for layout, spacing, borders, colors, and transitions.  
  Make sure your project includes Tailwind CSS via CDN or build tools for styles to work correctly.

### Example Tailwind CDN usage

Add this to your `<head>` in `index.html`:

```html
<link
  href="https://cdn.jsdelivr.net/npm/tailwindcss@3.4.3/dist/tailwind.min.css"
  rel="stylesheet"
/>
```

## Project Structure

```
to-do-list/
├── index.html
├── script.js
├── styles.css
└──
```
