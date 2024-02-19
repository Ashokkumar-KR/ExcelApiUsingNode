const XLSX = require("xlsx");

function getNoOfSequencesInASheet(sheet) {
  const columnRange = XLSX.utils.decode_range(sheet["!ref"]);
  const columnIndex = XLSX.utils.decode_col("A");

  let noOfSequences = 0;

  for (let row = columnRange.s.r; row <= columnRange.e.r; row++) {
    const cellAddress = XLSX.utils.encode_cell({ r: row, c: columnIndex });
    const cell = sheet[cellAddress];

    if (cell && cell.v === "SequenceName") {
      noOfSequences++;
    }
  }

  return noOfSequences;
}

module.exports = getNoOfSequencesInASheet;
