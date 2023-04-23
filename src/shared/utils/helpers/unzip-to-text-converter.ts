import AdmZip from 'adm-zip';

export const unzipToTextConverter = (path: string) => {
  try {
    const zip = new AdmZip(path);
    const zipEntries = zip.getEntries();
    return zip.readAsText(zipEntries[0]);
  } catch (error) {
    console.error('ERROR CONVIRTIENDO ARCHIVO COMPRIMIDO A TEXTO: ', error);
  }
};
