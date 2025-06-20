Feature: Accordion Component
  As a user
  I want to interact with an accordion component
  So that I can expand and collapse content sections

  Background:
    Given I have an accordion component with multiple items
    And each accordion item has a label and content

  Scenario: Basic accordion functionality
    When I click on an accordion item header
    Then the item should expand to show its content
    And the chevron icon should rotate to indicate the expanded state
    When I click the same accordion item header again
    Then the item should collapse to hide its content
    And the chevron icon should return to its original position

  Scenario: Single item expansion (default behavior)
    Given I have an accordion with multiple items
    When I click on the first accordion item
    Then the first item should expand
    When I click on the second accordion item
    Then the second item should expand
    And the first item should automatically collapse

  Scenario: Multiple item expansion
    Given I have an accordion with multiple items
    And the accordion has the "allow-multiple" attribute set to true
    When I click on the first accordion item
    Then the first item should expand
    When I click on the second accordion item
    Then the second item should expand
    And the first item should remain expanded

  Scenario: Disabled accordion item
    Given I have an accordion with a disabled item
    When I click on the disabled accordion item
    Then the item should not expand
    And the item should remain in its current state

  Scenario: Keyboard navigation
    Given I have an accordion with multiple items
    When I press the Tab key
    Then focus should move to the first accordion item
    When I press the Down Arrow key
    Then focus should move to the next accordion item
    When I press the Up Arrow key
    Then focus should move to the previous accordion item
    When I press the Space key on a focused item
    Then the focused item should expand

  Scenario: Different density settings
    Given I have an accordion with multiple items
    When I set the density to "compact"
    Then the accordion items should have reduced spacing
    When I set the density to "spacious"
    Then the accordion items should have increased spacing

  Scenario: Different size settings
    Given I have an accordion with multiple items
    When I set the size to "s"
    Then the accordion items should have small text and icons
    When I set the size to "m"
    Then the accordion items should have medium text and icons
    When I set the size to "l"
    Then the accordion items should have large text and icons
    When I set the size to "xl"
    Then the accordion items should have extra large text and icons

  Scenario: Event cancellation
    Given I have an accordion with multiple items
    And I have set up an event listener to prevent toggle events
    When I click on the first accordion item
    Then the first item should expand
    When I click on the second accordion item
    Then the toggle event should be cancelled
    And the first item should remain expanded
    And the second item should remain collapsed

  Scenario: Size inheritance
    Given I have an accordion with multiple items
    When I set the accordion size to "l"
    Then all accordion items should inherit the "l" size
    When I change the accordion size to "s"
    Then all accordion items should update to the "s" size

  Scenario: Multiple item toggling with allow-multiple
    Given I have an accordion with multiple items
    And the accordion has the "allow-multiple" attribute set to true
    When I click on the first accordion item
    Then the first item should expand
    When I click on the second accordion item
    Then the second item should expand
    And the first item should remain expanded
    When I click on the second item again
    Then the second item should collapse
    And the first item should remain expanded 