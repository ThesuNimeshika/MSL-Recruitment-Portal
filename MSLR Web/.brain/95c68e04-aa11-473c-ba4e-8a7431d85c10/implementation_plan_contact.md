# Implementation Plan - Contact Info Refactor

This plan outlines the changes to add a "Contact info" section to the Personal Details card and implement an "Edit Contact Info" modal in `SeekerProfile.html`.

## Proposed Changes

### [MODIFY] [SeekerProfile.html](file:///d:/Thesu/MSL%20Recruitment%20Portal/MSLR%20Web/SeekerProfile.html)
- **Personal Details Card**: Add a new row below Bio/Location for "Contact info" with a descriptive subtext and an "Edit contact info" action link.
- **Edit Contact Info Modal**:
    - Update/Replace the existing `contact-modal` with a new `edit-contact-modal` structure.
    - Include read-only fields for Profile URL and Email.
    - Include editable inputs for:
        - Phone number (placeholder with current value).
        - Phone type (select: Home, Mobile, Work).
        - Address (placeholder with current value).
        - Birthday (input type="date").
    - Include a "Website" section with a "+ Add website" trigger.

### [MODIFY] [SeekerProfile.js](file:///d:/Thesu%20MSL%20Recruitment%20Portal/MSLR%20Web/SeekerProfile.js)
- Update event listeners to open the new `edit-contact-modal`.
- Implement logic for the "+ Add website" button:
    - On click, hide the button and show an input field with a "save" button.
- Handle modal save/close actions.

## Verification Plan

### Manual Verification
- Verify the new "Contact info" section appears on the Personal Details card.
- Click "Edit contact info" and verify the modal opens.
- Verify all fields (URL, Email, Phone, Address, Birthday) are correctly displayed/inputtable.
- Click "+ Add website" and verify it switches to an input field.
- Verify the Save button in the modal closes the modal and shows a notification.
