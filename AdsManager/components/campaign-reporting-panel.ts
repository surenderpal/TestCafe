import { Selector, t } from 'testcafe';
import { CampaignAndAdGroupStatuses, CampaignPage } from './campaign-page';
import { getCurrentDate, getDateInFuture } from '../../../util/DateUtils';
import { CURRENCY_USD } from '../../../util/constants/AccountConstants';
import xpathselector from '../../xpathselector/xpathselector';
import { AdgroupTargeting } from '../../../util/constants/CampaignAndAdgroupConstants';
import * as fs from 'fs';
/**
 * Campaign Reporting Panel.
 * (../../assets/screenshots/main/campaigns/CampaignReporting.png)
 * (../../assets/screenshots/main/campaigns/RetractOrder.png)
 */
export class CampaignReportingPanel {
  readonly parent: CampaignPage;
  readonly campaignReportingTable = new CampaignReportingTable(this);
  readonly adgroupReportingTable = new AdgroupReportingTable(this);

  protected readonly summaryTab = Selector('#btn-cm-summaryTab');
  protected readonly locationTab = Selector('#btn-cm-locationTab');
  protected readonly audienceTab = Selector('#btn-cm-audienceTab');
  protected readonly levelDropdown = Selector('#cm-selectTableLevel');
  protected readonly reportTypeDropdown = Selector('#cm-selectReport');
  protected readonly chartYdropdown = Selector('#inp-lineChartMulti-metric1');
  protected readonly chartXdropdown = Selector('#inp-lineChartMulti-metric2');
  protected readonly durationField = Selector("input[name='daterange']");
  protected readonly LevelLabel = xpathselector("//label[contains(text(),'Level')]")
  protected readonly targetingIndicatorColumnInXadTable = Selector('#tableHeader-column-targeted_product')
  protected readonly creativeSizeInXadTable = Selector('#tableHeader-column-creativeSize')
  protected readonly LevelSelect = Selector('#cm-selectTableLevel');
  protected readonly LevelOption = this.LevelSelect.find('option');
  protected readonly creativeType=Selector('#tableHeader-column-creativeType')
  protected readonly targetingIndicator = Selector('#tableHeader-column-targeted_product')
  protected readonly name= Selector('#tableHeader-column-name')
  protected readonly hideChartButton = xpathselector("//span[contains(text(),'Hide Chart')]")  
  protected readonly showChartButton =  xpathselector("//span[contains(text(),'Show Chart')]") 
  protected readonly exportCampaignSummary = Selector("#btn-exportModal-exportCampaignSummary")
  protected readonly exportLocationReports = Selector("#btn-exportModal-exportLocationReport")
  protected readonly exportTableData = Selector("#btn-exportModal-exportTableData")
  protected readonly exportReportData = Selector("#btn-exportModal-exportReportData")
  protected readonly exportUserChangelog = Selector("#btn-exportModal-exportChangeLog")
  protected readonly exportEndClientReport = Selector("#btn-exportModal-endClientReport")
  protected readonly creavtiveIconButton = Selector('#btn-cm-viewCreatives')
  protected readonly exportButton = Selector("#btn-cm-exportData")
  protected readonly columnPickerIcon = Selector('#btn-cm-columnPicker')
  protected readonly filterColumnIcon = xpathselector("//div[@id='multi-select-dropdown']/div[@class='click-element']")
  protected readonly creativeImage = Selector('#ad-group-img')
  protected readonly columnPickerModelTitle = xpathselector("//div[contains(text(),'Customize Columns')]")
  protected readonly columnPickerModelSaveButton = Selector('#btn-columnPickerModal-save')
  protected readonly columnPickerModalCloseButton = Selector('.close-modal-btn')
  protected readonly availPresetsAll = xpathselector("//div[contains(text(),'All')]")
  protected readonly availPresetsDelivery = xpathselector("//div[@class='columns']/div[contains(text(),'Delivery')]")
  protected readonly availPresetsFlightAndBudget = xpathselector("//div[@class='columns']/div[contains(text(),'Flight and budget')]")
  protected readonly availPresetsVisits = xpathselector("//div[@class='columns']/div[contains(text(),'Visits')]")
  protected readonly availPresetsSecondaryaction = xpathselector("//div[@class='columns']/div[contains(text(),'Secondary actions')]")
  protected readonly availPresetsVideo = xpathselector("//div[@class='columns']/div[contains(text(),'Video')]")
  protected readonly allCheckBoxes = xpathselector("//input[@type='checkbox']")

