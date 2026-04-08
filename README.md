# Laundry Services Web App

This project is built for Tutedude Assignment 4.

## Project Description

A single-page laundry services website where users can:

1. View available services
2. Add or remove services from cart
3. Fill booking details
4. Send booking details by email using EmailJS

## Features Implemented

1. Navbar with Home, Services, About Us, Contact Us
2. Hero section with scroll button
3. Achievements section
4. Booking section with service list + cart + total
5. Booking form with validation:
   - Cart must not be empty
   - Email format validation
   - 10-digit phone validation
6. EmailJS booking email integration
7. Thank-you / error message UI
8. Quality cards section
9. Newsletter section
10. Footer with links and contact details
11. Responsive breakpoints at 768px and 480px
12. Simple animations/transitions for buttons, cart items, and booking message

## EmailJS Setup (Step by Step)

1. Create account at https://www.emailjs.com/
2. In EmailJS dashboard, create:
   - One Email Service
   - One Email Template
3. In template, add variables:
   - `{{full_name}}`
   - `{{email}}`
   - `{{phone}}`
   - `{{services}}`
   - `{{total_amount}}`
4. Copy these values from EmailJS dashboard:
   - Public Key
   - Service ID
   - Template ID
5. Open `script.js` and replace:
   - `YOUR_PUBLIC_KEY`
   - `YOUR_SERVICE_ID`
   - `YOUR_TEMPLATE_ID`
6. Save the file and test the booking form again.

## How To Run Locally

1. Download or clone this repository
2. Open project folder in VS Code
3. Run with Live Server extension or open `index.html` directly in browser

## How I Tested

1. Added and removed multiple services
2. Checked total updates correctly
3. Checked booking blocks when cart is empty
4. Checked invalid email validation
5. Checked invalid phone number validation
6. Tested layout in desktop, tablet, and mobile widths

## Deployment

You can deploy to Netlify or Vercel by uploading this folder or connecting the repository.