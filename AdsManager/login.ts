import {Selector, t } from 'testcafe';
import XPathSelector from '/Users/surenderpal/Projects/OFFICE/SummaryReportingTab/components/xpath';
import * as fs from 'fs';
import exists from 'file-exists-sync';
//Login screen variable declarations
const username = Selector('#inp-signin-usernameLogin')
const password = Selector('#inp-signin-passwordLogin')
const submit = Selector('#btn-signin-signIn')
const hammenu = Selector('#btn-appMenu')
//New campaign creation variable declarations
const newcampButton = Selector('#btn-campDash-newCampaign')
const campaignName = Selector('#inp-createCampModal-campName')
const campaignNameText = 'autocamp Karan'
const campaignSave = Selector('#btn-campaignCreateModal-submit')
const location = XPathSelector("//h3[normalize-space()='Target by Location']")
const onPT = XPathSelector("//h4[normalize-space()='On Premise Targeting']")
const NexttoDevicePage= Selector('#btn-adgGoals-next')
const deviceTypebutton = Selector('#main-content-frame > div > div > div.adgroup-selected-view-wrapper.ng-scope > div > div > div > div > gt-device-type > div > button')
const NexttoTargetingPage =Selector('#btn-adgTargetSup-next')
const selectbranddropdwn =Selector('#onpremise-blueprint-fields > selection-list-onpremise > div > gt-autocomplete > div > div.input-wrapper > input')
const selectbrandvalue = XPathSelector("//li[@class='autocomplete-item ng-binding ng-scope highlighted'][normalize-space()='7-Eleven']")
const NextToCreativesPage = Selector('#btn-adgTargetSup-next')
const NewCreativeBtn = Selector("#btn-adgCreatives-newCreative")
const htmlCreative = Selector("#btn-adgCreatives-tabHTML5")
const creativeUrl = XPathSelector("//input[@id='inp-creativeModalHTML-clickThroughURLField']")
const saveCreative = Selector('#btn-creativesModal-newCreativeSave')
const creativeUrlText = 'www.google.com'
const NexttoBudgetPage = Selector('#btn-adgTargetSup-creativesTabNext')
const bidprice = Selector('#inp-adgTargetSup-bidPrice')
const budget = Selector('#inp-adgTargetSup-budgetField_0')
const Save = Selector('#btn-adgTargetSup-BudSchedSave')
//Tenant dashboard variable declarations
const tenantselector = Selector('#tenantMultiselect')
const selecttesttenant =XPathSelector("//input[@id='search-dropdown-list-Tenant']")
const tenantselectorSearch = Selector('#search-dropdown-list-Tenant')
const orgselector = Selector('#organizationMultiSelect')
const orgselectorsearch = Selector('#search-dropdown-list-Organization')
const accselector = Selector('#accountsMultiselect')
const accselectorsearch = Selector('#search-dropdown-list-Account')
const activefilter = Selector('#btn-tenantDash-filterActive')
const pendingfilter = Selector('#btn-tenantDash-filterpending')
const pausefilter = Selector('#btn-tenantDash-filterPaused')
const campaign1 = XPathSelector(("//a[normalize-space()='CPG test audience']"))
const campaign2 = XPathSelector("//a[contains(text(),'3.17-CBD')]")
fixture('new-campaign-creation')
.page('https://ads-release-3-17-np.groundtruth.com/');
test('Download images for Summary Tab',async t => {
    await t.setTestSpeed(0.8)
    await t.maximizeWindow()
    await t.typeText(username,'surender.pal@groundtruth.com')
    await t.typeText(password,'Surenderpal@1991')
    await t.click(submit)
    await t.expect(hammenu.exists).ok
    //get first window handle
    const window1 = await t.getCurrentWindow()
    //select Tenant
    await t.click(tenantselector)
    await t.click('#Tenant-0')
    await t.click(tenantselector)
    await (3000)
    await t.typeText(tenantselectorSearch,'Test Tenant')
    await(2000)
    await t.click('#Tenant-0')
    //select Organisation
    await t.click(orgselector)
    await (3000)
    await t.typeText(orgselectorsearch,'new org for group direct ops')
    await(2000)
    await t.click('#Organization-0')
    //select Account
    await t.click(accselector)
    await (3000)
    await t.typeText(accselectorsearch,'CPG test')
    await(2000)
    await t.click('#Account-0')
    
    //Click on level
    await t.click(campaign1)
    await t.wait(5000)
    var EXlevel:string[];
    var AClevel:string[];
    EXlevel = ["Campaign","Ad Groups","Creatives"] 
    const level = Selector("#cm-selectTableLevel")

    // testing Level label and  drop-down box 
    const LevelSelect = Selector('#cm-selectTableLevel');
    const LevelOption = LevelSelect.find('option');
    const LevelLbl = XPathSelector("//label[contains(text(),'Level')]")
    const ReportNamelbl = XPathSelector("//label[contains(text(),'Report Name')]")
    const HideChartlbl = XPathSelector("//span[contains(text(),'Hide Chart')]")
    const durationlbl = XPathSelector("//label[contains(text(),'Duration')]")
    const hideChart = XPathSelector("//span[contains(text(),'Hide Chart')]")
    
    //testing Level label text
    const lvlLBL = await LevelLbl.innerText;
    await t.expect(lvlLBL).contains('Level')
    const targetingIndicator = Selector('#tableHeader-column-targeted_product')
    const creativeSize = Selector('#tableHeader-column-creativeSize')
     
    // testing adgroup level
    await t.expect(targetingIndicator.exists).ok()
    await t.expect(creativeSize.exists).notOk()

    // testing creative level
    const creativeType=Selector('#tableHeader-column-creativeType')
    await t
         .click(LevelSelect)
         .click(LevelOption.withText('Creatives'))
    await t.expect(creativeType.exists).ok()
    await t.expect(targetingIndicator.exists).notOk()

    //  testing campaign level
     const name= Selector('#tableHeader-column-name')
    await t
          .click(LevelSelect)
          .click(LevelOption.withText('Campaign'))
     await t.expect(creativeType.exists).notOk()
     await t.expect(targetingIndicator.exists).notOk()
     await t.expect(name.exists).ok()

     // testing creative Icon and functionality
     const creavtiveIconbutton= Selector('#btn-cm-viewCreatives')
     const creativeImage = Selector('#ad-group-img')
     await t.expect(creavtiveIconbutton.exists).ok()
     await t.click(creavtiveIconbutton)
     await t.expect(creativeImage.exists).ok()
     await t.click(creativeImage)
     await t.wait(4000)

     // testing filter column Icon and functionality
     const filterColumnIcon = XPathSelector("//div[@class='click-element']")  // XPathSelector("//div[@class='click-element']")  Selector('.click-element')
     
     await t.click(filterColumnIcon)
     await t.expect(filterColumnIcon.exists).ok()


     //testing Report Name label text     
    const rprtLBL = await ReportNamelbl.innerText;
    await t.expect(rprtLBL).contains('Report Name')





     // testing Hide Charat label name and functionality--complete
    const hidchrtLBL = await HideChartlbl.innerText;
    await t.expect(hidchrtLBL).contains('Hide Chart')
    const showChart =  XPathSelector("//span[contains(text(),'Show Chart')]")
    await t.click(hideChart)
    await t.expect(showChart.exists).ok()
    await t.expect(hideChart.exists).notOk()
    await t.click(showChart)
    await t.expect(hideChart.exists).ok()
    await t.expect(showChart.exists).notOk() 

    // testing duration label level
    const durationLBL = await durationlbl.innerText;
    await t.expect(durationLBL).contains('Duration')

    await t
         .click(LevelSelect)
         .click(LevelOption.withText('Campaign'))
        // console.log(LevelOption.withText('Campaign'))
    
    
    await t.wait(5000)
    const len=LevelOption.length


    // testing report name
    const ReportSelect = Selector('#cm-selectReport');
    const ReportOption = ReportSelect.find('option');
    await t
         .click(ReportSelect)
         .click(ReportOption.withText('Lookback Window'))
    await t
         .click(ReportSelect)
         .click(ReportOption.withText('Day of the Week')) //[Daily Trend,Lookback Window,Day of the Week,Time of the Day,Day of the Week + Time of the Day,Brand Targeted (Table Only),Category Targeted (Table Only),OS (Table Only),Device (Table Only),Reporting by Product,Incremental Visits (Beta)]

    // testing impressions[LEFT] matrix
    const ImpressionSelect = Selector('#inp-lineChartMulti-metric1');
    const ImpressionOption = ImpressionSelect.find('option');
    await t
         .click(ImpressionSelect)
         .click(ImpressionOption.withText('Open Hour Visits'))
    await t
         .click(ImpressionSelect)
         .click(ImpressionOption.withText('SAR'))  //[Impressions,Open Hour Visits,Clicks,CTR,Daily Reach,Cumulative Reach,Total Spend,Secondary Actions,Visits,SAR]
    
    // testing Visits [RIGHT] matrix
    const  visitsSelect = Selector("#inp-lineChartMulti-metric2")
    const  visitOption = visitsSelect.find('option')
    await t
         .wait(5000)
         .click(visitsSelect)
         .click(visitOption.withText('Clicks'))
    await t
         .click(visitsSelect)
         .click(visitOption.withText('Total Spend'))
    // testing by clicking on hide chart button
    const HideChartBtn= Selector('#btn-cm-toggleChart')
//     await t
//             .click(HideChartBtn)
     // clicking on the download button
     const download_Image_Btn= XPathSelector("//*[text()='Download']")
     const download_Png_image= XPathSelector("//li[text()='Download PNG image']")
     const download_jpg_image= XPathSelector("//li[text()='Download JPEG image']")
     const download_pdf_image= XPathSelector("//li[text()='Download PDF document']")
     const fileNamepng = 'chart.png'
     const fileNamejpg = 'chart.jpeg'
     const fileNamepdf = 'chart.pdf'
     const downloadLocation = '/Users/surenderpal/Downloads/';
     // await t 
     //        .click(download_Image_Btn)
     //        .click(download_Png_image)
     //        .wait(1000)
     // await t.expect(fs.existsSync(downloadLocation + fileNamepng)).ok();

     // await t 
     //        .click(download_Image_Btn)
     //        .click(download_jpg_image)
     //        .wait(1000)
     // await t.expect(fs.existsSync(downloadLocation + fileNamejpg)).ok();
     // await t 
     //        .click(download_Image_Btn)
     //        .click(download_pdf_image)
     //        .wait(1000)
     // await t.expect(fs.existsSync(downloadLocation + fileNamepdf)).ok();

     // working with export under the chart
     const export_Btn = Selector("#btn-cm-exportData") 
     const export_campaign_summary = Selector("#btn-exportModal-exportCampaignSummary")
     const export_location_reports = Selector("#btn-exportModal-exportLocationReport")
     const export_table_data = Selector("#btn-exportModal-exportTableData")
     const export_report_data = Selector("#btn-exportModal-exportReportData")
     const export_user_change_log = Selector("#btn-exportModal-exportChangeLog")
     const export_end_client_report = Selector("#btn-exportModal-endClientReport")

     await t
             .click(export_Btn)
             .click(export_campaign_summary)
             .wait(1000)
             
     await t.expect(export_campaign_summary.exists).ok()
     await t.expect(export_location_reports.exists).ok()
     await t.expect(export_table_data.exists).ok()
     await t.expect(export_report_data.exists).ok()
     await t.expect(export_user_change_log.exists).ok()
     await t.expect(export_end_client_report.exists).ok()

})


