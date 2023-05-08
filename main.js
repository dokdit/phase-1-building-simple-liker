// Defining text characters for the empty and full hearts for you to use later.
const EMPTY_HEART = '♡';
const FULL_HEART = '♥';

// Get the error modal and assign it to a variable
const errorModal = document.getElementById('modal');
// Add the .hidden class to the error modal so it does not appear when the page first loads
errorModal.classList.add('hidden');

// Add event listeners to all the like buttons
const likeButtons = document.querySelectorAll('.like-glyph');
for (let i = 0; i < likeButtons.length; i++) {
  likeButtons[i].addEventListener('click', function() {
    // Check the current state of the heart
    const currentHeart = likeButtons[i].innerHTML.trim();
    // Invoke mimicServerCall to simulate making a server request
    mimicServerCall()
      .then(() => {
        // When the "server" returns a success status:
        // Change the heart to a full heart
        likeButtons[i].innerHTML = FULL_HEART;
        // Add the .activated-heart class to make the heart appear red
        likeButtons[i].classList.add('activated-heart');
        // Toggle the heart state (empty or full) based on its current state
        if (currentHeart === EMPTY_HEART) {
          likeButtons[i].innerHTML = FULL_HEART;
          likeButtons[i].classList.add('activated-heart');
        } else {
          likeButtons[i].innerHTML = EMPTY_HEART;
          likeButtons[i].classList.remove('activated-heart');
        }
      })
      .catch(() => {
        // When the "server" returns a failure status:
        // Display the error modal by removing the .hidden class
        errorModal.classList.remove('hidden');
        // Display the server error message in the modal
        const errorMessage = document.getElementById('modal-message');
        errorMessage.innerHTML = "Random server error. Try again.";
        // Use setTimeout to hide the modal after 3 seconds (add the .hidden class)
        setTimeout(() => {
          errorModal.classList.add('hidden');
        }, 3000);
      });
  });
}



//------------------------------------------------------------------------------
// Don't change the code below: this function mocks the server response
//------------------------------------------------------------------------------

function mimicServerCall(url="http://mimicServer.example.com", config={}) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      let isRandomFailure = Math.random() < .2
      if (isRandomFailure) {
        reject("Random server error. Try again.");
      } else {
        resolve("Pretend remote server notified of action!");
      }
    }, 300);
  });
}
