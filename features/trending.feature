Feature: Trending Keywords
  Scenario: Trending Keywords Fetched
    Given I am on the dashboard trends page
    Then I should see a list of trending keywords
  Scenario: Selecting a Keyword from Trending List
    Given I am on the dashboard trends page
    When I click on a keyword "Persija"
    Then I should be redirected to "http://localhost:3000/dashboard/trends/Persija"
