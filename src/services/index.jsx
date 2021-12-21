const isProd = false;
const urlDev = "http://178.128.99.51:81/admin";
const urlStorage = "http://178.128.99.51:81/storage/";
const urlProd = "http://#";

const Root = isProd ? urlProd : urlDev;

const get = (path) => {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      fetch(`${Root}/${path}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
        .then((result) => result.json())
        .then(
          (result) => {
            resolve(result);
          },
          (err) => {
            reject(err);
          }
        );
    }, 1000);
  });

  return promise;
};

const post = (path, param) => {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      fetch(`${Root}/${path}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "XSRF-TOKEN":
            "eyJpdiI6IlRwczJXSGdCOWdoNUlLUytnOFpyS0E9PSIsInZhbHVlIjoiUUtDeWFSUTlpdkNvN1VlVytTMThYRW1iQzhqTHlSRjA4Q2NCY2tKejdxNnVLSjhVVHVjQkRUdWhQOUV3eldmNEl4dHl1OXJnQS83ckxITy9ZdGhmZ1ZCTE9QRzFvMzJpTWVUd2swbHlTN0hvRURuL2dWL3lZMkNlc1F3YnI1cysiLCJtYWMiOiJiM2FkZDVhODIxOWM0NGVjM2RlMWUwNjdhOThmOTE4ZjM5Yzc4MWFiMWQ3ZjViMDczNmVkMzcwMGEwYjJlMDJjIn0%3D; expires=Fri, 26-Nov-2021 17:22:35 GMT; Max-Age=7200; path=/; samesite=lax",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: param,
      })
        .then((result) => result.json())
        .then(
          (result) => {
            resolve(result);
          },
          (err) => {
            reject(err);
          }
        );
    }, 1000);
  });

  return promise;
};

const deleteData = (path, param) => {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      fetch(`${Root}/${path}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: param,
      })
        .then((result) => result.json())
        .then(
          (result) => {
            resolve(result);
          },
          (err) => {
            reject(err);
          }
        );
    }, 1000);
  });

  return promise;
};

const put = (path, param) => {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      fetch(`${Root}/${path}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: param,
      })
        .then((result) => result.json())
        .then(
          (result) => {
            resolve(result);
          },
          (err) => {
            reject(err);
          }
        );
    }, 1000);
  });

  return promise;
};

const uploadFile = (path, param, method) => {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      fetch(`${Root}/${path}`, {
        method: method,
        headers: {
          Accept: "/",
          // 'accept':'application/json',
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, PATCH, DELETE",
          "Access-Control-Allow-Headers":
            "origin,X-Requested-With,content-type,accept",
          // "content-type": "x-www-form-urlencoded",
          // "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: param,
      })
        .then((result) => result.json())
        .then(
          (result) => {
            resolve(result);
          },
          (err) => {
            reject(err);
          }
        );
    }, 1000);
  });

  return promise;
};

const download = (path) => {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      fetch(`${Root}/${path}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }).then(
        () => {
          resolve(`${Root}/${path}`);
        },
        (err) => {
          reject(err);
        }
      );
    }, 1000);
  });

  return promise;
};

const API = {
  Root,
  urlStorage,
  post,
  deleteData,
  put,
  get,
  uploadFile,
  download,
};

export default API;
