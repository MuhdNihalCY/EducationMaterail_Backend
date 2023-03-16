var db = require('../config/connection')
var collection = require('../config/collection')
const bcrypt = require('bcrypt');
const { response } = require('../app');


module.exports = {
    DoSignup: (user) => {
        return new Promise(async (resolve, reject) => {
            var Status = {}
            var HaveUser
            var anyUser

            user.Verifed = false;
            user.Admin = false;
            user.password = await bcrypt.hash(user.password, 10);

            await db.get().collection(collection.ADMIN_COLLECTION).find().toArray().then((response) => {
                //console.log(response)
                anyUser = response
            })

            if (anyUser.length > 2) {
                await db.get().collection(collection.ADMIN_COLLECTION).findOne({ "email": user.email }).then((response) => {
                    //  console.log(response);
                    HaveUser = response;
                })
                //  console.log(HaveUser);
                if (!HaveUser) {
                    await db.get().collection(collection.ADMIN_COLLECTION).insertOne(user).then((response) => {
                        //  console.log(response)
                        if (response.insertedId) {
                            Status.LoggedIn = true
                        }
                    });
                } else {
                    Status = false;
                }

            } else {
                user.Verifed = true;
                user.Admin = true;
                await db.get().collection(collection.ADMIN_COLLECTION).findOne({ "email": user.email }).then((response) => {
                    //  console.log(response);
                    HaveUser = response;
                })
                //  console.log(HaveUser);
                if (!HaveUser) {
                    await db.get().collection(collection.ADMIN_COLLECTION).insertOne(user).then((response) => {
                        //  console.log(response)
                        if (response.insertedId) {
                            Status.LoggedIn = true
                            Status.user = user;
                        }
                    });
                } else {
                    Status = false;
                }
            }
            resolve(Status)

        })
    },
    DoLogin: (user) => {
        return new Promise(async (resolve, reject) => {
            var HaveUser
            var userStatus = {}
            await db.get().collection(collection.ADMIN_COLLECTION).findOne({ "email": user.email }).then((response) => {
                HaveUser = response;
                // console.log(HaveUser);
                if (HaveUser) {
                    bcrypt.compare(user.password, HaveUser.password).then((status) => {
                        //console.log(status);
                        if (status) {
                            //correct password
                            userStatus.user = HaveUser;
                            resolve(userStatus)

                        } else {
                            //wrongPassword
                            userStatus.error = true;
                            userStatus.err = "Wrong Password"
                            resolve(userStatus)
                        }
                    })
                } else {
                    //nonuser
                    userStatus.error = true;
                    userStatus.err = "No User or Invalid Email"
                    resolve(userStatus)

                }
            })
        })
    },
    addFiles:(data)=>{
        console.log(data)
        return new Promise(async (resolve,reject)=>{
            await db.get().collection(collection.FILES).insertOne(data).then((response)=>{
                console.log(response)
                var id = response.insertedId.toString();
                resolve(id)
            })
        })
    }
}