const XLSX = require("xlsx");

function getNoOfProceduresInASheet(sheet) {
  const columnRange = XLSX.utils.decode_range(sheet["!ref"]);
  const columnIndex = XLSX.utils.decode_col("A");

  let noOfProcedures = 0;

  for (let row = columnRange.s.r; row <= columnRange.e.r; row++) {
    const cellAddress = XLSX.utils.encode_cell({ r: row, c: columnIndex });
    const cell = sheet[cellAddress];

    if (cell && cell.v === "ProcedureName") {
      noOfProcedures++;
    }
  }

  return noOfProcedures;
}

module.exports = getNoOfProceduresInASheet;
