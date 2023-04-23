import fs from 'fs';

export const removeFileHelper = (filePath: string, fileName: string): void => {
  const path = filePath + '/' + fileName;
  if (fs.existsSync(path)) {
    fs.unlinkSync(path);
  } else {
    console.info(
      `NO FUE NECESARIO ELIMINAR EL ARCHIVO "${fileName}" PORQUE NO EXISTE --> `,
      new Date().toLocaleDateString()
    );
  }
};
