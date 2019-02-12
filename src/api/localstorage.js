const localStorageLanguageLabel = 'Dentiboo-Active-Language'
const getCurrentlyStoredLanguage = () => localStorage.getItem(localStorageLanguageLabel)
const setCurrentlyStoredLanguage = (l) => localStorage.setItem(localStorageLanguageLabel, l)
const removeCurrentlyStoredLanguage = () => localStorage.removeItem(localStorageLanguageLabel)

export {
  localStorageLanguageLabel,
  getCurrentlyStoredLanguage,
  setCurrentlyStoredLanguage,
  removeCurrentlyStoredLanguage
}
