export const setColorsByTheme = () => {
    function getInitialColorMode() {
      const siteState = window.localStorage.getItem('siteState')
      const persistedColorPreference =
        siteState && JSON.parse(siteState).state.themeStyle
      const hasPersistedPreference =
        typeof persistedColorPreference === 'string' &&
        persistedColorPreference !== ''
  
      if (hasPersistedPreference) {
        return persistedColorPreference
      }
  
      const mql = window.matchMedia('(prefers-color-scheme: dark)')
  
      const hasMediaQueryPreference = typeof mql.matches === 'boolean'
      if (hasMediaQueryPreference) {
        return mql.matches ? 'dark' : 'light'
      }
  
      return 'light'
    }

    const root = window.document.documentElement
    const initStyleTag = document.getElementById('initial-theme')
    const body = document.getElementsByTagName('head')[0];
    const heightElement = document.createElement('div')
    heightElement.style.height = '100vh'
    heightElement.style.position = 'absolute'
    heightElement.style.visibility = 'hidden'
    body.insertAdjacentElement('afterend', heightElement)
    const cssHeight = heightElement.getBoundingClientRect().height
    heightElement.remove()
    const colorMode = getInitialColorMode()
    const COLORS = colorMode === 'light' ? 'LIGHT_THEME' : 'DARK_THEME'
    root.setAttribute('data-theme', colorMode)
  
    if (initStyleTag) {
      initStyleTag.innerHTML = `:root {--true: ; --uiHeight: ${
        cssHeight - (window.innerHeight ||
        document.documentElement.clientHeight ||
        document.body.clientHeight)
      }px; ${COLORS}}`
    }
  }