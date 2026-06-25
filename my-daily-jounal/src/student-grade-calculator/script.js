// Student Marks & Grade Calculator - script.js

function calculateResult() {
  // Clear any previous results
  var resultDiv = document.getElementById('result');
  resultDiv.innerHTML = "";
  
  // Read the number of subjects entered
  var numSubjects = parseInt(document.getElementById('subjects').value);
  
  // Validate subject count input
  if (isNaN(numSubjects) || numSubjects < 1 || numSubjects > 10) {
    resultDiv.innerHTML = "<p class='error'>Please enter a valid number of subjects between 1 and 10.</p>";
    return;
  }
  
  var total = 0;
  var hasFailed = false;
  
  // Loop to prompt user and enter marks for each subject
  for (var i = 1; i <= numSubjects; i++) {
    var marksInput = prompt("Enter marks for Subject " + i + " (out of 100):");
    
    // Check if user cancelled the prompt box
    if (marksInput === null) {
      resultDiv.innerHTML = "<p class='error'>Calculation cancelled by user.</p>";
      return;
    }
    
    var marks = parseFloat(marksInput);
    
    // Validate individual subject marks
    if (isNaN(marks) || marks < 0 || marks > 100) {
      alert("Invalid marks entered! Marks must be a number between 0 and 100. Resetting calculation.");
      resultDiv.innerHTML = "<p class='error'>Error: Invalid marks entered.</p>";
      return;
    }
    
    total = total + marks;
    
    // Pass/Fail rule: if marks in any subject are less than 35, the student fails
    if (marks < 35) {
      hasFailed = true;
    }
  }
  
  // Calculate average percentage
  var average = total / numSubjects;
  var grade = "";
  var resultStatus = "";
  
  // If-else conditions to determine Pass/Fail and Grade
  if (hasFailed) {
    resultStatus = "Fail";
    grade = "F";
  } else {
    resultStatus = "Pass";
    if (average >= 90) {
      grade = "O (Outstanding)";
    } else if (average >= 80) {
      grade = "A+ (Excellent)";
    } else if (average >= 70) {
      grade = "A (Very Good)";
    } else if (average >= 60) {
      grade = "B (Good)";
    } else if (average >= 50) {
      grade = "C (Satisfactory)";
    } else {
      grade = "P (Pass)";
    }
  }
  
  // Display the output dynamically on the webpage
  resultDiv.innerHTML = 
    "<p><strong>Total Marks:</strong> " + total.toFixed(2) + " / " + (numSubjects * 100) + "</p>" +
    "<p><strong>Average Percentage:</strong> " + average.toFixed(2) + "%</p>" +
    "<p><strong>Grade:</strong> " + grade + "</p>" +
    "<p><strong>Status:</strong> " + resultStatus + "</p>";
}