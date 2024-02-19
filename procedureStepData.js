class procedureStepData {
    constructor(
      sequneceName,
      sequenceId,
      tagName,
      removeStepList,
      installStepList,
      removeVideoURl,
      installVideoURl,
      isOptional,
      isOptional_Sequence,
      isTxtOption,
      txtOptionInfo,
      txtOptionSeqName,
      optionSequenceList,
      optionSequenceIDList
    ) {
      this.sequneceName = sequneceName;
      this.sequenceId = sequenceId;
      this.tagName = tagName;
      this.removeStepList = removeStepList;
      this.installStepList = installStepList;
      this.removeVideoURl = removeVideoURl;
      this.installVideoURl = installVideoURl;
      this.isOptional = isOptional;
      this.isOptional_Sequence = isOptional_Sequence;
      this.isTxtOption = isTxtOption;
      this.txtOptionInfo = txtOptionInfo;
      this.txtOptionSeqName = txtOptionSeqName;
      this.optionSequenceList = optionSequenceList;
      this.optionSequenceIDList = optionSequenceIDList;
    }
  }

  module.exports = procedureStepData;