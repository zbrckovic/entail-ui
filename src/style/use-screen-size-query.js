import { useTheme } from 'emotion-theming'
import { useMediaQuery } from 'react-responsive/src'

export const useScreenSizeQuery = () => {
  const { breakpoints: [phoneLandscape, tablet, desktop] } = useTheme()
  const isPhoneLandscape = useMediaQuery({ minWidth: phoneLandscape })
  const isTablet = useMediaQuery({ minWidth: tablet })
  const isDesktop = useMediaQuery({ minWidth: desktop })

  return { isPhoneLandscape, isTablet, isDesktop }
}
