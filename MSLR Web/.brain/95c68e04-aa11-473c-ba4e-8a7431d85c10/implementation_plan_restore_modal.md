# Plan: Restore Add Experience Modal to Seeker Signup

The objective is to reintegrate the "Add Experience" modal functionality directly into the Seeker Signup page since the shared modular components were removed.

## Proposed Changes

### [Seeker Signup Page]

#### [MODIFY] [SeekerSignup.html](file:///d:/Thesu/MSL%20Recruitment%20Portal/MSLR%20Web/SeekerSignup.html)
- Add the "Add Experience" modal HTML directly before the end of the `<body>` tag.
- Re-add the multi-select inputs for skills within the modal.

#### [MODIFY] [SeekerSignup.css](file:///d:/Thesu/MSL%20Recruitment%20Portal/MSLR%20Web/SeekerSignup.css)
- Add modal styles: overlay (`fixed inset-0`), content centering, backdrop blur, and custom scrollbar.
- Add Month/Year picker styles.

#### [MODIFY] [SeekerSignup.js](file:///d:/Thesu/MSL%20Recruitment%20Portal/MSLR%20Web/SeekerSignup.js)
- Implement `openModal` and `closeModal` functions.
- Add listener for `#add-experience-btn`.
- Implement Custom Month/Year picker logic for `exp-start-date` and `exp-end-date`.
- Implement "Currently working" toggle logic.

## Verification Plan

### Manual Verification
- Verify the modal opens when clicking "Add Experience".
- Check that the date picker works correctly.
- Ensure the modal is responsive and aesthetic.