  async verifyReportingTabs() {
    await t
      .expect(this.summaryTab.visible)
      .ok()
      .expect(this.locationTab.visible)
      .ok()
      .expect(this.audienceTab.visible)
      .ok();

    await CampaignReportingPanel.verifyActiveReportingTab(ReportingTabs.SUMMARY);
  }

  //testing Level label text
  async verifyLevelLabelExists(){
    const levelLabel = await this.LevelLabel.innerText;
    await t.expect(levelLabel).contains('Level')
  }

  // testing adgroup level 
  async verifyAdGroupLevelExists(){
  await t.expect(this.targetingIndicatorColumnInXadTable.exists).ok()
  await t.expect(this.creativeSizeInXadTable.exists).notOk()
  }

  // testing creative adgroup level
  async verifyCreativeLevelExists(){
    await t
        .click(this.LevelSelect)
        .click(this.LevelOption.withText('Creatives'))
    await t.expect(this.creativeType.exists).ok()
    await t.expect(this.targetingIndicator.exists).notOk()
  }

  //  testing campaign level   
  async verifyCampaignLevelExists(){
    await t
          .click(this.LevelSelect)
          .click(this.LevelOption.withText('Campaign'))
     await t.expect(this.creativeType.exists).notOk()
     await t.expect(this.targetingIndicator.exists).notOk()
     await t.expect(this.name.exists).ok()
  }

  // testing hide and show chart exists
  async verifyHideAndShowChartExists(){
    await t.expect(this.hideChartButton.innerText).contains('Hide Chart')  
    await t.click(this.hideChartButton) 
    await t.expect(this.showChartButton.exists).ok() 
    await t.expect(this.hideChartButton.exists).notOk()
    await t.expect(this.showChartButton.innerText).contains('Show Chart')
    await t.click(this.showChartButton)    
    await t.expect(this.hideChartButton.exists).ok()    
    await t.expect(this.showChartButton.exists).notOk()  
  }

  // testing export button and export files
  async verifyExportIconAndExportFilesExists(){
    await t
        .click(this.exportButton)
        // .click(exportCampaignSummary) 
        // .click(exportLocationReports)
        // .click(exportTableData)
        // .click(exportReportData)
        // .click(exportUserChangelog)
        // .click(exportEndClientReport)

  await t.expect(this.exportCampaignSummary.exists).ok()
  await t.expect(this.exportLocationReports.exists).ok()
  await t.expect(this.exportTableData.exists).ok()
  await t.expect(this.exportReportData.exists).ok()
  await t.expect(this.exportUserChangelog.exists).ok()
  await t.expect(this.exportEndClientReport.exists).ok()
  }

  // testing creative icon should not be available as campaign created using API 
  async veriryCreativeIconButtonNotExists(){
    await t.expect(this.exportButton.exists).ok()
    await t.expect(this.columnPickerIcon.exists).ok()
    await t.expect(this.filterColumnIcon.exists).ok()
    if (await t.expect(this.columnPickerIcon.exists).ok()){
      await t.expect(this.creavtiveIconButton.exists).ok()
      await t.click(this.creavtiveIconButton)
      await t.expect(this.creativeImage.exists).ok()
      await t.click(this.creativeImage)
    } else {
      return false;
    }
    return true;
  }
  // testing column picker title,save and close button
  async verifyColumnPickerIconExists(){
    await t.click(this.columnPickerIcon)
    await t.expect(this.columnPickerModelTitle.innerText).contains('Customize Columns')
    await t.expect(this.columnPickerModelSaveButton.exists).ok()
    await t.expect(this.columnPickerModalCloseButton.exists).ok()
  }

