Feature: User Login

  Scenario: Successful Login
    Given I am on the login page
    When I enter a valid email and password
    And I submit the login form
    Then I should be redirected to the dashboard

  Scenario: Failed Login with Invalid Credentials
    Given I am on the login page
    When I enter an invalid email or password
    And I submit the login form
    Then I should see an error message indicating authentication failure