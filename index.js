function sleep(timeout: number):Promise{throw new Error('Not implemented');}

function sleep(timeout){
  return new Promise((resolve,reject) => {
    setTimeout(function(){
      resolve();
    },timeout*1000)
  })
}

// 第一个实现 通过循环判断标记位，如果设置已取消，然后停止循环。
function sleepCanCancel(timeout){
  function rst(){
    let isCanceled = false;
    let timeCount = 0;

    this.cancel = () => {
      isCanceled = true;
    }
    return new Promise((resolve,reject) => {
      let interv = setInterval(()=>{
        timeCount += 10;
        if(isCanceled){
          resolve();
          clearInterval(interv);
        }else{
          if(timeCount >= timeout *1000){
            resolve();
            clearInterval(interv);
          }
        }
      },10);
    });
  }
  
  return new rst();
}



// 第二个实现 主动触发停止，关键点在于声明Promise时，将resolve 赋值给内部变量
function sleepCanCancel(timeout){
  let cancelResolve;
  Promise.prototype.isCanceled = false;
  Promise.prototype.cancel = function(){
    this.isCanceled = true;
    cancelResolve();
  }
  let t = this;
  return new Promise((resolve,reject) => {
    cancelResolve = resolve;
    setTimeout(()=>{
      if(!t.isCanceled){
        resolve()
      }
    },timeout*1000)
  });
}