  // testing all Available Presets link are available under column picker
  async verifyColumnPickerAvailablePresetsLinksExists(){
    await t.expect(this.availPresetsAll.exists).ok()
    await t.expect(this.availPresetsDelivery.exists).ok()
    await t.expect(this.availPresetsFlightAndBudget.exists).ok()
    await t.expect(this.availPresetsVisits.exists).ok()
    await t.expect(this.availPresetsSecondaryaction.exists).ok()
    await t.expect(this.availPresetsVideo.exists).ok()
  }
  // testing all presets links are working 
  async verifyColumnPickerAvailablePresetsLinksAreWorking(){
    
  }




  async verifyReportingLevels() {
    await t.expect(this.levelDropdown.visible).ok();

    let dropdownOptions = Selector(this.levelDropdown.find('option'));
    for (let i = 0; i < (await dropdownOptions.count); i++) {
      await t.expect(await dropdownOptions.nth(i).textContent).eql(Object.values(ReportingLevels)[i]);
    }

    await this.verifyActiveReportingLevel(ReportingLevels.ADGROUPS);
  }

  async verifyReportTypes() {
    await t.expect(this.reportTypeDropdown.visible).ok();

    let dropdownOptions = Selector(this.reportTypeDropdown.find('option'));
    for (let i = 0; i < (await dropdownOptions.count); i++) {
      await t.expect(await dropdownOptions.nth(i).textContent).eql(Object.values(ReportTypes)[i]);
    }

    await this.verifyActiveReportType(ReportTypes.DAILY_TREND);
  }

  async verifyReportChartValues() {
    await t
      .expect(this.chartYdropdown.visible)
      .ok()
      .expect(this.chartXdropdown.visible)
      .ok();

    let yDropdownOptions = Selector(this.chartYdropdown.find('option'));
    let xDropdownOptions = Selector(this.chartXdropdown.find('option'));
    for (let i = 0; i < (await yDropdownOptions.count); i++) {
      await t
        .expect(await yDropdownOptions.nth(i).textContent)
        .eql(Object.values(ChartValues)[i])
        .expect(await xDropdownOptions.nth(i).textContent)
        .eql(Object.values(ChartValues)[i]);
    }
    await this.verifyActiveChartValue(ChartValues.IMPRESSIONS, 'Y');
    await this.verifyActiveChartValue(ChartValues.VISITS, 'X');
  }

  async verifyCampaignDuration() {
    let duration = await this.durationField.value;
    let expectedDuration = `${getCurrentDate()} - ${getDateInFuture(7)}`;
    await t.expect(duration).eql(expectedDuration);
  }

  private static async verifyActiveReportingTab(expectedActiveTab: ReportingTabs) {
    let activeTab = await Selector('.report-tabs>a.active>span:nth-child(2)').textContent;
    await t.expect(activeTab).eql(expectedActiveTab);
  }

  private async verifyActiveReportingLevel(expectedActiveLevel: ReportingLevels) {
    let activeLevel = await Selector(this.levelDropdown.find('option[selected]')).textContent;
    await t.expect(activeLevel).eql(expectedActiveLevel);
  }

  private async verifyActiveReportType(expectedActiveType: ReportTypes) {
    let activeType = await Selector(this.reportTypeDropdown.find('option[selected]')).textContent;
    await t.expect(activeType).eql(expectedActiveType);
  }

  private async verifyActiveChartValue(expectedActiveValue: ChartValues, chart: 'X' | 'Y') {
    let chartDropdown;
    if (chart == 'X') chartDropdown = this.chartXdropdown;
    else chartDropdown = this.chartYdropdown;

    let activeValue = await Selector(chartDropdown.find('option[selected]')).textContent;
    await t.expect(activeValue).eql(expectedActiveValue);
  }
}

