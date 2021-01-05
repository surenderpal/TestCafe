import {Selector, t} from 'testcafe'
fixture `Getting started with TestCafe`
    .page `https://devexpress.github.io/testcafe/example/`
    .before(async t =>{
        // test setup for hooks goes here
        // await runDatabaseReset()
        // await seedTestData()
    })
    .beforeEach(async t =>{
        // runs before each test
    })
    .after(async t => {
        // cleaning test data
        //Logging and sending data to monitoring systems
    })
    .afterEach(async t=> {
        //Runs after each test
    })

test('my first testcafe test',async t =>{

    //here goes testcafe code 
    // await t.setTestSpeed(0.1)
    const developer_name = Selector('#developer-name')
    const submit_btn= Selector('#submit-button')
    const articleText= Selector('#article-header').innerText
     
    await t.typeText(developer_name,'surender pal')
    await t.click(submit_btn)
    // await t.takeScreenshot({fullPage:true})
    // await t.takeElementScreenshot(Selector('#article-header'))
    await t.expect(articleText).contains('pal')
})



 