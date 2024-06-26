'use strict';

    // navbar variables
    const nav = document.querySelector('.navbar-nav');
    const navLinks = document.querySelectorAll('.nav-link');
    const cartToggleBtn = document.querySelector('.shopping-cart-btn');
    const navToggleBtn = document.querySelector('.menu-toggle-btn');
    const shoppingCart = document.querySelector('.cart-box');
    
    
    
    // nav toggle function
    const navToggleFunc = function () {
      nav.classList.toggle('active');
      navToggleBtn.classList.toggle('active');
    }
    

    
    
    // add event on nav-toggle-btn
    navToggleBtn.addEventListener('click', function () {
    
      // If the shopping-cart has an `active` class, it will be removed.
      if (shoppingCart.classList.contains('active')) cartToggleFunc();
    
      navToggleFunc();
    
    });
    
  
    
    // add event on all nav-link
    for (let i = 0; i < navLinks.length; i++) {
    
      navLinks[i].addEventListener('click', navToggleFunc);
    
    }




















    document.addEventListener('DOMContentLoaded', function () {
      const reviewForm = document.getElementById('review-form');
      const existingReviews = document.getElementById('existing-reviews');
      
      // Object to store the count of ratings for each star
      const starRatingsCount = {
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0
      };
    
      // Object to store the count of reviews for each rating
      let reviewCount = {
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0
      };
    
      let myChart;
    
      // Function to create a new review element
      function createReviewElement(name, rating, comment) {
        const reviewDiv = document.createElement('div');
        reviewDiv.classList.add('review');
    
        const nameHeading = document.createElement('h3');
        nameHeading.textContent = name;
    
        const ratingParagraph = document.createElement('p');
        ratingParagraph.textContent = `${rating}/5`;
    
        const commentParagraph = document.createElement('p');
        commentParagraph.textContent = comment;
    
        const buttonDiv = document.createElement('div');
        buttonDiv.classList.add('review-options');
    
        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.classList.add('edit-btn');
    
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('delete-btn');
    
        buttonDiv.appendChild(editButton);
        buttonDiv.appendChild(deleteButton);
    
        reviewDiv.appendChild(nameHeading);
        reviewDiv.appendChild(ratingParagraph);
        reviewDiv.appendChild(commentParagraph);
        reviewDiv.appendChild(buttonDiv);
        existingReviews.appendChild(reviewDiv);
    
        // Increment the count of ratings for the given star
        starRatingsCount[rating]++;
        updateStarRatings(); // Update the display of star ratings
    
        // Increment the count of reviews for the given rating
        reviewCount[rating]++;
    
        // Update the chart
        updateChart();
    
        // Add event listeners for edit and delete buttons
        editButton.addEventListener('click', editReview);
        deleteButton.addEventListener('click', deleteReview);
      }
    
      // Function to update the display of star ratings
      function updateStarRatings() {
        // Assuming you have HTML elements to display the count of ratings for each star
        for (let i = 1; i <= 5; i++) {
          const starElement = document.getElementById(`star-${i}-count`);
          if (starElement) {
            starElement.textContent = starRatingsCount[i];
          }
        }
      }
    
      // Function to initialize review count with existing reviews
      function initializeReviewCount() {
        const reviews = existingReviews.querySelectorAll('.review');
        reviews.forEach(review => {
          const rating = parseInt(review.querySelector('p:nth-of-type(1)').textContent.split('/')[0], 10);
          reviewCount[rating]++;
        });
      }
    
      // Call initializeReviewCount to set initial review count
      initializeReviewCount();
    
      // Event listener for submitting a review
      reviewForm.addEventListener('submit', function (event) {
        event.preventDefault();
    
        const name = document.getElementById('name').value;
        const rating = document.querySelector('input[name="rating"]:checked').value;
        const comment = document.getElementById('comment').value;
    
        createReviewElement(name, rating, comment);
    
        // Reset the form after submission
        reviewForm.reset();
      });
    
      // Function to handle editing a review
      function editReview(event) {
        // Get the parent review element
        const review = event.target.closest('.review');
    
        // Store the old rating in a data attribute
        review.dataset.oldRating = review.querySelector('p:nth-of-type(1)').textContent.split('/')[0];
    
        // Assuming you have input fields for editing
        const nameInput = review.querySelector('h3');
        const ratingInput = review.querySelector('p:nth-of-type(1)');
        const commentInput = review.querySelector('p:nth-of-type(2)');
    
        // Enable input fields for editing
        nameInput.contentEditable = true;
        commentInput.contentEditable = true;
    
        // Split the rating into integer and fractional parts
        const ratingText = ratingInput.textContent;
        const [integerPart, fractionalPart] = ratingText.split('/');
    
        // Create input field for the integer part of the rating
        const ratingInputField = document.createElement('input');
        ratingInputField.type = 'number';
        ratingInputField.min = 1;
        ratingInputField.max = 5;
        ratingInputField.value = integerPart.trim();
        ratingInputField.classList.add('rating-input');
    
        // Replace the rating text with the input field
        ratingInput.textContent = '';
        ratingInput.appendChild(ratingInputField);
        ratingInput.insertAdjacentText('beforeend', `/${fractionalPart.trim()}`);
    
        // Change the button text to 'Save'
        event.target.textContent = 'Save';
    
        // Add event listener to save the edited review
        event.target.removeEventListener('click', editReview);
        event.target.addEventListener('click', saveReview);
      }
    
      // Function to handle saving an edited review
      function saveReview(event) {
        // Get the parent review element
        const review = event.target.closest('.review');
    
        // Assuming you have input fields for editing
        const nameInput = review.querySelector('h3');
        const ratingInputField = review.querySelector('.rating-input');
        const commentInput = review.querySelector('p:nth-of-type(2)');
    
        // Disable input fields after editing
        nameInput.contentEditable = false;
        commentInput.contentEditable = false;
    
        // Get the old and new ratings
        const oldRating = parseInt(review.dataset.oldRating, 10);
        const newRating = parseInt(ratingInputField.value, 10);
    
        // Update the review count based on old and new ratings
        reviewCount[oldRating]--;
        reviewCount[newRating]++;
    
        // Update the rating paragraph with the new rating
        const ratingParagraph = review.querySelector('p:nth-of-type(1)');
        ratingParagraph.textContent = `${newRating}/5`;
    
        // Remove the input field
        ratingInputField.remove();
    
        // Change the button text back to 'Edit'
        event.target.textContent = 'Edit';
    
        // Add event listener for editing
        event.target.removeEventListener('click', saveReview);
        event.target.addEventListener('click', editReview);
    
        // Update the chart
        updateChart();
      }
    
      // Function to handle deleting a review
      function deleteReview(event) {
        // Get the parent review element and remove it
        const review = event.target.closest('.review');
        const rating = parseInt(review.querySelector('p:nth-of-type(1)').textContent.split('/')[0], 10);
        review.remove();
    
        // Decrement the count of ratings for the deleted review
        starRatingsCount[rating]--;
        updateStarRatings(); // Update the display of star ratings
    
        // Decrement the count of reviews for the deleted review
        reviewCount[rating]--;
    
        // Update the chart
        updateChart();
      }
    
      // Add event listeners for edit buttons
      const editButtons = document.querySelectorAll('.edit-btn');
      editButtons.forEach(button => {
        button.addEventListener('click', editReview);
      });
    
      // Add event listeners for delete buttons
      const deleteButtons = document.querySelectorAll('.delete-btn');
      deleteButtons.forEach(button => {
        button.addEventListener('click', deleteReview);
      });
    
    // Function to create or update the chart based on data
// Function to create or update the chart based on data
function updateChart() {
  if (myChart) {
    myChart.data.datasets[0].data = Object.values(reviewCount);
    myChart.update();
  } else {
    const ctx = document.getElementById('reviewDistributionChart').getContext('2d');
    myChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['1 star', '2 stars', '3 stars', '4 stars', '5 stars'],
        datasets: [{
          label: 'Count',
          data: Object.values(reviewCount),
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        },
        plugins: {
          legend: {
            display: false // Hide the legend
          }
        }
      }
    });
  }
}


      // Initialize the chart after DOM content is loaded
      updateChart();
    });
    










    const VisitorsAverageData = {
      labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      datasets: [{
        label: 'Average Number of Visitors Each Day',
        data: [30, 40, 45, 50, 75, 70, 65], // Sample data 
        backgroundColor: [
          'rgba(54, 162, 235, 0.2)', // Blue color for the bars
          'rgba(54, 162, 235, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(54, 162, 235, 0.2)'
        ],
        borderColor: 'rgba(54, 162, 235, 1)', // Blue color for the border
        borderWidth: 1
      }]
    };
    
    // Calculate transparency based on data values
    VisitorsAverageData.datasets[0].data.forEach((value, index) => {
      // Transparency value based on the data (0 to 1)
      const transparency = value / 100; // Assuming 100 is the highest value in your data
      
      // Set the new background color with adjusted transparency
      VisitorsAverageData.datasets[0].backgroundColor[index] = `rgba(54, 162, 235, ${transparency})`;
    });
    
    // Get the canvas element for AverageVisitorsChart
    const canvas1 = document.getElementById('AverageVisitorsChart').getContext('2d');
    
    // Create the chart for AverageVisitorsChart
    const AverageVisitorsChart = new Chart(canvas1, {
      type: 'bar',
      data: VisitorsAverageData,
      options: {
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Average'
            }
          },
          x: {
            title: {
              display: true,
              text: 'Day of the Week'
            }
          }
        },
        plugins: {
          legend: {
            display: false // Hide legend
          }
        }
      }
    });
    
    
    






