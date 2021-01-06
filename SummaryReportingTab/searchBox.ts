import {Selector, t}  from 'testcafe'
import XPathSelector from '../SummaryReportingTab/components/xpath'

fixture `Automating the seachbox functionality`
    .page `http://zero.webappsecurity.com/index.html`

test('Testing the search functionality', async t=>{
    // Get selector
    const searchBox = Selector('#searchTerm') // search box button
    const searchform = Selector('.navbar-search') //form
    const resultpage = Selector('a').withText('Zero - Free Access to Online Banking').innerText
    const searchResults = Selector('h2').withText('Search Results:').innerText

    // Actions
    await t.expect(searchform.exists).ok()
    await t.typeText(searchBox, 'online banking')
    await t.pressKey('enter')


    // Assertions
    await t.expect(searchBox.exists).ok()
    await t.expect(searchResults).contains('Search Results:')
    await t.expect(resultpage).contains('Zero - Free Access to Online Banking')

})
