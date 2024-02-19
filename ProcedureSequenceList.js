class ProcedureSequenceList{
    constructor(
        sequenecName,
        sequenceId,
        isOptional,
        isOption,
        optionSeqList
    ){
        this.sequenecName = sequenecName;
        this.sequenceId = sequenceId;
        this.isOptional = isOptional;
        this.isOption = isOption;
        this.optionSeqList = optionSeqList;
    }
}

module.exports = ProcedureSequenceList;