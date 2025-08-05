const noteData = [
  {
    id: 1,
    title: "First Note",
    content: "This is the content of the first note.",
    category: "Work",
    isPinned: false,
  },
  {
    id: 2,
    title: "Task List",
    content: "Code, Read, Play video games",
    category: "Personal",
    isPinned: true,
  },
  {
    id: 3,
    title: "My Ideas",
    content: "This is the content of the note.",
    category: "",
    isPinned: false,
  },
];

function renderNotes(notes) {
  // Sort: pinned notes first
  const sortedNotes = [...notes].sort((a, b) => b.isPinned - a.isPinned);

  const bgColors = ["bg-yellow-200", "bg-red-200", "bg-blue-200", "bg-green-200", "bg-pink-200"];

  notesContainer.innerHTML = `
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      ${sortedNotes
        .map((note, index) => {
          const colorClass = bgColors[index % bgColors.length];
          return `
            <div class="${colorClass} p-4 rounded-lg shadow relative">
              <button onclick="togglePin(${note.id})" title="${note.isPinned ? "Unpin" : "Pin"}" class="absolute top-2 left-2 text-yellow-500 text-xl hover:scale-110 transition-transform">
                ${note.isPinned ? "📌" : "📍"}
              </button>
              <h3 class="font-bold text-lg mb-1">${note.title}</h3>
              <p class="text-sm text-gray-700 mb-2">${note.content}</p>
              <p class="text-xs text-gray-500 italic mb-2">${note.category || "No Category"}</p>
              <div class="flex justify-between mt-2">
                <button onclick="editNote(${note.id})" class="text-blue-600 hover:underline text-sm">Edit</button>
                <button onclick="deleteNote(${note.id})" class="text-red-600 hover:underline text-sm">Delete</button>
              </div>
            </div>
          `;
        })
        .join("")}
    </div>
  `;
}

