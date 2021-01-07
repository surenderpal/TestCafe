import {Selector, t} from 'testcafe';
import XPathSelector from '/Users/surenderpal/Projects/OFFICE/SummaryReportingTab/components/xpath';
import {login} from './helper'
fixture `Login Test`
    .page `http://zero.webappsecurity.com/index.html`

test
    .before(async t=>{
        await login('username','password')

})('Login with valid Credentials',async t=>{
    // selectors
    const paybils = Selector('#pay_bills_tab')
    const addNewPayee = Selector('a').withText('Add New Payee')
    const payeeName = Selector('#np_new_payee_name')
    const payeeAddress = Selector('#np_new_payee_address')
    const account = Selector('#np_new_payee_account')
    const payeeDetails = Selector('#np_new_payee_details')
    const addButton = Selector('#add_new_payee')
    const sucessAlert = Selector('#alert_content').innerText

    // Actions
    await t.click(paybils)
    await t.click(addNewPayee)
    await t.typeText(payeeName,'surender',{paste:true})
    await t.typeText(payeeAddress,'Inida,Dwarka',{paste:true})
    await t.typeText(account,'Account',{paste:true})
    await t.typeText(payeeDetails,'Tester',{paste:true})
    await t.click(addButton)

    // Assertions
    await t.expect(sucessAlert).contains('was successfully created.')

})