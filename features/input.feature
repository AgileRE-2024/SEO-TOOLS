Feature: Input Keyword
  Scenario: Successful Keyword Input
    Given I am on the "http://localhost:3000/dashboard/new"
    When I enter the keyword "technology"
    And I press the search button
    And I should see keyword analysis result
