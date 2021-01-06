import {Selector} from 'testcafe'

fixture `Login Test`
    .page `http://zero.webappsecurity.com/index.html`

// test("User can't login with invalid credentials",async t=> {
//     const signInButton = Selector('#signin_button')
//     await t.click(signInButton)

//     const loginForm = Selector("#login_form")
//     await t.expect(loginForm.exists).ok()

//     const username = Selector('#user_login')
//     const password = Selector('#user_password')
//     await t.typeText(username,'invalid username',{paste: true})
//     await t.typeText(password,'invalid password',{paste: true})

//     const submit_Btn = Selector('.btn-primary')
//     await t.click(submit_Btn)

//     const errorMessage = Selector('.alert-error').innerText
//     await t.expect(errorMessage).contains("Login and/or password are wrong.")
// })

test("User can login with valid credentials only",async t=> {
    const signInButton = Selector('#signin_button')
    await t.click(signInButton)

    const loginForm = Selector("#login_form")
    await t.expect(loginForm.exists).ok()

    const username = Selector('#user_login')
    const password = Selector('#user_password')
    await t.typeText(username,'username',{paste: true})
    await t.typeText(password,'password',{paste: true})

    const submit_Btn = Selector('.btn-primary')
    await t.click(submit_Btn)

    const accounntSummaryTab = Selector('#account_summary_tab')
    await t.expect(accounntSummaryTab.exists).ok()
    await t.expect(loginForm.exists).notOk()

    const userIcon = Selector('.icon-user')
    await t.click(userIcon)

    const logoutButton = Selector('#logout_link')
    await t.click(logoutButton)

    await t.expect(logoutButton.exists).ok()
    await t.expect(signInButton.exists).ok()
})