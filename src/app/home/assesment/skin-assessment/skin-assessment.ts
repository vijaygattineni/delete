export interface skinAssessmentInt{
    patient: number;
    assessments: [{
      wound: boolean;
      wound_type: any;
      redness: boolean;
      infection: boolean;
      odour: boolean;
      pain: any;
      moisture_type: any;
      edges: any;
      measurements_length: number;
      measurements_width: number;
      measurements_depth: number;
      wound_area: number;
  }]
}