export interface KeyConfig {
    content1: string;
    content2?: string;
    selected: boolean;
    errorPressed?: boolean;
    errorPriority?: number;
    type: string;
    needShift?: "left" | "right";
    positionFor?: "left" | "right";
    active: boolean;
    highlighted: boolean;
    specific: {
      content1: SpecificContentKey,
      content2?: SpecificContentKey
    }
  };

  export enum SpecificContentKey {
    NUMBER = "number",
    SYSTEM = "system",
    LETTER = "letter",
    SYMBOL = "symbol"
  }

  export type KeyboardCases = {
    downCase: Array<string>;
    upperCase: Array<string>;
    symbols: Array<string>;
  };
  
  export interface KeyboardCasesKeys {
    downCase: string;
    upperCase: string;
    symbols: string;
  }