import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import { VIEWPORT_TYPE } from '../constants/viewports';
import getViewportType from '../helpers/getViewportType';

let defaultContextValue = {
  viewportType: VIEWPORT_TYPE.DESKTOP,
  isRotate: false,
  isLandscape: true,
  isPortrait: false,
  isDesktop: true,
  isTablet: false,
  isMobile: false,
};

export let ViewportListenerContext = createContext(defaultContextValue);

export function useViewportContext() {
  return useContext(ViewportListenerContext);
}

// @ts-ignore: cannot define children
export default function ViewportContext({ children }) {
  let [viewportType, setViewportType] = useState(
    getViewportType(window.innerWidth),
  );

  let [isLandscape, setIsLandscape] = useState(
    window.innerWidth >= window.innerHeight,
  );
  let [isPortrait, setIsPortrait] = useState(
    window.innerWidth < window.innerHeight,
  );

  // NOTE: to determine if screen rotation is happening
  let rotateRef = useRef(false);

  let isDesktop = viewportType === VIEWPORT_TYPE.DESKTOP;

  let isTablet = viewportType === VIEWPORT_TYPE.TABLET;

  let isMobile = viewportType === VIEWPORT_TYPE.MOBILE;

  useEffect(() => {
    let onResize = () => {
      let type = getViewportType(window.innerWidth);

      let newIsLandscape = window.innerWidth >= window.innerHeight;

      setIsLandscape(newIsLandscape);
      setIsPortrait(!newIsLandscape);
      setViewportType(type);

      // NOTE: reset rotateRef
      if (rotateRef.current) {
        setTimeout(() => {
          rotateRef.current = false;
        }, 0);
      }
    };

    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, []);

  useEffect(() => {
    let onRotate = () => {
      rotateRef.current = true;
    };

    window.addEventListener('orientationchange', onRotate);
    return () => {
      window.removeEventListener('orientationchange', onRotate);
    };
  }, []);

  let value = useMemo(
    () => ({
      viewportType,
      isRotate: rotateRef.current,
      isLandscape,
      isPortrait,
      isDesktop,
      isTablet,
      isMobile,
    }),
    [viewportType, isLandscape, isPortrait, isDesktop, isTablet, isMobile],
  );

  return (
    <ViewportListenerContext.Provider value={value}>
      {children}
    </ViewportListenerContext.Provider>
  );
}
