import {t} from 'testcafe'
 export async function login(username, password){
    await t.click('#signin_button')
    await t.typeText('#user_login',username,{paste: true})
    await t.typeText('#user_password',password,{paste: true})
    await t.click('.btn-primary')
}




