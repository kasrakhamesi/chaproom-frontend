import { convert, convertDate, ConvertMap } from "@/shared/utils/convert";

export const printFoldersConvertMap: ConvertMap = [
  [
    ["color", "printColor"],
    {
      black_and_white: "blackAndWhite",
      normal_color: "normalColor",
      full_color: "fullColor",
    },
  ],
  [["size", "printSize"], null],
  [
    ["side", "printSide"],
    {
      single_sided: "singleSided",
      double_sided: "doubleSided",
    },
  ],
  [
    ["binding", "bindingOptions"],
    [
      [
        ["type", "bindingType"],
        {
          spring_normal: "springNormal",
          spring_papco: "springPapco",
          stapler: "stapler",
        },
      ],
      [
        ["method", "bindingMethod"],
        {
          all_files_together: "allFilesTogether",
          each_file_separated: "eachFileSeparated",
          count_of_files: "countOfFiles",
        },
      ],
      [
        ["coverColor", "coverColor"],
        {
          black_and_white: "blackAndWhite",
          colorful: "colorful",
        },
      ],
    ],
  ],
  [["files", "printFiles"], null],
];

export const orderConvertMap: ConvertMap = [
  [["createdAt", "date"], convertDate],
  [["postageAt", "postageDate"], convertDate],
  [
    "postageMethod",
    {
      express_mail: "expressMail",
    },
  ],
  [["updatedAt", "lastUpdateDate"], convertDate],
  [
    ["folders", "printFolders"],
    (items: any[], direction) =>
      items.map((item) => convert(printFoldersConvertMap, item, direction)),
  ],
];
