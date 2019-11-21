// var fun_test_01 = async ()=>{
//     const response = await new Promise(resolve => {
//         setTimeout(() => {
//             resolve("async await test...");
//         }, 2000);
//     });
//     console.log(response);
// }
// fun_test_01();

// async function fun_test_02(str) {
//     return await new Promise((resolve, reject) => {
//         setTimeout(() => {
//             resolve(str)
//         }, 1000);
//     })
// }

// const serialFn = async () => { //串行执行
//     console.time('serialFn')
//     console.log(await fun_test_02('string 1'));
//     console.log(await fun_test_02('string 2'));
//     console.timeEnd('serialFn')
// }
// serialFn();

// const parallel = async () => { //并行执行
//     console.time('parallel')
//     const parallelOne = fun_test_02('string 1');
//     const parallelTwo = fun_test_02('string 2');
    
//     //直接打印
//     console.log(await parallelOne)
//     console.log(await parallelTwo)

//     console.timeEnd('parallel')
// }
// parallel();

// =====================================================================
// 真正合理的的 promise理解
/**
 * 1. promise 只是一个函数的链式调用
 *      可以理解为当返回 Promise 对象时会自动对接当前调用函数的 then(catch) 方法
 * ! 当写 then 时需要返回 有且其必须为 Promise 对象否则会报错
 */
const fun1 = function(num) {
    // // 1. 标准写法大概
    return new Promise((resolve, reject) => {
        if (num) {
            setTimeout(function() {
                resolve('is ture')
            }, 2000)
        }
        else {
            setTimeout(() => {
                reject('is false')
            }, 2000);
        }
    })

    // // 2.
    // if (num) {
    //     return Promise.resolve('is true')
    // }
    // else {
    //     return Promise.reject('is false')
    // }

    // // fail 的写法
    // return 'fdfdffd'
}
fun1(1)
.then(data => {
    console.log(data)
})
.catch(error => {
    console.log(error)
})