export class ChannelCampaignReportingPanel extends CampaignReportingPanel {
  private readonly submitForApprovalButton = Selector('#btn-cm-submitApproval');
  private readonly channelTermsModalCheckbox = Selector('#inp-channelTermsModal-termsChecked');
  private readonly submitButton = Selector('#btn-channelTermsModal-submit');
  private readonly retractSubmissionAndEditButton = Selector('#btn-cm-retractSubmission');
  private readonly approveAndLaunchButton = Selector('#btn-cm-approveLaunch');
  private readonly firstOrder = Selector('#tableBody-row-0 > div:nth-child(3) > div:nth-child(1)');
  private readonly rejectButton = Selector('#btn-cm-reject');

  async submitDraftedCampaign() {
    await this.clickSubmitForApprovalButton();
    await this.selectChannelTermsModalCheckbox();
    await this.clickSubmitButton();
  }

  async approveAndLaunchCampaign() {
    await t.doubleClick(this.firstOrder).click(this.approveAndLaunchButton);
  }

  async verifyPanelIsDisplayed() {
    await t.expect(this.submitForApprovalButton.exists).ok();
  }

  async clickRetractSubmissionAndEditButton() {
    await t
      .expect(await this.retractSubmissionAndEditButton.exists)
      .ok()
      .click(await this.retractSubmissionAndEditButton);
  }

  private async clickSubmitForApprovalButton() {
    await t.click(this.submitForApprovalButton);
  }

  private async selectChannelTermsModalCheckbox() {
    await t.hover(this.channelTermsModalCheckbox).click(this.channelTermsModalCheckbox);
  }

  private async clickSubmitButton() {
    await t.hover(this.submitButton).click(this.submitButton);
  }
}

export class CampaignReportingTable {
  readonly parent: CampaignReportingPanel;
  readonly columnPickerPanel = new ColumnPickerPanel(this);
  readonly deleteCampaignModal = new DeleteCampaignModal(this);

  private readonly TABLE_ROW_SELECTOR_PREFIX = '#tableBody-row-';

  protected readonly columnPickerButton = Selector('#btn-cm-columnPicker');

  // column titles
  protected readonly nameColumn = Selector('#tableHeader-column-name>a>span');
  protected readonly pacingColumn = Selector('#tableHeader-column-pacing>a>span');
  protected readonly startColumn = Selector('#tableHeader-column-timeframe_start_string>a>span');
  protected readonly endColumn = Selector('#tableHeader-column-timeframe_end_string>a>span');
  protected readonly maxCpmBidColumn = Selector('#tableHeader-column-cpmBidRate>a>span');
  protected readonly budgetColumn = Selector('#tableHeader-column-totalBudget>a>span');
  protected readonly totalSpentColumn = Selector('#tableHeader-column-spends_spent>a>span');
  protected readonly spentTodayColumn = Selector('#tableHeader-column-spends_daily_spent>a>span');
  protected readonly impressionsColumn = Selector('#tableHeader-column-impression>a>span');
  protected readonly clicksColumn = Selector('#tableHeader-column-click>a>span');
  protected readonly ctrColumn = Selector('#tableHeader-column-ctr>a>span');
  protected readonly visitsColumn = Selector('#tableHeader-column-visits>a>span');
  protected readonly vrColumn = Selector('#tableHeader-column-vr>a>span');
  protected readonly reachColumn = Selector('#tableHeader-column-reach>a>span');
  protected readonly projectedVisitsColumn = Selector('#tableHeader-column-projected_visits>a>span');

