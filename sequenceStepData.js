class sequenceStepData {
    constructor(
      stepName,
      stepTxt,
      stepInforTxt,
      isCaustionAvailable,
      caustionTxt,
      flagTxt,
      stepURl,
      isNestedStep = false,
      nestedStepList,
      stepAudioUrl
    ) {
      this.stepName = stepName;
      this.stepTxt = stepTxt;
      this.stepInforTxt = stepInforTxt;
      this.isCaustionAvailable = isCaustionAvailable;
      this.caustionTxt = caustionTxt;
      this.flagTxt = flagTxt;
      this.stepURl = stepURl;
      this.isNestedStep = isNestedStep;
      this.nestedStepList = nestedStepList;
      this.stepAudioUrl = stepAudioUrl;
    }
  }

  module.exports = sequenceStepData;