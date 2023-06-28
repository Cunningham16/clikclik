export interface KeyConfig {
    id: string;
    content1: string;
    content2?: string;
    selected: boolean;
    errorPressed?: boolean;
    errorPriority?: number;
    setType: string;
    needShift?: "left" | "right";
    positionFor?: "left" | "right";
  };

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