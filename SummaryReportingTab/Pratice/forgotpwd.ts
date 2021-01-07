import {Selector, t} from 'testcafe'
import Navbar from '../page-objects/components/navbar'
import XPathSelector from '../components/xpath';

const navbar = new Navbar()

fixture `Testing the forgot password for WebSecurity`
    .page `http://zero.webappsecurity.com/login.html`

test('Automating the forgot password link',async t=>{
    // Get selector
    const forgotLink = Selector('a').withText('Forgot your password ?')
    const loginform = Selector("#login_form")
    const forgotPage = Selector('h3').withText('Forgotten Password').innerText
    const forgotEmail = Selector("#user_email")
    const sendPasswordLink =Selector(".btn-primary")
    const message = Selector('div').innerText

    // Actions
    await t.expect(loginform.exists).ok()
    await t.click(forgotLink)
    await t.expect(forgotPage).contains("Forgotten Password")
    await t.typeText(forgotEmail,'asdf@asdf.com',{paste:true})
    await t.pressKey('enter')

    // Assertions
    await t.expect(message).contains('asdf@asdf.com')
    await t.expect(forgotEmail.exists).notOk()
})
