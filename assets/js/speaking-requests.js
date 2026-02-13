document.addEventListener('DOMContentLoaded', () => {
    initSpeakingForm();
});

function initSpeakingForm() {
    // 1. Purpose "Other" Logic
    const checkPurposeOther = document.getElementById('check-purpose-other');
    const fieldPurposeOther = document.getElementById('field-purpose-other');

    if (checkPurposeOther && fieldPurposeOther) {
        checkPurposeOther.addEventListener('change', () => {
            if (checkPurposeOther.checked) {
                fieldPurposeOther.style.display = 'block';
                const input = fieldPurposeOther.querySelector('input');
                if (input) input.focus();
            } else {
                fieldPurposeOther.style.display = 'none';
            }
        });
    }

    // 2. Heard About "Other" Logic
    const checkHeardOther = document.getElementById('check-heard-other');
    const fieldHeardOther = document.getElementById('field-heard-other');

    if (checkHeardOther && fieldHeardOther) {
        checkHeardOther.addEventListener('change', () => {
            if (checkHeardOther.checked) {
                fieldHeardOther.style.display = 'block';
                const input = fieldHeardOther.querySelector('input');
                if (input) input.focus();
            } else {
                fieldHeardOther.style.display = 'none';
            }
        });
    }
}
