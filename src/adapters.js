const getResponse = (res, config) => {
  const { statusCode, errMsg } = res;
  const response = {
    ...res,
    status: statusCode,
    statusText: errMsg,
    config,
    request: null,
  };

  return response;
};

const uniAdapter = (config) => {
  if (!uni) {
    throw new Error("please use this in uni-app project!");
  }
  return new Promise((resolve, reject) => {
    const { baseURL, url, headers, data, params } = config;
    const uniConfig = {
      ...config,
      url: baseURL + url,
      header: headers,
    };

    if (data || params) {
      uniConfig.data = JSON.parse(data || params);
    }
    uni.request({
      ...uniConfig,
      success(res) {
        const response = getResponse(res);
        resolve(response, config);
      },
      fail(res) {
        const response = getResponse(res);
        reject(response, config);
      },
    });
  });
};

export default uniAdapter;
