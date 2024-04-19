'use strict';

document.addEventListener("DOMContentLoaded",function() {

    // Get the data for the reviews (dummy data for now)
    const reviewData = [
        { rating: 5, count: 3 },
        { rating: 4, count: 5 },
        { rating: 3, count: 2 },
        { rating: 2, count: 1 },
        { rating: 1, count: 0 }
    ];

    // Extract rating and count for each review
    const ratings = reviewData.map(review => review.rating);
    const counts = reviewData.map(review => review.count);

    // Initialize the chart
    const ctx = document.getElementById('reviewDistributionChart').getContext('2d');
    const myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ratings,
            datasets: [{
                label: 'Review Distribution',
                data: counts,
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
            }
        }
      });
    });



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
    
    // shopping cart toggle function
    const cartToggleFunc = function () { shoppingCart.classList.toggle('active') }
    
    
    
    // add event on nav-toggle-btn
    navToggleBtn.addEventListener('click', function () {
    
      // If the shopping-cart has an `active` class, it will be removed.
      if (shoppingCart.classList.contains('active')) cartToggleFunc();
    
      navToggleFunc();
    
    });
    
    // add event on cart-toggle-btn
    cartToggleBtn.addEventListener('click', function () {
    
      // If the navbar-nav has an `active` class, it will be removed.
      if (nav.classList.contains('active')) navToggleFunc();
    
      cartToggleFunc();
    
    });
    
    // add event on all nav-link
    for (let i = 0; i < navLinks.length; i++) {
    
      navLinks[i].addEventListener('click', navToggleFunc);
    
    }