  // column values
  protected readonly nameValue = Selector('#tableBody-column-name>span');
  protected readonly startValue = Selector('#tableBody-column-timeframe_start_string>span');
  protected readonly endValue = Selector('#tableBody-column-timeframe_end_string>span');
  protected readonly budgetValue = Selector('#tableBody-column-totalBudget>span');
  protected readonly maxCpmBidValue = Selector('#tableBody-column-cpmBidRate>span');

  // action buttons
  protected readonly playButton = Selector('#btn-adgActionSheet-adgPlay');
  protected readonly pauseButton = Selector('#btn-adgActionSheet-adgPause');
  protected readonly editButton = Selector('#btn-adgActionSheet-adgEdit');
  protected readonly deleteButton = Selector('#btn-adgActionSheet-adgDelete');

  constructor(app) {
    this.parent = app;
  }

  async openColumnPicker() {
    await t.click(this.columnPickerButton);
  }

  async clickDeleteButton() {
    await t.click(this.deleteButton);
  }

  async verifyName(expectedName) {
    let rowIndex = await this.getAdgroupRow(expectedName);
    await t.expect(this.nameValue.nth(rowIndex).innerText).eql(expectedName);
  }

  async verifyStartAndEndDates(adgroupName?, startDate?: string, endDate?: string) {
    let rowIndex = 0;
    if (adgroupName) rowIndex = await this.getAdgroupRow(adgroupName);

    let expectedStartDate = getCurrentDate();
    let expectedEndDate = getDateInFuture(7);

    if (startDate) expectedStartDate = startDate;
    if (endDate) expectedEndDate = endDate;

    await t
      .expect(this.startValue.nth(rowIndex).innerText)
      .eql(expectedStartDate)
      .expect(this.endValue.nth(rowIndex).innerText)
      .eql(expectedEndDate);
  }

  async verifyBudget(expectedBudget: number, expectedUnit: string = CURRENCY_USD, adgroupName?) {
    let rowIndex = 0;
    if (adgroupName) rowIndex = await this.getAdgroupRow(adgroupName);

    await t
      .expect(this.budgetValue.nth(rowIndex).innerText)
      .eql(String(expectedBudget.toFixed(2)) + ' ' + expectedUnit);
  }

  async verifyMaxCpmBid(expectedBid: number, adgroupName?) {
    let rowIndex = 0;
    if (adgroupName) rowIndex = await this.getAdgroupRow(adgroupName);

    await t.expect(this.maxCpmBidValue.nth(rowIndex).innerText).eql(String(expectedBid.toFixed(2)));
  }

  async verifyProjectedVisitsColumnDisplayed() {
    await t
      .expect(this.projectedVisitsColumn.visible)
      .ok()
      .expect(this.projectedVisitsColumn.innerText)
      .eql('Projected Visits');
  }

  async verifyProjectedVisitsColumnNotDisplayed() {
    await t.expect(this.projectedVisitsColumn.visible).notOk();
  }

  async verifyPacingColumnNotDisplayed() {
    await t.expect(this.pacingColumn.visible).notOk();
  }

  async clickOnTableRow(adgroupName?) {
    let rowIndex = 0;
    if (adgroupName) rowIndex = await this.getAdgroupRow(adgroupName);

    await t.click(this.TABLE_ROW_SELECTOR_PREFIX + rowIndex);
  }

  async verifyTableRowActionButtons() {
    await t
      .expect(this.pauseButton.visible)
      .ok()
      .expect(this.editButton.visible)
      .ok()
      .expect(this.deleteButton.visible)
      .ok();
  }

  async clickEditButton() {
    await t.click(this.editButton);
  }

  protected async getAdgroupRow(adgroupName) {
    let rowElement = await xpathselector(`//div/span[contains(text(),
    \'${adgroupName}\')]/parent::*/parent::*/parent::*`).id;
    return Number(rowElement.split('tableBody-row-')[1]);
  }
}

export class AdgroupReportingTable extends CampaignReportingTable {
  readonly duplicateAdgroupModal = new DuplicateAdgroupModal(this);
  readonly deleteAdgroupModal = new DeleteAdgroupModal(this);

