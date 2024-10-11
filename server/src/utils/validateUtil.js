export function validatePrivacySetting(setting) {
    if (Object.values(PrivacySetting).includes(setting)) return true;
    else return false;
}
