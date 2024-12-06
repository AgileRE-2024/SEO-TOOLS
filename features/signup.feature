Feature: User Sign Up

  Scenario: Successful Sign Up
    Given I am on the sign-up page
    When I enter a valid username, email, and password
    And I confirm the password correctly
    And I submit the sign-up form
    Then I should be redirected to the login page

  Scenario: Failed Sign Up with registered Email
    Given I am on the sign-up page
    When I enter a registered email
    And I submit the sign-up form
    Then I should see an error message indicating that the email is registered

  Scenario: Failed Sign Up with mismatched passwords
    Given I am on the sign-up page
    When I enter mismatched passwords
    And I submit the sign-up form
    Then I should see an error message indicating that the passwords do not match

  Scenario: Failed Sign Up with password less than 6 characters
    Given I am on the sign-up page
    When I enter a password with less than 6 characters
    And I submit the sign-up form
    Then I should see an error message indicating that the password is too short
