const likeButtons = document.querySelectorAll('[data-type-button="like"]');

likeButtons.forEach((btn) =>
  btn.addEventListener('click', (event) => {
    event.target.classList.toggle('like_active');
  })
);