  // column titles
  protected readonly idColumn = Selector('#tableHeader-column-id>a>span');
  protected readonly targetingIndicatorColumn = Selector('#tableHeader-column-targeted_product>a>span');
  protected readonly adPackageNameColumn = Selector('#tableHeader-column-adpackage_name>a>span');
  protected readonly thirdPartyIdColumn = Selector('#tableHeader-column-vendorIdentifier>a>span');
  protected readonly thirdPartyNameColumn = Selector('#tableHeader-column-client_placement_name>a>span');
  protected readonly statusColumn = Selector('#tableHeader-column-status>a>span');

  // column values
  protected readonly idValue = Selector('#tableBody-column-id>span');
  protected readonly targetingIndicatorValue = Selector('#tableBody-column-targeted_product>span');
  protected readonly statusValue = Selector('#tableBody-column-status>span');

  // action buttons
  protected readonly duplicateButton = Selector('#btn-adgActionSheet-adgDuplicate');

  // other
  protected readonly noAdgroupsText = Selector('.xad-table-row.inactive>div>span');

  async duplicateAdgroup(adgroupName) {
    await this.clickOnTableRow(adgroupName);
    await this.clickDuplicateButton();
    await this.duplicateAdgroupModal.clickDuplicateButton();
  }

  async deleteAdgroup(adgroupName) {
    await this.clickOnTableRow(adgroupName);
    await this.clickDeleteButton();
    await this.deleteAdgroupModal.clickDeleteButton();
  }

  async clickDuplicateButton() {
    await t.click(this.duplicateButton);
  }

  async verifyId(adgroupName, expectedId: number) {
    let rowIndex = await this.getAdgroupRow(adgroupName);
    await t.expect(this.idValue.nth(rowIndex).innerText).eql(String(expectedId));
  }

  async verifyTargeting(adgroupName, expectedTargeting: AdgroupTargeting) {
    let rowIndex = await this.getAdgroupRow(adgroupName);
    console.log(rowIndex);
    await t.expect(this.targetingIndicatorValue.nth(rowIndex).innerText).eql(expectedTargeting);
  }

  async verifyStatus(adgroupName, expectedStatus: CampaignAndAdGroupStatuses) {
    let rowIndex = await this.getAdgroupRow(adgroupName);
    await t.expect(this.statusValue.nth(rowIndex).innerText).eql(expectedStatus);
  }

  async verifyTableRowActionButtons() {
    await t
      .expect(this.playButton.visible)
      .ok()
      .expect(this.editButton.visible)
      .ok()
      .expect(this.duplicateButton.visible)
      .ok()
      .expect(this.deleteButton.visible)
      .ok();
  }

