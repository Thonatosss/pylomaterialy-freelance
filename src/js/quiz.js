
let currentStep = 1;

function nextStep(step) {
    document
        .querySelector(`.step${currentStep}`)
        .classList.remove('active');
    currentStep = step;
    updateStepCounter();
    document.querySelector(`.step${currentStep}`).classList.add('active');
}
function prevStep(step) {
    document
        .querySelector(`.step${currentStep}`)
        .classList.remove('active');
    currentStep = step;
    updateStepCounter();
    document.querySelector(`.step${currentStep}`).classList.add('active');
}
function updateAreaValue(value) {
    document.getElementById('areaValue').innerText = value;
}
function updateStepCounter() {
    document.getElementById(
        'stepCounter'
    ).innerText = `Крок ${currentStep}/4`;
}
function submitForm() {
    // Отримайте значення з форми і обробіть їх за потреби
    const formData = {
        name: document.getElementById('name').value,
        phone: document.getElementById('phone').value,
        material: document.querySelector('input[name="material"]:checked')
            .value,
        area: document.getElementById('areaRange').value,
        systems: document.getElementById('oblast').value,
        // workTypes: Array.from(
        //     document.querySelectorAll('input[name="workTypes"]:checked')
        // ).map(input => input.value),
    };
    // Отримати токен та чат_id зі свого бота в телеграмі
    const TOKEN = '6329427978:AAFOj3i01rpAlPlFMIO-yGx_nLjMnKjysjk';
    const CHAT_ID = '-1002109092194';
    const URL = `https://api.telegram.org/bot${TOKEN}/sendMessage`;
    // Створити текстовий повідомлення з отриманими даними
    let message = `Заявка з сайту!\n\n`;
    message += `Ім'я: ${formData.name}\n`;
    message += `Номер телефону: ${formData.phone}\n`;
    message += `Пиломатеріал: ${formData.material}\n`;
    message += `Кількість кубів: ${formData.area}\n`;
    message += `Область: ${formData.systems}\n`;
    // message += `Типи робіт: ${formData.workTypes.join(', ')}\n`;
    // Відправити повідомлення в телеграм
    fetch(URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            chat_id: CHAT_ID,
            parse_mode: 'html',
            text: `${message}`,
        }),
    })
        .then(response => {
            window.location.href = 'index.html';
            formData.area = '';
            formData.material = '';
            formData.name = '';
            formData.phone = '';
            formData.systems = '';
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            document.getElementById('areaRange').value = 0; // Скинути значення площі
            document
                .querySelectorAll('input[name="objectType"]')
                .forEach(input => (input.checked = false));
            document
                .querySelectorAll('input[name="systems"]')
                .forEach(input => (input.checked = false));
            document
                .querySelectorAll('input[name="workTypes"]')
                .forEach(input => (input.checked = false));
            hideAllSteps();
            resetForm(); // Очистити форму або виконати інші дії
            currentStep = 1;
            updateStepCounter();
            document.querySelector('.step1').classList.add('active');
        })
        .catch(error => {
            console.log(error);
        });
}
function resetForm() {
    // Очистити дані форми або виконати інші дії для скидання форми
    document.getElementById('areaRange').value = 0;
    document
        .querySelectorAll('input[name="objectType"]')
        .forEach(input => (input.checked = false));
    document
        .querySelectForAll('input[name="systems"]')
        .forEach(input => (input.checked = false));
    document
        .querySelectorAll('input[name="workTypes"]')
        .forEach(input => (input.checked = false));
}
function hideAllSteps() {
    // Приховати всі кроки форми
    const formSteps = document.querySelectorAll('.form-step');
    formSteps.forEach(step => {
        step.classList.remove('active');
    });
}
document.addEventListener('DOMContentLoaded', function () {
    const quizImages = document.querySelectorAll('.quiz-img');
    quizImages.forEach(function (image) {
        image.addEventListener('click', function () {
            if (currentStep === 1) {
                // Якщо це перший крок, обирайте тільки одне фото
                quizImages.forEach(function (otherImage) {
                    otherImage.classList.remove('selected');
                });
                image.classList.add('selected');
            } else if (currentStep === 3 || currentStep === 4) {
                // Якщо це третій або четвертий крок, дозвольте обирати декілька фото
                image.classList.toggle('selected');
            }
        });
    });
});
