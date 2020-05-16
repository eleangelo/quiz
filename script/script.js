'use strict';
document.addEventListener('DOMContentLoaded', () => {

    const btnOpenModal = document.getElementById('btnOpenModal'),
        modalBlock = document.getElementById('modalBlock'),
        modalWrap = document.querySelector('.modal'),
        closeModal = document.getElementById('closeModal'),
        rquestionTitle = document.getElementById('question'),
        formAnswers = document.getElementById('formAnswers'),
        burgerBtn = document.getElementById('burger');
        

    let clientWidth = document.documentElement.clientWidth; 

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

    btnOpenModal.addEventListener('click', () => {
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
        }
    
    })

    const playTest = () => {
        const renderQuestions = () => {
            rquestionTitle.textContent = 'Какого цвета бургерг вы хотите?';

            const name = 'Стандарт',
                image = './image/burger.png';
                


            formAnswers.innerHTML = `
            <div class="answers-item d-flex flex-column">
                <input type="radio" id="answerItem1" name="answer" class="d-none">
                <label for="answerItem1" class="d-flex flex-column justify-content-between">
                <img class="answerImg" src="${image}" alt="burger">
                <span>${name}</span>
                </label>
            </div>
            
            `
            
        }

        renderQuestions();
    }













})

