export interface AttributesState {
    [attribute: string]: number;
};

export interface ModifiersState {
    [modifier: string]: number;
};

export interface ClassStateRequirement {
    [attribute: string]: number;
};

export interface ClassRequBoolean {
    [className: string]: boolean;
};

export interface Skill {
    skillName: string;
    attributeModifier: string;
    skillPoint: number;
    modifierPoint: number;
    totalPoint: number;
  }

