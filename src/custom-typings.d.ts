// Probably not the good way to add typings but it works
declare module 'react-freezeframe' {
  interface ReactFreezeframeProps {
    src: string;
    options: any;
    ref: any;
  }

  export interface ReactFreezeframeElement {
    start: () => void;
    stop: () =>void;
  }

  export default function ReactFreezeframe(props?: ReactFreezeframeProps): JSX.Element;
}