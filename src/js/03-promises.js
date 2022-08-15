import { Notify } from 'notiflix/build/notiflix-notify-aio';

const form = document.querySelector('.form');
const delayStart = document.querySelector("[name='delay']");
const delayStep = document.querySelector("[name='step']");
const delayQty = document.querySelector("[name='amount']");

form.addEventListener('submit', onSubmit);

function onSubmit(evt) {
  evt.preventDefault();
  let firstDelay = Number(delayStart.value);
  const nextDelay = Number(delayStep.value);

  for (let i = 1; i <= delayQty.value; i++) {
    createPromise(i, delayStart)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    firstDelay += nextDelay;
  }
  form.reset();
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  const response = { position, delay };
  if (shouldResolve) {
    return Promise.resolve(response);
  } else {
    return Promise.reject(response);
  }
}
