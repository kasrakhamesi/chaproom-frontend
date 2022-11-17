import { convertDate, ConvertMap } from "@/shared/utils/convert";

export const discountConvertMap: ConvertMap = [
  [["expireAt", "expireDate"], convertDate],
];

export const cooperationRequestConvertMap: ConvertMap = [
  [["createdAt", "date"], convertDate],
];

export const financialRecordConvertMap: ConvertMap = [
  [["createdAt", "date"], convertDate],
];

export const blogPostConvertMap: ConvertMap = [
  [["createdAt", "createDate"], convertDate],
  [["updatedAt", "lastUpdateDate"], convertDate],
];

export const dedicatedDiscountCodeReportConvertMap: ConvertMap = [
  [["createdAt", "date"], convertDate],
];

export const dedicatedLinkReportConvertMap: ConvertMap = [
  [["createdAt", "date"], convertDate],
];

export const customerReportConvertMap: ConvertMap = [
  [["createdAt", "registrationDate"], convertDate],
  [["firstOrderAt", "firstOrderDate"], convertDate],
  [["lastOrderAt", "lastOrderDate"], convertDate],
];
