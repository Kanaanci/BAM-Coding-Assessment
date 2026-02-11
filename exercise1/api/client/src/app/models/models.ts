export interface PersonAstronaut {
  personId: number;
  name: string;
  currentRank: string;
  currentDutyTitle: string;
  careerStartDate: string | null;
  careerEndDate: string | null;
}

export interface AstronautDuty {
  id: number;
  personId: number;
  rank: string;
  dutyTitle: string;
  dutyStartDate: string;
  dutyEndDate: string | null;
}

export interface GetPeopleResponse {
  success: boolean;
  message: string;
  responseCode: number;
  people: PersonAstronaut[];
}

export interface GetDutiesResponse {
  success: boolean;
  message: string;
  responseCode: number;
  person: PersonAstronaut;
  astronautDuties: AstronautDuty[];
}

export interface CreatePersonResponse {
  success: boolean;
  message: string;
  responseCode: number;
  id: number;
}

export interface CreateDutyRequest {
  name: string;
  rank: string;
  dutyTitle: string;
  dutyStartDate: string;
}

export interface CreateDutyResponse {
  success: boolean;
  message: string;
  responseCode: number;
  id: number | null;
}

export const RANKS = ['Lieutenant', 'Captain', 'Major', 'Colonel', 'General'];
export const DUTY_TITLES = ['Pilot', 'Commander', 'Engineer', 'Medic', 'Scientist', 'Retired'];
