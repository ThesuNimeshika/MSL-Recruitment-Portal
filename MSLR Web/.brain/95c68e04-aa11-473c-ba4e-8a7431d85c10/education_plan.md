# Implementation Plan: Add Education Modal

The goal is to implement an "Add Education" modal in `SeekerProfile.html` that mirrors the functionality and style of the existing "Add Experience" modal.

## Proposed Changes

### [MODIFY] [SeekerProfile.html](file:///d:/Thesu/MSL%20Recruitment%20Portal/MSLR%20Web/SeekerProfile.html)
- Add the HTML structure for the "Add Education" modal before the closing `body` tag.
- Ensure the "+" icon in the Education card has the correct ID/attributes to trigger the modal.
- Include fields: School*, Degree, Field of study, Start date (Month/Year), End date (Month/Year), Grade, Activities and societies, Description.

### [MODIFY] [SeekerProfile.js](file:///d:/Thesu/MSL%20Recruitment%20Portal/MSLR%20Web/SeekerProfile.js)
- Add event listeners for the "Add Education" button to show the modal.
- Add logic to close the modal.
- Implement form handling for the new education entry.

## Verification Plan

### Manual Verification
- Click the "+" icon on the Education card to verify the modal opens.
- Verify all requested fields are present and styled correctly.
- Test the close and save buttons.
- Ensure the modal is responsive.
