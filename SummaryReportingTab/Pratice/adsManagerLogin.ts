import {Selector, t} from 'testcafe'
import XPathSelector from '/Users/surenderpal/Projects/OFFICE/SummaryReportingTab/components/xpath';
fixture `Ads Manager login test`
    .page `https://ads-release-3-17-np.groundtruth.com/login`

test('Login Ads Manager with invalid Credentials',async t=>{

    const LoginForm = Selector('#login-form')
    await t.expect(LoginForm.exists).ok()

    const EmailInputBox = Selector('#inp-signin-usernameLogin')
    const PasswordInputBox =  Selector('#inp-signin-passwordLogin')
    await t.typeText(EmailInputBox,'username@gmail.com',{paste:true})
    await t.typeText(PasswordInputBox, 'invalid password',{paste:true})

    const SignInButton = Selector('#btn-signin-signIn')
    await t.expect(SignInButton.exists).ok()
    await t.click(SignInButton)

    const errormessage = Selector(".error-flash-msg").innerText
    await t.expect(errormessage).contains('Invalid email or password')
    await t.wait(2000)
})

test('Login with valid Credemtials',async t=>{

    const LoginForm = Selector('#login-form')
    await t.expect(LoginForm.exists).ok()

    const EmailInputBox = Selector('#inp-signin-usernameLogin')
    const PasswordInputBox =  Selector('#inp-signin-passwordLogin')
    await t.typeText(EmailInputBox,'surender.pal@groundtruth.com',{paste:true})
    await t.typeText(PasswordInputBox, 'Surenderpal@1991',{paste:true})

    const SignInButton = Selector('#btn-signin-signIn')
    await t.expect(SignInButton.exists).ok()
    await t.click(SignInButton)

    const dashboard =XPathSelector("//div[contains(text(),'Dashboard')]")
    await t.expect(LoginForm.exists).notOk()

    const logoutButton = XPathSelector("//a[contains(text(),'Sign Out')]")
    await t.expect(logoutButton.exists).ok()

    const Username = Selector('#btn-userOptions-userOptionsMenuToggle')
    await t.click(Username)
    await t.click(logoutButton)
    await t.expect(SignInButton.exists).ok()
})