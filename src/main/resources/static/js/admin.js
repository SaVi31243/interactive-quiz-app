let createdTestId = null;

function goHome() {
    window.location.href = "/index.html";
}
async function createTest() {
    const test = {
        title: document.getElementById("title").value,
        description: document.getElementById("description").value
    };

    const response = await fetch("http://localhost:8080/api/tests", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Basic " + btoa("admin:admin123")
        },
        body: JSON.stringify(test)
    });

    const data = await response.json();
    createdTestId = data.id;
    alert("✅ Створено тест з ID: " + createdTestId);
    document.getElementById("questionSection").style.display = "block"; // показати форму для питань
}

async function addQuestion() {
    if (!createdTestId) {
        alert("Спочатку створіть тест!");
        return;
    }

    const text = document.getElementById("questionText").value;
    const correct = document.getElementById("correctAnswer").value;

    const options = [
        document.getElementById("opt1").value,
        document.getElementById("opt2").value,
        document.getElementById("opt3").value,
        document.getElementById("opt4").value
    ];

    const question = {
        text: text,
        correctAnswer: correct,
        options: options
    };

    const response = await fetch(`http://localhost:8080/api/tests/${createdTestId}/questions`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Basic " + btoa("admin:admin123")
        },
        body: JSON.stringify(question)
    });

    if (response.ok) {
        alert("➕ Питання додано до тесту");
        document.getElementById("questionForm").reset();
    } else {
        alert("❌ Помилка при додаванні питання");
    }
}


async function deleteTest(id) {
    if (!confirm("Ви дійсно хочете видалити тест?")) return;
    try {
        const res = await fetch("http://localhost:8080/api/tests/" + id, {
            method: "DELETE",
            headers: { "Authorization": "Basic " + btoa("admin:admin123") }
        });
        if (res.ok) {
            alert("🗑️ Тест успішно видалено");
            loadAllTests();
        } else {
            alert("❌ Помилка при видаленні тесту");
        }
    } catch (error) {
        alert("❌ Сервер недоступний");
    }
}
async function loadAllTests() {
    const response = await fetch("http://localhost:8080/api/tests", {
        headers: {
            "Authorization": "Basic " + btoa("admin:admin123")
        }
    });
    const tests = await response.json();
    const container = document.getElementById("testList");
    container.innerHTML = "";

    tests.forEach(test => {
        const div = document.createElement("div");
        div.className = "test";
        div.innerHTML = `
                <h3>${test.title}</h3>
                <p>${test.description}</p>
                <button onclick="alert('🔧 Тут буде редагування тесту ID: ${test.id}')">✏️ Редагувати</button>
                <button onclick="alert('📊 Тут буде перегляд результатів для тесту ID: ${test.id}')">📊 Результати</button>
            `;
        container.appendChild(div);
    });
}

window.addEventListener("DOMContentLoaded", loadAllTests);

// Завантаження всіх тестів при завантаженні сторінки