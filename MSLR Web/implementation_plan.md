# Implementation Plan - Fix Modal Triggers and Signup Structure

Ensure that "Add Experience" buttons in both `SeekerProfile.html` and `SeekerSignup.html` correctly open the modularized "Add Experience" modal.

## Proposed Changes

### [SeekerSignup.html](file:///d:/Thesu/MSL%20Recruitment%20Portal/MSLR%20Web/SeekerSignup.html)
- Revert `id="experience-skills"` back to `id="current-position"` for the section at line 214.
- Update sidebar to ensure consistency.

### [common/modals.js](file:///d:/Thesu/MSL%20Recruitment%20Portal/MSLR%20Web/common/modals.js)
- Verify `initModals` correctly binds event listeners.

## Verification Plan

### Manual Verification
- Open `SeekerProfile.html`, click "Add Experience" (+) button. Verify modal opens.
- Open `SeekerSignup.html`, click "Add Experience" button in the "Current Position" section. Verify modal opens.
- Verify sidebar links in `SeekerSignup.html` navigate to the correct sections.
