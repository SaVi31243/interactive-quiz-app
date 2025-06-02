let selectedTestId;
let questions = [];
let currentQuestionIndex = 0;
let score = 0;
let trueCount = 0;
let falseCount = 0;
function goHome() {
    window.location.href = "/index.html";
}

async function fetchTests() {
    try {
        const res = await fetch("http://localhost:8080/api/tests");
        if (!res.ok) {
            throw new Error("Помилка отримання тестів");
        }

        const tests = await res.json();
        const select = document.getElementById("testSelect");

        tests.forEach(test => {
            const opt = document.createElement("option");
            opt.value = test.id;
            opt.textContent = test.title;
            select.appendChild(opt);
        });
    } catch (error) {
        alert("⚠️ Не вдалося завантажити тести: " + error.message);
    }
}

function startTest() {
    const selectedTestId = document.getElementById("testSelect").value;
    if (!selectedTestId) {
        alert("⚠️ Спочатку оберіть тест!");
        return;
    }

    localStorage.setItem("selectedTestId", selectedTestId);
    window.location.href = "/pages/take-test.html";
}

// Завантаження при запуску сторінки
window.addEventListener("DOMContentLoaded", fetchTests);