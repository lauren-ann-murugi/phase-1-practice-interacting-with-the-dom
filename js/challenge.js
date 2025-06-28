// Wait for the DOM to fully load before running our JavaScript
document.addEventListener('DOMContentLoaded', () => {
  // Grabbing DOM elements
  const counter = document.getElementById('counter');
  const minusBtn = document.getElementById('minus');
  const plusBtn = document.getElementById('plus');
  const heartBtn = document.getElementById('heart');
  const pauseBtn = document.getElementById('pause');
  const commentForm = document.getElementById('comment-form');
  const commentInput = document.getElementById('comment-input');
  const commentList = document.getElementById('list');
  const likesUl = document.querySelector('.likes');
  const submitBtn = document.getElementById('submit');

  // Initial counter state and control variables
  let count = 0;
  let isPaused = false;
  let likes = {}; // Stores number of likes per counter value
  let interval = startCounter(); // Start the counter

  // Function to start the counter with setInterval
  function startCounter() {
    return setInterval(() => {
      if (!isPaused) {
        count++;
        updateCounter();
      }
    }, 1000);
  }

  // Function to update the counter display
  function updateCounter() {
    counter.textContent = count;
  }

  // Plus button click: increment counter manually
  plusBtn.addEventListener('click', () => {
    count++;
    updateCounter();
  });

  // Minus button click: decrement counter manually
  minusBtn.addEventListener('click', () => {
    count--;
    updateCounter();
  });

  // Heart button click: like the current number
  heartBtn.addEventListener('click', () => {
    if (likes[count]) {
      likes[count]++;
      const existingLi = document.getElementById(`like-${count}`);
      existingLi.textContent = `${count} has been liked ${likes[count]} times`;
    } else {
      likes[count] = 1;
      const li = document.createElement('li');
      li.id = `like-${count}`;
      li.textContent = `${count} has been liked 1 time`;
      likesUl.appendChild(li);
    }
  });

  // Pause button click: toggles pause/resume state
  pauseBtn.addEventListener('click', () => {
    isPaused = !isPaused;

    if (isPaused) {
      clearInterval(interval); // Stop the counter
      pauseBtn.textContent = 'resume'; // Change button label

      // Disable interactive buttons
      plusBtn.disabled = true;
      minusBtn.disabled = true;
      heartBtn.disabled = true;
      submitBtn.disabled = true;
    } else {
      interval = startCounter(); // Resume counter
      pauseBtn.textContent = 'pause';

      // Re-enable all buttons
      plusBtn.disabled = false;
      minusBtn.disabled = false;
      heartBtn.disabled = false;
      submitBtn.disabled = false;
    }
  });

  // Handle comment form submission
  commentForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent page reload

    const newComment = document.createElement('p');
    newComment.textContent = commentInput.value;
    commentList.appendChild(newComment);

    commentInput.value = ''; // Clear the input box
  });
});