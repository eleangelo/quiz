'use strict';
// Обработчик событий, который отслеживает загрузку контента
document.addEventListener('DOMContentLoaded', () => {

    const btnOpenModal = document.getElementById('btnOpenModal'),
        modalBlock = document.getElementById('modalBlock'),
        closeModal = document.getElementById('closeModal'),
        questionTitle = document.getElementById('question'),
        formAnswers = document.getElementById('formAnswers'),
        burgerBtn = document.getElementById('burger'),
        prevButton = document.getElementById('prev'),
        nextButton = document.getElementById('next'),
        modalDialog = document.querySelector('.modal-dialog');
        
        let clientWidth = document.documentElement.clientWidth; 


    // объект  содержит вопросы и ответы 
    const   questions = [
                {
                    "question": "Какого цвета бургер?",
                    "answers": [
                        {
                            "id": "cb01",
                            "title": "Стандарт",
                            "url": "./image/burger.png"
                        },
                        {
                            "id": "cb02",
                            "title": "Черный",
                            "url": "./image/burgerBlack.png"
                        }
                    ],
                    "type": "radio"
                },
                {
                    "question": "Из какого мяса котлета?",
                    "answers": [
                        {
                            "id": "cb03",
                            "title": "Курица",
                            "url": "./image/chickenMeat.png"
                        },
                        {
                            "id": "cb04",
                            "title": "Говядина",
                            "url": "./image/beefMeat.png"
                        },
                        {
                            "id": "cb05",
                            "title": "Свинина",
                            "url": "./image/porkMeat.png"
                        }
                    ],
                    "type": "radio"
                },
                {
                    "question": "Дополнительные ингредиенты?",
                    "answers": [
                        {
                            "id": "fb06",
                            "title": "Помидор",
                            "url": "./image/tomato.png"
                        },
                        {
                            "id": "cb07",
                            "title": "Огурец",
                            "url": "./image/cucumber.png"
                        },
                        {
                            "id": "cb08",
                            "title": "Салат",
                            "url": "./image/salad.png"
                        },
                        {
                            "id": "cb09",
                            "title": "Лук",
                            "url": "./image/onion.png"
                        }
                    ],
                    "type": "checkbox"
                },
                {
                    "question": "Добавить соус?",
                    "answers": [
                        {
                            "id": "cb10",
                            "title": "Чесночный",
                            "url": "./image/sauce1.png"
                        },
                        {
                            "id": "cb11",
                            "title": "Томатный",
                            "url": "./image/sauce2.png"
                        },
                        {
                            "id": "cb12",
                            "title": "Горчичный",
                            "url": "./image/sauce3.png"
                        }
                    ],
                    "type": "radio"
                }
            ]
    
    // анимация открытия модального окна
    let count = -100;

    modalDialog.style.top = count + '%';
    
    const animateModal =  () => {
        modalDialog.style.top = count + '%';
        count += 4;

        if (count < 0) {
            requestAnimationFrame(animateModal);
        }else {
            count = -100;
            
        }  

    }        
    //  условия появления кнопки бургер при уменьшении экрана меньше 768
    if (clientWidth<768) {
        burgerBtn.style.display = 'flex'
    } else {
        burgerBtn.style.display = 'none';
    }
    
    window.addEventListener('resize', function() {
        clientWidth = document.documentElement.clientWidth; 
        
        if (clientWidth<768) {
            burgerBtn.style.display = 'flex'
        } else {
            burgerBtn.style.display = 'none';
        }
    })
        
    burgerBtn.addEventListener('click', () => {
        burgerBtn.classList.add('active');
        modalBlock.classList.add('d-block');
        playTest();
    })

    // обработчики событий открытия/закрытия модального окна
    btnOpenModal.addEventListener('click', () => {
        requestAnimationFrame(animateModal);
        modalBlock.classList.add('d-block');
        burgerBtn.classList.add('active');
        playTest();
    
    })

    closeModal.addEventListener('click', () => {
        modalBlock.classList.remove('d-block');
        burgerBtn.classList.remove('active')
    })

    document.addEventListener('click', (event) => {
        if (
            !event.target.closest('.modal-dialog') &&
            !event.target.closest('.openModalButton') &&
            !event.target.closest('.burger')
            ) {
                modalBlock.classList.remove('d-block');
                burgerBtn.classList.remove('active') 
        }
    
    })

    // функция начала тестирования
    const playTest = () => {

    // переменная с номером вопроса  
        let numberQuestion = 0

        // функция рендеринга ответов
        const renderAnswers = (index) => {
            questions[index].answers.forEach((answer) => {

                const answerItem = document.createElement('div');

                answerItem.classList.add('answers-item', 'd-flex', 'ustify-content-between' );
                answerItem.innerHTML = `
                    <input type="${questions[index].type}" id="${answer.id}" name="answer" class="d-none">
                    <label for="${answer.id}" class="d-flex flex-column justify-content-between">
                    <img class="answerImg" src="${answer.url}" alt="burger">
                    <span>${answer.title}</span>
                    </label>
                `;

                formAnswers.appendChild(answerItem);
            })
        }

        // ф-ция рендеринга вопросов + ответов
        const renderQuestions = (indexQuestion) => {

            formAnswers.innerHTML = '';

            if (numberQuestion >= 0 && numberQuestion <= questions.length - 1) {
                questionTitle.textContent = `${questions[indexQuestion].question}`;
                renderAnswers(indexQuestion);
                nextButton.classList.remove('d-none');
                prevButton.classList.remove('d-none')
            }

            if (numberQuestion === 0) {
                prevButton.classList.add('d-none')
            }
            
            if (numberQuestion === questions.length) {
                nextButton.classList.add('d-none');
                formAnswers.textContent = "Спасибо"
            }
        }

        // запуск ф-ции рендеринга
        renderQuestions(numberQuestion);


        // оьбаботчики событий кнопок
        nextButton.onclick = () => {
            numberQuestion++;

            renderQuestions(numberQuestion);
            
        }
        prevButton.onclick = () => {
            
            numberQuestion--;

            renderQuestions(numberQuestion)
        }   
            
    }

   






})

