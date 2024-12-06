Feature: View History
  Scenario: Viewing History
    Given I am on the dashboard
    And I am logged in
    When I navigate to the "History" section
    Then I should see a list of my previous keywords
    And each keyword should show the time it was accessed
  Scenario: No History Available
    Given I am on the dashboard
    And I am logged in
    When I navigate to the "History" section
    And I have no history
    Then I should see a message saying "No history available"
