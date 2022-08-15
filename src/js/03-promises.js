import { Notify } from 'notiflix/build/notiflix-notify-aio';

const formData = {
  form: document.querySelector('.form'),
  delayStart: document.querySelector("[name='delay']"),
  delayStep: document.querySelector("[name='step']"),
  delayQty: document.querySelector("[name='amount']"),
};

formData.form.addEventListener('submit', onSubmit);

function onSubmit(evt) {
  evt.preventDefault();
  let firstDelay = Number(formData.delayStart.value);
  const nextDelay = Number(formData.delayStep.value);

  for (let i = 1; i <= formData.delayQty.value; i++) {
    createPromise(i, firstDelay)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    firstDelay += nextDelay;
  }
  formData.form.reset();
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    const response = { position, delay };
    setTimeout(() => {
      if (shouldResolve) {
        resolve(response);
      } else {
        reject(response);
      }
    }, delay);
  });
}
