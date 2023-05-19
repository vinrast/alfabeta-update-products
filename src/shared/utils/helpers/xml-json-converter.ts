import xml2js from 'xml2js';

export const convertToJson = (xmlString: string) => {
  try {
    var cleanedString = xmlString.replace('\ufeff', '');
    const parser = new xml2js.Parser({});
    return parser.parseStringPromise(cleanedString);
  } catch (error) {
    console.log(error);
    return null;
  }
};
