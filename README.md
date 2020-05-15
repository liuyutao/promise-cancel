记录一个考察Promise的面试题 


1. 请实现如下函数
function sleep(timeout: number): Promise {
throw new Error('Not implemented');
}
2. 请修改上述函数的接口和实现，让该函数支持取消。也就是说，可以在sleep没有结束前，promise提前resolve
