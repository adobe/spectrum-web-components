<!--- Provide a general summary of your changes in the Title above -->

## Description

<!--- Describe your changes in detail -->

Added password option to textfield. I would have gone with type attribute in input tag ( text|email|tel|password|url|number ), if it textfield does not include textarea.

## Related Issue

<!--- This project only accepts pull requests related to open issues -->
<!--- If suggesting a new feature or change, please discuss it in an issue first -->
<!--- If fixing a bug, there should be an issue describing it with steps to reproduce -->
<!--- Please link to the issue here: -->

## Motivation and Context

<!--- Why is this change required? What problem does it solve? -->

I wanted to have password field and did not want to work around with dom manipulation.

## How Has This Been Tested?

<!--- Please describe in detail how you tested your changes. -->
<!--- Include details of your testing environment, and the tests you ran to -->
<!--- see how your change affects other areas of the code, etc. -->

Yes, I ran `yarn test`

The coverage result:
`98.46% Statements 12471/1266694.63% Branches 1709/180694.69% Functions 589/62298.46% Lines 12471/12666`

## Screenshots (if appropriate):

## Types of changes

<!--- What types of changes does your code introduce? Put an `x` in all the boxes that apply: -->

-   [ ] Bug fix (non-breaking change which fixes an issue)
-   [x] New feature (non-breaking change which adds functionality)
-   [ ] Breaking change (fix or feature that would cause existing functionality to change)

## Checklist:

<!--- Go over all the following points, and put an `x` in all the boxes that apply. -->
<!--- If you're unsure about any of these, don't hesitate to ask. We're here to help! -->

-   [x] I have signed the [Adobe Open Source CLA](http://opensource.adobe.com/cla.html).
-   [x] My code follows the code style of this project.
-   [x] My change requires a change to the documentation.
-   [x] I have updated the documentation accordingly.
-   [x] I have read the **CONTRIBUTING** document.
-   [x] I have added tests to cover my changes.
-   [x] All new and existing tests passed.
