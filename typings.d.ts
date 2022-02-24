declare module '*.css';
declare module '*.less';
declare module '*.png';
declare module '*.svg' {
  export function ReactComponent(
    props: React.SVGProps<SVGSVGElement>,
  ): React.ReactElement;
  const url: string;
  export default url;
}
declare const UMI_ENV: 'dev' | 'test' | 'uat' | 'prod';
declare module 'postcss-px-to-viewport';
declare module 'weixin-js-sdk';
