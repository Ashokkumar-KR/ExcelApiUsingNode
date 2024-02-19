const XLSX = require("xlsx");
const path = require("path");
const fs = require("fs");
const express = require("express");
const procedureStepData = require("./procedureStepData");
const sequenceStepData = require("./sequenceStepData");
const languageSelectionData = require("./languageSelectionData");
const procedureList = require("./ProcedureList");
const ProcedureSequenceList = require("./ProcedureSequenceList");
const getNoOfSequencesInASheet = require("./getNoOfSequencesInASheet");
const getNoOfProceduresInASheet = require("./getNoOfProceduresInASheet");
const globalClass = require("./globalClass");

const app = express();

function processExcelData(excelFileDir) {
  // Load the Excel file
  const workbook = XLSX.readFile(path.resolve(__dirname, excelFileDir));

  let sequenceSheetNames = ["01_English_Sequences"];
  //   "02_Chinese_Sequences",
  //   "03_German_Sequences",
  //   "04_Spanish_Sequences",
  //   "05_French_Sequences",
  //   "06_Japanese_Sequences",
  //   "07_Portuguese_Sequences",
  // ];
  let procedureSheetNames = ["01_English_Procedures"];
  //   "02_Chinese_Procedures",
  //   "03_German_Procedures",
  //   "04_Spanish_Procedures",
  //   "05_French_Procedures",
  //   "06_Japanese_Procedures",
  //   "07_Portuguese_Procedures",
  // ];
  let languageNames = [
    "English",
    "Chinese",
    "German",
    "Spanish",
    "French",
    "Japanese",
    "Portuguese",
  ];

  let languagedataArray = [];
  let currrentLanguageId = 0;

  // let globalSheetName = workbook.SheetNames[1];
  // console.log(workbook.SheetNames)
  const globalSheet = workbook.Sheets[sequenceSheetNames[0]];
  const modelNameAddress = "B3"; //SequenceName
  const modelNameCell = globalSheet[modelNameAddress];
  let modelNameValue = modelNameCell ? modelNameCell.v : "";

  // if(modelNameValue){
  //   modelNameValue.toString();
  //   modelNameValue = modelNameValue.replace(/,/g,"");
  // }

  for (let m = 0; m < sequenceSheetNames.length; m++) {
    let currentRowNo = 1;
    let seqDataArray = [];
    //let sheetName = workbook.SheetNames[currrentLanguageId];
    //console.log(workbook.SheetNames);
    let sheet = workbook.Sheets[sequenceSheetNames[currrentLanguageId]];

    let noOfSequencesInaSheet = getNoOfSequencesInASheet(sheet); //gets no of seq present in a sheet
    //console.log("No of Sequences is " + noOfSequencesInaSheet);

    for (let k = 0; k < noOfSequencesInaSheet; k++) {
      //currentRowNo +=1;
      const cellAddress = "B" + currentRowNo; //SequenceName
      const desiredCell = sheet[cellAddress];
      const cellValue = desiredCell ? desiredCell.v : "";

      const cellAddress2 = "C" + currentRowNo; //SequenceId
      const desiredCell2 = sheet[cellAddress2];
      const cellValue2 = desiredCell2 ? desiredCell2.v : "";

      currentRowNo = currentRowNo + 1;

      const cellAddress3 = "B" + currentRowNo; //TagName
      const desiredCell3 = sheet[cellAddress3];
      const cellValue3 = desiredCell3 ? desiredCell3.v : "";

      currentRowNo += 1;

      const optionCellAddress = "C" + currentRowNo;
      const optionDesiredCell = sheet[optionCellAddress];
      const optionCellValue = optionDesiredCell ? optionDesiredCell.v : "";
      let isOptionalSequence = optionCellValue === "Option" ? true : false;

      //console.log(optionCellValue);
      //console.log(isOptionalSequence);

      let removeTotalStepCount;
      let installTotalStepCount;

      currentRowNo = currentRowNo + 1;

      const cellAddress4 = "B" + currentRowNo;
      const desiredCell4 = sheet[cellAddress4];
      const cellValue4 = desiredCell4 ? desiredCell4.v : "";

      removeTotalStepCount = cellValue4;

      const removeVideoUrlAddress = "H" + currentRowNo;
      const removeVideoUrlCell = sheet[removeVideoUrlAddress];
      const removeVideoUrlValue = removeVideoUrlCell
        ? removeVideoUrlCell.v
        : "";

      let removeStepListArray = [];
      let installStepListArray = [];
      let optionSequenceListArray = [];
      let optionSequenceIDListArray = [];

      currentRowNo = currentRowNo + 1;

      if (isOptionalSequence) {
        tempRowno = currentRowNo;
        for (i = 0; i < removeTotalStepCount; i++) {
          let cellAddress1 = "D" + tempRowno; //StepName
          let desiredCell1 = sheet[cellAddress1];
          let cellValue1 = desiredCell1 ? desiredCell1.v : "";
          optionSequenceListArray.push(cellValue1);

          let cellAddress2 = "E" + tempRowno; //stepTxt
          let desiredCell2 = sheet[cellAddress2];
          let cellValue2 = desiredCell2 ? desiredCell2.v : "";
          optionSequenceIDListArray.push(cellValue2);
          tempRowno++;
        }
      }
      let nestedStepCount;
      let currentNestedStepCount = 0;
      let dummy = false;
      let dummy2 = "";
      let dummy3 = true;
      let isNestedActivated = false;
      let nestedStepArray = [];
      for (let i = 0; i < removeTotalStepCount; i++) {
        let cellAddress0 = "A" + currentRowNo; //Checking NestedStep
        let desiredCell0 = sheet[cellAddress0];
        let cellValue0 = desiredCell0 ? desiredCell0.v : "";
        let isNestedStep = cellValue0 === "" ? false : true;
        if (isNestedStep) {
          nestedStepCount = parseInt(cellValue0.slice(7));
          isNestedActivated = true;
        }

        //console.log(nestedStepCount);

        let cellAddress1 = "C" + currentRowNo; //StepName
        let desiredCell1 = sheet[cellAddress1];
        let cellValue1 = desiredCell1 ? desiredCell1.v : "";

        let cellAddress2 = "D" + currentRowNo; //stepTxt
        let desiredCell2 = sheet[cellAddress2];
        let cellValue2 = desiredCell2 ? desiredCell2.v : "";

        let cellAddress3 = "E" + currentRowNo; //stepInforTxt
        let desiredCell3 = sheet[cellAddress3];
        let cellValue3 = desiredCell3 ? desiredCell3.v : "";

        let cellAddress4 = "F" + currentRowNo; //caustionTxt
        let desiredCell4 = sheet[cellAddress4];
        let cellValue4 = desiredCell4 ? desiredCell4.v : "";
        let isCautionCheck = cellValue4 == "" ? false : true;
        let cellAddress5 = "G" + currentRowNo; //flagTxt
        let desiredCell5 = sheet[cellAddress5];
        let cellValue5 = desiredCell5 ? desiredCell5.v : "";

        let cellAddress6 = "H" + currentRowNo; //stepURl
        let desiredCell6 = sheet[cellAddress6];
        let cellValue6 = desiredCell6 ? desiredCell6.v : "";
        if (isNestedActivated) {
          if (currentNestedStepCount < nestedStepCount) {
            const nestedData = new sequenceStepData(
              cellValue1,
              cellValue2,
              cellValue3,
              false, //isCautionCheck,
              cellValue4,
              cellValue5,
              cellValue6,
              dummy,
              []
            );
            nestedStepArray.push(nestedData);
            currentNestedStepCount += 1;
            if (currentNestedStepCount === nestedStepCount) {
              let tempArray = [...nestedStepArray];
              const parentNestedData = new sequenceStepData(
                dummy2,
                dummy2,
                dummy2,
                false, //isCautionCheck,
                dummy2,
                dummy2,
                dummy2,
                dummy3,
                tempArray
              );
              //console.log(tempArray.length);
              isNestedStep = false;
              currentNestedStepCount = 0;
              removeStepListArray.push(parentNestedData);
              isNestedActivated = false;
              //nestedStepArray.splice(0,nestedStepArray.length);
              nestedStepArray = [];
              // console.log(tempArray.length);
            }
          }
        } else {
          const data = new sequenceStepData(
            cellValue1,
            cellValue2,
            cellValue3,
            false, //isCautionCheck,
            cellValue4,
            cellValue5,
            cellValue6,
            isNestedStep,
            []
          );
          removeStepListArray.push(data);
        }

        currentRowNo += 1;
      }

      const cellAddress5 = "B" + currentRowNo; //TagName
      const desiredCell5 = sheet[cellAddress5];
      const cellValue5 = desiredCell ? desiredCell5.v : "";

      installTotalStepCount = cellValue5;
      //console.log(installTotalStepCount);

      const installVideoUrlAddress = "H" + currentRowNo;
      const installVideoUrlCell = sheet[installVideoUrlAddress];
      const installVideoUrlValue = installVideoUrlCell
        ? installVideoUrlCell.v
        : "";

      currentRowNo = currentRowNo + 1;
      currentNestedStepCount = 0;
      nestedStepCount = 0;
      //console.log(currentRowNo);

      for (let i = 0; i < installTotalStepCount; i++) {
        let cellAddress0 = "A" + currentRowNo; //Checking NestedStep
        let desiredCell0 = sheet[cellAddress0];
        let cellValue0 = desiredCell0 ? desiredCell0.v : "";
        let isNestedStep = cellValue0 === "" ? false : true;
        if (isNestedStep) {
          nestedStepCount = parseInt(cellValue0.slice(7));
          isNestedActivated = true;
          //console.log("nestedStepCount is" +nestedStepCount);
          //console.log(isNestedActivated);
        }

        let cellAddress1 = "C" + currentRowNo; //Stepname
        let desiredCell1 = sheet[cellAddress1];
        let cellValue1 = desiredCell1 ? desiredCell1.v : "";

        let cellAddress2 = "D" + currentRowNo; //stepTxt
        let desiredCell2 = sheet[cellAddress2];
        let cellValue2 = desiredCell2 ? desiredCell2.v : "";

        let cellAddress3 = "E" + currentRowNo; //stepInfoText
        let desiredCell3 = sheet[cellAddress3];
        let cellValue3 = desiredCell3 ? desiredCell3.v : "";

        let cellAddress4 = "F" + currentRowNo; ////caustionTxt
        let desiredCell4 = sheet[cellAddress4];
        let cellValue4 = desiredCell4 ? desiredCell4.v : "";

        let isCautionCheck = cellValue4 == "" ? false : true;

        let cellAddress5 = "G" + currentRowNo; //flagTxt
        let desiredCell5 = sheet[cellAddress5];
        let cellValue5 = desiredCell5 ? desiredCell5.v : "";

        let cellAddress6 = "H" + currentRowNo; //stepURl
        let desiredCell6 = sheet[cellAddress6];
        let cellValue6 = desiredCell6 ? desiredCell6.v : "";
        //console.log("isNestedActivated "+isNestedActivated);

        if (isNestedActivated) {
          // console.log("CurrentNestedStepCount" + currentNestedStepCount);
          // console.log("NestedStepCount " + nestedStepCount);
          // console.log(
          //   `currentNestedStepCount < nestedStepCount ${
          //     currentNestedStepCount < nestedStepCount
          //   }`
          // );
          if (currentNestedStepCount < nestedStepCount) {
            const nestedData = new sequenceStepData(
              cellValue1,
              cellValue2,
              cellValue3,
              false, //isCautionCheck,
              cellValue4,
              cellValue5,
              cellValue6,
              dummy,
              []
            );
            nestedStepArray.push(nestedData);
            currentNestedStepCount += 1;
            //console.log("CurrentNestedstepCount is " + currentNestedStepCount)
            if (currentNestedStepCount == nestedStepCount) {
              let tempArray = [...nestedStepArray];
              const parentNestedData = new sequenceStepData(
                dummy2,
                dummy2,
                dummy2,
                false, //isCautionCheck,
                dummy2,
                dummy2,
                dummy2,
                dummy3,
                tempArray
              );
              isNestedStep = false;
              currentNestedStepCount = 0;
              installStepListArray.push(parentNestedData);
              isNestedActivated = false;
              nestedStepArray = [];
            }
          }
        } else {
          const data = new sequenceStepData(
            cellValue1,
            cellValue2,
            cellValue3,
            false, //isCautionCheck,
            cellValue4,
            cellValue5,
            cellValue6,
            isNestedStep,
            []
          );
          installStepListArray.push(data);
        }
        currentRowNo += 1;
      }
      if (isOptionalSequence) {
        removeStepListArray = [];
        installStepListArray = [];
      }
      const data = new procedureStepData(
        cellValue,
        cellValue2,
        cellValue3,
        removeStepListArray,
        installStepListArray,
        removeVideoUrlValue,
        installVideoUrlValue,
        false,
        isOptionalSequence,
        false,
        "",
        "",
        optionSequenceListArray,
        optionSequenceIDListArray
      );

      seqDataArray.push(data);
    }

    //sheetName = workbook.SheetNames[procedureSheetNames[currrentLanguageId]];
    sheet = workbook.Sheets[procedureSheetNames[currrentLanguageId]];
    let noOfProceduresInASheet = getNoOfProceduresInASheet(sheet);
    //console.log("no of procedures " + noOfProceduresInASheet);

    let currentProcedureRowNo = 1;
    let procedureListArray = [];

    const rowsPerProcedure = 29;

    for (let p = 0; p < noOfProceduresInASheet; p++) {
      currentProcedureRowNo = 1 + p * rowsPerProcedure;

      let procedureNameCellAddress = "B" + currentProcedureRowNo;
      let procedureNameCell = sheet[procedureNameCellAddress];
      let procedureNamecellValue = procedureNameCell ? procedureNameCell.v : "";

      let procedureIdCellAddress = "C" + currentProcedureRowNo;
      let procedureIdCell = sheet[procedureIdCellAddress];
      let procedureIdcellValue = procedureIdCell ? procedureIdCell.v : "";

      let cautionTypeAddress = "E" + currentProcedureRowNo;
      let cautionTypeCell = sheet[cautionTypeAddress];
      let cautionTypeValue = cautionTypeCell ? cautionTypeCell.v : "";

      currentProcedureRowNo += 2;

      let procedureTotalSequenceCountCellAddress = "B" + currentProcedureRowNo;
      let procedureTotalSequenceCountCell =
        sheet[procedureTotalSequenceCountCellAddress];
      let procedureTotalSequenceCountcellValue = procedureTotalSequenceCountCell
        ? procedureTotalSequenceCountCell.v
        : "";

      let procedureSequenceIdListArray = [];
      let procedureSequenceListArray = [];

      currentProcedureRowNo++;

      for (let j = 0; j < procedureTotalSequenceCountcellValue; j++) {
        let sequenceNameAddress = "C" + currentProcedureRowNo;
        let sequenceNameCell = sheet[sequenceNameAddress];
        let sequenceNameValue = sequenceNameCell ? sequenceNameCell.v : "";

        let sequenceIdAddress = "D" + currentProcedureRowNo;
        let sequenceIdCell = sheet[sequenceIdAddress];
        let sequenceIdValue = sequenceIdCell ? parseInt(sequenceIdCell.v) : "";

        let procedureSequenceListArrayData = new ProcedureSequenceList(
          sequenceNameValue,
          sequenceIdValue,
          false,
          false,
          []
        );
        procedureSequenceListArray.push(procedureSequenceListArrayData);
        currentProcedureRowNo++;
      }

      let procedureDataArray = new procedureList(
        procedureNamecellValue,
        procedureIdcellValue - 1,
        0,
        procedureTotalSequenceCountcellValue,
        procedureSequenceIdListArray,
        procedureSequenceListArray,
        cautionTypeValue
      );

      procedureListArray.push(procedureDataArray);
    }
    let sortedArray = [];

    if (currrentLanguageId === 0) {
      sortedArray = procedureListArray.sort((a, b) => {
        let nameA = a.procedureName ? a.procedureName.toLowerCase() : "";
        let nameB = b.procedureName ? b.procedureName.toLowerCase() : "";
        return nameA.localeCompare(nameB); // Use localeCompare for alphabetical sorting
      });
    }

    let languageSelectionDataCurrent = new languageSelectionData(
      languageNames[currrentLanguageId],
      currrentLanguageId,
      seqDataArray,
      procedureListArray
    );
    languagedataArray.push(languageSelectionDataCurrent);
    //currrentLanguageId++;
  }
  const excelData = new globalClass(
    modelNameValue.toString() || "",
    languagedataArray
  );

  const jsonOutPut = JSON.stringify(excelData, null, 4);
  //fs.writeFileSync("Exceldata.json", jsonOutPut);
  return excelData;
}

app.get("/",(req,res)=>{
  res.send("Please add excel File name after / to get Data")
})
// get rid of error which occurs due to missing icon
app.get("/favicon.ico", (req, res) => res.status(204));

app.get("/:excelFileName", (req, res) => {
  try{
    let requestedExcelFile = req.params.excelFileName;
  //console.log(requestedExcelFile);
  const jsonDataOutput = processExcelData(
    `./Assets/${requestedExcelFile}.xlsx`
  );
  res.send(jsonDataOutput);
  }catch(e){
    //console.log(e);
    res.send("Please Check File Name: " + req.params.excelFileName);
  }
  
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log("Listening on port " + port);
});
