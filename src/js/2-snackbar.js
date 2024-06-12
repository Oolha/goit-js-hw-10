import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";



const promiseForm = document.querySelector(".form");
promiseForm.addEventListener('submit', createPromise);

function createPromise(e) {
    e.preventDefault();
    const delay = e.target.delay.value;
    const state = e.target.state.value;

    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
          if (state === 'fulfilled') {
            resolve(delay);
          } else {
            reject(delay);
          }
        }, delay);
    });
    
    promise
        .then(delay => {
            console.log(`✅ Fulfilled promise in ${delay}ms`);
            iziToast.success({
                message: `Fulfilled promise in ${delay}ms`,
                messageSize: '16px',
              messageColor: '#fff',
              backgroundColor: '#59a10d',
              position: "topRight",
              close: true,
            });
        })
        .catch(delay => {
            console.log(`❌ Rejected promise in ${delay}ms`);
            iziToast.error({
            message: `Rejected promise in ${delay}ms`,
            messageSize: '16px',
              messageColor: '#fff',
              backgroundColor: '#ef4040',
              position: "topRight",
              close: true,
            });
        });
    }