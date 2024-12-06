Feature: Analyse Keyword

  Scenario: Data Loaded Successfully
    Given I am on the analyse page for keyword "sistem informasi"
    Then I should see a network graph for "sistem informasi"
    And I should see a table of related keywords
    And I should see an Indonesia map with search interest data
