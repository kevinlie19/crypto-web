import { VIEWPORT_TYPE } from '../constants/viewports';

export const BREAKPOINTS = {
  mobile: { width: 768 }, // 0 - 768
  tablet: { width: 769 }, // 769 - 1023
  desktop: { width: 1023 }, // > 1023
};

export default function getViewportType(width: number) {
  let { tablet } = BREAKPOINTS;

  // For now, tablet will show the same as mobile
  if (width < tablet.width) {
    return VIEWPORT_TYPE.MOBILE;
  } else {
    return VIEWPORT_TYPE.DESKTOP;
  }
}
