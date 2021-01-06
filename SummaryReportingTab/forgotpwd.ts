import {Selector, t} from 'testcafe'
import XPathSelector from '../SummaryReportingTab/components/xpath';

fixture `Testing the forgot password for WebSecurity`
    .page `http://zero.webappsecurity.com/login.html`

test('Automating the forgot password link',async t=>{

    // const forgotLink = Selector('a').withText('Forgot your password ?')
    // const loginform = Selector("#login_form")
    // await t.expect(loginform.exists).ok()
    // await t.click(forgotLink)
    
    // const forgotPage = XPathSelector("//h3[contains(text(),'Forgotten Password')]").innerText
    // await t.expect(forgotPage).contains("Forgotten Password")

    // const forgotEmail = Selector("#user_email")
    // await t.typeText(forgotEmail,'asdf@asdf.com')

    // const sendPasswordLink =Selector(".btn-primary")
    // await t.click(sendPasswordLink)

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
