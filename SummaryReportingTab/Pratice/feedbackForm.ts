import {Selector, t} from 'testcafe'
import XPathSelector from '/Users/surenderpal/Projects/OFFICE/SummaryReportingTab/components/xpath';

fixture `Automating Feedback form for Zero Bank`
    .page(`http://zero.webappsecurity.com/index.html`)

test('Automating feedback form',async t => {
    // Get selector
    const feedbackButton = Selector("#feedback")
    const name = Selector('#name')
    const email = Selector('#email')
    const subject = Selector('#subject')
    const comment = Selector('#comment')
    const message = Selector('div').innerText
    const sendMessage = Selector("input").withAttribute('value',"Send Message")

    // Actions 
    await t.click(feedbackButton)
    await t.typeText(name, 'surender',{paste: true})
    await t.typeText(email, 'surender.pal@surender.com',{paste: true})
    await t.typeText(subject, 'feedback form testing',{paste: true})
    await t.typeText(comment, 'testing the comment inside the feedback form',{paste: true})
    // await t.pressKey('enter')
    await t.click(sendMessage)

    // Assertions
    await t.expect(message).contains('Thank you for your comments')
    await t.expect(sendMessage.exists).notOk()
})