  async verifyDefaultColumnsAreDisplayed() {
    await t
      .expect(this.idColumn.visible)
      .ok()
      .expect(this.idColumn.innerText)
      .eql(Columns.ID)

      .expect(this.nameColumn.visible)
      .ok()
      .expect(this.nameColumn.innerText)
      .eql(Columns.NAME)

      .expect(this.targetingIndicatorColumn.visible)
      .ok()
      .expect(this.targetingIndicatorColumn.innerText)
      .eql(Columns.TARGETING_INDICATOR)

      .expect(this.adPackageNameColumn.visible)
      .ok()
      .expect(this.adPackageNameColumn.innerText)
      .eql(Columns.AD_PACKAGE_NAME)

      .expect(this.thirdPartyIdColumn.visible)
      .ok()
      .expect(this.thirdPartyIdColumn.innerText)
      .eql(Columns.THIRD_PARTY_ID)

      .expect(this.thirdPartyNameColumn.visible)
      .ok()
      .expect(this.thirdPartyNameColumn.innerText)
      .eql(Columns.THIRD_PARTY_NAME)

      .expect(this.statusColumn.visible)
      .ok()
      .expect(this.statusColumn.innerText)
      .eql(Columns.STATUS)

      .expect(this.pacingColumn.visible)
      .ok()
      .expect(this.pacingColumn.innerText)
      .eql(Columns.PACING)

      .expect(this.startColumn.visible)
      .ok()
      .expect(this.startColumn.innerText)
      .eql(Columns.START)

      .expect(this.endColumn.visible)
      .ok()
      .expect(this.endColumn.innerText)
      .eql(Columns.END)

      .expect(this.maxCpmBidColumn.visible)
      .ok()
      .expect(this.maxCpmBidColumn.innerText)
      .eql(Columns.MAX_CPM_BID)

      .expect(this.budgetColumn.visible)
      .ok()
      .expect(this.budgetColumn.innerText)
      .eql(Columns.BUDGET)

      .expect(this.totalSpentColumn.visible)
      .ok()
      .expect(this.totalSpentColumn.innerText)
      .eql(Columns.TOTAL_SPENT)

      .expect(this.spentTodayColumn.visible)
      .ok()
      .expect(this.spentTodayColumn.innerText)
      .eql(Columns.SPENT_TODAY)

      .expect(this.impressionsColumn.visible)
      .ok()
      .expect(this.impressionsColumn.innerText)
      .eql(Columns.IMPRESSIONS)

      .expect(this.clicksColumn.visible)
      .ok()
      .expect(this.clicksColumn.innerText)
      .eql(Columns.CLICKS)

      .expect(this.ctrColumn.visible)
      .ok()
      .expect(this.ctrColumn.innerText)
      .eql(Columns.CTR)

      .expect(this.visitsColumn.visible)
      .ok()
      .expect(this.visitsColumn.innerText)
      .eql(Columns.VISITS)

      .expect(this.vrColumn.visible)
      .ok()
      .expect(this.vrColumn.innerText)
      .eql(Columns.VR)

      .expect(this.reachColumn.visible)
      .ok()
      .expect(this.reachColumn.innerText)
      .eql(Columns.REACH);
  }

  async verifyNoAdgroupsPresent() {
    await t
      .expect(this.noAdgroupsText.visible)
      .ok()
      .expect(this.noAdgroupsText.textContent)
      .eql('There are no ad groups.');
  }
}

export class ColumnPickerPanel {
  readonly parent: CampaignReportingTable;

  private readonly applyButton = Selector('#btn-columnPickerModal-save');
  private readonly pacingCheckBox = Selector('#inp-columnPickerModal-pacing');
  private readonly budgetCheckBox = Selector('#inp-columnPickerModal-totalBudget');
  private readonly projectedVisitsCheckBox = Selector('#inp-columnPickerModal-projected_visits');

  constructor(app) {
    this.parent = app;
  }

  async clickApplyButton() {
    await t.click(this.applyButton);
  }

  async checkColumn(column: Columns) {
    let checkBox = await this.getColumnSelector(column);
    if (!(await checkBox.checked)) await t.click(checkBox);
  }

  async uncheckColumn(column: Columns) {
    let checkBox = await this.getColumnSelector(column);
    if (await checkBox.checked) await t.click(checkBox);
  }

  private async getColumnSelector(column: Columns) {
    let selector;
    switch (column) {
      case Columns.PACING:
        selector = this.pacingCheckBox;
        break;
      case Columns.PROJECTED_VISITS:
        selector = this.projectedVisitsCheckBox;
        break;
      case Columns.BUDGET:
        selector = this.budgetCheckBox;
        break;
    }
    if (selector == null) throw Error(`Selector for ${column} was not found or assigned!`);
    return selector;
  }
}

export class DuplicateAdgroupModal {
  readonly parent: AdgroupReportingTable;

  private readonly duplicateConfirmationText = Selector('#modal--simple-confirm>div.modal-body>p');
  private readonly duplicateButton = Selector('#btn-simpleConfirmModal-confirm');

  constructor(app: AdgroupReportingTable) {
    this.parent = app;
  }

