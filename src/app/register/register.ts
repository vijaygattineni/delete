export interface RegisterData {
    patient_profile: {
        name: string;
        age: number;
        gender: string;
        height: number;
        weight: number;
    },
    risk_assessment: {
        sensory_perception: string;
        mobility: string;
        moisture: string;
        nutrition: string;
        activity: string;
        friction_shear: string;
    },
    other_factors: {
        previous_pressure_injury: boolean;
        diabetes: boolean;
        smoker: boolean;
        cardiovascular_disease: boolean;
        anti_coagulants: boolean;
        kidney_disease: boolean;
        respiratory_condition: boolean;
        urogenital_condition: boolean;
        sepsis: boolean;
        pneumonia: boolean;
        anemia_or_haemoglobinopathies: boolean;
        bone_infections: boolean;
        paralysis: boolean;
        muscular_dystrophy_myopathies: boolean;
        hip_or_knee_surgery: boolean;
    }
};