const peakTimingsData = {
  labels: ['9AM-12PM', '12PM-3PM', '3PM-6PM', '6PM-9PM', '9PM-10PM'],
  datasets: [{
    label: 'Occupancy During Peak Hours',
    data: [20, 30, 80, 40, 70], // Sample peak timings data
    backgroundColor: [
      calculateColor(20), // Red color for morning
      calculateColor(30), // Red color for afternoon
      calculateColor(40), // Red color for evening
      calculateColor(25), // Red color for night
      calculateColor(10)  // Red color for late night
    ],
    borderColor: 'rgba(255, 99, 132, 1)',
    borderWidth: 1
  }]
};

// Function to calculate color based on data value
function calculateColor(value) {
  // Brightness value based on the data (0% to 100%)
  const brightness = (value / 80) * 100; // Assuming 40 is the highest value in your data
  
  // Convert brightness to RGB
  const red = 255;
  const green = 99 - (99 * brightness) / 100;
  const blue = 132 - (132 * brightness) / 100;

  // Construct rgba color string
  return `rgba(${red}, ${green}, ${blue}, 0.5)`;
}

// Get the canvas element for PeakTimingsChart
const canvas2 = document.getElementById('PeakTimingsChart').getContext('2d');

// Create the chart for PeakTimingsChart
const PeakTimingsChart = new Chart(canvas2, {
  type: 'line',
  data: peakTimingsData,
  options: {
    scales: {
      y: {
        beginAtZero: true,
        max: 100, // Set maximum value of y-axis to 100
        title: {
          display: true,
          text: 'Percentage'
        }
      },
      x: {
        title: {
          display: true,
          text: 'Time of Day'
        }
      }
    },
    plugins: {
      legend: {
        display: false // Hide legend
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              label += context.parsed.y + '%'; // Append percentage symbol
            }
            return label;
          }
        }
      }
    }
  }
});


