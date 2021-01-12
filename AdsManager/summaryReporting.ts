import { USER_ENGINEER } from '../../../util/constants/GlobalConstants';
import {
  campaignsDashboard,
  loginPage,
  tenantDashboard,
  campaignReportingPanel,
  tenantPage
} from '../../../util/constants/ComponentConstants';
import * as fs from 'fs';
import { createNewCampaign } from '../../../util/api_util/CampaignUtils';
import { NavigationUtils } from '../../../util/NavigationUtils';
import { Selector, t } from 'testcafe';
import xpathselector from '/Users/surenderpal/Documents/apps-qa repo/apps-qa/ads-manager/tests/ui_tests/src/component/xpathselector/xpathselector';


const path = require('path');
var scriptName = path.basename(__filename);
scriptName = scriptName.replace('.ts', '');

fixture('Tenant Dashboard Validation').beforeEach(async () => {
  await loginPage.loginWithUser(USER_ENGINEER);
  async function createCampaign() {
    const campaign = await createNewCampaign(USER_ENGINEER);
    return campaign.get('name');
  }
  const campaignName = await createCampaign();
  await NavigationUtils.navigateToTenantDashboard();
  await tenantPage.selectOrg('Demo');
  await tenantDashboard.clickFilterAllButton();
  await tenantDashboard.clickOnCampaign(campaignName);
  await campaignReportingPanel.verifyReportingTabs()
});

async function createCampaign() {
    const campaign = await createNewCampaign(USER_ENGINEER);
    return campaign.get('name');
  }

const download_Image_Btn= xpathselector("//*[text()='Download']")
const download_Png_image= xpathselector("//li[text()='Download PNG image']")
const download_jpg_image= xpathselector("//li[text()='Download JPEG image']")
const download_pdf_image= xpathselector("//li[text()='Download PDF document']")
const fileNamepng = 'chart.png'
const fileNamejpg = 'chart.jpeg'
const fileNamepdf = 'chart.pdf'


//testing Level label text
test.skip('Verify level options and its feature in Xadtable', async t=>{  
  await campaignReportingPanel.verifyLevelLabelExists();
  await campaignReportingPanel.verifyAdGroupLevelExists();
  await campaignReportingPanel.verifyCreativeLevelExists();
  await campaignReportingPanel.verifyCampaignLevelExists();
})

//testing hide and show chart text and feature
test.skip('Verify Hide and show chart in summary tab', async t=>{
  await campaignReportingPanel.verifyHideAndShowChartExists() 
})

// testing export file icon and exported files 
test.skip('Verify export file icon and files in summary tab', async t=>{
  await campaignReportingPanel.verifyExportIconAndExportFilesExists()
})

const creavtiveIconButton= Selector('#btn-cm-viewCreatives')
const creativeImage = Selector('#ad-group-img')
// testing view creative below the chart but view creative feature is not available as it is created using api
test.skip('Verify view creative icon and creatives used in campaign in summary tab', async t=>{
  await t.expect(creavtiveIconButton.exists).ok()
  await t.click(creavtiveIconButton)
  await t.expect(creativeImage.exists).ok()
  await t.click(creativeImage)
})

// testing view creative icon should not available under chart
test('verify that creative icon should not be available', async t=>{
await campaignReportingPanel.veriryCreativeIconButtonNotExists()
})

// testing campaign duration
test.skip('campaign Duration in summary tab',async t=>{
  campaignReportingPanel.verifyCampaignDuration()
  await t.wait(3000)
})


// downloading visit/impression chart
// test.skip('verifying visit/Impression chart in summary tab', async t=>{
// // ask kirti for file download location 
// const downloadLocation = '/Users/surenderpal/Downloads/';
//   await t 
//          .click(download_Image_Btn)
//          .click(download_Png_image)
//          .wait(1000)
//   await t.expect(fs.existsSync(downloadLocation + fileNamepng)).ok();

//   await t 
//          .click(download_Image_Btn)
//          .click(download_jpg_image)
//          .wait(1000)
//   await t.expect(fs.existsSync(downloadLocation + fileNamejpg)).ok();
//   await t 
//          .click(download_Image_Btn)
//          .click(download_pdf_image)
//          .wait(1000)
//   await t.expect(fs.existsSync(downloadLocation + fileNamepdf)).ok();
// })

test('verify column picker in summary tab', async t=>{

  const columnPickerIcon = Selector('#btn-cm-columnPicker')
  const columnPickerModelTitle = xpathselector("//div[contains(text(),'Customize Columns')]")
  const columnPickerModelSaveButton = Selector('#btn-columnPickerModal-save')
  const columnPickerModalCloseButton = Selector('.close-modal-btn')
  const availPresetsAll = xpathselector("//div[contains(text(),'All')]")
  const availPresetsDelivery = xpathselector("//div[@class='columns']/div[contains(text(),'Delivery')]")
  const availPresetsFlightAndBudget = xpathselector("//div[@class='columns']/div[contains(text(),'Flight and budget')]")
  const availPresetsVisits = xpathselector("//div[@class='columns']/div[contains(text(),'Visits')]")
  const availPresetsSecondaryaction = xpathselector("//div[@class='columns']/div[contains(text(),'Secondary actions')]")
  const availPresetsVideo = xpathselector("//div[@class='columns']/div[contains(text(),'Video')]")
  // Verifying on columnn picker testing model title, save and close button
  campaignReportingPanel.verifyColumnPickerIconExists() //-done

  //  testing all Available Presets link are available 
  campaignReportingPanel.verifyColumnPickerAvailablePresetsLinksExists() //-done

  // testing all link under available presets are clickable or not
  // testing all link
  const allCheckBoxes = xpathselector("//input[@type='checkbox']")
  await t.click(availPresetsAll)
  await t.expect(allCheckBoxes.checked).ok()
  
  // testing all presets links are working 

  
  
  // // testing Delivery 
  // const deliverCheckBoxes = xpathselector("")  //div[contains(@class, 'section-group ng-scope')]
})
