let selectedTestId = localStorage.getItem("selectedTestId");
let questions = [];
let currentQuestionIndex = 0;
let score = 0;
let trueCount = 0;
let falseCount = 0;

if (!selectedTestId) {
    document.getElementById("quiz-container").innerHTML =
        "❌ Тест не вибрано. Перейдіть на сторінку зі списком тестів.";
} else {
    fetchQuestions();
}

async function fetchQuestions() {
    try {
        const res = await fetch(`/api/tests/${selectedTestId}/questions`);
        if (!res.ok) throw new Error("Response not OK");
        const data = await res.json();

        // Тепер просто користуємося «плоским» масивом, який повернув бекенд:
        questions = data;

        console.log("Прийшло з бекенду (data):", data);
        console.log("Масив questions:", questions);
        console.log("Кількість питань:", questions.length);

        if (!questions || questions.length === 0) {
            document.getElementById("quiz-container").innerHTML =
                "❌ У цьому тесті немає питань.";
            return;
        }

        renderAllQuestions();
    } catch (error) {
        console.error("Error fetching questions:", error);
        document.getElementById("quiz-container").innerHTML =
            "❌ Не вдалося завантажити питання.";
    }
}

function renderAllQuestions() {
    const container = document.getElementById("quiz-container");
    container.innerHTML = ""; // очистимо перед рендером

    // Для кожного питання формуємо свою «сторінку»
    questions.forEach((question, qIdx) => {
        let html = `
        <div style="
            margin-bottom: 20px;
            padding: 16px;
            border: 1px solid #ddd;
            border-radius: 6px;
            background-color: #fafafa;
        ">
            <h2>Питання ${qIdx + 1} з ${questions.length}</h2>
            <p>${question.text}</p>
        `;

        // Додаємо варіанти відповідей
        question.options.forEach((option) => {
            html += `
            <label style="display: block; margin: 6px 0; cursor: pointer; font-size: 15px;">
                <input
                    type="radio"
                    name="q-${qIdx}"
                    value="${option}"
                /> ${option}
            </label>
            `;
        });

        html += `
            <button id="next-btn-${qIdx}" style="
                margin-top: 12px;
                padding: 8px 12px;
                background-color: #007bff;
                color: white;
                border: none;
                border-radius: 4px;
                cursor: pointer;
            ">Далі</button>
        </div>
        `;
        container.insertAdjacentHTML("beforeend", html);

        // Спочатку показуємо лише перше питання
        if (qIdx !== 0) {
            document.querySelector(`[id="next-btn-${qIdx}"]`).parentElement.style.display = "none";
        }
    });

    // Повʼязуємо обробники для кожної кнопки «Далі»
    questions.forEach((question, qIdx) => {
        const nextBtn = document.getElementById(`next-btn-${qIdx}`);
        nextBtn.addEventListener("click", () => {
            // Перевіряємо вибрану відповідь
            const selectedOption = document.querySelector(`input[name="q-${qIdx}"]:checked`);
            if (selectedOption) {
                if (selectedOption.value === question.correctAnswer) {
                    score++;
                    trueCount++;
                } else {
                    falseCount++;
                }
            }
            // Перехід до наступного питання або завершення
            if (qIdx + 1 < questions.length) {
                // ховаємо поточне питання
                nextBtn.parentElement.style.display = "none";
                // показуємо наступне
                document.querySelector(`[id="next-btn-${qIdx + 1}"]`).parentElement.style.display = "block";
            } else {
                //останнє питання – зберігаємо результат і переходимо на сторінку результатів
                const resultObj = {
                    testId: selectedTestId,
                    score: score,
                    total: questions.length,
                    correct: trueCount,
                    incorrect: falseCount
                };
                localStorage.setItem("lastResult", JSON.stringify(resultObj));
                window.location.href = "/pages/result.html";
            }
        });
    });
}