  async clickDuplicateButton() {
    await t.click(this.duplicateButton);
  }

  async verifyDuplicateModal() {
    await t
      .expect(this.duplicateConfirmationText.visible)
      .ok()
      .expect(this.duplicateConfirmationText.textContent)
      .eql('Duplicating an ad group will create new ad group with all of the attributes of the original.');
  }
}

export class DeleteCampaignModal {
  readonly parent: CampaignReportingTable;

  protected readonly deleteConfirmationPanel = Selector('#modal--simple-confirm>div.modal-body>p');
  protected readonly deleteButton = Selector('#btn-simpleConfirmModal-confirm');
  protected readonly deleteConfirmationText: string = 'All of the creatives will be removed. Are you sure?';

  constructor(app) {
    this.parent = app;
  }

  async clickDeleteButton() {
    await t.click(this.deleteButton);
  }

  async verifyDeleteModal() {
    await t
      .expect(this.deleteConfirmationPanel.visible)
      .ok()
      .expect(this.deleteConfirmationPanel.textContent)
      .eql(this.deleteConfirmationText);
  }
}

export class DeleteAdgroupModal extends DeleteCampaignModal {
  readonly parent: AdgroupReportingTable;

  protected readonly deleteConfirmationText =
    'Deleting this ad group will permanently ' + 'delete all associated attributes and creatives. Are you sure?';
}

enum ReportingTabs {
  SUMMARY = 'Summary',
  LOCATION = 'Location',
  AUDIENCE = 'Audience'
}

enum ReportingLevels {
  CAMPAIGN = 'Campaign',
  ADGROUPS = 'Ad Groups',
  CREATIVES = 'Creatives'
}

enum ReportTypes {
  DAILY_TREND = 'Daily Trend',
  LOOKBACK_WINDOW = 'Lookback Window',
  DAY_OF_THE_WEEK = 'Day of the Week',
  TIME_OF_THE_DAY = 'Time of the Day',
  DAY_OF_THE_WEEK_AND_TIME_OF_THE_DAY = 'Day of the Week + Time of the Day',
  BRAND_TARGETED = 'Brand Targeted (Table Only)',
  CATEGORY_TARGETED = 'Category Targeted (Table Only)',
  OS = 'OS (Table Only)',
  DEVICE = 'Device (Table Only)',
  REPORTING_BY_PRODUCT = 'Reporting by Product',
  INCREMENTAL_VISITS = 'Incremental Visits (Beta)'
}

enum ChartValues {
  IMPRESSIONS = 'Impressions',
  OPEN_HOUR_VISITS = 'Open Hour Visits',
  CLICKS = 'Clicks',
  CTR = 'CTR',
  DAILY_REACH = 'Daily Reach',
  CUMULATIVE_REACH = 'Cumulative Reach',
  TOTAL_SPEND = 'Total Spend',
  SECONDARY_ACTIONS = 'Secondary Actions',
  VISITS = 'Visits',
  SAR = 'SAR'
}

export enum Columns {
  ID = 'ID',
  NAME = 'Name',
  TARGETING_INDICATOR = 'Targeting Indicator',
  AD_PACKAGE_NAME = 'Ad Package Name',
  THIRD_PARTY_ID = 'Third Party Placement ID',
  THIRD_PARTY_NAME = 'Third Party Placement Name',
  STATUS = 'Status',
  PACING = 'Pacing',
  START = 'Start',
  END = 'End',
  MAX_CPM_BID = 'Max CPM Bid',
  BUDGET = 'Budget',
  TOTAL_SPENT = 'Total Spent',
  SPENT_TODAY = 'Spent Today',
  IMPRESSIONS = 'Impressions',
  CLICKS = 'Clicks',
  CTR = 'CTR',
  VISITS = 'Visits',
  VR = 'VR',
  REACH = 'Reach',
  PROJECTED_VISITS = 'Projected Visits'
}

