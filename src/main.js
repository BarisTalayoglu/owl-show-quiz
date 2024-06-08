document.addEventListener("DOMContentLoaded", () => {
    const addQuestionButton = document.getElementById("add-question");
    const importQuestionsButton = document.getElementById("import-questions");
    const exportQuestionsButton = document.getElementById("export-questions");
    const resetButton = document.getElementById("reset");

    if (addQuestionButton) addQuestionButton.addEventListener("click", addQuestion);
    if (importQuestionsButton) importQuestionsButton.addEventListener("click", importQuestions);
    if (exportQuestionsButton) exportQuestionsButton.addEventListener("click", exportQuestions);
    if (resetButton) resetButton.addEventListener("click", resetAll);

    loadSettings();
});

function loadSettings() {
    fetch('appsettings.js')
        .then(response => response.json())
        .then(data => {
            console.log('Settings loaded:', data);
        });
}

function addQuestion() {
    const question = prompt("Enter the question:");
    const answer = prompt("Enter the answer:");
    if (question && answer) {
        const questions = JSON.parse(localStorage.getItem('questions')) || [];
        questions.push({ question, answer });
        localStorage.setItem('questions', JSON.stringify(questions));
        alert('Question added successfully!');
    } else {
        alert('Question and Answer cannot be empty.');
    }
}

function importQuestions() {
    const bulkImport = document.getElementById("bulk-import").value;
    try {
        const questions = JSON.parse(bulkImport);
        localStorage.setItem('questions', JSON.stringify(questions));
        alert('Questions imported successfully!');
    } catch (e) {
        alert("Invalid JSON format");
    }
}

function exportQuestions() {
    const questions = localStorage.getItem('questions') || '[]';
    const blob = new Blob([questions], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'questions.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

function resetAll() {
    localStorage.clear();
    alert("All data has been reset");
}
