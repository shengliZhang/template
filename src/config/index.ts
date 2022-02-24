const env = UMI_ENV || 'dev';
console.log('UMI_ENV is', UMI_ENV);

let BOOS_API_HOST = 'https://boss.fengyouhui.net/be';
let MGI_API_HOST = 'https://mgi.fengyouhui.net';
let APP_KEY = '25wehl3u2ejew'; // prod环境 APP_KEY = 'qd46yzrfq3tff'
let ICON_URL = `https://fosun-public.oss-cn-hangzhou.aliyuncs.com`;
if (env) {
  BOOS_API_HOST = `https://boss-${env}.fengyouhui.net/be`;
  MGI_API_HOST = `https://mgi-${env}.fengyouhui.net`;
  ICON_URL = `https://fosun-public-${env}.oss-cn-hangzhou.aliyuncs.com`;
} else {
  APP_KEY = 'qd46yzrfq3tff';
}

const STORAGE_DOMAIN = '';
export { BOOS_API_HOST, MGI_API_HOST, ICON_URL, APP_KEY };
