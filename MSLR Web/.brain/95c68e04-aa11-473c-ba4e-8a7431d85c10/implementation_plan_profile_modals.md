# Plan: Restore Experience & Education Modals to Seeker Profile

The objective is to reintegrate the "Add Experience" and "Add Education" modals directly into the Seeker Profile page since the shared modular components were removed.

## Proposed Changes

### [Seeker Profile Page]

#### [MODIFY] [SeekerProfile.html](file:///d:/Thesu/MSL%20Recruitment%20Portal/MSLR%20Web/SeekerProfile.html)
- Add the "Add Experience" and "Add Education" modal HTML directly before the end of the `<body>` tag.
- Remove the dead script tags for `common/loader.js` and `common/modals.js`.

#### [MODIFY] [SeekerProfile.css](file:///d:/Thesu/MSL%20Recruitment%20Portal/MSLR%20Web/SeekerProfile.css)
- Add the custom Month/Year picker styles and modal-specific styles (similar to the Signup page fix).

#### [MODIFY] [SeekerProfile.js](file:///d:/Thesu/MSL%20Recruitment%20Portal/MSLR%20Web/SeekerProfile.js)
- Implement `openModal` and `closeModal` functions globally.
- Add event listeners for the "+" triggers (`#add-experience-btn`, `#add-education-btn`).
- Implement the custom Month/Year picker logic for both modals.
- Implement the "Currently working" toggle logic for the Experience modal.

## Verification Plan

### Manual Verification
- Click the "+" button in the Experience section; verify the "Add Experience" modal appears.
- Click the "+" button in the Education section; verify the "Add Education" modal appears.
- Verify both modals have functioning date pickers and close buttons.
- Ensure the backdrop blur and centering are correct.
