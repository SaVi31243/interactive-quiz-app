let questionCount = 0;

function addQuestion() {
    if (questionCount >= 12) {
        alert("Максимум 12 питань");
        return;
    }

    const container = document.getElementById("questions");
    const qid = `q${questionCount}`;
    const block = document.createElement("div");
    block.className = "question-block";

    block.innerHTML = `
        <input id="${qid}_text" placeholder="Текст питання ${questionCount + 1}" />
        <input id="${qid}_opt0" placeholder="Варіант 1" />
        <input id="${qid}_opt1" placeholder="Варіант 2" />
        <input id="${qid}_opt2" placeholder="Варіант 3" />
        <input id="${qid}_opt3" placeholder="Варіант 4" />
        <label>Правильна відповідь:
            <select id="${qid}_correct">
                <option value="0">Варіант 1</option>
                <option value="1">Варіант 2</option>
                <option value="2">Варіант 3</option>
                <option value="3">Варіант 4</option>
            </select>
        </label>
    `;

    container.appendChild(block);
    questionCount++;
}

async function submitTest() {
    const title = document.getElementById("testTitle").value.trim();
    const description = document.getElementById("testDescription").value.trim();

    if (!title || !description) {
        alert("⚠️ Заповніть назву та опис тесту");
        return;
    }

    const testRes = await fetch("http://localhost:8080/api/tests", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Basic " + btoa("admin:admin123")
        },
        body: JSON.stringify({ title, description })
    });

    if (!testRes.ok) {
        alert("❌ Помилка створення тесту");
        return;
    }

    const test = await testRes.json();
    const testId = test.id;

    for (let i = 0; i < questionCount; i++) {
        const text = document.getElementById(`q${i}_text`).value.trim();
        const options = [
            document.getElementById(`q${i}_opt0`).value.trim(),
            document.getElementById(`q${i}_opt1`).value.trim(),
            document.getElementById(`q${i}_opt2`).value.trim(),
            document.getElementById(`q${i}_opt3`).value.trim()
        ];
        const correctIndex = parseInt(document.getElementById(`q${i}_correct`).value);
        const correctAnswer = options[correctIndex];

        if (!text || options.some(opt => !opt)) {
            alert(`⚠️ Заповніть усі поля питання №${i + 1}`);
            return;
        }

        await fetch("http://localhost:8080/api/questions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Basic " + btoa("admin:admin123")
            },
            body: JSON.stringify({ testId, text, options, correctAnswer })
        });
    }

    alert("✅ Тест успішно створено");
    window.location.href = "admin.html";
}

// Додаємо перше питання одразу
window.addEventListener("DOMContentLoaded", addQuestion);