*** Settings ***

Documentation    Verifies that our GitHub Pages hosted site is live.

Library   SeleniumLibrary     # https://robotframework.org/SeleniumLibrary/SeleniumLibrary.html


*** Variables ***

${SITEURL}        https://uillinois-community.github.io/


*** Test Cases ***

GitHub Pages site is being served as expected

  Open Browser                ${SITEURL}
  Page should contain         University of Illinois      
  Page should contain         GitHub Service Community Portal
  Page should contain         Ask a question
  Page should contain         Explore community resources
  Page should contain         Update this page