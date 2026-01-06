/**
 * NUMEROLOGY MEANINGS INDEX
 * Export tất cả các module kiến giải Thần Số Học
 * Cổ Học Tinh Hoa
 */

// Life Path meanings
export {
  default as lifePathMeanings,
  getLifePathMeaning,
  getAllLifePathNumbers,
  getLifePathShortDesc,
  isMasterNumber,
  getReducedNumber,
  getCompatibility
} from './lifePathMeaning';

// Karmic Debt meanings
export {
  default as karmicDebtMeanings,
  getKarmicDebtMeaning,
  isKarmicDebtNumber,
  getAllKarmicDebtNumbers,
  getKarmicDebtShortDesc,
  getKarmicDebtReducedNumber,
  getKarmicDebtAffirmations
} from './karmicDebtMeaning';

// Expression Number meanings
export {
  default as expressionMeanings,
  getExpressionMeaning,
  getAllExpressionNumbers,
  getExpressionShortDesc,
  getExpressionCareers
} from './expressionMeaning';

// Soul Urge meanings
export {
  default as soulUrgeMeanings,
  getSoulUrgeMeaning,
  getAllSoulUrgeNumbers,
  getSoulUrgeShortDesc,
  getSoulUrgeDesires
} from './soulUrgeMeaning';

// Personality meanings
export {
  default as personalityMeanings,
  getPersonalityMeaning,
  getAllPersonalityNumbers,
  getPersonalityShortDesc,
  getPersonalityFirstImpression
} from './personalityMeaning';

// Birthday Number meanings
export {
  default as birthdayMeanings,
  getBirthdayMeaning,
  getBirthdayShortDesc,
  isBirthdayMasterNumber,
  isBirthdayKarmicDebt
} from './birthdayMeaning';

// Cycles meanings (Pinnacle & Challenge)
export {
  default as cyclesMeanings,
  pinnacleMeanings,
  challengeMeanings,
  getPinnacleMeaning,
  getChallengeMeaning,
  getAllPinnacleNumbers,
  getAllChallengeNumbers,
  getPinnacleShortDesc,
  getChallengeShortDesc,
  calculatePinnacles,
  calculateChallenges,
  getCurrentPinnacle
} from './cyclesMeaning';
