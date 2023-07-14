import { ComponentProps, HTMLAttributes } from 'react';

declare global {
  type ViewProps = HTMLAttributes<typeof View> & ComponentProps<typeof View>;
}
