import { extend, ResponseError, RequestOptionsInit } from 'umi-request';
import { Toast } from 'antd-mobile';
import { BOOS_API_HOST, MGI_API_HOST } from '@/config';
import { getToken, ExtendError } from '@/helpers';

interface APPHeaders {
  Authorization: any;
}
interface PARAMS {
  url: string;
  params?: any;
  needLoading?: boolean;
  header?: {
    Authorization: any;
    [key: string]: any;
  };
}
/**
 * 异常处理程序
 */
const errorHandler = async (error: ResponseError) => {
  Toast.clear();
  const { response } = error;
  if (response && response.status) {
    const { status, url } = response;
    console.log(`请求错误 ${status}: ${url}`);
  } else if (!response) {
    console.log(`您的网络发生异常，无法连接服务器`);
    throw new ExtendError({
      messgae: '您的网络发生异常，无法连接服务器',
      code: '400',
    });
  }
  return response;
};

const request = extend({
  // errorHandler,
  credentials: 'include',
  timeout: 3000,
});

request.interceptors.response.use(async (response: any) => {
  // const { status } = response;
  // if (status !== 200) {
  //   throw new ExtendError({
  //     message: '您的网络发生异常',
  //     code: status,
  //   });
  // }
  return response;
});

request.interceptors.request.use((url: string, options: any) => {
  const token = getToken();
  console.log('options---', options);

  if (url.endsWith('getWxConfig')) {
    return {
      url,
      options: { ...options, headers: { 'Content-Type': 'application/json' } },
    };
  }
  if (!options.headers) {
    options.headers = {};
  }
  // (options.headers as APPHeaders & HeadersInit).Authorization = token;
  // @ts-ignore
  options.headers['Content-Type'] = 'application/json';
  options.headers['Authorization'] = token;
  options.headers['device_type'] = 'V1732A';
  options.headers['system_version'] = '8.1.0';
  options.headers['version_code'] = '5.0.0';
  options.headers['platform'] = '1';
  options.headers['client_type'] = '1';
  options.headers['client_platform'] = '3';
  options.headers['clientPlatform'] = 'MINI';
  options.headers['device_flag'] = '1';
  options.headers['clientPlatform'] = 'MINI';
  options.headers['x-auth-platform'] = 1;
  options.headers['third-x-auth-token-fx-uc'] = token;
  options.headers['x-mall-endpoint'] = 'h5';
  // if(url.includes('createImageTextConsult')||url.includes('createFastConsult')){
  //   options.headers['clientPlatform'] = "MINI"
  // }
  // if(config.url.includes('mall-payment-c')){
  //   config.headers['x-auth-platform'] = 1
  //   config.headers['third-x-auth-token-fx-uc'] = token
  //   config.headers['x-mall-endpoint'] = "h5"
  // }
  // if (url.endsWith('searchDoctorIndexById')) {
  //   options.headers['version_code'] = '235A4D';
  // }
  return {
    url,
    options: { ...options, interceptors: true },
  };
});

const requestGet = ({ url, params, needLoading = true, header }: PARAMS) => {
  if (needLoading) {
    Toast.show({ icon: 'loading', duration: 0 });
  }
  return apiMiddle(
    request(ResolveUrl(url), {
      method: 'get',
      params,
      headers: {
        'Content-Type': 'application/json',
        Authorization: getToken(),
        ...header,
      },
    }),
  );
};

const requestPost = ({ url, params, needLoading = true, header }: PARAMS) => {
  if (needLoading) {
    Toast.show({ icon: 'loading', duration: 0 });
  }
  const headers: any = {
    'Content-Type': 'application/json',
    Authorization: '',
  };
  if (!header || header?.Authorization !== '' || header?.Authorization) {
    headers.Authorization = getToken();
  }
  return apiMiddle(
    request(ResolveUrl(url), {
      method: 'post',
      data: params,
      headers: {
        ...headers,
      },
    }),
  );
};

const requestFormData = ({
  url,
  params,
  needLoading = true,
  header,
}: PARAMS) => {
  if (needLoading) {
    Toast.show({ icon: 'loading', duration: 0 });
  }
  return apiMiddle(
    request.post(ResolveUrl(url), {
      method: 'post',
      data: params,
      requestType: 'form',
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: getToken(),
        ...header,
      },
    }),
  );
};
/**
 * @param { Promise } promise 数据请求函数
 * @param { Object= } errorExt - 拓展错误对象
 * @return { Promise } 返回一个Promise
 */
function apiMiddle(promise: Promise<any>) {
  return promise
    .then((data: any) => {
      if (data.success || data.status === 200) {
        return [null, data];
      }
      return [{ ...data }, data];
    })
    .catch((err) => {
      console.log('data -----err', err);

      return [err, undefined];
    })
    .finally(() => {
      console.log('finally is invoked');

      Toast.clear();
    });
}

const URL: any = {
  boss: BOOS_API_HOST,
  mgi: MGI_API_HOST,
};

function ResolveUrl(url: string): string {
  const uri = url.startsWith('/') ? url.substring(1) : url;
  let [key, ...str] = uri.split('/');
  const HOST = URL[key] || MGI_API_HOST;
  return `${HOST}/${str.join('/')}`;
}

export default {
  GET: requestGet,
  POST: requestPost,
  FORM: requestFormData,
};
