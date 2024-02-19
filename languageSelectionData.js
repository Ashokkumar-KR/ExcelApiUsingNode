
class LanguageSelectionData{
    constructor(
        languageName,
        languageId,
        sequenceList,
        procedureList
    ){
        this.languageName = languageName;
        this.languageId = languageId;
        this.sequenceList = sequenceList;
        this.procedureList = procedureList;
    }
}

module.exports = LanguageSelectionData;