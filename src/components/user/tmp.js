// const tmp = {
//     rules: {
//         name: ["required", "length[5,10]"],
//         email: "email",
//         hero: "required",
//         addr: {
//             "required":true,
//             "myrule":{
//                 "validator": (value) => {
//                     if (...){
//                         return true;
//                     } else {
//                         return Promise(resolve => {
//                             //...
//                             resolve(true);
//                         });
//                     }
//                 },
//                 "message": "my error message."
//             }
//         }
//     }
// }