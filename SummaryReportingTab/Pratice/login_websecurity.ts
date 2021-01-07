import {Selector} from 'testcafe'
import { login } from './helper'

import Navbar from '../page-objects/components/navbar';

const navbar = new Navbar()

fixture `Login Test`
    .page `http://zero.webappsecurity.com/index.html`

test.before (async t=>{
        await login('invalid username','invalid password')
    })

("User can't login with invalid credentials",async t=> {
    const errorMessage = Selector('.alert-error').innerText
    await t.expect(errorMessage).contains("Login and/or password are wrong.")
})

test
    .before(async t=>{
        await login('username','password')
    })
("User can login with valid credentials only",async t=> {
    // const signInButton = Selector('#signin_button')
    // await t.click(signInButton)

    const loginForm = Selector("#login_form")
    const accounntSummaryTab = Selector('#account_summary_tab')
    await t.expect(accounntSummaryTab.exists).ok()
    await t.expect(loginForm.exists).notOk()

    const userIcon = Selector('.icon-user')
    await t.click(userIcon)

    const logoutButton = Selector('#logout_link')
    await t.expect(logoutButton.exists).ok()

    await t.click(logoutButton)
    await t.expect(navbar.signInButton.exists).ok()
})